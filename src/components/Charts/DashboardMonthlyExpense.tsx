import { useEffect, useRef } from "react";
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
  const NUMBER_CFG = { count: DATA_COUNT, min: 0, max: 3000000 };

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
        data: Array.from({ length: DATA_COUNT }, () =>
          Math.floor(
            Math.random() * (NUMBER_CFG.max - NUMBER_CFG.min) + NUMBER_CFG.min
          )
        ),
        borderColor: "rgb(255, 99, 132)", // Red
        backgroundColor: "rgba(255, 99, 132, 0.5)", // Transparent red
      },
      {
        label: "Income",
        data: Array.from({ length: DATA_COUNT }, () =>
          Math.floor(
            Math.random() * (NUMBER_CFG.max - NUMBER_CFG.min) + NUMBER_CFG.min
          )
        ),
        borderColor: "rgb(54, 162, 235)", // Blue
        backgroundColor: "rgba(54, 162, 235, 0.5)", // Transparent blue
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
          // maintainAspectRatio: false,
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

    // Cleanup function to destroy the chart when the component unmounts
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, []); // Empty dependency array ensures this runs only once after component mounts

  return <canvas id="dashboardmonthlyexpensechart"></canvas>;
};

export default DashboardMonthlyExpenseChart;
