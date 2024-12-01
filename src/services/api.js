import axios from "axios";

// Backend base URL
const API_BASE_URL = "http://localhost:8080/sensor-data";

// Function to fetch sensor data
export const fetchSensorData = async () => {
  try {
    const response = await axios.get(API_BASE_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching sensor data:", error);
    throw error;
  }
};
