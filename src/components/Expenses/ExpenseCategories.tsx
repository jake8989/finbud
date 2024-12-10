import {
  CREATE_EXPENSE_CATEGORY,
  DELETE_EXPENSE_CATEGORY,
} from "@/lib/mutations/createNewExpenseCategory";
import { useMutation } from "@apollo/client";
import { useUser } from "@/context/userContext";
import React, { ChangeEvent } from "react";
import { useToast } from "@/context/customToastContext";
import { MutationCreateExpenseCategoryArgs } from "@/__generated__/graphql";
import { FetchExpenseCategories } from "@/data/expenseCategories";
import Image from "next/image";
import { Loading } from "../Loading/Loading";
interface NewExpenseCategory {
  expenseCategory: string;
}
const ExpenseCategories = () => {
  const [createExpenseCategory, { data: ExpenseResponse, loading, error }] =
    useMutation(CREATE_EXPENSE_CATEGORY, {
      onCompleted: () => {
        //refetch again the expense categories
        refetch();
      },
    });

  const [
    deleteExistExpenseCategory,
    {
      data: DeleteExpenseCategoryResponse,
      loading: DeleteExpenseCategoryLoading,
      error: DeleteExpenseCategoryError,
    },
  ] = useMutation(DELETE_EXPENSE_CATEGORY, {
    onCompleted: () => {
      refetch();
    },
  });
  const { user } = useUser();
  const { toast } = useToast();
  const { refetch, expenseCategories } = FetchExpenseCategories(
    user?.user?.username
  );
  const [newExpenseCategory, setNewExpenseCategory] =
    React.useState<NewExpenseCategory>({ expenseCategory: "" });
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setNewExpenseCategory({
      ...newExpenseCategory,
      [event.target.name]: event.target.value,
    });
  };
  const handleSubmitHandler = async () => {
    if (newExpenseCategory.expenseCategory === "") {
      toast("Expense Category Can not be empty", "warning", 2000);
      return;
    }
    const expenseCategoryNew: MutationCreateExpenseCategoryArgs = {
      expenseCategory: {
        username: user.user.username,
        expenseCategory: newExpenseCategory.expenseCategory,
      },
    };
    const { data } = await createExpenseCategory({
      variables: expenseCategoryNew,
    });
    // console.log(data);
    if (data.createExpenseCategory.success) {
      toast(data.createExpenseCategory.message, "success", 3000);
      setNewExpenseCategory({ expenseCategory: "" });
    }
    if (!data.createExpenseCategory.success) {
      toast(data.createExpenseCategory.message, "error", 3000);
      setNewExpenseCategory({ expenseCategory: "" });
    }
  };
  const handleDeleteExpenseCategory = async (category: string) => {
    console.log(category);
    const { data } = await deleteExistExpenseCategory({
      variables: {
        expenseCategory: {
          username: user?.user?.username,
          expenseCategory: category,
        },
      },
    });
    if (data.deleteExistExpenseCategory.success) {
      // console.log("Hii");
      toast(data.deleteExistExpenseCategory.message, "success", 3000);
      return;
    }
    if (!data.deleteExistExpenseCategory.success) {
      // console.log("Hii");
      toast(data.deleteExistExpenseCategory.message, "error", 3000);
      return;
    }
  };
  if (loading || DeleteExpenseCategoryLoading) {
    return <Loading></Loading>;
  }
  return (
    <>
      <div className="flex justify-center flex-wrap">
        <div className="card bg-base-100 w-96 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Add an Expense/Income Category!</h2>
            <p>Set Your Own Expense/Income Categories</p>

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
                placeholder="Expense Category"
                onChange={handleChange}
                name="expenseCategory"
                value={newExpenseCategory.expenseCategory || ""}
              />
            </label>

            <div className="card-actions justify-end">
              <button
                className="btn btn-primary mt-1.5"
                disabled={loading}
                onClick={handleSubmitHandler}
              >
                {loading && "Loading..."}
                {!loading && "Meowww"}
              </button>
            </div>
          </div>
        </div>
        {/* //expense categories card show */}
        <div
          className="card bg-base-100 w-96 overflow-y-auto h-64"
          style={{ scrollbarWidth: "thin", scrollbarColor: "gray lightgray" }}
        >
          <div className="card-body ">
            <h2 className="card-title">your Expense/Income Categories!</h2>
            {expenseCategories.map((category) => (
              <p key={category.key}>
                <span className="text-primary">{category.key + 1}.</span>
                {`     `}
                {category.category}
                {/* <button
                  className="btn btn-ghost bg-error ml-[120px]"
                  onClick={() => handleDeleteExpenseCategory(category.category)}
                  disabled={DeleteExpenseCategoryLoading}
                >
                  {" "}
                  <Image
                    src="delete-icon.svg"
                    height="23"
                    width="23"
                    alt="Delete Icon"
                  ></Image>{" "}
                </button> */}
              </p>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
export default ExpenseCategories;
