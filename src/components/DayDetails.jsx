import React, { useEffect, useState, useCallback } from "react";
import { useParams, useLocation } from "react-router-dom";

export default function DayDetails() {
  const { part, secret } = useParams();
  const location = useLocation();

  // Function to limit the day to a maximum of 30
  const getValidDayId = (dayOfMonth) => Math.min(dayOfMonth, 30);

  const today = new Date();
  const initialDayId = getValidDayId(today.getDate());

  // Initialize dayId from location.state or today's date (max 30)
  const [dayId, setDayId] = useState(location.state?.dayId || initialDayId);
  const [dayData, setDayData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showTaskContent, setShowTaskContent] = useState(false);

  // Reset "Show" button visibility when day, secret, or part changes
  useEffect(() => {
    setShowTaskContent(false);
  }, [dayId, secret, part]);

  // Reset dayId when part or secret changes
  useEffect(() => {
    setDayId(getValidDayId(today.getDate()));
  }, [part, secret]);

  // Fetch daily data with handling for empty or invalid JSON
  const fetchDayData = useCallback(() => {
    setLoading(true);
    fetch(`https://rosary-backend.onrender.com/posts/${part}/${secret}/${dayId}`)
      .then(res => {
        if (!res.ok) return Promise.reject(`Failed to fetch day: ${res.status}`);
        return res.text(); // get response as text to avoid JSON errors
      })
      .then(text => {
        if (!text) return null; // empty response
        try {
          return JSON.parse(text); // try to parse JSON
        } catch {
          console.error("Invalid JSON:", text);
          return null;
        }
      })
      .then(setDayData)
      .catch(err => {
        console.error(err);
        setDayData(null);
      })
      .finally(() => setLoading(false));
  }, [part, secret, dayId]);

  // Automatically fetch data on mount and every minute
  useEffect(() => {
    fetchDayData();
    const interval = setInterval(fetchDayData, 60000);
    return () => clearInterval(interval);
  }, [fetchDayData]);

  // Generate YouTube embed URL from various formats
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

  // Component to render a YouTube video or fallback link
  const VideoComponent = ({ item }) => {
    const embedUrl = getYouTubeEmbedUrl(item.value);
    if (!embedUrl) return (
      <div className="video-container" id={`video-${item.id}`}>
        <a href={item.value} target="_blank" rel="noopener noreferrer">Open video</a>
      </div>
    );

    return (
      <div className="video-container" id={`video-${item.id}`}>
        <iframe
          key={item.id}
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

  // Function to render different types of items (Text, Image, Video, Game)
  const renderItem = (item) => {
    let type = item.type;
    if ((item.value.includes("youtube.com") || item.value.includes("youtu.be")) && item.type === "Game") type = "Video";

    switch (type) {
      case "Text":
        return item.value ? (
          <div
            key={item.id}
            className="text-item"
            style={{ textAlign: "justify", lineHeight: "1.3" }}
            dangerouslySetInnerHTML={{ __html: item.value }}
          />
        ) : null;
      case "Image":
        return item.value ? (
          <img key={item.id} className="mystery" src={item.value} alt={item.options?.alt || "Image"} />
        ) : null;
      case "Video":
        return <VideoComponent key={item.id} item={item} />;
      case "Game":
        return item.value ? (
          <div key={item.id} className="game-container" id={`game-${item.id}`}>
            <iframe src={item.value} title={`Game ${item.id}`} width="100%" height="360" frameBorder="0" allowFullScreen />
          </div>
        ) : null;
      default:
        return null;
    }
  };

  if (loading) return <div className="loading">Loading day...</div>;
  if (!dayData) return <div className="error">Day not found</div>;

  const mysteryItems = dayData.data || [];
  const taskItems = dayData.task || [];
  const quoteItems = dayData.quote || [];

  return (
    <div className="day-details-container">
      <section className="rosary-box">
        <h2>{dayData.title}</h2>

        {mysteryItems.map((item, index) => (
          <React.Fragment key={item.id}>
            {renderItem(item)}

            {/* Display day number only once if there is an image */}
            {item.type === "Image" && !mysteryItems.slice(0, index).some(i => i.type === "Image") && (
              <h3>Dzień {dayData.index}</h3>
            )}
          </React.Fragment>
        ))}
      </section>

      {quoteItems.length > 0 && (
        <section className="quote-box">
          {quoteItems.map(item => renderItem(item))}
        </section>
      )}

      {taskItems.length > 0 && (
        <section id="daily-message" className="daily-box">
          {!showTaskContent ? (
            <button
              onClick={() => setShowTaskContent(true)}
              id="showButton"
              className="show-more-btn"
            >
              Zobacz
            </button>
          ) : (
            <div id="hiddenElement">
              {taskItems.map(item => renderItem(item))}
            </div>
          )}
        </section>
      )}
    </div>
  );
}
