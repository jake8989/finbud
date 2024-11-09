export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type AllUserGoalsResponseType = {
  __typename?: 'AllUserGoalsResponseType';
  allUserGoals?: Maybe<Array<GoalType>>;
  success: Scalars['Boolean']['output'];
};

export type DeleteGoalInputType = {
  goalId: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type EditGoalInputType = {
  goalAmount?: InputMaybe<Scalars['Int']['input']>;
  goalDescription?: InputMaybe<Scalars['String']['input']>;
  goalEndDate?: InputMaybe<Scalars['String']['input']>;
  goalId: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type ExpenseCategoryInput = {
  expenseCategory: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type ExpenseCategoryResponse = {
  __typename?: 'ExpenseCategoryResponse';
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
};

export type ExpenseGetCategoriesResponseType = {
  __typename?: 'ExpenseGetCategoriesResponseType';
  success: Scalars['Boolean']['output'];
  userExpenseCategories: Array<Scalars['String']['output']>;
};

export type ExpenseInput = {
  amount: Scalars['Int']['input'];
  category: Scalars['String']['input'];
  description: Scalars['String']['input'];
  expenseDate: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type ExpenseResponseType = {
  __typename?: 'ExpenseResponseType';
  expenseId?: Maybe<Scalars['String']['output']>;
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
};

export type GoalInput = {
  goalAmount: Scalars['Int']['input'];
  goalCategory: Scalars['String']['input'];
  goalDescription: Scalars['String']['input'];
  goalEndDate: Scalars['String']['input'];
  goalReminderFreq: Scalars['String']['input'];
  goalStartDate: Scalars['String']['input'];
  goalType: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type GoalReponseType = {
  __typename?: 'GoalReponseType';
  goal?: Maybe<GoalType>;
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
};

export type GoalType = {
  __typename?: 'GoalType';
  goalAmount: Scalars['Int']['output'];
  goalCategory: Scalars['String']['output'];
  goalDescription: Scalars['String']['output'];
  goalEndDate: Scalars['String']['output'];
  goalId: Scalars['String']['output'];
  goalReminderFreq: Scalars['String']['output'];
  goalStartDate: Scalars['String']['output'];
  goalType: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addNewGoal: GoalReponseType;
  createExpense: ExpenseResponseType;
  createExpenseCategory: ExpenseCategoryResponse;
  deleteGoal: GoalReponseType;
  editGoal: GoalReponseType;
  loginUser: UserMutationResponse;
  registerUser: UserMutationResponse;
};


export type MutationAddNewGoalArgs = {
  goal: GoalInput;
};


export type MutationCreateExpenseArgs = {
  expense: ExpenseInput;
};


export type MutationCreateExpenseCategoryArgs = {
  expenseCategory: ExpenseCategoryInput;
};


export type MutationDeleteGoalArgs = {
  goal: DeleteGoalInputType;
};


export type MutationEditGoalArgs = {
  goal: EditGoalInputType;
};


export type MutationLoginUserArgs = {
  user: UserLoginInput;
};


export type MutationRegisterUserArgs = {
  user: UserInput;
};

export type Query = {
  __typename?: 'Query';
  getAllExpenseCategories: ExpenseGetCategoriesResponseType;
  getAllUserGoals: AllUserGoalsResponseType;
  testQuery: Scalars['String']['output'];
};


export type QueryGetAllExpenseCategoriesArgs = {
  username: Scalars['String']['input'];
};


export type QueryGetAllUserGoalsArgs = {
  username: Scalars['String']['input'];
};

export type UserInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type UserLoginInput = {
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type UserMutationResponse = {
  __typename?: 'UserMutationResponse';
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
  token?: Maybe<Scalars['String']['output']>;
  user?: Maybe<UserType>;
};

export type UserType = {
  __typename?: 'UserType';
  email: Scalars['String']['output'];
  username: Scalars['String']['output'];
};
