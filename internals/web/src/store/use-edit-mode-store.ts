import { create } from "zustand"

interface IEditModeStore {
  isEditing: boolean
  onToggleEditMode: VoidFunction
}

export const useEditModeStore = create<IEditModeStore>((set, get) => ({
  isEditing: false,
  onToggleEditMode: () => set(s => ({ ...s, isEditing: !get().isEditing })),
}))
