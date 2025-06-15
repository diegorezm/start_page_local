import type { SectionItem } from "@/types"
import { create } from "zustand"

interface IDeleteSectionItemDialog {
  isOpen: boolean
  onOpen: (s: SectionItem) => void
  onClose: VoidFunction
  item: SectionItem | null
}

export const useOpenDeleteSectionItemDialog = create<IDeleteSectionItemDialog>((set) => ({
  isOpen: false,
  item: null,
  onOpen: (item) => set(s => ({ ...s, isOpen: true, item })),
  onClose: () => set(s => ({ ...s, isOpen: false, item: null }))
}))
