import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { persistCache, LocalStorageWrapper } from "apollo3-cache-persist";
import Cookies from "js-cookie";
const httpLink = createHttpLink({
  uri: process.env.NEXT_PUBLIC_BACKEND,
});
const cache = new InMemoryCache();

if (typeof window !== "undefined") {
  import("apollo3-cache-persist").then(({ persistCache }) => {
    // localStorage.removeItem("apollo-cache-persist");
    persistCache({
      cache,
      storage: window.localStorage, // Use localStorage for persistence
    });
  });
}

const authLink = setContext((_, { headers }) => {
  const token = Cookies.get("token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});
export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: cache,
});

export default client;
