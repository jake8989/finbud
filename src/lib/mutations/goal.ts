import { gql } from "@apollo/client";
// import { GoalInput } from "@/__generated__/graphql";
// import { DeleteGoalInputType } from "@/__generated__/graphql";
// import { EditGoalInputType } from "@/__generated__/graphql";
export const ADDNEWGOAL = gql`
  mutation AddNewGoal($goal: GoalInput!) {
    addNewGoal(goal: $goal) {
      success
      message
      goal {
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

export const DELETEGOAL = gql`
  mutation DeleteGoal($goal: DeleteGoalInputType!) {
    deleteGoal(goal: $goal) {
      success
      message
    }
  }
`;

export const EDITGOAL = gql`
  mutation EditGoal($goal: EditGoalInputType!) {
    editGoal(goal: $goal) {
      success
      message
      goal {
        goalId
        goalAmount
        goalStartDate
        goalEndDate
        goalDescription
        goalType
        goalCategory
      }
    }
  }
`;
