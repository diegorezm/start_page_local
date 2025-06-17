import { Button } from "@/components/ui/button"
import { cn } from "@/lib/cn"
import { getRelativeDate } from "@/lib/get-relative-date"
import type { Reminder } from "@/types"
import { Circle, CircleCheck, Trash } from "lucide-react"
import { useDeleteReminderMutation } from "../api/delete"
import { useUpdateRemindersMutation } from "../api/put"

type Props = {
  reminder: Reminder
}

export function ReminderContainer({ reminder }: Props) {
  const { mutate: deleteReminder, isPending: isDeletionPending } = useDeleteReminderMutation()
  const { mutate: updateReminder, isPending: isUpdatePending } = useUpdateRemindersMutation(reminder.id)

  const iconsParams = {
    size: 18
  }

  return (
    <li className={cn("flex justify-between bg-surface border rounded-md p-4", reminder.completed && "opacity-50")}>
      <div>
        <p className={cn("font-semibold", reminder.completed && "line-through")}>{reminder.text}</p>
        <p className="text-sm text-on-surface">
          Due: {getRelativeDate(new Date(reminder.due_date))}
        </p>
      </div>
      <div className="flex gap-2 items-center">
        <div>
          <Button variant="ghost" size="sm" disabled={isDeletionPending} onClick={() => {
            deleteReminder(reminder.id)
          }}>
            <Trash {...iconsParams} />
          </Button>
        </div>

        <div>
          <Button variant="ghost" size="sm" disabled={isUpdatePending} onClick={() => {
            updateReminder({
              id: reminder.id,
              text: reminder.text,
              completed: !reminder.completed
            })
          }}>
            {reminder.completed ? <CircleCheck {...iconsParams} /> : <Circle {...iconsParams} />}
          </Button>
        </div>

      </div>
    </li>
  )
}
