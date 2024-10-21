import { useEffect, useRef, useState } from "react";
import {
  Chart,
  PolarAreaController,
  RadialLinearScale,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

// Register the necessary components for the polar area chart
Chart.register(
  PolarAreaController,
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend
);

// Mock data for goals (each slice of the chart is a goal with an assigned budget)
const initialData = {
  labels: ["Groceries", "Entertainment", "Travel", "Savings", "Bills"],
  datasets: [
    {
      label: "Goals",
      data: [500, 300, 400, 200, 600], // Initial amounts assigned to each goal
      backgroundColor: [
        "rgba(255, 99, 132, 0.5)",
        "rgba(54, 162, 235, 0.5)",
        "rgba(255, 206, 86, 0.5)",
        "rgba(75, 192, 192, 0.5)",
        "rgba(153, 102, 255, 0.5)",
      ],
      borderColor: [
        "rgb(255, 99, 132)",
        "rgb(54, 162, 235)",
        "rgb(255, 206, 86)",
        "rgb(75, 192, 192)",
        "rgb(153, 102, 255)",
      ],
      borderWidth: 1,
    },
  ],
};

const FinancialGoalsChart = () => {
  const chartRef = useRef<Chart<"polarArea", number[], string> | null>(null); // Ref to store chart instance
  const [chartData, setChartData] = useState(initialData); // State to store chart data

  useEffect(() => {
    const ctx = document.getElementById(
      "financialGoalsChart"
    ) as HTMLCanvasElement;

    // Destroy previous chart instance if it exists
    if (chartRef.current) {
      chartRef.current.destroy();
    }

    // Create new chart instance
    if (ctx) {
      chartRef.current = new Chart<"polarArea", number[], string>(ctx, {
        type: "polarArea",
        data: chartData,
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: "top",
            },
            title: {
              display: true,
              text: "Financial Goals Tracker",
            },
          },
        },
      });
    }

    // Cleanup function to destroy chart on component unmount
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, [chartData]); // Re-run effect when chartData changes

  // Function to update a specific goal's expense
  const updateGoal = (goalIndex: number, expense: number) => {
    const updatedData = { ...chartData }; // Copy current data
    updatedData.datasets[0].data[goalIndex] -= expense; // Subtract expense from the selected goal
    setChartData(updatedData); // Update the state with new data
  };

  return (
    <div>
      <canvas id="financialGoalsChart"></canvas>
      <div>
        {/* Example button to simulate an expense on 'Groceries' */}
        <button onClick={() => updateGoal(0, 50)}>
          Add $50 Expense to Groceries
        </button>
      </div>
    </div>
  );
};

export default FinancialGoalsChart;
