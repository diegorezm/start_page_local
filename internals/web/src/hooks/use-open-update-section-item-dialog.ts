import type { SectionItem } from "src/types"
import { create } from "zustand"

interface IOpenCreateSectionDialog {
  isOpen: boolean
  onOpen: (section: SectionItem) => void
  onClose: VoidFunction
  item: SectionItem | null
}

export const useOpenEditSectionItemDialog = create<IOpenCreateSectionDialog>((set) => ({
  isOpen: false,
  item: null,
  onOpen: (section) => set(s => ({ ...s, isOpen: true, item: section })),
  onClose: () => set(s => ({ ...s, isOpen: false, item: null }))
}))
