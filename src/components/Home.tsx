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
        <div className="flex flex-col justify-center md:flex-row  min-h-[70vh] ">
          {/* Left Section: Text */}
          <div className="flex flex-col justify-center items-center md:w-1/2">
            <h1 className="text-5xl text-center p-6">
              Track. Analyze. Optimize. Turn your financial data into actionable
              insights and elevate your financial health.
            </h1>
            <p className="text-lg text-center mb-6 mt-2">
              Do not save what is left after spending, but spend what is left
              after saving <strong>-Warren Buffett</strong>
            </p>
            <button
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
        <div className="flex flex-col justify-center items-center md:w-1/2 text-center order-2 md:order-1  min-h-[70vh]">
          <h1 className="text-5xl p-6">
            Monitor Your Spending, Category by Category, Month by Month.
          </h1>
          <p className="text-lg mb-6 mt-2">
            Get an in-depth look at your monthly expenses and categorize them
            for smarter budgeting
          </p>
          <button
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
          </button>
        </div>
      </div>
      <div>
        <div className="flex flex-col justify-center md:flex-row  min-h-[70vh] ">
          {/* Left Section: Text */}
          <div className="flex flex-col justify-center items-center md:w-1/2">
            <h1 className="text-5xl text-center p-6">
              Create, Track, and Optimize with Your Custom Expense Categories.
            </h1>
            <p className="text-lg text-center mb-6 mt-2">
              Stay organized by building your own expense categories and track
              spending in a way that works for you.
            </p>
            <button
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
            </button>
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
              height={400}
              width={400}
            />
          </div>
        </div>
      </div>

      <Footer></Footer>
      {/* <ContactForm></ContactForm> */}
    </>
  );
};
