import { useQueryClient } from "@tanstack/react-query"
import { useEffect } from "react"

import { Button } from "@/components/ui/button"
import { Dialog } from "@/components/ui/dialog"
import { useDeleteSectionItemMutation } from "../api/delete"
import { useOpenDeleteSectionItemDialog } from "../hooks/use-open-delete-section-item-dialog"

export function DeleteSectionItemDialog() {
  const { isOpen, item, onClose } = useOpenDeleteSectionItemDialog()

  const { mutate, isLoading, isSuccess, error, isError } = useDeleteSectionItemMutation()

  const queryClient = useQueryClient()

  useEffect(() => {
    if (isError) {
      console.error(error)
    } else if (!isLoading && isSuccess) {
      queryClient.invalidateQueries({ queryKey: ['bookmarks'] }).catch(e => console.error(e))
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
      </div>
    </Dialog>
  )
}
