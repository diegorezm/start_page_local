import { Select as SelectH } from "@headlessui/react"
import type { SelectHTMLAttributes } from "react"

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  size?: "sm" | "md" | "lg";
}

export function Select({ size, className, children, ...rest }: SelectProps) {
  return (
    <SelectH className={"border borer-foreground rounded-md px-3 py-1 data-focus:border-primary data-hover:shadow hover:cursor-pointer"} {...rest}>
      {children}
    </SelectH>
  )
}
