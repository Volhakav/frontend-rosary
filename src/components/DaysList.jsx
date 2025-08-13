import React, { useState } from "react";

const DaysList = ({ days, loading, onDaySelect }) => {
  const [showCalendar, setShowCalendar] = useState(false);
  const allDays = Array.from({ length: 30 }, (_, i) => i + 1);
  
  // Teraz grupujemy po 5 dni w rzędzie
  const rows = [];
  for (let i = 0; i < 6; i++) { // 30 dni / 5 = 6 rzędów
    rows.push(allDays.slice(i * 5, (i + 1) * 5));
  }

  return (
    <div className="days-section">
      {loading && <p className="loading-text">Ładowanie dni...</p>}
      
      {!loading && (
        <>
          <button 
            className="toggle-calendar-btn"
            onClick={() => setShowCalendar(!showCalendar)}
          >
            {showCalendar ? 'Ukryj kalendarz' : 'Wybierz datę'}
          </button>

          {showCalendar && (
            <div className="calendar-container">
              <h3 className="calendar-title">Wybierz dzień:</h3>
              <div className="calendar-grid">
                {rows.map((row, rowIndex) => (
                  <div key={rowIndex} className="calendar-row">
                    {row.map(day => {
                      const isAvailable = days.includes(day);
                      return (
                        <button
                          key={day}
                          className={`day-button ${isAvailable ? 'available' : 'unavailable'}`}
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
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default DaysList;