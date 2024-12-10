import { gql } from "@apollo/client";

export const CREATE_EXPENSE_CATEGORY = gql`
  mutation createExpenseCategory($expenseCategory: ExpenseCategoryInput!) {
    createExpenseCategory(expenseCategory: $expenseCategory) {
      success
      message
    }
  }
`;

export const DELETE_EXPENSE_CATEGORY = gql`
  mutation deleteExistExpenseCategory($expenseCategory: ExpenseCategoryInput!) {
    deleteExistExpenseCategory(expenseCategory: $expenseCategory) {
      success
      message
    }
  }
`;
