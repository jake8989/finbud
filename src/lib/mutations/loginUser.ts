import { gql, useMutation } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation LoginUser($user: UserLoginInput!) {
    loginUser(user: $user) {
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
