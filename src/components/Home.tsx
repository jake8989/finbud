import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useTheme } from "@/context/themeContext";

export const HomePage: React.FC = () => {
  const { theme } = useTheme();
  const [currentTheme, setCurrentTheme] = useState<string | null>(null);

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
    <div className="flex flex-col justify-center items-center md:flex-row md:mt-40">
      {/* Left Section: Text */}
      <div className="flex flex-col justify-center items-center md:w-1/2">
        <h1 className="text-5xl text-center p-6">
          Track. Analyze. Optimize. Turn your financial data into actionable
          insights and elevate your financial health.
        </h1>
        <p className="text-lg text-center mb-6 mt-2">
          Do not save what is left after spending, but spend what is left after
          saving <strong>-Warren Buffett</strong>
        </p>
        <button className="btn btn-secondary">
          Track Your Expenses
          <Image src="/right-arr.svg" height={22} width={22} alt="arr"></Image>
        </button>
      </div>

      {/* Right Section: Image */}
      <div className="w-full flex justify-center items-center md:w-1/2">
        <Image
          src={currentTheme !== "light" ? "/dark.svg" : "/light.svg"}
          alt="Landing"
          height={500}
          width={500}
        />
      </div>
    </div>
  );
};
