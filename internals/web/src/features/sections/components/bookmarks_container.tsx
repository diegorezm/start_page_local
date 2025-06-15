import { useQuery } from "@tanstack/react-query"

import type { SectionItem, SectionWithItems } from "@/types"

import { Pencil, Trash } from "lucide-react"

import { cn } from "@/lib/cn"

import { sectionService } from "../api/section_service"

import { useEditModeStore } from "@/store/use-edit-mode-store"
import { useOpenUpdateSectionDialog } from "../hooks/use-open-update-section-dialog"
import { useOpenDeleteSectionDialog } from "../hooks/use-open-delete-section-dialog"

export function BookmarksContainer() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['bookmarks'],
    queryFn: sectionService.getAllSectionsWithItems,
    cacheTime: 0
  })


  if (isLoading) {
    return <p className="text-center text-foreground">Loading bookmarks...</p>
  }
  if (isError) {
    return <p className="text-center text-error">Error loading bookmarks. Please try again!</p>
  }

  return (
    <>
      {data.length === 0 && (
        <h1 className="text-center text-lg font-bold">No bookmarks!</h1>
      )}
      <SectionsContainer bookmarks={data} />
    </>
  )
}

function SectionsContainer({ bookmarks }: { bookmarks: SectionWithItems[] }) {
  const { isEditing } = useEditModeStore()
  const { onOpen: onOpenUpdateSectionDialog } = useOpenUpdateSectionDialog()
  const { onOpen: onOpenDeleteSectionDialog } = useOpenDeleteSectionDialog()

  return (
    <ul className="flex gap-8 flex-wrap w-full justify-center">
      {bookmarks.map((e) => (
        <li key={e.section.id}>
          <div className="flex  items-center  gap-2">
            <h1 className="text-2xl font-bold text-center">{e.section.title}</h1>
            {isEditing && (
              <div >
                <button className="hover:bg-error/20 rounded-md p-1" onClick={() => {
                  onOpenDeleteSectionDialog(e.section)
                }}>
                  <Trash size={18} />
                </button>
                <button className="hover:bg-primary/20 rounded-md p-1" onClick={() => {
                  onOpenUpdateSectionDialog(e.section)
                }}>
                  <Pencil size={18} />
                </button>
              </div>
            )}
          </div>
          <SectionItemsContainer items={e.items} isEditing={isEditing} />
        </li>
      ))}
    </ul>
  )
}

function SectionItemsContainer({ items, isEditing }: { items: SectionItem[], isEditing: boolean }) {
  return (
    <ul className={cn("flex flex-col items-center justify-center", isEditing && "mt-2")}>
      {items.map((e) => (
        <li key={e.id} className="flex items-center text-center gap-2">
          <a href={e.url} className="text-lg text-center hover:underline hover:underline-primary hover:text-primary" target="_blank">{e.title}</a>
          {isEditing && (
            <div>
              <button className="hover:bg-error/20 rounded-md p-1">
                <Trash size={16} />
              </button>
              <button className="hover:bg-primary/20 rounded-md p-1" onClick={() => {
              }}>
                <Pencil size={16} />
              </button>
            </div>
          )}
        </li>
      ))}
    </ul>
  )
}
