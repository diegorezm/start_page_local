import { useRef, type ChangeEvent, type FormEvent, type ReactNode } from "react";

import { useOpenConfigSidebar } from "@/features/user_config/hooks/use-open-config-sidebar";
import { File } from "lucide-react";

import { Sheet } from "@/components/ui/sheet";

import { Field, Fieldset, Switch } from "@headlessui/react";

import { useUserConfigStore } from "@/features/user_config/store/use-user-config-store";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import { useEditModeStore } from "@/store/use-edit-mode-store";

export function UserConfigSidebar() {
  const { isOpen, onClose } = useOpenConfigSidebar()
  return (
    <Sheet isOpen={isOpen} onClose={onClose} side="right" title="Config">
      <ChangeWallpaperSection />
      <ChangeThemeSection />
      <EditModeSwitchSection />
    </Sheet >
  )
}

function ChangeWallpaperSection() {
  const { setWallpaper } = useUserConfigStore()
  const inputFileRef = useRef<HTMLInputElement>(null)

  const onWallpaperSubmit = (e: FormEvent) => {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)
    const path = formData.get("path")?.toString()
    if (path && typeof path === "string") {
      setWallpaper(path)
    }
  }

  const handleInputFileChange = () => {
    if (inputFileRef.current?.files) {
      const file = inputFileRef.current?.files?.[0]
      if (file !== undefined) {
        const reader = new FileReader()
        reader.onload = (e) => {
          const path = e.target?.result as string
          setWallpaper(path)
        }
        reader.readAsDataURL(file)
      }
    }
  }

  const handleDeleteWallpaper = () => {
    const wallpaperContainer = document.getElementById("wallpaper_container") as HTMLDivElement
    if (wallpaperContainer) {
      wallpaperContainer.style.backgroundImage = `none`
      setWallpaper(null)
    }
  }

  return (
    <ConfigSidebarSection title="Wallpapers">
      <Fieldset className="space-y-2" onSubmit={onWallpaperSubmit}>
        <Field className="relative">
          <Input type="text" placeholder="Wallpaper" name="path" minLength={1} maxLength={2024} required />
          <button className="absolute left-80 top-1/2 -translate-y-1/2 hover:cursor-pointer" onClick={() => {
            if (inputFileRef !== null) {
              inputFileRef.current?.click()
            }
          }}>
            <File />
          </button>
          <input type="file" ref={inputFileRef} onChange={handleInputFileChange} accept="image/*" hidden />
        </Field>

        <Field className="flex flex-row gap-4 w-full md:w-1/2">
          <Button type="submit">
            Save
          </Button>

          <Button variant="outline" type="button" onClick={handleDeleteWallpaper}>
            Delete
          </Button>
        </Field>

      </Fieldset>
    </ConfigSidebarSection>
  )
}

function ChangeThemeSection() {
  const { setTheme, theme } = useUserConfigStore()
  const handleThemeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault()
    const newTheme = e.target.value
    if (newTheme && newTheme !== "") {
      setTheme(newTheme)
    }
  }

  return (
    <ConfigSidebarSection title="Theme">
      <Select name="status" aria-label="Project status" onChange={handleThemeChange} defaultValue={theme ?? ""}>
        <option value="solarized-light">Solarized Light</option>
        <option value="moonfly">Moonfly</option>
        <option value="ember-dark">Embder Dark</option>
      </Select>
    </ConfigSidebarSection>
  )
}


function EditModeSwitchSection() {
  const { isEditing, onToggleEditMode } = useEditModeStore()
  return (
    <ConfigSidebarSection title="Edit Mode">
      <Switch
        checked={isEditing}
        onChange={onToggleEditMode}
        className="group inline-flex h-6 w-11 items-center rounded-full bg-transparent border-2 border-primary transition data-checked:bg-primary"
      >
        <span className="size-4 translate-x-1 rounded-full bg-primary transition group-data-checked:translate-x-6 group-data-checked:bg-on-primary" />
      </Switch>
    </ConfigSidebarSection>
  )
}

function ConfigSidebarSection({ title, children }: { title: string, children: ReactNode }) {
  return (
    <>
      <div className="flex flex-col gap-4">
        <h1 className="text-md font-semibold">{title}</h1>
        {children}
      </div>
      <hr className="mb-4 mt-4" />
    </>
  )
}
