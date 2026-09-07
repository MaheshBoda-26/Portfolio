"use client";

import * as React from "react";
import * as ToastPrimitives from "@radix-ui/react-toast";
import { cva, type VariantProps } from "class-variance-authority";
import { X } from "lucide-react";

import { cn } from "@/lib/utils";

const ToastProvider = ToastPrimitives.Provider;

const ToastViewport = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Viewport>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Viewport>
>(({ className, ...props }, ref) => (
  React.createElement(
    ToastPrimitives.Viewport,
    {
      ref,
      className: cn(
        "fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]",
        className
      ),
      ...props,
    }
  )
));
ToastViewport.displayName = ToastPrimitives.Viewport.displayName;

const toastVariants = cva(
  "group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full",
  {
    variants: {
      variant: {
        default: "border bg-background text-foreground",
        destructive:
          "destructive group border-destructive bg-destructive text-destructive-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

const Toast = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Root> &
    VariantProps<typeof toastVariants>
>(({ className, variant, ...props }, ref) => (
  React.createElement(
    ToastPrimitives.Root,
    {
      ref,
      className: cn(toastVariants({ variant }), className),
      ...props,
    }
  )
));
Toast.displayName = ToastPrimitives.Root.displayName;

const ToastAction = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Action>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Action>
>(({ className, ...props }, ref) => (
  React.createElement(
    ToastPrimitives.Action,
    {
      ref,
      className: cn(
        "inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-sm font-medium ring-offset-background transition-colors hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 group-[.destructive]:border-muted/40 group-[.destructive]:hover:border-destructive/30 group-[.destructive]:hover:bg-destructive group-[.destructive]:hover:text-destructive-foreground group-[.destructive]:focus:ring-destructive",
        className
      ),
      ...props,
    }
  )
));
ToastAction.displayName = ToastPrimitives.Action.displayName;

const ToastClose = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Close>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Close>
>(({ className, ...props }, ref) => (
  React.createElement(
    ToastPrimitives.Close,
    {
      ref,
      className: cn(
        "absolute right-2 top-2 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100 group-[.destructive]:text-red-300 group-[.destructive]:hover:text-red-50 group-[.destructive]:focus:ring-red-400 group-[.destructive]:focus:ring-offset-red-600",
        className
      ),
      ...props,
    },
    React.createElement(X, { className: "h-4 w-4" })
  )
));
ToastClose.displayName = ToastPrimitives.Close.displayName;

const ToastTitle = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Title>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Title>
>(({ className, ...props }, ref) => (
  React.createElement(
    ToastPrimitives.Title,
    {
      ref,
      className: cn("text-sm font-semibold", className),
      ...props,
    }
  )
));
ToastTitle.displayName = ToastPrimitives.Title.displayName;

const ToastDescription = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Description>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Description>
>(({ className, ...props }, ref) => (
  React.createElement(
    ToastPrimitives.Description,
    {
      ref,
      className: cn("text-sm opacity-90", className),
      ...props,
    }
  )
));
ToastDescription.displayName = ToastPrimitives.Description.displayName;

type ToastProps = React.ComponentPropsWithoutRef<typeof Toast>;

type ToastActionElement = React.ReactElement<typeof ToastAction>;

export {
  type ToastProps,
  type ToastActionElement,
  ToastProvider,
  ToastViewport,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastClose,
  ToastAction,
};

const TOAST_LIMIT = 5;
const TOAST_REMOVE_DELAY = 5000;

type Toast = ToastProps & {
  id: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: ToastActionElement;
};

let count = 0;

function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER;
  return count.toString();
}

type ToastState = {
  toasts: Toast[];
};

const toastTimeouts = new Map<string, ReturnType<typeof setTimeout>>();

function addToRemoveQueue(toastId: string) {
  if (toastTimeouts.has(toastId)) {
    return;
  }

  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastId);
    dispatch({ type: "REMOVE_TOAST", toastId });
  }, TOAST_REMOVE_DELAY);

  toastTimeouts.set(toastId, timeout);
}

function dispatch(action: { type: string; toastId?: string; toast?: Toast }) {
  listener(action);
}

const listeners: Array<(action: { type: string; toastId?: string; toast?: Toast }) => void> = [];

function listener(action: { type: string; toastId?: string; toast?: Toast }) {
  listeners.forEach((listener) => listener(action));
}

function addListener(listenerFn: (action: { type: string; toastId?: string; toast?: Toast }) => void) {
  listeners.push(listenerFn);
  return () => {
    const index = listeners.indexOf(listenerFn);
    if (index > -1) {
      listeners.splice(index, 1);
    }
  };
}

function toast({ ...props }: Omit<Toast, "id">) {
  const id = genId();

  const newToast: Toast = {
    ...props,
    id,
    open: true,
    onOpenChange: (open: boolean) => {
      if (!open) {
        dispatch({ type: "REMOVE_TOAST", toastId: id });
      }
    },
  };

  dispatch({ type: "ADD_TOAST", toast: newToast });
  addToRemoveQueue(id);

  return { id, dismiss: () => dispatch({ type: "REMOVE_TOAST", toastId: id }), update: (props: Partial<Toast>) => dispatch({ type: "UPDATE_TOAST", toast: { ...newToast, ...props } }) };
}

export function useToast() {
  const [state, setState] = React.useState<ToastState>({ toasts: [] });

  React.useEffect(() => {
    const cleanup = addListener((action) => {
      if (action.type === "ADD_TOAST") {
        setState((prev) => {
          const newToasts = [action.toast!, ...prev.toasts].slice(0, TOAST_LIMIT);
          return { toasts: newToasts };
        });
      } else if (action.type === "REMOVE_TOAST") {
        setState((prev) => ({
          toasts: prev.toasts.filter((t) => t.id !== action.toastId),
        }));
      } else if (action.type === "UPDATE_TOAST") {
        setState((prev) => ({
          toasts: prev.toasts.map((t) => (t.id === action.toast!.id ? action.toast! : t)),
        }));
      }
    });

    return cleanup;
  }, []);

  return {
    ...state,
    toast,
    dismiss: (toastId?: string) => dispatch({ type: "REMOVE_TOAST", toastId }),
  };
}