import type { SectionItem } from "src/types"
import { create } from "zustand"

interface IOpenCreateSectionItemDialog {
  isOpen: boolean
  onOpen: (section: SectionItem) => void
  onClose: VoidFunction
  item: SectionItem | null
}

export const useOpenUpdateSectionItemDialog = create<IOpenCreateSectionItemDialog>((set) => ({
  isOpen: false,
  item: null,
  onOpen: (item) => set(s => ({ ...s, isOpen: true, item })),
  onClose: () => set(s => ({ ...s, isOpen: false, item: null }))
}))
