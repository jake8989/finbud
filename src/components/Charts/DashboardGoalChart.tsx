// The main component rendering the chart
import Image from "next/image";
const DashboardGoalChart = () => {
  return (
    <>
      <div className="flex m-[50px]">
        <div className="card bg-neutral text-neutral-content w-60 h-[230px] relative m-[5px]">
          {/* Button positioned absolutely at the top-right */}

          <div
            className="tooltip tooltip-hover tooltip-primary tooltip-center"
            data-tip="Edit Goal"
          >
            <button className="btn btn-ghost absolute top-2 right-2">
              <Image
                src="/edit-button.svg"
                height={25}
                width={25}
                alt="edit-button"
              ></Image>
            </button>
          </div>

          <div className="card-body items-center text-center">
            <h2 className="card-title">Goal 1</h2>
            <p className="text-[12px]">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente
              quam voluptas aut.
            </p>
            <p className="flex">
              {" "}
              <Image
                src={"rupees.svg"}
                height={20}
                width={20}
                alt="Rupees"
              ></Image>
              12000{" "}
            </p>
            <p>
              <p className="text-[10px]">
                <strong>Start Date:{"23-01-2024"}</strong>{" "}
              </p>
              <p className="text-[10px]">
                <strong>End Date:{"23-01-2024"}</strong>{" "}
              </p>
            </p>
          </div>
        </div>
        <div className="card bg-neutral text-neutral-content w-60 h-[230px] relative m-[5px]">
          {/* Button positioned absolutely at the top-right */}
          <div
            className="tooltip tooltip-hover tooltip-primary tooltip-center"
            data-tip="Edit Goal"
          >
            <button className="btn btn-ghost absolute top-2 right-2">
              <Image
                src="/edit-button.svg"
                height={25}
                width={25}
                alt="edit-button"
              ></Image>
            </button>
          </div>

          <div className="card-body items-center text-center">
            <h2 className="card-title">Goal 2</h2>
            <p className="text-[12px]">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente
              quam voluptas aut.
            </p>
            <p className="flex">
              {" "}
              <Image
                src={"rupees.svg"}
                height={20}
                width={20}
                alt="Rupees"
              ></Image>
              12000{" "}
            </p>
            <p>
              <p className="text-[10px]">
                <strong>Start Date:{"23-01-2024"}</strong>{" "}
              </p>
              <p className="text-[10px]">
                <strong>End Date:{"23-01-2024"}</strong>{" "}
              </p>
            </p>
          </div>
        </div>
        <div className="card bg-neutral text-neutral-content w-60 h-[230px] relative m-[5px]">
          {/* Button positioned absolutely at the top-right */}
          <div
            className="tooltip tooltip-hover tooltip-primary tooltip-center"
            data-tip="Edit Goal"
          >
            <button className="btn btn-ghost absolute top-2 right-2">
              <Image
                src="/edit-button.svg"
                height={25}
                width={25}
                alt="edit-button"
              ></Image>
            </button>
          </div>

          <div className="card-body items-center text-center">
            <h2 className="card-title">Goal 3</h2>
            <p className="text-[12px]">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Repudiandae totam adipisci neque voluptatum, est quae!
            </p>
            <p className="flex">
              {" "}
              <Image
                src={"rupees.svg"}
                height={20}
                width={20}
                alt="Rupees"
              ></Image>
              12000{" "}
            </p>
            <p>
              <p className="text-[10px]">
                <strong>Start Date:{"23-01-2024"}</strong>{" "}
              </p>
              <p className="text-[10px]">
                <strong>End Date:{"23-01-2024"}</strong>{" "}
              </p>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardGoalChart;
