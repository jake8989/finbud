import Image from "next/image";
import { FetchExpenseCategories } from "@/data/expenseCategories";
import React, { ChangeEvent } from "react";
import { useMutation } from "@apollo/client";
import { useUser } from "@/context/userContext";
import { ADD_INCOME } from "@/lib/mutations/createIncome";
import { useToast } from "@/context/customToastContext";
import { IncomeType } from "@/utils/types";
import { describe } from "node:test";
import { useFetchMonthlyData } from "@/data/monthlyData";
const AddIncome = () => {
  const { user } = useUser();
  const { toast } = useToast();
  const currentYear = new Date().getFullYear().toString();
  const { refetchMonthlyData } = useFetchMonthlyData(
    currentYear,
    user?.user?.username
  );
  // console.log(expenseCategories);
  const [
    addIncome,
    { data, loading: AddIncomeLoading, error: AddIncomeError },
  ] = useMutation(ADD_INCOME, {
    onCompleted: () => {
      refetchMonthlyData();
    },
  });
  const { expenseCategories, loading: ExpenseCategoryLoading } =
    FetchExpenseCategories(user?.user?.username);
  const [income, setIncome] = React.useState<IncomeType>({
    amount: undefined,
    category: "",
    description: "",
    incomeDate: undefined,
  });
  const handleOnChange = (event: any) => {
    event.preventDefault();
    // console.log(event.target.value);
    setIncome({ ...income, [event.target.name]: event.target.value });
  };
  const handleSubmitExpense = async () => {
    // console.log(income);
    if (
      Number(income.amount) === 0 ||
      Number(income.amount) == null ||
      income.amount == undefined
    ) {
      toast("Amount zero expense cannot be created", "warning", 2000);
      return;
    }
    if (income.category.trim() === "") {
      toast("Please Provide Expense Category", "warning", 2000);
      return;
    }
    if (income.description.trim() === "") {
      toast("Please Provide Description!", "warning", 2000);
      return;
    }
    if (income.incomeDate.trim() === "" || income.incomeDate == undefined) {
      toast("Please Provide Expense Date", "warning", 2000);
      return;
    }
    const { data } = await addIncome({
      variables: {
        income: {
          username: user?.user?.username,
          amount: Number(income.amount),
          description: income.description,
          incomeDate: income.incomeDate,
          category: income.category,
        },
      },
    });
    if (data?.addIncome?.success) {
      toast(data?.addIncome?.message, "success", 3000);
      setIncome({
        amount: "",
        category: "",
        description: "",
        incomeDate: "",
      });
    }
    if (!data?.addIncome?.success) {
      toast(data?.addIncome?.message, "error", 3000);
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
          <h2 className="card-title">Add Income!</h2>
          <p>Enter the amount and select the category</p>
          <p className="text-[12px]">
            *Be carefull adding incomes are irreversable
          </p>
          <label className="input input-bordered flex items-center gap-2 mt-1.5">
            <Image src={"/rupees.svg"} height={18} width={18} alt="no"></Image>
            <input
              type="number"
              className="grow"
              placeholder="Amount"
              name="amount"
              onChange={handleOnChange}
              value={income.amount}
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
              value={income.description}
            />
          </label>
          <label className="input input-bordered flex items-center gap-2 mt-1.5">
            <Image src={"/date.svg"} height={18} width={18} alt="no"></Image>
            <input
              type="date"
              className="grow"
              placeholder="Description"
              name="incomeDate"
              onChange={handleOnChange}
              value={income.incomeDate}
            />
          </label>

          <select
            className="select select-bordered w-full max-w-xs mt-1.5"
            name="category"
            onChange={handleOnChange}
            value={income.category}
          >
            <option disabled value="">
              Select Category Source of Income
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
              disabled={AddIncomeLoading || ExpenseCategoryLoading}
            >
              {AddIncomeLoading && "Loading..."}
              {!AddIncomeLoading && "Meowwww"}
            </button>
          </div>
        </div>
      </div>
    </div>
    // </div>
  );
};
export default AddIncome;
