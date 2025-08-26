import React from "react";

export default function HelpButton({ onClick, loading, active }) {
  return (
    <button 
      className={`btn help-btn ${active ? 'active' : ''}`} 
      onClick={onClick}
      disabled={loading}
    >
      {loading ? (
        <span>Ładowanie...</span>
      ) : (
        <>
          <i className="fas fa-question-circle"></i> 
          {active ? 'Ukryj pomoce' : 'Pomoce'}
        </>
      )}
    </button>
  );
}