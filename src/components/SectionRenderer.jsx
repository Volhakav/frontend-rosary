/*import React, { useState } from "react";
import ReactPlayer from "react-player";

export default function SectionRenderer({ item }) {
  const [showContent, setShowContent] = useState(false);
  const [videoError, setVideoError] = useState(false);

  const renderContent = () => {
    switch (item.type) {
      case "Text":
        return (
          <div
            className="text-content"
            dangerouslySetInnerHTML={{ __html: item.value }}
          />
        );

      case "Image":
        return (
          <img
            src={item.value}
            alt={item.options?.alt || "Obraz"}
            className="content-image"
            onError={(e) => {
              e.target.src = "/placeholder-image.jpg";
              e.target.alt = "Zastępczy obraz";
            }}
          />
        );

      case "Video":
        if (videoError) {
          return <p className="video-error">Nie można załadować wideo</p>;
        }

        return (
          <div className="video-container">
            <ReactPlayer
              url={item.value}
              controls
              width="100%"
              height="100%"
              onError={() => setVideoError(true)}
              config={{
                youtube: {
                  playerVars: {
                    origin: window.location.origin,
                    modestbranding: 1
                  }
                }
              }}
            />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <section className="content-section">
      {!showContent && item.type === "Video" && (
        <button 
          onClick={() => setShowContent(true)}
          className="show-content-button"
        >
          Odtwórz wideo
        </button>
      )}

      {(showContent || item.type !== "Video") && (
        <div className="section-content">
          {renderContent()}
        </div>
      )}
    </section>
  );
} */