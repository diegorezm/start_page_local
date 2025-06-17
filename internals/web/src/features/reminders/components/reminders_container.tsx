import { DatePickerPopover } from "@/components/date_picker_popover";
import { useReminderDateFilter } from "../hooks/use-reminders-date-filter";
import { getRelativeDate } from "@/lib/get-relative-date";
import { RemindersForm } from "./reminders_form";
import { useGetReminders } from "../api/get";
import { cn } from "@/lib/cn";
import { ReminderContainer } from "./reminder_container";

export default function RemindersContainer() {
  const { date, setDate } = useReminderDateFilter()
  const { data, isLoading, isError, isSuccess } = useGetReminders(date)

  return (
    <div className="flex flex-col gap-6">
      <nav className="flex justify-between px-4 py-2">
        <RemindersForm />

        <div >
          <DatePickerPopover
            id="reminder_due_date_filter"
            className="w-full"
            selectedDate={date}
            onDateChange={(d) => {
              setDate(d ?? new Date())
            }}
            placeholder="Select filter date"
            showFooterButtons={true}
          />
        </div>

      </nav>

      <div className="max-h-[580px] overflow-y-auto overflow-x-hidden px-4">
        <h2 className="text-xl font-semibold text-foreground mb-4">
          Reminders {date ? `for ${getRelativeDate(date)}` : "All Dates"}
        </h2>
        {isLoading && (
          <p>Loading reminders...</p>
        )}

        {isError && (
          <p>Error loading reminders.</p>
        )}

        {isSuccess && (
          <>
            {data?.length === 0 || data === null && (
              <p>No reminders for this date!</p>
            )}
            <ul className="space-y-4">
              {data?.map((reminder) => (
                <ReminderContainer reminder={reminder} key={reminder.id} />
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
}
