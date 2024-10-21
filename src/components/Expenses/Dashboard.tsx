import exp from "constants";
import DashboardMonthlyExpenseChart from "../Charts/DashboardMonthlyExpense";
import FinancialGoalsChart from "../Charts/DashboardGoalPolarGraph";
const Dashboard = () => {
  return (
    <div className="flex">
      <div className="flex w-[50%]">
        <DashboardMonthlyExpenseChart></DashboardMonthlyExpenseChart>
      </div>
      <div className="flex w-[50%]">
        <FinancialGoalsChart></FinancialGoalsChart>
      </div>
    </div>
  );
};
export default Dashboard;
