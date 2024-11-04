import { gql } from "@apollo/client";
import { QueryGetAllExpenseCategoriesArgs } from "@/__generated__/graphql";
export const GET_ALL_EXPENSES_CATEGORIES = gql`
  query GetAllExpensesCategories($username: String!) {
    getAllExpenseCategories(username: $username) {
      success
      userExpenseCategories
    }
  }
`;
