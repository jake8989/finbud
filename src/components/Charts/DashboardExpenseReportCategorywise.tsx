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
        data.push(200);
      }

      return data;
    },

    CHART_COLORS: {
      red: "rgba(255, 99, 132, 0.6)",
      blue: "rgba(54, 162, 235, 0.6)",
      green: "rgba(75, 192, 192, 0.6)",
      purple: "rgba(153, 102, 255, 0.6)",
      orange: "rgba(255, 159, 64, 0.6)",
      yellow: "rgba(255, 205, 86, 0.6)",
      pink: "rgba(255, 99, 178, 0.6)",
      teal: "rgba(54, 162, 235, 0.6)",
      grey: "rgba(201, 203, 207, 0.6)",
      indigo: "rgba(75, 0, 130, 0.6)",
      cyan: "rgba(0, 255, 255, 0.6)",
      lime: "rgba(50, 205, 50, 0.6)",
      brown: "rgba(165, 42, 42, 0.6)",
      black: "rgba(0, 0, 0, 0.6)",
      navy: "rgba(0, 0, 128, 0.6)",
      gold: "rgba(255, 215, 0, 0.6)",
      olive: "rgba(128, 128, 0, 0.6)",
      maroon: "rgba(128, 0, 0, 0.6)",
      peach: "rgba(255, 218, 185, 0.6)",
      coral: "rgba(255, 127, 80, 0.6)",
      mint: "rgba(189, 252, 201, 0.6)",
      lavender: "rgba(230, 230, 250, 0.6)",
      slate: "rgba(112, 128, 144, 0.6)",
      sky: "rgba(135, 206, 235, 0.6)",
      salmon: "rgba(250, 128, 114, 0.6)",
      royalBlue: "rgba(65, 105, 225, 0.6)",
      forestGreen: "rgba(34, 139, 34, 0.6)",
      hotPink: "rgba(255, 105, 180, 0.6)",
      sand: "rgba(244, 164, 96, 0.6)",
      midnightBlue: "rgba(25, 25, 112, 0.6)",
      steelBlue: "rgba(70, 130, 180, 0.6)",
      khaki: "rgba(240, 230, 140, 0.6)",
    },
  };

  const DATA_COUNT = 12;
  const NUMBER_CFG = { count: DATA_COUNT, min: 0, max: 1000 };

  const labels = Utils.months({ count: 12 });
  const data = {
    labels: labels,
    datasets: [
      {
        label: "Food",
        data: [200, 180, 220, 210, 250, 240, 230, 200, 180, 220, 210, 250],
        backgroundColor: Utils.CHART_COLORS.khaki,
      },
      {
        label: "Rent",
        data: [700, 700, 700, 700, 700, 0, 700, 700, 700, 700, 700, 700],
        backgroundColor: Utils.CHART_COLORS.orange,
      },
      {
        label: "Utilities",
        data: [150, 130, 140, 120, 160, 155, 150, 130, 140, 120, 160, 155],
        backgroundColor: Utils.CHART_COLORS.blue,
      },
      {
        label: "Entertainment",
        data: [100, 120, 110, 90, 130, 125, 100, 120, 110, 90, 130, 0],
        backgroundColor: Utils.CHART_COLORS.maroon,
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
