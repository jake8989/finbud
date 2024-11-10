import Image from "next/image";
import { FetchExpenseCategories } from "@/data/expenseCategories";
import React, { ChangeEvent } from "react";
import { ExpenseType } from "@/utils/types";
import { useUser } from "@/context/userContext";
import { useMutation } from "@apollo/client";
import { CREATE_EXPENSE } from "@/lib/mutations/createExpense";
import { MutationCreateExpenseArgs } from "@/__generated__/graphql";
import { useToast } from "@/context/customToastContext";
import { execOnce } from "next/dist/shared/lib/utils";
const AddExp = () => {
  const { user } = useUser();
  const { toast } = useToast();
  const [
    createExpense,
    { data: ExpenseData, loading: ExpenseLoading, error: ExpenseError },
  ] = useMutation(CREATE_EXPENSE);
  const {
    expenseCategories,
    loading: ExpenseCategoryLoading,
    error,
  } = FetchExpenseCategories(user?.user?.username);
  // console.log(expenseCategories);
  const [expense, setExpense] = React.useState<ExpenseType>({
    amount: undefined,
    category: "",
    description: "",
    expenseDate: undefined,
  });
  const handleOnChange = (event: any) => {
    event.preventDefault();
    console.log(event.target.value);
    setExpense({ ...expense, [event.target.name]: event.target.value });
  };
  const handleSubmitExpense = async () => {
    // console.log(expense);
    if (
      Number(expense.amount) === 0 ||
      Number(expense.amount) == null ||
      expense.amount == undefined
    ) {
      toast("Amount zero expense cannot be created", "warning", 2000);
      return;
    }
    if (expense.category.trim() === "") {
      toast("Please Provide Expense Category", "warning", 2000);
      return;
    }
    if (expense.description.trim() === "") {
      toast("Please Provide Description!", "warning", 2000);
      return;
    }
    if (expense.expenseDate.trim() === "" || expense.expenseDate == undefined) {
      toast("Please Provide Expense Date", "warning", 2000);
      return;
    }
    console.log(typeof expense.expenseDate);
    const newExpense: MutationCreateExpenseArgs = {
      expense: {
        username: user.user.username,
        amount: Number(expense.amount),
        category: expense.category,
        description: expense.description,
        expenseDate: expense.expenseDate,
      },
    };
    const { data } = await createExpense({ variables: newExpense });
    if (data.createExpense.success) {
      toast(data.createExpense.message, "success", 3000);
      setExpense({
        amount: undefined,
        category: "",
        description: "",
        expenseDate: undefined,
      });
    }
    if (!data.createExpense.success) {
      toast(data.createExpense.message, "error", 3000);
    }
  };
  if (ExpenseCategoryLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <span className="loading loading-ring loading-lg"></span>
      </div>
    );
  }
  return (
    <div className="flex justify-center">
      <div className="card bg-base-100 w-96 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Add Expense!</h2>
          <p>Enter the amount and select the category</p>
          <p className="text-[12px]">
            *Be carefull adding expenses are irreversable
          </p>
          <label className="input input-bordered flex items-center gap-2 mt-1.5">
            <Image src={"/rupees.svg"} height={18} width={18} alt="no"></Image>
            <input
              type="number"
              className="grow"
              placeholder="Amount"
              name="amount"
              onChange={handleOnChange}
              value={expense.amount || ""}
            />
          </label>
          <label className="input input-bordered flex items-center gap-2 mt-1.5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
              <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
            </svg>
            <input
              type="text"
              className="grow"
              placeholder="Description"
              name="description"
              onChange={handleOnChange}
              value={expense.description}
            />
          </label>
          <label className="input input-bordered flex items-center gap-2 mt-1.5">
            <Image src={"/date.svg"} height={18} width={18} alt="no"></Image>
            <input
              type="date"
              className="grow"
              placeholder="Description"
              name="expenseDate"
              onChange={handleOnChange}
              value={expense.expenseDate || ""}
            />
          </label>

          <select
            className="select select-bordered w-full max-w-xs mt-1.5"
            name="category"
            onChange={handleOnChange}
            value={expense.category}
          >
            <option disabled selected>
              Select Category of Expense
            </option>
            {expenseCategories.map((expense) => (
              <option value={expense.category} key={expense.key}>
                {expense.category}
              </option>
            ))}
          </select>

          <div className="card-actions justify-end">
            <button
              className="btn btn-primary mt-1.5"
              onClick={handleSubmitExpense}
              disabled={ExpenseLoading || ExpenseCategoryLoading}
            >
              {ExpenseLoading && "Loading..."}
              {!ExpenseLoading && "Meowwww"}
            </button>
          </div>
        </div>
      </div>
    </div>
    // </div>
  );
};
export default AddExp;
