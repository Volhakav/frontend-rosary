import React from "react";

const PartSelector = ({ parts, partNames, selectedPart, onPartChange }) => (
  <div className="menu-section">
    <label className="menu-label">
      Wybierz część:
      <select 
        className="menu-select"
        value={selectedPart} 
        onChange={(e) => onPartChange(e.target.value)}
      >
        {parts.map((part) => (
          <option key={part} value={part}>
            {partNames[part]}
          </option>
        ))}
      </select>
    </label>
  </div>
);

export default PartSelector;