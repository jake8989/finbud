import { gql } from "@apollo/client";

const GET_ALL_USES_GOALS = gql`
  query GetAllGolas($username: String!) {
    getAllGoals(username: $username) {
      success
      allUserGoals
    }
  }
`;
