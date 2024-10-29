import { gql, useMutation } from "@apollo/client";
import { UserInput } from "@/__generated__/graphql";
export const REGISTER_USER = gql`
  mutation RegisterUserMutation($user: UserInput!) {
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
