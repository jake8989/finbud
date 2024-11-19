import { gql, useMutation } from "@apollo/client";
import { ExpenseInput } from "@/__generated__/graphql";
export const CREATE_EXPENSE = gql`
  mutation CreateExpense($expense: ExpenseInput!) {
    createExpense(expense: $expense) {
      success
      message
      expenseId
    }
  }
`;
