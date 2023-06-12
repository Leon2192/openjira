import React, { FC, ReactNode, useEffect, useReducer } from "react";

import { EntriesContext } from "./EntriesContext";
import { Entry } from "../../interfaces/entry";
import entriesApi from "../../apis/entriesApi";
import entriesReducer from "./entriesReducer";
import { v4 as uuidv4 } from "uuid";

export interface EntriesState {
  entries: Entry[];
  children: React.ReactNode;
}

const Entries_INITIAL_STATE: EntriesState = {
  entries: [],
  children: []
};

export const EntriesProvider: FC<EntriesState> = ({ children }) => {
  const [state, dispatch] = useReducer(entriesReducer, Entries_INITIAL_STATE);

  const addNewEntry = async (description: string) => {
    const { data } = await entriesApi.post<Entry>("/entries", {
      description,
    });
    dispatch({ type: "[Entry] Add-Entry", payload: data });
  };

  const updateEntry = async ({ _id, description, status }: Entry) => {
    try {
      const { data } = await entriesApi.put<Entry>(`/entries/${_id}`, {
        description, status
      });
      dispatch({ type: "[Entry] Entry-Updated", payload: data });

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
