import Image from "next/image";
import React from "react";
import { useUser } from "@/context/userContext";
import { useToast } from "@/context/customToastContext";
import { GENERATE_REPORT } from "@/lib/queries/generateReport";
import { useQuery } from "@apollo/client";
interface ReportGenerationForm {
  username: string;
  month: string;
  year: string;
}
export const MontlyReports = () => {
  const { user } = useUser();
  const { toast } = useToast();
  const [reportForm, setReportForm] = React.useState<ReportGenerationForm>({
    username: user?.user?.username,
    month: "",
    year: "",
  });
  const handleOnChange = (event: any) => {
    event.preventDefault();
    setReportForm({ ...reportForm, [event.target.name]: event.target.value });
    console.log(reportForm);
  };
  const handleSubmit = () => {
    if (reportForm.month === "") {
      toast("Please Provide Month!", "error", 2000);
      return;
    }
    if (reportForm.year === "") {
      toast("Please Provide Year!", "error", 2000);
      return;
    }
    if (reportForm.username === "") {
      toast("Please Login/Signup to continue!", "error", 2000);
      return;
    }
    // console.log(reportForm);
  };

  let years = [];
  const date = new Date().toDateString();
  const currentYear = new Date().getFullYear();
  for (let yr = currentYear - 10; yr <= currentYear; yr++) years.push(yr);

  return (
    <div className="flex flex-col bg-base-100 rounded-box items-center h-[93vh]">
      {/* <!-- Image --> */}
      <div className="bg-[url('/reports.jpg')] bg-cover bg-center rounded-t-box w-full h-72"></div>

      {/* <!-- Body--> */}
      <div className="flex flex-col gap-6 p-6">
        <h3 className="text-primary font-medium">
          Track Your Journey, One Report at a Time!
        </h3>

        <a className="link link-hover text-xl font-bold">
          Generate and View Your Monthly Reports
        </a>

        <span>
          When generating the report, the data will be captured starting from
          today's date and will only include records for the current month. This
          allows you to view and analyze expenses from the beginning of the
          month up to today, giving you a clear picture of your recent spending
          patterns and helping you make informed decisions based on the most
          up-to-date information.
        </span>
        {/* <span>
          *As a guest user, you are allowed to generate a maximum of 2 reports
          per month. This limitation ensures that the system remains efficient
          for all users. If you require more reports, we encourage you to
          consider upgrading to a registered user account, where you can
          generate up to 10 reports each month.
        </span> */}
        <div className="flex gap-2 flex-wrap">
          <select
            className="select select-bordered w-full max-w-xs mt-1.5"
            name="month"
            onChange={handleOnChange}
            // value={income.category}
          >
            <option selected value="">
              Select Month
            </option>
            <option value="1">January</option>
            <option value="2">February</option>
            <option value="3">March</option>
            <option value="4">April</option>
            <option value="5">May</option>
            <option value="6">June</option>
            <option value="7">July</option>
            <option value="8">August</option>
            <option value="9">September</option>
            <option value="10">October</option>
            <option value="11">November</option>
            <option value="12">December</option>
          </select>

          <select
            className="select select-bordered w-full max-w-xs mt-1.5"
            name="year"
            onChange={handleOnChange}
          >
            <option selected value="">
              Select Year
            </option>
            {years.map((year) => (
              <option value={year} key={year}>
                {year}
              </option>
            ))}
          </select>

          <button className="btn btn-primary mt-1.5" onClick={handleSubmit}>
            Generate Report
          </button>
        </div>
        {/* <div className="flex gap-6"></div> */}

        <div className="flex gap-2 justify-between items-center">
          <a className="btn btn-ghost">
            <img alt="Profile" src="/logo.svg" className="w-8 rounded-full" />

            <span className="font-large text-md">FinBud</span>
          </a>

          <span className="text-sm">{date}</span>
        </div>
      </div>
    </div>
  );
};
