import { gql } from "@apollo/client";
export const ADD_INCOME = gql`
  mutation AddIncome($income: IncomeInputType!) {
    addIncome(income: $income) {
      success
      message
      incomeId
    }
  }
`;
