import React, { useEffect, useState, useCallback } from "react";
import { useParams, useLocation } from "react-router-dom";
import rozaIcon from "../images/roza.png";

export default function DayDetails() {
  const { part, secret } = useParams();
  const location = useLocation();

  const getValidDayId = (dayOfMonth) => Math.min(dayOfMonth, 30);
  const today = new Date();
  const initialDayId = getValidDayId(today.getDate());

  const [dayId, setDayId] = useState(location.state?.dayId || initialDayId);
  const [dayData, setDayData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showTaskContent, setShowTaskContent] = useState(false);

  useEffect(() => {
    setShowTaskContent(false);
  }, [dayId, secret, part]);

  useEffect(() => {
    if (location.state?.dayId) {
      setDayId(location.state.dayId);
    } else {
      setDayId(getValidDayId(today.getDate()));
    }
  }, [part, secret, location.state]);

    const fetchDayData = useCallback(async () => {
    try {
      const res = await fetch(
        `https://rosary-backend.onrender.com/posts/${part}/${secret}/${dayId}`
      )
      if (!res.ok) throw new Error('Nie udało się pobrać danych dziennych')

      const text = await res.text() 
      if (!text) {
        setDayData(null)
        return
      }

      const data = JSON.parse(text)
      setDayData(data)
    } catch (err) {
      console.error(err)
      setDayData(null)
    } finally {
      setLoading(false)
    }
  }, [part, secret, dayId])

   useEffect(() => {
    setShowTaskContent(false)
    setLoading(true)
    fetchDayData()
  }, [dayId, secret, part])

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

  const VideoComponent = ({ item }) => {
    const embedUrl = getYouTubeEmbedUrl(item.value);
    if (!embedUrl)
      return (
        <div className="video-container" id={`video-${item.id}`}>
          <a href={item.value} target="_blank" rel="noopener noreferrer">
            Otwórz wideo
          </a>
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

  const renderItem = (item) => {
    let type = item.type;
    if (
      (item.value.includes("youtube.com") || item.value.includes("youtu.be")) &&
      item.type === "Game"
    )
      type = "Video";

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
          <img
            key={item.id}
            className="mystery"
            src={item.value}
            alt={item.options?.alt || "Obraz"}
          />
        ) : null;
      case "Video":
        return <VideoComponent key={item.id} item={item} />;
      case "Game":
        return item.value ? (
          <div key={item.id} className="game-container" id={`game-${item.id}`}>
            <iframe
              src={item.value}
              title={`Game ${item.id}`}
              width="100%"
              height="360"
              frameBorder="0"
              allowFullScreen
            />
          </div>
        ) : null;
      default:
        return null;
    }
  };

  if (loading) return <div className="loading">Ładowanie dnia...</div>;
  if (!dayData) return <div className="error">Dzień nie znaleziony</div>;

  const mysteryItems = dayData.data || [];
  const taskItems = dayData.task || [];
  const quoteItems = dayData.quote || [];

    const title = () => {
      switch (part) {
        case 'radosna':
          return `Tajemnice radosne`
        case 'światła':
          return `Tajemnice światła`
        case 'bolesna':
          return `Tajemnice bolesne`
        case 'chwalebna':
          return `Tajemnice chwalebne`
        default:
      }
    }

  return (
    <div className="day-details-container">
      <section className="rosary-box">
        <h2>{title()}</h2>

        {mysteryItems.map((item, index) => (
          <React.Fragment key={item.id}>
            {renderItem(item)}
            {item.type === "Image" &&
              !mysteryItems.slice(0, index).some((i) => i.type === "Image") && (
                <>
                  <h3>Dzień {dayData.index}</h3>
                  <div className="daily-thought">
                    <img src={rozaIcon} alt="Róża" className="daily-thought-icon" />
                    <span className="daily-thought-text">MYŚL DNIA</span>
                    <img src={rozaIcon} alt="Róża" className="daily-thought-icon" />
                  </div>
                </>
              )}
          </React.Fragment>
        ))}
      </section>

      {quoteItems.length > 0 && (
        <section className="quote-box">
          {quoteItems.map((item) => renderItem(item))}
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
            <div id="hiddenElement">{taskItems.map((item) => renderItem(item))}</div>
          )}
        </section>
      )}
    </div>
  );
}
