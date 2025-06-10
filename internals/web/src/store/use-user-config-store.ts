import { defineStore } from "pinia";

interface IUserConfigStoreState {
  theme: string | undefined;
  wallpaper: string | undefined;
}

const STORAGE_NAME = "user_config_store"

const defaultUserConfigStoreState: IUserConfigStoreState = {
  theme: undefined,
  wallpaper: undefined,
};

export const useUserConfigStore = defineStore(STORAGE_NAME, {
  state: (): IUserConfigStoreState => ({
    ...defaultUserConfigStoreState,
  }),

  actions: {
    setTheme(theme: string) {
      this.theme = theme;
    },
    setWallpaper(wallpaper: string) {
      this.wallpaper = wallpaper;
    },
    resetTheme() {
      this.theme = undefined;
    },
    resetWallpaper() {
      this.wallpaper = undefined;
    },
  },
  persist: true
});
