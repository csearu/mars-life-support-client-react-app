import React from "react";
import PropTypes from "prop-types";
import { FaLeaf, FaWind, FaThermometerHalf, FaWater } from "react-icons/fa";

const iconMap = {
  oxygenLevel: FaLeaf,
  co2Level: FaWind,
  temperature: FaThermometerHalf,
  waterSupply: FaWater,
};

const SensorCard = ({ label, value, unit, sensorType }) => {
  const Icon = iconMap[sensorType];

  return (
    <div className="sensor-card">
      <div className="icon">
        <Icon size={40} />
      </div>
      <div className="details">
        <h3>{label}</h3>
        <p>
          {value} {unit}
        </p>
      </div>
    </div>
  );
};

SensorCard.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  unit: PropTypes.string.isRequired,
  sensorType: PropTypes.string.isRequired,
};

export default SensorCard;
