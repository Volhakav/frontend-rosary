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

  const renderItem = (item) => {
    switch (item.type) {
      case "Text":
        return (
          <div key={item.id} className="help-item help-text">
            <div
              className="help-text-content"
              dangerouslySetInnerHTML={{ __html: item.value }}
            />
          </div>
        );

      case "Image":
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

      case "Video": {
        let cleanUrl = item.value;
        if (cleanUrl.startsWith("hhttps://")) {
          cleanUrl = cleanUrl.replace("hhttps://", "https://");
        }

        let embedUrl = cleanUrl;
        if (cleanUrl.includes("youtube.com/watch?v=")) {
          const videoId = cleanUrl.split("v=")[1].split("&")[0];
          embedUrl = `https://www.youtube.com/embed/${videoId}`;
        } else if (cleanUrl.includes("youtu.be/")) {
          const videoId = cleanUrl.split("youtu.be/")[1].split("?")[0];
          embedUrl = `https://www.youtube.com/embed/${videoId}`;
        }

        return (
          <div key={item.id} className="help-item help-video">
            <div className="video-container">
              <iframe
                width="100%"
                height="360"
                src={embedUrl}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        );
      }

      case "Game":
        return (
          <div key={item.id} className="help-item help-game">
            <div className="game-container">
              <iframe
                src={item.value}
                title="Gra"
                width="100%"
                height="360"
                frameBorder="0"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        );

      default:
        return null;
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
        {helpData.data?.map((item) => renderItem(item))}
      </div>
    </div>
  );
};

export default HelpPage;
