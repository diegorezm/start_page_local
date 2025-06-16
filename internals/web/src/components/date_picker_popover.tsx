import { Fragment } from 'react';
import { format, isToday, isPast, addDays } from "date-fns";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { Popover, Transition, PopoverButton, PopoverPanel } from "@headlessui/react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn";
import { CalendarIcon } from 'lucide-react';

interface DatePickerInputProps {
  selectedDate: Date | undefined;
  onDateChange: (date: Date | undefined) => void;
  label?: string;
  id?: string;
  className?: string;
  buttonClassName?: string;
  placeholder?: string;
  showFooterButtons?: boolean;
}

export function DatePickerPopover({
  selectedDate,
  onDateChange,
  label,
  id,
  className,
  buttonClassName,
  placeholder = "Pick a date",
  showFooterButtons = true,
}: DatePickerInputProps) {

  const getRelativeDate = (date: Date): string => {
    const today = new Date();
    const tomorrow = addDays(today, 1);

    if (isPast(date) && !isToday(date)) return format(date, 'MMM do, yyyy') + " (Past)";
    if (date.getTime() > tomorrow.getTime()) return format(date, 'MMM do, yyyy');

    return format(date, 'MMM do, yyyy');
  };

  return (
    <div className={cn("relative flex flex-col gap-1", className)}>
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-foreground">
          {label}
        </label>
      )}
      <Popover className="relative">
        {({ close }) => (
          <>
            <PopoverButton
              id={id}
              className={cn(
                "flex items-center justify-between gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200",
                "bg-surface text-foreground border border-foreground/20 hover:bg-surface-on/10 focus:outline-none focus:ring-2 focus:ring-primary",
                buttonClassName
              )}
              type="button"
            >
              <span>{selectedDate ? getRelativeDate(selectedDate) : placeholder}</span>
              <CalendarIcon className="h-5 w-5" />
            </PopoverButton>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <PopoverPanel className="absolute z-10 mt-2 transform -translate-x-1/2 left-1/2 px-4 sm:px-0">
                <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black/5 bg-surface p-4">
                  <DayPicker
                    mode="single"
                    navLayout='around'
                    selected={selectedDate}
                    onSelect={(date) => {
                      onDateChange(date);
                      close();
                    }}
                    footer={
                      showFooterButtons && (
                        <div className="flex gap-2 justify-center mt-2 text-sm">
                          <Button type="button" variant="outline" size="sm"
                            onClick={() => {
                              onDateChange(new Date());
                              close();
                            }}>
                            Today
                          </Button>
                          <Button type="button" variant="outline" size="sm"
                            onClick={() => {
                              onDateChange(addDays(new Date(), 1)); // Tomorrow
                              close();
                            }}>
                            Tomorrow
                          </Button>
                          <Button type="button" variant="outline" size="sm"
                            onClick={() => {
                              onDateChange(undefined); // Clear selection
                              close();
                            }}>
                            Clear
                          </Button>
                        </div>
                      )
                    }
                    className={cn(
                      "[&_td]:p-0.5 [&_th]:p-0.5 [&_th]:font-normal",
                      "rdp-day_selected:!bg-primary rdp-day_selected:!text-primary-on",
                      "rdp-day_today:!font-bold rdp-day_today:!border rdp-day_today:!border-primary rdp-day_today:!text-primary",
                      "rdp-day_disabled:text-foreground/50",
                    )}
                    styles={{
                      caption: { color: 'var(--foreground)' },
                      button_next: { color: 'var(--primary)' },
                      button_previous: { color: 'var(--primary)' },
                      chevron: { color: "var(--primary)" },
                      day: { color: 'var(--foreground)' },
                    }}
                  />
                </div>
              </PopoverPanel>
            </Transition>
          </>
        )}
      </Popover>
    </div>
  );
}
