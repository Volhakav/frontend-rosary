import React, { useState } from "react";

const DaysList = ({ days, loading, onDaySelect }) => {
  const [showCalendar, setShowCalendar] = useState(false);
  const allDays = Array.from({ length: 30 }, (_, i) => i + 1);

  return (
    <div className="days-section">
      {loading && <p className="loading-text">Ładowanie dni...</p>}

      {!loading && (
        <>
          <button
            className="toggle-calendar-btn"
            onClick={() => setShowCalendar(!showCalendar)}
          >
            {showCalendar ? "Ukryj kalendarz" : "Wybierz dzień"}
          </button>

          {showCalendar && (
            <div className="calendar-container">
              <h3 className="calendar-title">Wybierz dzień:</h3>
              <div className="calendar-grid">
                {allDays.map((day) => {
                  const isAvailable = days.includes(day);
                  return (
                    <button
                      key={day}
                      className={`day-button ${
                        isAvailable ? "available" : "unavailable"
                      }`}
                      onClick={() => {
                        if (isAvailable) {
                          onDaySelect(day);
                          setShowCalendar(false);
                        }
                      }}
                      disabled={!isAvailable}
                    >
                      {day}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default DaysList;
