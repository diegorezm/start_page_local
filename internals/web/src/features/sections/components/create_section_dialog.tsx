import { useEffect } from "react";

import { SectionForm } from "./sections_form";
import { Dialog } from "../../../components/ui/dialog";

import { useCreateSectionMutation } from "../api/post";
import { useOpenCreateSectionDialog } from "@/features/sections/hooks/use-open-create-section-dialog";

export function CreateSectionDialog() {
  const { isOpen, onClose } = useOpenCreateSectionDialog()

  const { mutate, isLoading, isError, isSuccess } = useCreateSectionMutation()

  useEffect(() => {
    if (!isLoading && !isError && isSuccess) {
      onClose()
    }
  }, [isLoading, onClose, isSuccess])

  return (
    <Dialog isOpen={isOpen} onClose={onClose} className="bg-background w-full max-w-lg text-foreground p-4 rounded-md" title="Create new section">
      <SectionForm
        isLoading={isLoading}
        onSubmit={(s) => {
          mutate({
            title: s.title,
            position: s.position
          })
        }} onCancel={onClose} />
      {isError && (
        <p className="mt-2 text-error text-sm">Something went wrong!</p>
      )}
    </Dialog>
  )
}
