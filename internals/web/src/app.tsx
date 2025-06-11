import { Navbar } from "./components/navbar";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import { cn } from "./lib/cn";
import { useOpenConfigSidebar } from "./store/use-open-config-sidebar";
import { Sidebar } from "./components/ui/sidebar";

export function App() {
  const { isOpen, onClose } = useOpenConfigSidebar()
  return (
    <main className="p-4 bg-background min-h-screen text-foreground">
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
              Bookmarks
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
              Reminders
            </Tab>
          </TabList>

          <TabPanels className="mt-2">
            <TabPanel
              className={cn(
                "rounded-xl bg-surface p-3 shadow",
                "ring-primary/60 ring-offset-2 focus:outline-none focus:ring-2",
              )}
            >
              <h3 className="text-md font-semibold text-on-surface">Bookmarks Content</h3>
              <p className="text-on-surface/[0.8]">
                This is the content for your Bookmarks. You can add your list of saved items here.
              </p>
            </TabPanel>
            <TabPanel
              className={cn(
                "rounded-xl bg-surface p-3 shadow",
                "ring-primary/60 ring-offset-2 focus:outline-none focus:ring-2",
              )}
            >
              <h3 className="text-lg font-semibold text-surface-on">Reminders Content</h3>
              <p className="mt-2 text-surface-on/[0.8]">
                This is where your Reminders will appear. Keep track of your tasks and important dates.
              </p>
            </TabPanel>
          </TabPanels>
        </TabGroup>
      </section>
      <Sidebar isOpen={isOpen} onClose={onClose} side="right">
        <div className="p-4">
          a
        </div>
      </Sidebar>
    </main>
  );
}
