import React, { useState, useEffect } from 'react';

const HelpPage = () => {
  const [helpData, setHelpData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchHelpData();
  }, []);

  const fetchHelpData = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:3000/help');
      if (!response.ok) throw new Error('Błąd pobierania pomocy');
      const data = await response.json();
      setHelpData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="help-loading">Ładowanie pomocy...</div>;
  }

  if (error) {
    return <div className="help-error">Błąd: {error}</div>;
  }

  return (
    <div className="help-page">
      <h1>Pomoce</h1>
      <div className="help-content-container">
        {helpData.data?.map((item) => {
          if (item.type === "Text") {
            return (
              <div key={item.id} className="help-item help-text">
                <div 
                  className="help-text-content"
                  dangerouslySetInnerHTML={{ __html: item.value }} 
                />
              </div>
            );
          } else if (item.type === "Image") {
            return (
              <div key={item.id} className="help-item help-image">
                <div className="help-image-container">
                  <img 
                    src={item.value} 
                    alt={item.options?.alt || "Ilustracja pomocy"} 
                    className="help-image-element"
                  />
                </div>
              </div>
            );
          }
          return null;
        })}
      </div>
    </div>
  );
};

export default HelpPage;