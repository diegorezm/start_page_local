import { format } from "date-fns";

export const getRelativeDate = (date: Date) => {
  return format(date, 'MMM do, yyyy');
};
