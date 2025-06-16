import { format, isToday } from "date-fns";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DatePickerPopover } from "@/components/date_picker_popover";
import { useReminderDateFilter } from "../hooks/use-reminders-date-filter";

export default function RemindersContainer() {
  const { date, setDate } = useReminderDateFilter()

  const getRelativeDate = (date: Date) => {
    return format(date, 'MMM do, yyyy');
  };

  return (
    <div className="flex flex-col gap-6 px-4 py-2">
      <nav className="flex justify-between">
        <form className="flex flex-col sm:flex-row gap-2 w-2/3 items-end justify-center">
          <div className="flex-grow">
            <Input placeholder={`Add a reminder on ${getRelativeDate(date)}`} />
          </div>
          <div>
            <Button type="submit">
              Add Reminder
            </Button>
          </div>
        </form>


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

      {/* Reminder List Display */}
      <div >
        <h2 className="text-xl font-semibold text-foreground mb-4">
          Reminders {date ? `for ${getRelativeDate(date)}` : "All Dates"}
        </h2>
        <p className="text-foreground/70 italic">Reminder list will appear here once logic is re-added.</p>
      </div>
    </div>
  );
}
