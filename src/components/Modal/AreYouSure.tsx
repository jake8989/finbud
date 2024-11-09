import React from "react";
import Image from "next/image";
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
    handleClose();
  };
  // console.log(goalIdToBeDeleted);
  return (
    <>
      <dialog
        id="my_modal_1"
        className={`modal ${isSureModalOpen !== false ? "modal-open" : ""}`}
      >
        <div>
          <div>
            <button className="btn btn-info ml-2">Okay! Delete It</button>
            <button className="btn ml-2" onClick={handleModals}>
              Close
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
};
export default AreYouSure;
