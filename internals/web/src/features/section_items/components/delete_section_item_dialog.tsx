import { useEffect } from "react"

import { Button } from "@/components/ui/button"
import { Dialog } from "@/components/ui/dialog"
import { useDeleteSectionItemMutation } from "../api/delete"
import { useOpenDeleteSectionItemDialog } from "../hooks/use-open-delete-section-item-dialog"

export function DeleteSectionItemDialog() {
  const { isOpen, item, onClose } = useOpenDeleteSectionItemDialog()

  const { mutate, isLoading, isSuccess, isError } = useDeleteSectionItemMutation()

  useEffect(() => {
    if (isSuccess) {
      onClose()
    }

  }, [isLoading, isSuccess])

  if (item === null) {
    return null
  }

  return (
    <Dialog isOpen={isOpen} onClose={onClose} className="bg-background w-full max-w-lg text-foreground p-4 rounded-md" title="Are you sure you want to delete this bookmark?">
      <div className="flex gap-2 mt-4">
        <div>
          <Button
            type="button"
            onClick={() => {
              mutate(item.id)
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
        {isError && (
          <p className="text-sm text-error text-medium">Something went wrong!</p>
        )}
      </div>
    </Dialog>
  )
}
