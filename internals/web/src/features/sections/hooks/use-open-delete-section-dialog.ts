import type { Section } from "@/types"
import { create } from "zustand"

interface IDeleteSectionDialog {
  isOpen: boolean
  onOpen: (s: Section) => void
  onClose: VoidFunction
  section: Section | null
}

export const useOpenDeleteSectionDialog = create<IDeleteSectionDialog>((set) => ({
  isOpen: false,
  section: null,
  onOpen: (section) => set(s => ({ ...s, isOpen: true, section })),
  onClose: () => set(s => ({ ...s, isOpen: false }))
}))
