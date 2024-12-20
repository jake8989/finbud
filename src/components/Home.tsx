import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useTheme } from "@/context/themeContext";
import { useRouter } from "next/router";
import { Footer } from "./Footer/Footer";
export const HomePage: React.FC = () => {
  const { theme } = useTheme();
  const [currentTheme, setCurrentTheme] = useState<string | null>(null);
  const router = useRouter();
  useEffect(() => {
    setCurrentTheme(theme);
  }, [theme]);

  if (currentTheme === null) {
    // console.log("kdnf");
    return (
      <span className="loading loading-ring loading-lg text-center"></span>
    );
  }

  return (
    <>
      <div>
        <div className="flex flex-col justify-center md:flex-row flex-col-reverse min-h-[70vh]">
          {/* Left Section: Text */}
          <div className="flex flex-col justify-center items-center md:w-1/2">
            <h1 className="text-3xl sm:text-5xl text-center sm:p-6 p-4">
              Track. Analyze. Optimize. Turn your financial data into actionable
              insights and elevate your financial health.
            </h1>
            <p className="text-lg text-center mb-6 mt-2">
              Do not save what is left after spending, but spend what is left
              after saving <strong>-Warren Buffett</strong>
            </p>
            <button
              className="btn btn-secondary min-w-[80%]"
              onClick={() => router.push("/track-expense")}
            >
              Track Your Expenses
              <Image
                src="/right-arr.svg"
                height={22}
                width={22}
                alt="arr"
              ></Image>
            </button>
          </div>

          {/* Right Section: Image */}
          <div className="flex justify-center items-center md:w-1/2 ">
            <Image
              src={currentTheme !== "light" ? "/dark.svg" : "/light.svg"}
              alt="Landing"
              height={500}
              width={500}
            />
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center flex-wrap flex-col md:flex-row mt-[40px]  min-h-[70vh]">
        {/* Left Section: Image */}
        <div className="flex justify-center items-center md:w-1/2">
          <Image
            src={
              currentTheme !== "light"
                ? "/charts-dark.svg"
                : "/charts-light.svg"
            }
            alt="Landing"
            height={600}
            width={600}
          />
        </div>

        {/* Right Section: Content */}
        <div className="flex flex-col sm:justify-center items-center md:w-1/2 text-center order-2 md:order-1  sm:min-h-[70vh]">
          <h1 className="text-3xl sm:text-5xl text-center sm:p-6 p-4">
            Monitor Your Spending, Category by Category, Month by Month.
          </h1>
          <p className="text-lg mb-6 mt-2">
            Get an in-depth look at your monthly expenses and categorize them
            for smarter budgeting
          </p>
          {/* <button
            className="btn btn-secondary flex items-center"
            onClick={() => router.push("/track-expense")}
          >
            Track Your Expenses
            <Image
              src="/right-arr.svg"
              height={22}
              width={22}
              alt="arr"
              className="ml-2" // Adds spacing between text and arrow
            />
          </button> */}
        </div>
      </div>
      <div>
        <div className="flex flex-col sm:justify-center md:flex-row flex-col-reverse sm:min-h-[70vh]">
          {/* Left Section: Text */}
          <div className="flex flex-col justify-center items-center md:w-1/2">
            <h1 className="text-3xl sm:text-5xl text-center sm:p-6 p-4">
              Create, Track, and Optimize with Your Custom Expense Categories.
            </h1>
            <p className="text-lg text-center mb-6 mt-2">
              Stay organized by building your own expense categories and track
              spending in a way that works for you.
            </p>
            {/* <button
              className="btn btn-secondary"
              onClick={() => router.push("/track-expense")}
            >
              Track Your Expenses
              <Image
                src="/right-arr.svg"
                height={22}
                width={22}
                alt="arr"
              ></Image>
            </button> */}
          </div>

          {/* Right Section: Image */}
          <div className="flex justify-center items-center md:w-1/2 ">
            <Image
              src={
                currentTheme !== "light"
                  ? "/category-dark.svg"
                  : "/category-light.svg"
              }
              alt="Landing"
              height={600}
              width={600}
            />
          </div>
        </div>
      </div>

      <div className="flex justify-center items-center flex-wrap flex-col md:flex-row mt-[40px]  sm:min-h-[70vh]">
        {/* Left Section: Image */}
        <div className="flex justify-center items-center md:w-1/2">
          <Image
            src={
              currentTheme !== "light"
                ? "/report-dark.svg"
                : "/report-light.svg"
            }
            alt="Landing"
            height={600}
            width={600}
          />
        </div>

        {/* Right Section: Content */}
        <div className="flex flex-col sm:justify-center items-center md:w-1/2 text-center order-2 md:order-1  sm:min-h-[70vh]">
          <h1 className="text-3xl sm:text-5xl text-center sm:p-6 p-4">
            Streamlined Monthly Insights
          </h1>
          <p className="text-lg mb-6 mt-2">
            Generate, Review, and Refine with Detailed Systematic Reports at
            Month-End.
          </p>
          {/* <button
            className="btn btn-secondary flex items-center"
            onClick={() => router.push("/track-expense")}
          >
            Track Your Expenses
            <Image
              src="/right-arr.svg"
              height={22}
              width={22}
              alt="arr"
              className="ml-2" // Adds spacing between text and arrow
            />
          </button> */}
        </div>
      </div>

      <div>
        <div className="flex flex-col justify-center md:flex-row flex-col-reverse sm:min-h-[70vh]">
          {/* Left Section: Text */}
          <div className="flex flex-col sm:justify-center items-center md:w-1/2">
            <h1 className="text-3xl sm:text-5xl text-center sm:p-6 p-4">
              Achieve More with Focused Goals
            </h1>
            <p className="text-lg text-center mb-6 mt-2">
              Set, Track, and Conquer up to 6 Custom Goals for a Balanced and
              Purposeful Journey.
            </p>
            {/* <button
              className="btn btn-secondary"
              onClick={() => router.push("/track-expense")}
            >
              Track Your Expenses
              <Image
                src="/right-arr.svg"
                height={22}
                width={22}
                alt="arr"
              ></Image>
            </button> */}
          </div>

          {/* Right Section: Image */}
          <div className="flex justify-center items-center md:w-1/2 ">
            <Image
              src={
                currentTheme !== "light" ? "/goal-dark.svg" : "/goal-light.svg"
              }
              alt="Landing"
              height={500}
              width={500}
            />
          </div>
        </div>
      </div>
      <Footer></Footer>
      {/* <ContactForm></ContactForm> */}
    </>
  );
};
