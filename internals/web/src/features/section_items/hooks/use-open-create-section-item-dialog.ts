import { create } from "zustand"

interface IOpenCreateSectionItemDialog {
  isOpen: boolean
  onOpen: VoidFunction
  onClose: VoidFunction
}

export const useOpenCreateSectionItemDialog = create<IOpenCreateSectionItemDialog>((set) => ({
  isOpen: false,
  onOpen: () => set(s => ({ ...s, isOpen: true })),
  onClose: () => set(s => ({ ...s, isOpen: false }))
}))
