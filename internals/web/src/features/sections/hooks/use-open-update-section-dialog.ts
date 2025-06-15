import type { Section } from "src/types"
import { create } from "zustand"

interface IOpenCreateSectionDialog {
  isOpen: boolean
  onOpen: (section: Section) => void
  onClose: VoidFunction
  section: Section | null
}

export const useOpenUpdateSectionDialog = create<IOpenCreateSectionDialog>((set) => ({
  isOpen: false,
  section: null,
  onOpen: (section) => set(s => ({ ...s, isOpen: true, section })),
  onClose: () => set(s => ({ ...s, isOpen: false, section: null }))
}))
