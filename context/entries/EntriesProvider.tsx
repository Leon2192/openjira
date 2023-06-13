import React, { FC, ReactNode, useEffect, useReducer } from "react";

import { EntriesContext } from "./EntriesContext";
import { Entry } from "../../interfaces/entry";
import entriesApi from "../../apis/entriesApi";
import entriesReducer from "./entriesReducer";
import { useSnackbar } from "notistack";
import { v4 as uuidv4 } from "uuid";

type CaughtProviderProps = {
  children: React.ReactNode
}

export interface EntriesState {
  entries: Entry[];
}

const Entries_INITIAL_STATE: EntriesState = {
  entries: [],
};

export const EntriesProvider: FC<CaughtProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(entriesReducer, Entries_INITIAL_STATE);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const addNewEntry = async (description: string) => {
    const { data } = await entriesApi.post<Entry>("/entries", {
      description,
    });
    dispatch({ type: "[Entry] Add-Entry", payload: data });
  };

  const updateEntry = async ({ _id, description, status }: Entry, showSnackbar = false) => {
    try {
      const { data } = await entriesApi.put<Entry>(`/entries/${_id}`, {
        description, status
      });
      dispatch({ type: "[Entry] Entry-Updated", payload: data });
      if (showSnackbar) {
        enqueueSnackbar('¡Bien! Tarea actualizada', {
          variant: 'success',
          autoHideDuration: 1500,
          anchorOrigin: {
            vertical: 'top',
            horizontal: 'right'
          }
        })
      }

    } catch (error) {
      console.log({ error })
    }
  };

  const refreshEntries = async () => {
    const { data } = await entriesApi.get<Entry[]>("/entries");
    dispatch({ type: "[Entry] Refresh-Data", payload: data });
  };

  useEffect(() => {
    refreshEntries();
  }, []);

  return (
    <EntriesContext.Provider
      value={{
        ...state,

        addNewEntry,
        updateEntry,
      }}
    >
      {children}
    </EntriesContext.Provider>
  );
};
