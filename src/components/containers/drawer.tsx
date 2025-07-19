import { CustomComponentProps } from "@/lib/components";
import { Dialog, DialogMethods, type DialogProps } from "./dialog";
import { forwardRef } from "react";

export interface DrawerMethods extends DialogMethods {}

interface DrawerProps extends DialogProps {
  direction: "left" | "right";
}

export const Drawer = forwardRef<
  DrawerMethods,
  CustomComponentProps<DrawerProps>
>(({ trigger, title, children, onOpen, onClose, className = "" }, ref) => {
  return (
    <Dialog
      ref={ref}
      trigger={trigger}
      title={title}
      onOpen={onOpen}
      onClose={onClose}
      className={`drawer drawer--right w-[80%] sm:max-w-[500px] ${className}`}
    >
      {children}
    </Dialog>
  );
});
