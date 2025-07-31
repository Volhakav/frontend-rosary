import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function DayDetails() {
  const { dayId } = useParams();
  const [dayData, setDayData] = useState(null);
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(true);
  const [showTaskContent, setShowTaskContent] = useState(false);

  const fetchDayData = () => {
    fetch(`https://rosary-backend.onrender.com/post/${dayId}`)
        .then((res) => res.json())
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
        fetchDayData(); // pierwsze pobranie

        const interval = setInterval(() => {
            fetchDayData(); // kolejne co 60 sekund
        }, 60000); 

        return () => clearInterval(interval); // czyszczenie
    }, [dayId]);



  const renderItem = (item, index) => {
    switch (item.type) {
      case "Text":
        return (
          <div
            key={`text-${index}`}
            dangerouslySetInnerHTML={{ __html: item.value }}
          />
        );
      case "Image":
        return (
          <img
            key={`img-${index}`}
            src={item.value}
            alt={item.options?.alt || "Obraz"}
            className="mystery"
          />
        );
      case "Video":
        // Czyść URL z potencjalnych błędów
        let cleanUrl = item.value;
        if (cleanUrl.startsWith('hhttps://')) {
          cleanUrl = cleanUrl.replace('hhttps://', 'https://');
        }
        
        // Konwertuj YouTube URL na embed URL
        let embedUrl = cleanUrl;
        if (cleanUrl.includes('youtube.com/watch?v=')) {
          const videoId = cleanUrl.split('v=')[1].split('&')[0];
          embedUrl = `https://www.youtube.com/embed/${videoId}`;
        } else if (cleanUrl.includes('youtu.be/')) {
          const videoId = cleanUrl.split('youtu.be/')[1].split('?')[0];
          embedUrl = `https://www.youtube.com/embed/${videoId}`;
        }
        
        return (
          <div key={`vid-${index}`} className="video-container">
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
      default:
        return null;
    }
  };

  if (loading) return <div className="loading">Ładowanie dnia...</div>;
  if (!dayData) return <div className="error">Dzień nie znaleziony</div>;

  const total = dayData.data.length;
  const splitIndex = Math.ceil(total / 2);
  const mysteryItems = dayData.data.slice(0, splitIndex);
  const taskItems = dayData.data.slice(splitIndex);

  return (
    <div className="day-details-container">
      <section className="rosary-box">
        <h2>{title}</h2>
        {mysteryItems.map((item, index) => (
          <React.Fragment key={index}>
            {renderItem(item, index)}
          </React.Fragment>
        ))}
      </section>

      <section id="daily-message" className="daily-box">
        <h3>Dzień {dayData.index}</h3>
        {!showTaskContent ? (
          <button onClick={() => setShowTaskContent(true)} id="showButton">
            Pokaż więcej
          </button>
        ) : (
          <div id="hiddenElement">
            {taskItems.map((item, index) => (
              <React.Fragment key={index}>
                {renderItem(item, index + splitIndex)}
              </React.Fragment>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}