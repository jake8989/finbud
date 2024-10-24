import SetGoals from "../Expenses/SetGoals";
import AddExp from "../Expenses/AddExpense";
import Dashboard from "../Expenses/Dashboard";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Image from "next/image";
import ExpenseCategories from "../Expenses/ExpenseCategories";
const TrackerDrawer = () => {
  const [whichComponent, setWhichComponent] = useState("Dashboard");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    // Set the initial state based on the cookie if available
    const componentFromCookie = Cookies.get("expense-panel");
    if (componentFromCookie) {
      setWhichComponent(componentFromCookie);
    }
    setTimeout(() => setLoading(false), 500);
  }, []);
  //switching between panels
  const renderComponent = () => {
    switch (whichComponent) {
      case "Dashboard": {
        return <Dashboard />;
      }
      case "AddExp": {
        return <AddExp />;
      }
      case "SetGoals": {
        return <SetGoals />;
      }
      case "ExpenseCategories": {
        return <ExpenseCategories />;
      }
      default:
        return <Dashboard />;
    }
  };
  //   <span className="loading loading-ring loading-lg"></span>
  const handlePanelChange = (panel: string) => {
    if (panel == "Dashboard") {
      setLoading(true);
      Cookies.set("expense-panel", "Dashboard", { expires: 7 });
      setWhichComponent("Dashboard");
    } else if (panel == "AddExp") {
      setLoading(true);
      Cookies.set("expense-panel", "AddExp", { expires: 7 });
      setWhichComponent("AddExp");
    } else if (panel == "SetGoals") {
      setLoading(true);
      Cookies.set("expense-panel", "SetGoals", { expires: 7 });
      setWhichComponent("SetGoals");
    } else if (panel === "ExpenseCategories") {
      setLoading(true);
      Cookies.set("expense-panel", "ExpenseCategories", { expires: 7 });
      setWhichComponent("ExpenseCategories");
    }
    setTimeout(() => setLoading(false), 500);
  };

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content lg:block">
        {/* Page content here */}

        {loading ? (
          <div className="flex justify-center items-center h-full">
            <span className="loading loading-ring loading-lg"></span>
          </div>
        ) : (
          renderComponent()
        )}
      </div>
      <div className="drawer-side h-[93.5vh] rounded-tr-[10px]">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu bg-base-200 text-base-content min-h-full w-[200px] p-4">
          {/* Sidebar content here */}
          <li>
            <button
              className="btn btn-ghost"
              onClick={() => handlePanelChange("Dashboard")}
            >
              Dashboard
            </button>
          </li>
          <li>
            <button
              className="btn btn-ghost"
              onClick={() => handlePanelChange("AddExp")}
            >
              Add Expense
            </button>
          </li>
          <li>
            <button
              className="btn btn-ghost"
              onClick={() => handlePanelChange("SetGoals")}
            >
              Set Goals
            </button>
            <button
              className="btn btn-ghost"
              onClick={() => handlePanelChange("ExpenseCategories")}
            >
              Expense Categories
            </button>
          </li>
        </ul>
      </div>
      <label
        htmlFor="my-drawer-2"
        className="btn btn-ghost drawer-button lg:hidden"
      >
        <Image src="/hams.svg" height={20} width={20} alt="no"></Image>
      </label>
    </div>
  );
};
export default TrackerDrawer;
