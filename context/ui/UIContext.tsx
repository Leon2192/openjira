import { createContext } from "react";

interface ContextProps {
  sideMenuOpen: boolean;
  isAddingEntry: boolean;
  isDragging: boolean;
  openSideMenu: () => void;
  closeSideMenu: () => void;
  setIsAddingEntry: (isAdding: boolean) => void;

  endDragging: () => void;
  startDragging: () => void;
}

const UIContext = createContext({} as ContextProps);

export default UIContext;
