import Image from "next/image";
import EditGoal from "../Modal/EditGoal";
import React from "react";
import { useState } from "react";
import { GET_ALL_USER_GOALS } from "@/lib/queries/getAllUserGoals";
import { useQuery } from "@apollo/client";
import { useUser } from "@/context/userContext";
import { Loading } from "../Loading/Loading";
const DashboardGoalChart = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const handleClose = () => {
    setIsOpen(false);
  };
  const { user } = useUser();
  const { data, loading, error } = useQuery(GET_ALL_USER_GOALS, {
    variables: { username: user.user.username },
    fetchPolicy: "cache-first",
  });
  const [allUserGoals, setAllUserGoals] = React.useState([]);
  if (loading) {
    return <Loading></Loading>;
  }
  return (
    <>
      <div className="flex m-[50px] flex-wrap">
        {data?.getAllUserGoals?.allUserGoals.map((goal) => (
          <div className="card bg-neutral text-neutral-content w-60 h-[230px] relative m-[5px]">
            <div
              className="tooltip tooltip-hover tooltip-primary tooltip-center"
              data-tip="Edit Goal"
            >
              <button
                className="btn btn-ghost absolute top-2 right-2"
                onClick={() => setIsOpen(true)}
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
              <p className="text-[12px]">{goal.goalDescription}</p>
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
                <p className="text-[10px]">
                  <strong>Start Date: {goal.goalStartDate}</strong>{" "}
                </p>
                <p className="text-[10px]">
                  <strong>End Date: {goal.goalEndDate}</strong>{" "}
                </p>
              </p>
            </div>
            <EditGoal
              isOpen={isOpen}
              handleClose={handleClose}
              goalId={"1"}
            ></EditGoal>
          </div>
        ))}
      </div>
    </>
  );
};

export default DashboardGoalChart;
