import exp from "constants";
import DashboardMonthlyExpenseChart from "../Charts/DashboardMonthlyExpense";
import DashboardExpenseReportCategorywise from "../Charts/DashboardExpenseReportCategorywise";
import DashboardGoalChart from "../Charts/DashboardGoalChart";
import Image from "next/image";
import { useFetchMonthlyExpenseData } from "@/data/monthlyExpenseData";
import { useFetchMonthlyData } from "@/data/monthlyData";
import { useUser } from "@/context/userContext";
import { FetchallUserGoals } from "@/data/allUserGoals";
import Cookies from "js-cookie";

import React from "react";
const Dashboard = () => {
  const { user } = useUser();
  const [buttonVisible, setButtonVisible] = React.useState<boolean>(true);

  const year = new Date().getFullYear().toString();

  const { refetchCategoryWiseExpense } = useFetchMonthlyExpenseData(
    year,
    user?.user?.username
  );
  const { refetchMonthlyData } = useFetchMonthlyData(
    year,
    user?.user?.username
  );
  const { refetchGoals } = FetchallUserGoals(user?.user?.username);
  const handleRefreshGraphs = (username: string) => {
    const time = new Date();
    Cookies.set("refresh_graphs", time.getTime().toString(), {
      expires: 5 / (24 * 60),
    });
    console.log("Updating");
    refetchCategoryWiseExpense();
    refetchMonthlyData();
    refetchGoals();
    setButtonVisible(false);
  };
  React.useEffect(() => {
    const startTime = Cookies.get("refresh_graphs");
    if (startTime) {
      const interval = setInterval(() => {
        // console.log("Hii");
        const timeElapsed =
          (new Date().getTime() - parseInt(startTime, 10)) / 1000;
        if (timeElapsed >= 100) {
          setButtonVisible(true);
          // console.log("hii");
          // clearInterval(interval);
        } else {
          setButtonVisible(false);
        }
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [Cookies.get("refresh_graphs")]);
  return (
    <div>
      <div className="flex justify-center">
        {buttonVisible && (
          <button
            className="btn btn-ghost hover:bg-transparent hover:text-inherit"
            onClick={() => handleRefreshGraphs(user?.user?.username)}
          >
            <Image
              src="/update.png"
              height={35}
              width={35}
              alt="Refresh Icon"
            ></Image>
          </button>
        )}
        {/* {!buttonVisible && <p>Button will show after 5 minutes</p>} */}
      </div>
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
