import exp from "constants";
import DashboardMonthlyExpenseChart from "../Charts/DashboardMonthlyExpense";
import FinancialGoalsChart from "../Charts/DashboardGoalPolarGraph";
import DashboardExpenseReportCategorywise from "../Charts/DashboardExpenseReportCategorywise";
const Dashboard = () => {
  return (
    <div className="flex">
      <div className="flex w-[50%]">
        <DashboardMonthlyExpenseChart></DashboardMonthlyExpenseChart>
      </div>
      <div className="flex w-[50%]">
        <DashboardExpenseReportCategorywise></DashboardExpenseReportCategorywise>
      </div>
    </div>
  );
};
export default Dashboard;
