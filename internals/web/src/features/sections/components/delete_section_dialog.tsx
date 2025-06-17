import { useOpenDeleteSectionDialog } from "../hooks/use-open-delete-section-dialog"
import { useEffect } from "react"

import { Button } from "@/components/ui/button"
import { Dialog } from "@/components/ui/dialog"
import { useDeleteSectionMutation } from "../api/delete"

export function DeleteSectionDialog() {
  const { isOpen, section, onClose } = useOpenDeleteSectionDialog()

  const { mutate, isLoading, isSuccess, isError } = useDeleteSectionMutation()

  useEffect(() => {
    if (!isLoading && isSuccess) {
      onClose()
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
      {isError && (
        <p className="mt-2 text-error text-sm">Something went wrong!</p>
      )}
    </Dialog>
  )
}
