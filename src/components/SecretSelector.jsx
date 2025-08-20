import React from "react";

const SecretSelector = ({ secrets, selectedSecret, onSecretChange }) => (
  <div className="menu-section">
    <label className="menu-label">
      Wybierz tajemnicę:
      <select 
        className="menu-select"
        value={selectedSecret}
        onChange={(e) => onSecretChange(Number(e.target.value))}
      >
        {secrets.map((secretName, index) => (
          <option key={index} value={index + 1}>
            {secretName}
          </option>
        ))}
      </select>
    </label>
  </div>
);

export default SecretSelector;
