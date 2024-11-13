import { gql } from "@apollo/client";
export const NEW_FEEDBACK = gql`
  mutation NewFeedBack($feedback: FeedBackInputType!) {
    newFeedBack(feedback: $feedback) {
      success
      message
    }
  }
`;
