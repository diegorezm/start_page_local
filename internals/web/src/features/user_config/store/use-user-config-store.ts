import { create } from "zustand";
import { persist, createJSONStorage } from 'zustand/middleware'

interface IUserConfigStore {
  theme: string | null;
  wallpaper: string | null;

  setTheme(theme: string | null): void;
  setWallpaper(theme: string | null): void;
}


export const useUserConfigStore = create<IUserConfigStore>()(
  persist(
    (set, _get) => ({
      theme: null,
      wallpaper: null,
      setTheme: (theme) => set(s => ({ ...s, theme })),
      setWallpaper: (wallpaper) => set(s => ({ ...s, wallpaper }))
    }),
    {
      name: 'user_config_store',
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
)
