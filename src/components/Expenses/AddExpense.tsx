import Image from "next/image";
import expenseCategories from "@/data/expenseCategories";
import styles from "@/styles/solar.module.css";
const AddExp = () => {
  return (
    //for solar galaxy stars
    // <div className={styles.parent}>
    //   <link
    //     href="https://fonts.googleapis.com/css?family=Lato:300,400,700"
    //     rel="stylesheet"
    //     type="text/css"
    //   />
    //   <div id={styles.stars} /> <div id={styles.stars2} />
    //   <div id={styles.stars3} />
    //   <div id={styles.title}></div>
    <div className="flex justify-center">
      <div className="card bg-base-100 w-96 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Add Expense!</h2>
          <p>Enter the amount and select the category</p>
          <label className="input input-bordered flex items-center gap-2 mt-1.5">
            <Image src={"/rupees.svg"} height={18} width={18} alt="no"></Image>
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

          <div className="card-actions justify-end">
            <button className="btn btn-primary mt-1.5">Meowww</button>
          </div>
        </div>
      </div>
    </div>
    // </div>
  );
};
export default AddExp;
