import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Navbar from "@/components/Navbar";
import { ThemeContextProvider } from "@/context/themeContext";
import { ToastContextProvider } from "@/context/customToastContext";
import client from "@/lib/apollo";
import { ApolloProvider } from "@apollo/client";
import { useQuery, gql } from "@apollo/client";
import { UserContextProvider } from "@/context/userContext";

export default function App({ Component, pageProps }: AppProps) {
  // const { loading, error, data } = useQuery<string>(TEST_QUERY);
  // console.log(loading, error, data);s

  return (
    <>
      <UserContextProvider>
        <ApolloProvider client={client}>
          <ThemeContextProvider>
            <ToastContextProvider>
              <Navbar></Navbar>
              <Component {...pageProps} />
            </ToastContextProvider>
          </ThemeContextProvider>
        </ApolloProvider>
      </UserContextProvider>
    </>
  );
}
