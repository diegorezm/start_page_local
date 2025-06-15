import { useMutation, useQueryClient } from "@tanstack/react-query"
import { sectionService } from "../api/section_service"
import { useOpenDeleteSectionDialog } from "../hooks/use-open-delete-section-dialog"
import { useEffect } from "react"

import { Button } from "@/components/ui/button"
import { Dialog } from "@/components/ui/dialog"

export function DeleteSectionDialog() {
  const { isOpen, section, onClose } = useOpenDeleteSectionDialog()

  const { mutate, isLoading, isSuccess, error, isError } = useMutation({
    mutationFn: sectionService.deleteSection
  })

  const queryClient = useQueryClient()

  useEffect(() => {
    if (isError) {
      console.error(error)
    } else if (!isLoading && isSuccess) {
      queryClient.invalidateQueries({ queryKey: ['bookmarks'] })
    }

  }, [isLoading, isSuccess])

  if (section === null) {
    return null
  }

  return (
    <Dialog isOpen={isOpen} onClose={onClose} className="bg-background w-full max-w-lg text-foreground p-4 rounded-md" title="Are you sure you want to delete this section?">
      <div className="flex gap-2 mt-4">
        <div>
          <Button
            type="button"
            onClick={() => {
              mutate(section.id)
            }}
            disabled={isLoading}
          >
            {isLoading ? "Deleting..." : "Delete"}
          </Button>
        </div>

        <div>
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              onClose()
            }}
            disabled={isLoading}
          >
            Cancel
          </Button>
        </div>
      </div>
    </Dialog>
  )
}
