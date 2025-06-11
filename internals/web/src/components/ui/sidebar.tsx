import { Dialog, DialogPanel, Transition, TransitionChild } from '@headlessui/react';
import { Fragment, type ReactNode } from 'react';
import { cn } from 'src/lib/cn';

type Side = 'top' | 'bottom' | 'left' | 'right';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  side?: Side;
  children: ReactNode;
}

const getTransitionClasses = (side: Side) => {
  const base = {
    enter: 'transition ease-in-out duration-300',
    leave: 'transition ease-in-out duration-300',
  };

  switch (side) {
    case 'left':
      return {
        ...base,
        enterFrom: '-translate-x-full',
        enterTo: 'translate-x-0',
        leaveFrom: 'translate-x-0',
        leaveTo: '-translate-x-full',
      };
    case 'right':
      return {
        ...base,
        enterFrom: 'translate-x-full',
        enterTo: 'translate-x-0',
        leaveFrom: 'translate-x-0',
        leaveTo: 'translate-x-full',
      };
    case 'top':
      return {
        ...base,
        enterFrom: '-translate-y-full',
        enterTo: 'translate-y-0',
        leaveFrom: 'translate-y-0',
        leaveTo: '-translate-y-full',
      };
    case 'bottom':
      return {
        ...base,
        enterFrom: 'translate-y-full',
        enterTo: 'translate-y-0',
        leaveFrom: 'translate-y-0',
        leaveTo: 'translate-y-full',
      };
  }
};

const getPositionClasses = (side: Side) => {
  switch (side) {
    case 'left':
      return 'inset-y-0 left-0 w-64';
    case 'right':
      return 'inset-y-0 right-0 w-64';
    case 'top':
      return 'inset-x-0 top-0 h-64';
    case 'bottom':
      return 'inset-x-0 bottom-0 h-64';
  }
};

export function Sidebar({ isOpen, onClose, side = 'left', children }: SidebarProps) {
  const transition = getTransitionClasses(side);
  const position = getPositionClasses(side);

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" />
        </TransitionChild>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 flex">
            <TransitionChild
              as={Fragment}
              enter={transition.enter}
              enterFrom={transition.enterFrom}
              enterTo={transition.enterTo}
              leave={transition.leave}
              leaveFrom={transition.leaveFrom}
              leaveTo={transition.leaveTo}
            >
              <DialogPanel
                className={cn(
                  'absolute bg-background shadow-xl',
                  position,
                  'overflow-auto',
                  'w-full lg:w-96'
                )}
              >
                {children}
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
