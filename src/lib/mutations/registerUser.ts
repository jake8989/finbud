import { gql, useMutation } from "@apollo/client";
const REGISTER_USER = gql`
  mutation registerUser($user: UserInput!) {
    registerUser(user: $user) {
      success
      message
      token
      user {
        username
        email
      }
    }
  }
`;
