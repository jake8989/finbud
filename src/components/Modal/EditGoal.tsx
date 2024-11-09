import React, { ChangeEvent } from "react";
import Image from "next/image";
import AreYouSure from "./AreYouSure";
import { useState } from "react";
import { EDITGOAL } from "@/lib/mutations/goal";
import { useMutation } from "@apollo/client";
import { EditGoalFormType } from "@/utils/types";
import { useUser } from "@/context/userContext";
import { FetchallUserGoals } from "@/data/allUserGoals";
import { GET_ALL_USER_GOALS } from "@/lib/queries/getAllUserGoals";
import { useToast } from "@/context/customToastContext";
interface EditGoalProps {
  isOpen: boolean;
  handleClose: () => void;
  goalId: string;
}
const EditGoal: React.FC<EditGoalProps> = ({ isOpen, handleClose, goalId }) => {
  const { user, userLoading } = useUser();
  if (userLoading) {
    return <p>Context Loading...</p>;
  }
  const [isSureModalOpen, setIsSureModalOpen] = useState<boolean>(false);
  const handleSureClose = () => {
    setIsSureModalOpen(false);
  };
  const handleBothModals = () => {
    setIsSureModalOpen(true);
  };
  const [editForm, setEditForm] = React.useState<EditGoalFormType>({
    goalAmount: null,
    goalDescription: null,
    goalEndDate: null,
  });
  const { toast } = useToast();
  const { refetchGoals } = FetchallUserGoals(user?.user?.username);
  //now i can update the cache here
  const [editGoal, { data, loading, error }] = useMutation(EDITGOAL, {
    update(cache, { data: { editGoal } }) {
      if (editGoal?.success == false) {
        return;
      }
      if (editGoal?.success) {
        const existingGoals: any = cache.readQuery({
          query: GET_ALL_USER_GOALS,
          variables: user?.user?.username,
        });
        if (existingGoals) {
          const updatedGoals = existingGoals.getAllUserGoals.allUserGoals.map(
            (goal) => {
              goal.goalId === editGoal.goal.goalId ? editGoal.goal : goal;
            }
          );
          cache.writeQuery({
            query: GET_ALL_USER_GOALS,
            variables: user?.user?.username,
            data: {
              getAllUserGoals: {
                ...existingGoals.getAllUserGoals,
                allUserGoals: updatedGoals,
              },
            },
          });
        }
      }
    },
    onCompleted: () => {
      refetchGoals();
    },
  });

  const handleEditFormChange = (event: any) => {
    event.preventDefault();
    setEditForm({ ...editForm, [event.target.name]: event.target.value });
  };
  const handleEditThisGoal = async () => {
    // console.log(editForm);
    var allEmpty = false;
    if (
      !editForm.goalAmount &&
      !editForm.goalDescription &&
      !editForm.goalEndDate
    ) {
      allEmpty = true;
      // return;
    }
    if (allEmpty) {
      toast("At least fill one field to edit the goal!", "info", 3000);
      return;
    }

    await editGoal({
      variables: {
        goal: {
          goalId: goalId,
          username: user?.user?.username,
          goalAmount: Number(editForm.goalAmount),
          goalDescription: editForm.goalDescription,
          goalEndDate: editForm.goalEndDate,
        },
      },
    });
    toast(data?.editGoal?.message, "success", 4000);
    handleClose();
  };

  return (
    <>
      <dialog
        id="my_modal_1"
        className={`modal ${isOpen !== false ? "modal-open" : ""}`}
      >
        <div className="modal-box">
          <h3 className="font-bold text-lg text-center">Edit Goal</h3>
          <p className="">Input whatever changes you want to change in goal!</p>

          <div className="mt-2">
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
                placeholder="Change Goal Amount"
                name="goalAmount"
                onChange={handleEditFormChange}
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
                placeholder="Change Description"
                name="goalDescription"
                onChange={handleEditFormChange}
              />
            </label>
            <label className="input input-bordered flex items-center gap-2 mt-1.5">
              <Image src={"/date.svg"} height={18} width={18} alt="no"></Image>
              <label>Change End Date: </label>
              <input
                type="date"
                className="grow"
                placeholder="Change Goal Date"
                name="goalEndDate"
                onChange={handleEditFormChange}
              />
            </label>

            <div className="mt-2"></div>
            <button
              className="btn btn-primary"
              onClick={handleEditThisGoal}
              disabled={loading}
            >
              {loading ? "Loading..." : "Meowww"}
            </button>
            <button
              className="btn btn-warning ml-2"
              onClick={handleBothModals}
              disabled={loading}
            >
              Delete This Goal
            </button>
            <button
              className="btn ml-2"
              onClick={() => handleClose()}
              disabled={loading}
            >
              Close
            </button>
          </div>
        </div>
        <AreYouSure
          isSureModalOpen={isSureModalOpen}
          handleSureClose={handleSureClose}
          goalIdToBeDeleted={goalId}
          handleClose={handleClose}
        ></AreYouSure>
      </dialog>
    </>
  );
};
export default EditGoal;
