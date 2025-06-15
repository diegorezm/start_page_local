import { Navbar } from "./components/navbar";

import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";

import { cn } from "./lib/cn"; import { useUserConfigStore } from "./features/user_config/store/use-user-config-store";
import { useEffect } from "react";

import { BookmarksContainer } from "./features/sections/components/bookmarks_container";

import { Bell, BookMarked } from "lucide-react";
import RemindersContainer from "./features/reminders/components/reminders_container";

export function App() {
  const { theme, wallpaper } = useUserConfigStore()

  useEffect(() => {
    if (theme) {
      document.documentElement.setAttribute("data-theme", theme)
    }
  }, [theme])

  useEffect(() => {
    const wallpaperContainer = document.getElementById("wallpaper_container")
    if (wallpaperContainer && wallpaper) {
      wallpaperContainer.style.backgroundImage = `url(${wallpaper})`
    }

  }, [wallpaper])

  return (
    <>
      <div id="wallpaper_container" className="fixed inset-0 z-0 bg-cover bg-center blur-sm transition-all duration-500"
        style={{
          backgroundImage: "none"
        }}></div>
      <main className="p-4 min-h-screen z-20 relative">
        <Navbar />
        <section className="mt-8 max-w-5xl mx-auto">
          <TabGroup>
            <TabList className="flex space-x-1 rounded-xl bg-surface p-1 shadow-sm max-w-2xl m-auto">
              <Tab
                className={({ selected }) =>
                  cn(
                    "w-full rounded-lg py-2.5 text-sm font-medium leading-5 hover:cursor-pointer",
                    "ring-primary/60 ring-offset-2 focus:outline-none focus:ring-2",
                    selected
                      ? "bg-primary text-on-primary shadow"
                      : "text-foreground hover:bg-primary/10 hover:text-primary",
                  )
                }
              >
                <p className="flex items-center justify-center gap-2">
                  <BookMarked size="20" />
                  <span>
                    Bookmarks
                  </span>
                </p>
              </Tab>
              <Tab
                className={({ selected }) =>
                  cn(
                    "w-full rounded-lg py-2.5 text-sm font-medium leading-5 hover:cursor-pointer",
                    "ring-primary/60 ring-offset-2 focus:outline-none focus:ring-2",
                    selected
                      ? "bg-primary text-on-primary shadow"
                      : "text-foreground hover:bg-primary/10 hover:text-primary",
                  )
                }
              >
                <p className="flex items-center justify-center gap-2">
                  <Bell size={20} />
                  <span>
                    Reminders
                  </span>
                </p>
              </Tab>
            </TabList>

            <TabPanels className="mt-2">
              <TabPanel
                className={cn(
                  "rounded-xl p-3 shadow overflow-x-hidden overflow-y-auto",
                  "ring-primary/60 ring-offset-2 focus:outline-none focus:ring-2",
                  wallpaper !== null && "bg-surface text-on-surface"
                )}
              >
                <BookmarksContainer />
              </TabPanel>
              <TabPanel
                className={cn(
                  "rounded-xl p-3 shadow",
                  "ring-primary/60 ring-offset-2 focus:outline-none focus:ring-2",
                  wallpaper !== null && "bg-surface text-on-surface"
                )}
              >
                <RemindersContainer />
              </TabPanel>
            </TabPanels>
          </TabGroup>
        </section>
      </main>
    </>
  );
}
