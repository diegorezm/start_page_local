import { useOpenCreateSectionDialog } from "@/hooks/use-open-create-section-dialog";
import { Dialog } from "../ui/dialog";
import { SectionForm } from "./sections_form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { sectionService } from "@/services/section_service";
import { useEffect } from "react";

export function CreateSectionDialog() {
  const queryClient = useQueryClient()
  const { isOpen, onClose } = useOpenCreateSectionDialog()

  const { mutate, isLoading, isError, isSuccess } = useMutation({
    mutationFn: sectionService.createSection
  })

  useEffect(() => {
    if (!isLoading && !isError && isSuccess) {
      queryClient.invalidateQueries({ queryKey: ["bookmarks"] }).catch(e => console.error(e))
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
