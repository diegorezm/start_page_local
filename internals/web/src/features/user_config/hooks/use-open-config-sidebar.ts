import { create } from "zustand";

interface IOpenConfigSidebar {
  isOpen: boolean;
  onOpen: VoidFunction;
  onClose: VoidFunction;
}

export const useOpenConfigSidebar = create<IOpenConfigSidebar>((set) => ({
  isOpen: false,
  onOpen: () => set(s => ({ ...s, isOpen: true })),
  onClose: () => set(s => ({ ...s, isOpen: false }))
}))
