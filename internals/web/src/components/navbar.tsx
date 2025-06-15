import { MenuButton, MenuItem, MenuItems, Menu } from "@headlessui/react";
import { Bolt, Clock, Plus } from "lucide-react";
import { Button } from "./ui/button";

import { useEffect, useState } from "react";
import { useOpenConfigSidebar } from "@/features/user_config/hooks/use-open-config-sidebar";
import { useOpenCreateSectionDialog } from "@/features/sections/hooks/use-open-create-section-dialog";

export function Navbar() {
  const { onOpen: onOpenConfigSidebar } = useOpenConfigSidebar()
  const { onOpen: onOpenCreateSectionDialog } = useOpenCreateSectionDialog()

  const [clock, setClock] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setClock(new Date());
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <nav className="flex items-center justify-between">
      <div></div>
      <div className="flex gap-2 items-center justify-center">
        <Clock color="var(--primary)" />
        <span className="text-lg text-primary">
          {clock.toLocaleString("en-US", {
            hour: "numeric",
            minute: "numeric",
            hour12: false,
          })}
        </span>
      </div>
      <div className="flex items-center gap-8">
        <Menu>
          <MenuButton className="hover:cursor-pointer focus:not-data-focus:outline-none">
            <Plus color="var(--primary)" />
          </MenuButton>
          <MenuItems
            transition
            anchor="bottom end"
            className="rounded-md shadow-md p-2 flex flex-col gap-2 bg-surface text-on-surface focus:not-data-focus:outline-none origin-top-right transition duration-100 ease-out data-closed:scale-95 data-closed:opacity-0 z-40"
          >
            <MenuItem>
              <Button variant="ghost" onClick={onOpenCreateSectionDialog}>
                New bookmark section
              </Button>
            </MenuItem>

            <MenuItem>
              <Button variant="ghost" >
                New bookmark
              </Button>
            </MenuItem>
          </MenuItems>
        </Menu>

        <button className="hover:cursor-pointer" onClick={onOpenConfigSidebar}>
          <Bolt color="var(--primary)" />
        </button>
      </div>
    </nav >
  );
}
