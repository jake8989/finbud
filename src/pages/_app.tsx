import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Navbar from "@/components/Navbar";
import { ThemeContextProvider } from "@/context/themeContext";
import { ToastContextProvider } from "@/context/customToastContext";
export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <ThemeContextProvider>
        <ToastContextProvider>
          <Navbar></Navbar>
          <Component {...pageProps} />
        </ToastContextProvider>
      </ThemeContextProvider>
    </>
  );
}
