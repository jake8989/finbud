/* eslint-disable */
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never;
    };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
};

export type ExpenseCategoryInput = {
  expenseCategory: Scalars["String"]["input"];
  username: Scalars["String"]["input"];
};

export type ExpenseCategoryResponse = {
  __typename?: "ExpenseCategoryResponse";
  message: Scalars["String"]["output"];
  success: Scalars["Boolean"]["output"];
};

export type ExpenseGetCategoriesResponseType = {
  __typename?: "ExpenseGetCategoriesResponseType";
  success: Scalars["Boolean"]["output"];
  userExpenseCategories: Array<Scalars["String"]["output"]>;
};

export type ExpenseInput = {
  amount: Scalars["Int"]["input"];
  category: Scalars["String"]["input"];
  description: Scalars["String"]["input"];
  expenseDate: Scalars["String"]["input"];
  username: Scalars["String"]["input"];
};

export type ExpenseResponseType = {
  __typename?: "ExpenseResponseType";
  expenseId?: Maybe<Scalars["String"]["output"]>;
  message: Scalars["String"]["output"];
  success: Scalars["Boolean"]["output"];
};

export type Mutation = {
  __typename?: "Mutation";
  createExpense: ExpenseResponseType;
  createExpenseCategory: ExpenseCategoryResponse;
  loginUser: UserMutationResponse;
  registerUser: UserMutationResponse;
};

export type MutationCreateExpenseArgs = {
  expense: ExpenseInput;
};

export type MutationCreateExpenseCategoryArgs = {
  expenseCategory: ExpenseCategoryInput;
};

export type MutationLoginUserArgs = {
  user: UserLoginInput;
};

export type MutationRegisterUserArgs = {
  user: UserInput;
};

export type Query = {
  __typename?: "Query";
  getAllExpenseCategories: ExpenseGetCategoriesResponseType;
  testQuery: Scalars["String"]["output"];
};

export type QueryGetAllExpenseCategoriesArgs = {
  username: Scalars["String"]["input"];
};

export type UserInput = {
  email: Scalars["String"]["input"];
  password: Scalars["String"]["input"];
  username: Scalars["String"]["input"];
};

export type UserLoginInput = {
  password: Scalars["String"]["input"];
  username: Scalars["String"]["input"];
};

export type UserMutationResponse = {
  __typename?: "UserMutationResponse";
  message: Scalars["String"]["output"];
  success: Scalars["Boolean"]["output"];
  token?: Maybe<Scalars["String"]["output"]>;
  user?: Maybe<UserType>;
};

export type UserType = {
  __typename?: "UserType";
  email: Scalars["String"]["output"];
  username: Scalars["String"]["output"];
};
