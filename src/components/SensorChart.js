import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register required Chart.js components
ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Title, Tooltip, Legend);

const SensorChart = ({ label, data, color }) => {
  const chartData = {
    labels: Array.from({ length: data.length }, (_, i) => `T-${data.length - i}`),
    datasets: [
      {
        label: label,
        data: data,
        borderColor: color,
        backgroundColor: `${color}33`, // Transparent background
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Time",
        },
        type: "category", // Ensure category scale is explicitly specified
      },
      y: {
        title: {
          display: true,
          text: label,
        },
      },
    },
  };

  return <Line data={chartData} options={options} />;
};

export default SensorChart;
