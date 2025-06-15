import { create } from "zustand"

interface IOpenCreateSectionDialog {
  isOpen: boolean
  onOpen: VoidFunction
  onClose: VoidFunction
}

export const useOpenCreateSectionItemDialog = create<IOpenCreateSectionDialog>((set) => ({
  isOpen: false,
  onOpen: () => set(s => ({ ...s, isOpen: true })),
  onClose: () => set(s => ({ ...s, isOpen: false }))
}))
