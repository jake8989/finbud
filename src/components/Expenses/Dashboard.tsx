import exp from "constants";
import DashboardMonthlyExpenseChart from "../Charts/DashboardMonthlyExpense";
import FinancialGoalsChart from "../Charts/DashboardGoalPolarGraph";
import DashboardExpenseReportCategorywise from "../Charts/DashboardExpenseReportCategorywise";
import DashboardGoalChart from "../Charts/DashboardGoalChart";
const Dashboard = () => {
  return (
    <div>
      <div className="flex justify-center items-center ">
        <div className="flex w-[50%]">
          <DashboardMonthlyExpenseChart></DashboardMonthlyExpenseChart>
        </div>
        <div className="flex w-[50%]">
          <DashboardExpenseReportCategorywise></DashboardExpenseReportCategorywise>
        </div>
      </div>
      <div className="flex w-[100%] h-[300px]">
        <DashboardGoalChart></DashboardGoalChart>
      </div>
    </div>
  );
};
export default Dashboard;
