import { useQueryClient } from "@tanstack/react-query";
import { Dialog } from "../../../components/ui/dialog";

import { useOpenUpdateSectionDialog } from "@/features/sections/hooks/use-open-update-section-dialog";

import { useEffect } from "react";

import { SectionForm } from "./sections_form";
import { useUpdateSectionMutation } from "../api/put";

export function UpdateSectionDialog() {
  const queryClient = useQueryClient()

  const { isOpen, section, onClose } = useOpenUpdateSectionDialog()

  const { mutate, isSuccess, isLoading, isError } = useUpdateSectionMutation()

  useEffect(() => {
    if (!isLoading && !isError && isSuccess) {
      queryClient.invalidateQueries({ queryKey: ["bookmarks"] }).catch(e => console.error(e))
      onClose()
    }
  }, [isLoading, onClose, isSuccess])

  if (section === null) {
    return null
  }

  return (
    <Dialog isOpen={isOpen} onClose={onClose} className="bg-background w-full max-w-lg text-foreground p-4 rounded-md" title="Create new section">
      <SectionForm onSubmit={(s) => {
        mutate({
          id: section.id,
          payload: s
        })
      }} initialValues={section} onCancel={onClose} isLoading={isLoading} />

      {isError && (
        <p className="mt-2 text-error text-sm">Something went wrong!</p>
      )}
    </Dialog>
  )
}
