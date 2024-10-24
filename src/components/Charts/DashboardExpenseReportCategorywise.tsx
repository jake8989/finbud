import { useEffect, useRef } from "react";
import {
  Chart,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

Chart.register(CategoryScale, LinearScale, Title, Tooltip, Legend, BarElement);

const DashboardExpenseReportCategorywise = () => {
  const chartRef = useRef<Chart | null>(null);
  const Utils = {
    months: ({ count }: { count: number }) => {
      const monthNames = [
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
      return monthNames.slice(0, count);
    },

    numbers: ({
      count,
      min,
      max,
    }: {
      count: number;
      min: number;
      max: number;
    }) => {
      const data = [];
      for (let i = 0; i < count; i++) {
        data.push(Math.floor(Math.random() * (max - min + 1)) + min);
      }
      return data;
    },

    CHART_COLORS: {
      red: "rgba(255, 99, 132, 1)",
      blue: "rgba(54, 162, 235, 1)",
      green: "rgba(75, 192, 192, 1)",
      purple: "rgba(153, 102, 255, 1)",
      orange: "rgba(255, 159, 64, 1)",
      yellow: "rgba(255, 205, 86, 1)",
      pink: "rgba(255, 99, 178, 1)",
      teal: "rgba(54, 162, 235,1)",
      grey: "rgba(201, 203, 207, 1)",
      indigo: "rgba(75, 0, 130,1)",
      cyan: "rgba(0, 255, 255, 1)",
      lime: "rgba(50, 205, 50, 1)",
      magenta: "rgba(255, 0, 255, 1)",
      brown: "rgba(165, 42, 42, 1)",
      black: "rgba(0, 0, 0, 1)",
    },
  };

  const DATA_COUNT = 12;
  const NUMBER_CFG = { count: DATA_COUNT, min: 0, max: 100000000 };

  const labels = Utils.months({ count: 12 });
  const data = {
    labels: labels,
    datasets: [
      {
        label: "Dataset 1",
        data: Utils.numbers(NUMBER_CFG),
        backgroundColor: Utils.CHART_COLORS.red,
      },
      {
        label: "Dataset 2",
        data: Utils.numbers(NUMBER_CFG),
        backgroundColor: Utils.CHART_COLORS.blue,
      },
      {
        label: "Dataset 3",
        data: Utils.numbers(NUMBER_CFG),
        backgroundColor: Utils.CHART_COLORS.green,
      },
      {
        label: "Dataset 4",
        data: Utils.numbers(NUMBER_CFG),
        backgroundColor: Utils.CHART_COLORS.brown,
      },
    ],
  };

  useEffect(() => {
    const ctx = document.getElementById(
      "dashboardexpensereportcategorywise"
    ) as HTMLCanvasElement;

    if (chartRef.current) {
      chartRef.current.destroy();
    }

    if (ctx) {
      chartRef.current = new Chart(ctx, {
        type: "bar",
        data: data,
        options: {
          // maintainAspectRatio: false,
          plugins: {
            title: {
              display: true,
              text: "Monthly Expense Report Category Wise",
            },
          },
          responsive: true,
          scales: {
            x: {
              stacked: true,
            },
            y: {
              stacked: true,
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
  return <canvas id="dashboardexpensereportcategorywise"></canvas>;
};

export default DashboardExpenseReportCategorywise;
