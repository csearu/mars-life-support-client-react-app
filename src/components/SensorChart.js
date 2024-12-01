import React from "react";
import { Line } from "react-chartjs-2";
import PropTypes from "prop-types";

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

SensorChart.propTypes = {
  label: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(PropTypes.number).isRequired,
  color: PropTypes.string.isRequired,
};

export default SensorChart;
