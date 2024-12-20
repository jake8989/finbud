// export default interface UserLoginInputType {
//   user: {
//     username: string;
//     password: string;
//   };
// }
// export default interface UserRegisterInputType {
//   user: {
//     username: string;
//     email: string;
//     password: string;
//   };
// }

export type User = {
  user: {
    username: string;
    email: string;
  };
};

export type ExpenseType = {
  amount: number | undefined;
  category: string;
  description: string;
  expenseDate: string | undefined;
};

export type IncomeType = {
  amount: number | undefined | string;
  category: string;
  description: string;
  incomeDate: string | undefined;
};
export type GoalType = {
  goalAmount: number | undefined | string;
  goalCategory: undefined | string;
  goalStartDate: string;
  goalEndDate: string;
  goalDescription: string;
  goalType: undefined | string;
  goalReminderFreq: undefined | string;
};

export type EditGoalFormType = {
  goalAmount: string | null | number;
  goalDescription: string | null;
  goalEndDate: string | null;
};

export type FeedBackFormType = {
  feedbackUserEmail: string;
  feedbackUserSubject: string | undefined | null;
  feedbackUserMessage: string;
};

export type categoryWiseExpenseData = {
  label: string;
  data: [number];
};
