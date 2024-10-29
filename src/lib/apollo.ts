import {
  ApolloCache,
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
} from "@apollo/client";

console.log(process.env.NEXT_PUBLIC_BACKEND);
export const client = new ApolloClient({
  uri: "http://localhost:8000/graphql",
  cache: new InMemoryCache(),
});

export default client;
