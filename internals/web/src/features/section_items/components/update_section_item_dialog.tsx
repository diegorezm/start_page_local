import { useEffect } from "react";

import { Dialog } from "@/components/ui/dialog";
import { SectionItemsForm } from "./section_items_form";

import { useOpenUpdateSectionItemDialog } from "../hooks/use-open-update-section-item-dialog";
import { useUpdateSectionItemMutation } from "../api/put";

export function UpdateSectionItemDialog() {
  const { isOpen, onClose, item } = useOpenUpdateSectionItemDialog()

  const { mutate, isLoading, isError, isSuccess } = useUpdateSectionItemMutation()

  useEffect(() => {
    if (isSuccess) {
      onClose()
    }
  }, [isLoading, onClose, isSuccess])

  if (item === null) {
    return null
  }

  return (
    <Dialog isOpen={isOpen} onClose={onClose} className="bg-background w-full max-w-lg text-foreground p-4 rounded-md" title="Update section">
      <SectionItemsForm onSubmit={(i) => {
        mutate({
          id: i.id,
          payload: i
        })
      }}
        onCancel={onClose}
        initialValues={item}
        isLoading={isLoading}
      />
      {isError && (
        <p className="mt-2 text-error text-sm">Something went wrong!</p>
      )}
    </Dialog>
  )
}
