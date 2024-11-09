import { useEffect, useRef } from "react";
import { useState } from "react";
import {
  Chart,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  BarElement,
  BarController,
} from "chart.js";

Chart.register(
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  BarElement,
  BarController
);

// Component for the Chart
const DashboardMonthlyExpenseChart = () => {
  const chartRef = useRef<Chart | null>(null);
  const DATA_COUNT = 12;
  const NUMBER_CFG = { count: DATA_COUNT, min: 0, max: 100000 };
  const [expenseData, setExpenseData] = useState<number[]>(Array(12).fill(100));
  const [incomeData, setIncomeData] = useState<number[]>(Array(12).fill(400));
  const labels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const data = {
    labels: labels,
    datasets: [
      {
        label: "Expense",
        data: expenseData,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Income",
        data: incomeData,
        borderColor: "rgb(54, 162, 235)",
        backgroundColor: "rgba(54, 162, 235, 0.5)",
      },
    ],
  };
  useEffect(() => {
    const ctx = document.getElementById(
      "dashboardmonthlyexpensechart"
    ) as HTMLCanvasElement;

    if (chartRef.current) {
      chartRef.current.destroy();
    }

    if (ctx) {
      chartRef.current = new Chart(ctx, {
        type: "bar",
        data: data,
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: "top",
            },
            title: {
              display: true,
              text: "Monthly Expense Report",
            },
          },
        },
      });
    }

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, []);

  return <canvas id="dashboardmonthlyexpensechart"></canvas>;
};

export default DashboardMonthlyExpenseChart;
