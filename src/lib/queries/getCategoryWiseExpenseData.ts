import { gql } from "@apollo/client";
export const GET_CATEGORY_WISE_EXPENSES = gql`
  query GetCategoryWiseExpenseData($data: accumulatedDataInput!) {
    getCategoryWiseExpenseData(data: $data) {
      success
      message
      categoryWiseExpenses {
        label
        data
      }
    }
  }
`;
