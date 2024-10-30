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
