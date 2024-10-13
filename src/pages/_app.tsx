import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Navbar from "@/components/Navbar";
import { ThemeContextProvider } from "@/context/themeContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <ThemeContextProvider>
        <Navbar></Navbar>
        <Component {...pageProps} />
      </ThemeContextProvider>
    </>
  );
}
