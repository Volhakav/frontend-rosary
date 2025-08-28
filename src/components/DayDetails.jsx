import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function DayDetails() {
  const { part, secret, dayId } = useParams();
  const [dayData, setDayData] = useState(null);
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(true);
  const [showTaskContent, setShowTaskContent] = useState(false);

  const fetchDayData = () => {
    console.log("Pobieranie danych...", new Date().toLocaleTimeString());
    fetch(`https://zrdzieci.diecezja.pl/api/posts/${part}/${secret}/${dayId}`)
      .then((res) => {
        if (!res.ok) throw new Error("Błąd pobierania dnia");
        return res.json();
      })
      .then((data) => {
        setDayData(data);
        setTitle(data.title);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching day details:", error);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchDayData();
    const interval = setInterval(() => {
      fetchDayData();
    }, 60000);
    return () => clearInterval(interval);
  }, [part, secret, dayId]);

  const renderItem = (item, index) => {
    switch (item.type) {
      case "Text":
        return (
          <div
            key={`${item.type}-${index}-${item.id}`}
            dangerouslySetInnerHTML={{ __html: item.value }}
          />
        );
      case "Image":
        return (
          <img
            key={`${item.type}-${index}-${item.id}`}
            src={item.value}
            alt={item.options?.alt || "Obraz"}
            className="mystery"
          />
        );
      case "Video":
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
          <div key={`${item.type}-${index}-${item.id}`} className="video-container">
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
        );

      case "Game":
        return (
          <div key={`${item.type}-${index}-${item.id}`} className="game-container">
            <iframe
              src={item.value}
              title="Gra"
              width="100%"
              height="360"
              frameBorder="0"
              allowFullScreen></iframe>
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

  const hasMediaContent = taskItems.some(item => 
    item.type === "Video" || item.type === "Game"
  );

  return (
    <div className="day-details-container">
      {/* Sekcja z tajemnicami */}
      <section className="rosary-box">
        <h2>{title}</h2>
        {mysteryItems.map((item, index) => (
          <React.Fragment key={`mystery-${index}-${item.id}`}>
            {renderItem(item, index)}
          </React.Fragment>
        ))}
      </section>

      {quoteItems.length > 0 && (
        <section className="quote-box">
          <h3>Refleksja i modlitwa</h3>
          {quoteItems.map((item, index) => (
            <React.Fragment key={`quote-${index}-${item.id}`}>
              {renderItem(item, index)}
            </React.Fragment>
          ))}
        </section>
      )}

      {/* Sekcja z zadaniami - tylko jeśli są jakieś zadania */}
      {taskItems.length > 0 && (
        <section id="daily-message" className="daily-box">
          <h3>Dzień {dayData.index}</h3>
          
          {/* Jeśli nie ma mediów, pokaż od razu zawartość */}
          {!hasMediaContent ? (
            <div>
              {taskItems.map((item, index) => (
                <React.Fragment key={`task-${index}-${item.id}`}>
                  {renderItem(item, index)}
                </React.Fragment>
              ))}
            </div>
          ) : (
           
            <>
              {!showTaskContent ? (
                <button 
                  onClick={() => setShowTaskContent(true)} 
                  id="showButton"
                  className="show-more-btn"
                >
                  Pokaż zadanie
                </button>
              ) : (
                <div id="hiddenElement">
                  {taskItems.map((item, index) => (
                    <React.Fragment key={`task-${index}-${item.id}`}>
                      {renderItem(item, index)}
                    </React.Fragment>
                  ))}
                </div>
              )}
            </>
          )}
        </section>
      )}
    </div>
  );
}