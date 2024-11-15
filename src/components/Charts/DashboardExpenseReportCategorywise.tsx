import { useEffect, useRef } from "react";
import { useQuery } from "@apollo/client";
import { GET_CATEGORY_WISE_EXPENSES } from "@/lib/queries/getCategoryWiseExpenseData";
import { useFetchMonthlyExpenseData } from "@/data/monthlyExpenseData";
import { useUser } from "@/context/userContext";
import {
  Chart,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Loading } from "../Loading/Loading";

Chart.register(CategoryScale, LinearScale, Title, Tooltip, Legend, BarElement);

const DashboardExpenseReportCategorywise = () => {
  const chartRef = useRef<Chart | null>(null);

  const { user, userLoading } = useUser();
  const year = new Date().getFullYear().toString();
  const { cateogoryWiseExpenseData, loading, error } =
    useFetchMonthlyExpenseData(year, user?.user?.username);

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
  };

  const DATA_COUNT = 12;

  const labels = Utils.months({ count: 12 });
  const data = {
    labels: labels,
    datasets: cateogoryWiseExpenseData,
  };

  useEffect(() => {
    if (userLoading || loading || !cateogoryWiseExpenseData) return;
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
  }, [userLoading, loading, cateogoryWiseExpenseData]);
  if (loading) {
    return <Loading></Loading>;
  }
  return <canvas id="dashboardexpensereportcategorywise"></canvas>;
};

export default DashboardExpenseReportCategorywise;
