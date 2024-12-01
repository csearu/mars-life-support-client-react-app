import React, { useEffect, useState } from "react";
import SensorCard from "./SensorCard";
import { fetchSensorData } from "../services/api";

const Dashboard = () => {
  const [sensorData, setSensorData] = useState(null);
  const [error, setError] = useState(null);

  // Function to load data from the backend
  const loadSensorData = async () => {
    try {
      const data = await fetchSensorData();
      setSensorData(data);
      setError(null);
    } catch (err) {
      setError("Failed to fetch sensor data.");
    }
  };

  // Fetch data on mount and set up periodic polling
  useEffect(() => {
    loadSensorData();
    const intervalId = setInterval(loadSensorData, 5000); // Poll every 5 seconds
    return () => clearInterval(intervalId); // Cleanup on unmount
  }, []);

  // Display error or loading state
  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (!sensorData) {
    return <div className="loading">Loading sensor data...</div>;
  }

  return (
    <div className="dashboard">
      <h1>Mars Life Support Monitor</h1>
      <div className="sensor-grid">
        <SensorCard
          label="Oxygen Level"
          value={sensorData.oxygenLevel.toFixed(1)}
          unit="%"
          sensorType="oxygenLevel"
        />
        <SensorCard
          label="CO2 Level"
          value={sensorData.co2Level}
          unit="ppm"
          sensorType="co2Level"
        />
        <SensorCard
          label="Temperature"
          value={sensorData.temperature.toFixed(1)}
          unit="°C"
          sensorType="temperature"
        />
        <SensorCard
          label="Water Supply"
          value={sensorData.waterSupply}
          unit="liters"
          sensorType="waterSupply"
        />
      </div>
    </div>
  );
};

export default Dashboard;
