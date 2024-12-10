import exp from "constants";
import DashboardMonthlyExpenseChart from "../Charts/DashboardMonthlyExpense";
import DashboardExpenseReportCategorywise from "../Charts/DashboardExpenseReportCategorywise";
import DashboardGoalChart from "../Charts/DashboardGoalChart";
const Dashboard = () => {
  return (
    <div>
      <div className="flex justify-center items-center flex-wrap">
        <div className="flex w-[100%] md:w-[50%]">
          <DashboardMonthlyExpenseChart></DashboardMonthlyExpenseChart>
        </div>
        <div className="flex w-[100%] mt-[100px] md:w-[50%] md:mt-[0px]">
          <DashboardExpenseReportCategorywise></DashboardExpenseReportCategorywise>
        </div>
      </div>
      <div className="flex w-[100%] mt-[100px] mb-[100px] justify-center items-center">
        <DashboardGoalChart></DashboardGoalChart>
      </div>
    </div>
  );
};
export default Dashboard;
