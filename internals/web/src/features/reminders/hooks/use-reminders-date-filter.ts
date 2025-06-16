import { create } from "zustand"

interface IRemindersDateFilter {
  date: Date
  setDate: (d: Date) => void
}

export const useReminderDateFilter = create<IRemindersDateFilter>((set) => ({
  date: new Date(),
  setDate: (date) => set({ date })
}))
