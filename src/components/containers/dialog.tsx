"use client";

import { CustomComponentProps } from "@/lib/components";
import {
  JSX,
  useRef,
  RefObject,
  cloneElement,
  useMemo,
  forwardRef,
  useImperativeHandle,
} from "react";
import { X } from "lucide-react";
import { useHtmlElementListeners } from "@/lib/utils/html-event.utils";

export function openModal(
  dialog: RefObject<HTMLDialogElement | null>,
  callback: () => void = () => {},
) {
  if (dialog.current) {
    dialog.current.showModal();
    callback();
  }
}

export function closeModal(
  dialog: RefObject<HTMLDialogElement | null>,
  callback: () => void = () => {},
) {
  if (dialog.current) {
    dialog.current.close();
    callback();
  }
}

export interface DialogMethods {
  close: () => void;
  open: () => void;
}

export interface DialogProps {
  trigger: JSX.Element;
  title: string;
  onClose?: () => void;
  onCancel?: () => void;
  onOpen?: () => void;
}

export const Dialog = forwardRef<
  DialogMethods,
  CustomComponentProps<DialogProps>
>(({ trigger, title, children, onOpen, onClose, className }, ref) => {
  // Create a reference for the dialog
  const dialog = useRef<HTMLDialogElement>(null);

  // Setup event listeners on the trigger
  const triggerRef = useHtmlElementListeners(
    [["click", () => openModal(dialog, onOpen)]],
    [trigger],
  );

  // Declare custom functions
  useImperativeHandle(ref, () => ({
    close: () => closeModal(dialog, onClose),
    open: () => openModal(dialog, onOpen),
  }));

  // Create and memoize the trigger element
  const triggerElem = useMemo(
    () => cloneElement(trigger, { ref: triggerRef }),
    [trigger],
  );

  // Return nothing if the triggerRef is null
  if (!triggerRef) {
    return null;
  }

  return (
    <>
      {triggerElem}

      <dialog ref={dialog} className={className ?? ""}>
        <header className="flex justify-between">
          <h4 className="text-2xl">{title}</h4>
          <button onClick={() => closeModal(dialog, onClose)}>
            <X width={24} height={24} />
          </button>
        </header>
        {children}
      </dialog>
    </>
  );
});
