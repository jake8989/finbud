export interface toastMessage {
  message: string;
  type: "info" | "success" | "warning" | "error";
  duration: number;
}

export interface CustomToast {
  toast: (message: string, type: string, duration: number) => void;
}
