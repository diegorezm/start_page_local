import { create } from "zustand"

interface IEditModeStore {
  isEditing: boolean
  onEditing: VoidFunction
  onStopEditing: VoidFunction
}

export const useEditModeStore = create<IEditModeStore>((set) => ({
  isEditing: false,
  onEditing: () => set(s => ({ ...s, isEditing: true })),
  onStopEditing: () => set(s => ({ ...s, isEditing: false }))
}))
