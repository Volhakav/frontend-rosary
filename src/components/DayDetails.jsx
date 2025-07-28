import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReactPlayer from "react-player";

export default function DayDetails() {
  const { dayId } = useParams();
  const [dayData, setDayData] = useState(null);
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(true);
  const [showTaskContent, setShowTaskContent] = useState(false);
  const [videoError, setVideoError] = useState(false);

  useEffect(() => {
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
  }, [dayId]);

  if (loading) return <div className="loading">Ładowanie dnia...</div>;
  if (!dayData) return <div className="error">Dzień nie znaleziony</div>;

  const total = dayData.data.length;
  const splitIndex = Math.ceil(total / 2);
  const mysteryItems = dayData.data.slice(0, splitIndex);
  const taskItems = dayData.data.slice(splitIndex);

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
      console.log("Video URL:", item.value);
      return (
        <div key={`vid-${index}`} id="myVideo">
          {videoError ? (
            <p className="video-error">Nie można załadować wideo</p>
          ) : (
            <ReactPlayer
              url={item.value} 
              controls
              width="100%"
              height="360px"
              onError={() => setVideoError(true)}
              config={{
                youtube: {
                  playerVars: {
                    origin: "https://www.youtube.com", // ✅ działa nawet lokalnie
                    modestbranding: 1,
                  },
                },
              }}
            />
          )}
        </div>
      );
    default:
      return null;
  }
};


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

      <section className="daily-box">
        <h3>Dzień {dayData.index}</h3>
        {!showTaskContent ? (
          <button onClick={() => setShowTaskContent(true)} id="showButton">
            Pokaż więcej
          </button>
        ) : (
          <div id="hiddenElement">
            {taskItems.map((item, index) => (
              <React.Fragment key={index}>
                {renderItem(item, index)}
              </React.Fragment>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
