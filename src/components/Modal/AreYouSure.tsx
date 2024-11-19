import React from "react";
import Image from "next/image";
import { DELETEGOAL } from "@/lib/mutations/goal";
import { useMutation } from "@apollo/client";
import { useUser } from "@/context/userContext";
import { Loading } from "../Loading/Loading";
import { useToast } from "@/context/customToastContext";
import { FetchallUserGoals } from "@/data/allUserGoals";
import { LoadingBar } from "../Loading/LoadingBar";
import { GET_ALL_USER_GOALS } from "@/lib/queries/getAllUserGoals";
interface DeleteGoalProps {
  isSureModalOpen: boolean;
  handleSureClose: () => void;
  goalIdToBeDeleted: string;
  handleClose: () => void;
}
const AreYouSure: React.FC<DeleteGoalProps> = ({
  isSureModalOpen,
  handleSureClose,
  goalIdToBeDeleted,
  handleClose,
}) => {
  const handleModals = () => {
    handleSureClose();
  };
  const { user, userLoading } = useUser();
  if (userLoading) {
    return <LoadingBar></LoadingBar>;
  }
  const { toast } = useToast();
  const { refetchGoals } = FetchallUserGoals(user?.user?.username);
  const [deleteGoal, { data, loading, error }] = useMutation(DELETEGOAL, {
    update(cache, { data: { deleteGoal } }) {
      if (deleteGoal?.success) {
        const existingGoals: any = cache.readQuery({
          query: GET_ALL_USER_GOALS,
          variables: { username: user?.user?.username },
        });
        if (!existingGoals || !existingGoals.getAllUserGoals?.allUserGoals) {
          return;
        }
        const newGoals = existingGoals.getAllUserGoals?.allUserGoals.filter(
          (goal) => goal.goalId != goalIdToBeDeleted
        );
        cache.writeQuery({
          query: GET_ALL_USER_GOALS,
          variables: { username: user?.user?.username },
          data: {
            getAllUserGoals: {
              success: deleteGoal.success,
              message: deleteGoal.message,
              allUserGoals: newGoals,
            },
          },
        });
      }
    },
    onCompleted: () => {
      refetchGoals();
    },
  });
  const handleDeleteGoal = async () => {
    console.log(goalIdToBeDeleted);
    try {
      await deleteGoal({
        variables: {
          goal: {
            goalId: goalIdToBeDeleted,
            username: user?.user?.username,
          },
        },
      });
      if (!loading) {
        toast("Goal Deleted Successfully!", "success", 2000);
        handleClose();
        handleSureClose();
      }
    } catch (error) {
      toast(error, "success", 2000);
    }
  };
  if (error) {
    toast("Server Error!", "warning", 2000);
    return;
  }
  return (
    <>
      <dialog
        id="my_modal_1"
        className={`modal ${isSureModalOpen !== false ? "modal-open" : ""}`}
      >
        <div>
          <div>
            <button
              className="btn btn-info ml-2"
              onClick={handleDeleteGoal}
              disabled={loading}
            >
              {loading ? "Loading..." : " Okay! Delete It"}
            </button>
            <button
              className="btn ml-2"
              onClick={handleModals}
              disabled={loading}
            >
              Close
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
};
export default AreYouSure;
