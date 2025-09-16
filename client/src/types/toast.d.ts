declare module "@/components/ui/toast" {
  export interface ToastProps {
    id?: string;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    title?: React.ReactNode;
    description?: React.ReactNode;
    action?: any;
  }

  export type ToastActionElement = any;
}
