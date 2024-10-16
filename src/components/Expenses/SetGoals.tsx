// src/components/Expenses/SetGoals.tsx
import expenseCategories from "@/data/expenseCategories";
import styles from "@/styles/solar.module.css"; // Import as an object
import Image from "next/image";

const SetGoals = () => {
  //for solar galaxy stars

  return (
    <>
      <div className="flex justify-center">
        <div className="card bg-base-100 w-96 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Add a Goal!</h2>
            <p>
              Set your finacial goal's specify the dates, we will remind you
              about it!
            </p>
            <p className="text-[12px]">
              *starting date of the goal is today itself
            </p>
            <label className="input input-bordered flex items-center gap-2 mt-1.5">
              <Image
                src={"/rupees.svg"}
                height={18}
                width={18}
                alt="no"
              ></Image>
              <input type="number" className="grow" placeholder="Amount" />
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
              <input type="text" className="grow" placeholder="Description" />
            </label>

            <label className="input input-bordered flex items-center gap-2 mt-1.5">
              <Image src={"/date.svg"} height={18} width={18} alt="no"></Image>
              <input type="date" className="grow" placeholder="Description" />
            </label>

            <select className="select select-bordered w-full max-w-xs mt-1.5">
              <option disabled selected>
                Select Category of Expense
              </option>
              {expenseCategories.map((expense) => (
                <option value="" key={expense.key}>
                  {expense.category}
                </option>
              ))}
            </select>
            <select className="select select-bordered w-full max-w-xs mt-1.5">
              <option disabled selected>
                Choose your Reminder frequency
              </option>
              <option value="">Daily</option>
              <option value="">Weekly</option>
              <option value="">Monthly</option>
              <option value="">Yearly</option>
            </select>

            <div className="card-actions justify-end">
              <button className="btn btn-primary mt-1.5">Meowww</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SetGoals;
