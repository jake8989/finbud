const ExpenseCategories = () => {
  return (
    <>
      <div className="flex justify-center">
        <div className="card bg-base-100 w-96 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Add an Expense Category!</h2>
            <p>Set Your Own Expense Categories</p>

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
                placeholder="Expense Category"
              />
            </label>

            <div className="card-actions justify-end">
              <button className="btn btn-primary mt-1.5">Meowww</button>
            </div>
          </div>
        </div>
        {/* //expense categories card show */}
        {/* <div
          className="card bg-primary text-primary-content w-96 overflow-y-auto h-64"
          style={{ scrollbarWidth: "thin", scrollbarColor: "gray lightgray" }}
        >
          <div className="card-body ">
            <h2 className="card-title">your Expense Categories!</h2>
            <p>Groceries</p>
            <p>Groceries</p>
            <p>Groceries</p>
            <p>Groceries</p>
            <p>Groceries</p>
            <p>Groceries</p>
            <p>Groceries</p>
            <p>Groceries</p>
            <p>Groceries</p>
            <p>Groceries</p>
          </div>
        </div> */}
      </div>
    </>
  );
};
export default ExpenseCategories;
