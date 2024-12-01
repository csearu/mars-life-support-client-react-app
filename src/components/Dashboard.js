import React, { useEffect, useState } from "react";
import { fetchSensorData } from "../services/api";
import SensorChart from "./SensorChart";
import SensorCard from "./SensorCard";

const Dashboard = () => {
  const [sensorData, setSensorData] = useState(null);
  const [history, setHistory] = useState({
    oxygenLevel: [],
    co2Level: [],
    temperature: [],
    waterSupply: [],
  });
  const [error, setError] = useState(null);

  const loadSensorData = async () => {
    try {
      const data = await fetchSensorData();
      setSensorData(data);

      // Update historical data for charts
      setHistory((prev) => ({
        oxygenLevel: [...prev.oxygenLevel.slice(-19), data.oxygenLevel],
        co2Level: [...prev.co2Level.slice(-19), data.co2Level],
        temperature: [...prev.temperature.slice(-19), data.temperature],
        waterSupply: [...prev.waterSupply.slice(-19), data.waterSupply],
      }));

      setError(null);
    } catch (err) {
      setError("Failed to fetch sensor data.");
    }
  };

  useEffect(() => {
    loadSensorData();
    const intervalId = setInterval(loadSensorData, 5000); // Poll every 5 seconds
    return () => clearInterval(intervalId);
  }, []);

  if (error) return <div className="error-message">{error}</div>;
  if (!sensorData) return <div className="loading">Loading sensor data...</div>;

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

      <div className="charts-grid">
        <SensorChart
          label="Oxygen Level (%)"
          data={history.oxygenLevel}
          color="#2ecc71"
        />
        <SensorChart
          label="CO2 Level (ppm)"
          data={history.co2Level}
          color="#e74c3c"
        />
        <SensorChart
          label="Temperature (°C)"
          data={history.temperature}
          color="#3498db"
        />
        <SensorChart
          label="Water Supply (liters)"
          data={history.waterSupply}
          color="#9b59b6"
        />
      </div>
    </div>
  );
};

export default Dashboard;
