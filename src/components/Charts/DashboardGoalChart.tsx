import Image from "next/image";
import EditGoal from "../Modal/EditGoal";
import React, { useEffect } from "react";
import { useState } from "react";
import { GET_ALL_USER_GOALS } from "@/lib/queries/getAllUserGoals";
import { useQuery } from "@apollo/client";
import { useUser } from "@/context/userContext";
import { Loading } from "../Loading/Loading";
import { FetchallUserGoals } from "@/data/allUserGoals";
import { LoadingBar } from "../Loading/LoadingBar";
const DashboardGoalChart = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [goalId, setGoalId] = useState<string | null>(null);
  const handleClose = () => {
    setIsOpen(false);
  };

  const { user, userLoading } = useUser();
  if (userLoading) {
    return <LoadingBar></LoadingBar>;
  }
  const { data, loading, error } = FetchallUserGoals(user?.user?.username);
  const handleOpenAndGoalSelect = (goalId: string) => {
    setIsOpen(true);
    setGoalId(goalId);
  };
  if (loading) {
    return <Loading></Loading>;
  }
  if (!data || error) {
    return <h1>Error Loading Goals Please login again to continue!</h1>;
  }
  if (!data.getAllUserGoals.success) {
    return <h1>Something went wrong please login again!</h1>;
  }
  if (data && data?.getAllUserGoals?.allUserGoals?.length == 0) {
    return (
      <p className="text-center m-[50px]">
        Currently no goals available! you can have at most 6 goals
      </p>
    );
  }
  if (error || data?.getAllUserGoals?.success == false) {
    return <h1>Error Loading Goals Please login again to continue!</h1>;
  }
  return (
    <>
      <div className="flex m-[50px] flex-wrap">
        {data?.getAllUserGoals?.allUserGoals.map((goal) => (
          <div
            className="card bg-neutral text-neutral-content w-60 h-[230px] relative m-[5px]"
            key={goal.goalId}
          >
            <div
              className="tooltip tooltip-hover tooltip-primary tooltip-center"
              data-tip="Edit Goal"
            >
              <button
                className="btn btn-ghost absolute top-2 right-2"
                onClick={() => handleOpenAndGoalSelect(goal.goalId)}
              >
                <Image
                  src="/edit-button.svg"
                  height={25}
                  width={25}
                  alt="edit-button"
                ></Image>
              </button>
            </div>

            <div className="card-body items-center text-center">
              <h2 className="card-title">Goal {goal.goalId}</h2>
              {/* <p className="text-[12px]">{goal.goalDescription}</p> */}
              {goal.goalType === "Spending Goal" && (
                <div className="badge badge-error gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    className="inline-block h-4 w-4 stroke-current"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    ></path>
                  </svg>
                  Spending Goal
                </div>
              )}
              {goal.goalType === "Saving Goal" && (
                <div className="badge badge-success gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    className="inline-block h-4 w-4 stroke-current"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    ></path>
                  </svg>
                  Saving Goal
                </div>
              )}

              <p className="flex justify-center items-center">
                <Image
                  src={"rupees.svg"}
                  height={18}
                  width={18}
                  alt="Rupees"
                ></Image>
                {goal.goalAmount}
              </p>
              <p>
                <p className="text-[11px]">
                  <strong>Start Date: {goal.goalStartDate}</strong>{" "}
                </p>
                <p className="text-[11px]">
                  <strong>End Date: {goal.goalEndDate}</strong>{" "}
                </p>
                <p className="text-[11px] mt-[10px]">
                  <div className="badge badge-primary badge-outline">
                    Goal Category: {goal.goalCategory}
                  </div>
                </p>
              </p>
            </div>
            <EditGoal
              isOpen={isOpen}
              handleClose={handleClose}
              goalId={goalId}
            ></EditGoal>
          </div>
        ))}
      </div>
    </>
  );
};

export default DashboardGoalChart;
