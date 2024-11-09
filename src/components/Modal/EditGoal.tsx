import React from "react";
import Image from "next/image";
import AreYouSure from "./AreYouSure";
import { useState } from "react";
import { EDITGOAL } from "@/lib/mutations/goal";
import { useMutation } from "@apollo/client";
interface EditGoalProps {
  isOpen: boolean;
  handleClose: () => void;
  goalId: string;
}
const EditGoal: React.FC<EditGoalProps> = ({ isOpen, handleClose, goalId }) => {
  const [isSureModalOpen, setIsSureModalOpen] = useState<boolean>(false);
  const handleSureClose = () => {
    setIsSureModalOpen(false);
  };
  const handleBothModals = () => {
    setIsSureModalOpen(true);
  };
  const handleEditThisGoal = () => {
    console.log(goalId);
  };

  return (
    <>
      <dialog
        id="my_modal_1"
        className={`modal ${isOpen !== false ? "modal-open" : ""}`}
      >
        <div className="modal-box">
          <h3 className="font-bold text-lg text-center">Edit Goal</h3>
          <p className="text-center">
            Input whatever changes you want to change in goal!
          </p>

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
              />
            </label>
            <label className="input input-bordered flex items-center gap-2 mt-1.5">
              <Image src={"/date.svg"} height={18} width={18} alt="no"></Image>
              <label>Change End Date: </label>
              <input
                type="date"
                className="grow"
                placeholder="Change Goal Date"
                name="end-date"
              />
            </label>

            <div className="mt-2"></div>
            <button className="btn btn-primary" onClick={handleEditThisGoal}>
              Meowwww
            </button>
            <button className="btn btn-warning ml-2" onClick={handleBothModals}>
              Delete This Goal
            </button>
            <button className="btn ml-2" onClick={() => handleClose()}>
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
