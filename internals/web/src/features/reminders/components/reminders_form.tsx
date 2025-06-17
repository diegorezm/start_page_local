
import { getRelativeDate } from "@/lib/get-relative-date"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

import { useState, type FormEvent } from "react"

import { useCreateRemindersMutation } from "../api/post"
import { useReminderDateFilter } from "../hooks/use-reminders-date-filter"

// TODO: I could add an edit button at some point, so its good to make this more 
// reusable
export function RemindersForm() {
  const { date } = useReminderDateFilter()
  const { mutateAsync, isPending, isError } = useCreateRemindersMutation()
  const [text, setText] = useState("")

  const handleSubmit = async (e: FormEvent) => {
    const form = e.target as HTMLFormElement
    e.preventDefault()

    await mutateAsync({
      due_date: date,
      text: text
    })

    setText("")
  }

  return (
    <form className="flex flex-col sm:flex-row gap-2 w-2/3 justify-center items-center" onSubmit={handleSubmit}>
      <div className="flex-grow">
        <Input placeholder={`Add a reminder on ${getRelativeDate(date)}`} minLength={2} maxLength={255} value={text} onChange={e => setText(e.target.value)} required />
        {isError && (
          <p className="mt-2 text-sm text-error">Something went wrong!</p>
        )}
      </div>
      <div className="h-full">
        <Button type="submit" disabled={isPending}>
          Add Reminder
        </Button>
      </div>
    </form>
  )
}
