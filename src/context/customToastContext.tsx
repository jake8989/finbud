import React, { useState } from "react";
import { ReactNode } from "react";
import { CustomToast, toastMessage } from "@/utils/toast";

const ToastContext = React.createContext<CustomToast | undefined>(undefined);

export const ToastContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [createToast, setCreateToast] = useState<{
    message: string;
    type: string;
    duration: number;
    isVisible: boolean;
  }>({ message: "", type: "info", duration: 0, isVisible: false });

  const toast = (message: string, type: string, duration: number) => {
    setCreateToast({ message, type, duration, isVisible: true });
    setTimeout(() => {
      setCreateToast((prev) => ({
        ...prev,
        isVisible: false,
        message: "",
      }));
    }, duration);
  };
  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      {createToast.isVisible && (
        <div className="toast toast-top toast-center">
          <div
            className={`alert ${
              createToast.type === "warning"
                ? "alert-warning"
                : createToast.type === "success"
                ? "alert-success"
                : createToast.type === "error"
                ? "alert-error"
                : "alert-info"
            }`}
          >
            <span>{createToast.message}</span>
          </div>
        </div>
      )}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = React.useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used in ToastContext Provider");
  }
  return context;
};
