import { cn } from "@/lib/cn"

import { Dialog as DialogH, DialogPanel, DialogTitle } from "@headlessui/react"
import React from "react"

interface Props extends React.HtmlHTMLAttributes<HTMLDivElement> {
  isOpen: boolean
  onClose: VoidFunction
  title?: string
}

export function Dialog({ isOpen, onClose, title, className, children, ...rest }: Props) {
  return (
    <DialogH open={isOpen} onClose={onClose} as="div" className="relative z-50 focus:outline-none">
      <div className="fixed inset-0 z-60 w-screen overflow-y-auto bg-black/30">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel
            transition
            className={cn("duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0", className)}
            {...rest}
          >
            {title && (
              <DialogTitle as="h3" className="text-md font-bold">
                {title}
              </DialogTitle>
            )}

            <div className="mt-2">
              {children}
            </div>
          </DialogPanel>
        </div>
      </div>

    </DialogH>
  )
}
