
import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";

import { SectionItemsForm } from "./section_items_form";
import { Dialog } from "@/components/ui/dialog";

import { useOpenCreateSectionItemDialog } from "../hooks/use-open-create-section-item-dialog";

import { useCreateSectionItemMutation } from "../api/post";

export function CreateSectionItemDialog() {
  const queryClient = useQueryClient()
  const { isOpen, onClose } = useOpenCreateSectionItemDialog()

  const { mutate, isLoading, isError, isSuccess } = useCreateSectionItemMutation()

  useEffect(() => {
    if (!isLoading && !isError && isSuccess) {
      queryClient.invalidateQueries({ queryKey: ["bookmarks"] }).catch(e => console.error(e))
      onClose()
    }
  }, [isLoading, onClose, isSuccess])

  return (
    <Dialog isOpen={isOpen} onClose={onClose} className="bg-background w-full max-w-lg text-foreground p-4 rounded-md" title="Create new section">
      <SectionItemsForm onSubmit={(i) => {
        mutate({
          section_id: i.section_id,
          title: i.title,
          url: i.url
        })
      }}
        isLoading={isLoading}
        onCancel={onClose}
      />
      {isError && (
        <p className="mt-2 text-error text-sm">Something went wrong!</p>
      )}
    </Dialog>
  )
}
