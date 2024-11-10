import { gql } from "@apollo/client";

export const GET_ACCUMULATED_DATA = gql`
  query GetAccumulatedData($data: accumulatedDataInput!) {
    getAccumulatedData(data: $data) {
      success
      message
      income
      expense
    }
  }
`;
