import { gql } from "@apollo/client";

export const GET_ALL_USER_GOALS = gql`
  query GetAllUserGoals($username: String!) {
    getAllUserGoals(username: $username) {
      success
      allUserGoals {
        goalId
        goalAmount
        goalDescription
        goalStartDate
        goalEndDate
        goalCategory
        goalType
        goalReminderFreq
      }
    }
  }
`;
