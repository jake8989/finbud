import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { persistCache, LocalStorageWrapper } from "apollo3-cache-persist";
import { onError } from "@apollo/client/link/error";
import Cookies from "js-cookie";
const httpLink = createHttpLink({
  uri: process.env.NEXT_PUBLIC_BACKEND,
});
const cache = new InMemoryCache();
// const { toast } = useToast();
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

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) => {
      console.error(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      );
    });
    return;
  }

  if (networkError) {
    console.error(`[Network error]: ${networkError}`);
    // Display an error message or handle the error (e.g., redirect to an error page)
    alert(
      "Backend is offline or network error occurred. Please try again later."
    );
    return;
  }
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: cache,
});

export default client;
