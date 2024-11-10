// src/components/Expenses/SetGoals.tsx
// import expenseCategories from "@/data/expenseCategories";
import styles from "@/styles/solar.module.css"; // Import as an object
import Image from "next/image";
import { ChangeEvent, useEffect, useRef } from "react";
import { useUser } from "@/context/userContext";
import { FetchExpenseCategories } from "@/data/expenseCategories";
import { useMutation } from "@apollo/client";
import { ADDNEWGOAL } from "@/lib/mutations/goal";
import React from "react";
import { GoalType } from "@/utils/types";
import { isGoalDataOkay } from "@/utils/goalDataChecker";
import { useToast } from "@/context/customToastContext";
import { MutationAddNewGoalArgs } from "@/__generated__/graphql";
import { FetchallUserGoals } from "@/data/allUserGoals";
const SetGoals = () => {
  const startMinimumDateRef = useRef<HTMLInputElement | null>(null);
  const { user } = useUser();
  //data mutations
  const { refetchGoals } = FetchallUserGoals(user?.user?.username);
  const [
    addNewGoal,
    { data, loading: addNewGoalLoading, error: addNewGoalError },
  ] = useMutation(ADDNEWGOAL, {
    onCompleted: () => {
      refetchGoals();
    },
  });

  // goalFormData
  const [goalFormData, setGoalFormData] = React.useState<GoalType>({
    goalAmount: "",
    goalCategory: "",
    goalEndDate: "",
    goalStartDate: "",
    goalType: "",
    goalDescription: "",
    goalReminderFreq: "",
  });
  const handleOnChange = (event: any) => {
    event.preventDefault();
    setGoalFormData({
      ...goalFormData,
      [event.target.name]: event.target.value,
    });
  };
  const { toast } = useToast();
  //backend integration
  const handleGoalSubmit = async () => {
    if (isGoalDataOkay(goalFormData) == "ErrorEmpty") {
      toast("Empty Fields in goal!", "warning", 2000);
      return;
    }
    if (isGoalDataOkay(goalFormData) == "ErrorAmount") {
      toast("Amount cannot be zero or negative!", "warning", 2000);
      return;
    }
    if (isGoalDataOkay(goalFormData) == "ErrorDate") {
      toast("Check you start date and end date", "warning", 2000);
      return;
    }
    if (isGoalDataOkay(goalFormData) == "Success") {
      console.log("Hi");
      setGoalFormData({
        goalAmount: "",
        goalCategory: "",
        goalEndDate: "",
        goalStartDate: "",
        goalType: "",
        goalDescription: "",
        goalReminderFreq: "",
      });
      try {
        // console.log(goalInput);
        // backend request
        const { data } = await addNewGoal({
          variables: {
            goal: {
              username: user?.user?.username,
              goalAmount: Number(goalFormData.goalAmount),
              goalCategory: goalFormData.goalCategory,
              goalStartDate: new Date(goalFormData.goalStartDate)
                .toISOString()
                .split("T")[0],
              goalEndDate: new Date(goalFormData.goalEndDate)
                .toISOString()
                .split("T")[0],
              goalDescription: goalFormData.goalDescription,
              goalType: goalFormData.goalType,
              goalReminderFreq: goalFormData.goalReminderFreq,
            },
          },
        });
        // console.log(data);
        if (data.addNewGoal.success) {
          toast(data?.addNewGoal?.message, "success", 2000);
        }
        if (!data.addNewGoal.success || addNewGoalError) {
          toast(data.addNewGoal.message, "info", 2000);
        }
      } catch (error) {
        toast("Server Not working!", "info", 2000);
        console.log(error);
      }
    }
  };
  const {
    expenseCategories,
    loading: ExpenseCategoryLoading,
    error,
  } = FetchExpenseCategories(user?.user?.username);
  const setMinDate = () => {
    let date = new Date();
    let month = date.getMonth().toString().padStart(2, "0");
    let year = date.getFullYear().toString();
    let day = date.getDate().toString().padStart(2, "0");

    let today = `${year}-${month}-${day}`;
    console.log(today);

    if (startMinimumDateRef.current) {
      startMinimumDateRef.current.setAttribute("min", today);
    }
  };
  useEffect(() => {
    setMinDate();
  }, []);
  if (ExpenseCategoryLoading || addNewGoalLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <span className="loading loading-ring loading-lg"></span>
      </div>
    );
  }
  return (
    <>
      <div className="flex justify-center">
        <div className="card bg-base-100 w-96 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Add a Goal!</h2>
            <p>
              Set your finacial goal's specify the dates, we will remind you
              about it!
            </p>
            <label className="input input-bordered flex items-center gap-2 mt-1.5">
              <Image
                src={"/rupees.svg"}
                height={18}
                width={18}
                alt="no"
              ></Image>
              <input
                type="number"
                className="grow"
                placeholder="Amount"
                name="goalAmount"
                onChange={handleOnChange}
                value={goalFormData.goalAmount}
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
                name="goalDescription"
                onChange={handleOnChange}
                value={goalFormData.goalDescription}
              />
            </label>
            <label htmlFor="start-date" className="text-sm font-medium">
              Starting Date of Goal
            </label>
            <label className="input input-bordered flex items-center gap-2 mt-1.5">
              <Image src={"/date.svg"} height={18} width={18} alt="no"></Image>
              <input
                type="date"
                className="grow"
                placeholder="Description"
                id="start-date"
                ref={startMinimumDateRef}
                name="goalStartDate"
                onChange={handleOnChange}
                value={goalFormData.goalStartDate}
              />
            </label>
            <label htmlFor="start-date" className="text-sm font-medium">
              End Date of Goal
            </label>
            <label className="input input-bordered flex items-center gap-2 mt-1.5">
              <Image src={"/date.svg"} height={18} width={18} alt="no"></Image>
              <input
                type="date"
                className="grow"
                placeholder="End Date"
                name="goalEndDate"
                ref={startMinimumDateRef}
                onChange={handleOnChange}
                value={goalFormData.goalEndDate}
              />
            </label>
            <select
              className="select select-bordered w-full max-w-xs mt-1.5"
              name="goalCategory"
              onChange={handleOnChange}
              value={goalFormData.goalCategory}
            >
              <option disabled value="">
                Select Category of Goal
              </option>
              {expenseCategories.map((expense) => (
                <option value={expense.category} key={expense.key}>
                  {expense.category}
                </option>
              ))}
            </select>
            <select
              className="select select-bordered w-full max-w-xs mt-1.5"
              name="goalType"
              onChange={handleOnChange}
              value={goalFormData.goalType}
            >
              <option disabled value="">
                Choose Goal Type
              </option>
              {/* <option value={"Saving Goal"}>Saving Goal</option> */}
              <option value={"Spending Goal"}>Spending Goal</option>
            </select>
            <select
              className="select select-bordered w-full max-w-xs mt-1.5"
              name="goalReminderFreq"
              value={goalFormData.goalReminderFreq} // Bind to the current state
              onChange={handleOnChange}
            >
              <option disabled value="">
                Choose your Reminder frequency
              </option>
              <option value="Daily">Daily</option>
              <option value="Weekly">Weekly</option>
              <option value="Monthly">Monthly</option>
              <option value="Yearly">Yearly</option>
            </select>

            <div className="card-actions justify-end">
              <button
                className="btn btn-primary mt-1.5"
                disabled={addNewGoalLoading || ExpenseCategoryLoading}
                onClick={handleGoalSubmit}
              >
                {addNewGoalLoading ? "Loading..." : "Meowww"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SetGoals;
