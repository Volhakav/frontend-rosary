import React, { useEffect, useState, useCallback } from "react";
import { useParams, useLocation } from "react-router-dom";

export default function DayDetails() {
  const { part, secret } = useParams();
  const location = useLocation();
  const dayId = location.state?.dayId || 1;

  const [dayData, setDayData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showTaskContent, setShowTaskContent] = useState(false);

  const getYouTubeEmbedUrl = useCallback((url) => {
    if (!url) return "";
    let cleanUrl = url.toString().trim().replace("www.youtube.com", "youtube.com");
    try {
      if (cleanUrl.includes("youtube.com/watch?v=")) {
        const videoId = new URL(cleanUrl).searchParams.get("v");
        return videoId ? `https://www.youtube.com/embed/${videoId}` : "";
      }
      if (cleanUrl.includes("youtu.be/")) {
        const videoId = new URL(cleanUrl).pathname.replace("/", "");
        return videoId ? `https://www.youtube.com/embed/${videoId}` : "";
      }
      if (cleanUrl.includes("/embed/")) return cleanUrl;
    } catch {
      return "";
    }
    return "";
  }, []);

  const fetchDayData = useCallback(() => {
    fetch(`http://localhost:3000/posts/${part}/${secret}/${dayId}`)
      .then((res) => res.ok ? res.json() : Promise.reject("Błąd pobierania dnia"))
      .then(setDayData)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [part, secret, dayId]);

  useEffect(() => {
    fetchDayData();
    const interval = setInterval(fetchDayData, 60000);
    return () => clearInterval(interval);
  }, [fetchDayData]);

  const VideoComponent = ({ item }) => {
    const embedUrl = getYouTubeEmbedUrl(item.value);
    if (!embedUrl) return (
      <div className="video-container" id={`video-${item.id}`}>
        <a href={item.value} target="_blank" rel="noopener noreferrer">Otwórz wideo</a>
      </div>
    );

    return (
      <div className="video-container" id={`video-${item.id}`}>
        <iframe
          key={embedUrl}
          width="100%"
          height="360"
          src={embedUrl}
          title={`YouTube video ${item.id}`}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  };

  const renderItem = (item) => {
    let type = item.type;
    if ((item.value.includes("youtube.com") || item.value.includes("youtu.be")) && item.type === "Game") type = "Video";

    switch (type) {
      case "Text":
        return <div key={item.id} className="text-item" dangerouslySetInnerHTML={{ __html: item.value }} />;
      case "Image":
        return <img key={item.id} className="mystery" src={item.value} alt={item.options?.alt || "Obraz"} />;
      case "Video":
        return <VideoComponent item={item} />;
      case "Game":
        return (
          <div className="game-container" id={`game-${item.id}`}>
            <iframe src={item.value} title={`Game ${item.id}`} width="100%" height="360" frameBorder="0" allowFullScreen />
          </div>
        );
      default:
        return null;
    }
  };

  if (loading) return <div className="loading">Ładowanie dnia...</div>;
  if (!dayData) return <div className="error">Dzień nie znaleziony</div>;

  const mysteryItems = dayData.data || [];
  const taskItems = dayData.task || [];
  const quoteItems = dayData.quote || [];
  const hasMediaContent = taskItems.some((item) => item.type === "Video" || item.type === "Game");

  return (
    <div className="day-details-container">
      <section className="rosary-box">
        <h2>{dayData.title}</h2>
        {mysteryItems.map((item) => renderItem(item))}
        <h3>Dzień {dayData.index}</h3>
      </section>

      {quoteItems.length > 0 && (
        <section className="quote-box">
          {quoteItems.map((item) => renderItem(item))}
        </section>
      )}

      {taskItems.length > 0 && (
        <section id="daily-message" className="daily-box">
          {!hasMediaContent ? (
            taskItems.map((item) => renderItem(item))
          ) : (
            <>
              {!showTaskContent ? (
                <button onClick={() => setShowTaskContent(true)} id="showButton" className="show-more-btn">
                  Pokaż zadanie
                </button>
              ) : (
                <div id="hiddenElement">
                  {taskItems.map((item) => renderItem(item))}
                </div>
              )}
            </>
          )}
        </section>
      )}
    </div>
  );
}
