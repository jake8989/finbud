import { GoalType } from "./types";
export const isGoalDataOkay = (goalData: GoalType) => {
  //
  // console.log(goalData);
  const {
    goalAmount,
    goalCategory,
    goalDescription,
    goalReminderFreq,
    goalEndDate,
    goalStartDate,
    goalType,
  } = goalData;
  if (
    goalCategory.trim() === "" ||
    goalDescription.trim() === "" ||
    goalEndDate.trim() === "" ||
    goalStartDate.trim() === "" ||
    goalType.trim() === "" ||
    goalReminderFreq.trim() === ""
  ) {
    return "ErrorEmpty";
  }
  if (Number(goalAmount) <= 0) {
    return "ErrorAmount";
  }
  //   console.log(goalStartDate, goalEndDate);
  const [sdyear, sdmonth, sdday] = goalStartDate.split("-").map(Number);
  const [edyear, edmonth, edday] = goalEndDate.split("-").map(Number);

  //check for start date and end date of the goal
  if (sdyear > edyear || sdmonth > edmonth) {
    return "ErrorDate";
  }
  if (sdmonth === edmonth && sdday > edday) {
    return "ErrorDate";
  }
  return "Success";
};
