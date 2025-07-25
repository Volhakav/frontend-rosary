import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ReactPlayer from 'react-player';

export default function DayDetails() {
    const { dayId } = useParams();
    const navigate = useNavigate();
    const [dayData, setDayData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [videoError, setVideoError] = useState(false);

    useEffect(() => {
        fetch(`https://rosary-backend.onrender.com/post/${dayId}`)
            .then(res => res.json())
            .then(data => {
                setDayData(data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching day details:", error);
                setLoading(false);
            });
    }, [dayId]);

    if (loading) return <div className="loading">Ładowanie dnia...</div>;
    if (!dayData) return <div className="error">Dzień nie znaleziony</div>;

    const renderContent = (item) => {
        switch(item.type) {
            case 'Text':
                return <div 
                         className="text-content" 
                         dangerouslySetInnerHTML={{ __html: item.value }} 
                       />;
            case 'Image':
                return <img 
                         src={item.value} 
                         alt={item.options?.alt || `Obrazek dnia ${dayId}`} 
                         className="mystery"
                         onError={(e) => e.target.src = 'placeholder-image.jpg'}
                       />;
            case 'Video':
                return (
                    <div className="video-wrapper">
                        {videoError ? (
                            <p className="video-error">Nie można załadować wideo</p>
                        ) : (
                            <ReactPlayer 
                                url={item.value}
                                controls
                                width="100%"
                                height="100%"
                                onError={() => setVideoError(true)}
                                config={{
                                    youtube: {
                                        playerVars: {
                                            origin: window.location.href,
                                            modestbranding: 1
                                        }
                                    }
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
            <button onClick={() => navigate(-1)} className="back-button">
                ← Wróć do listy
            </button>
            
            <h2 className="day-title">Dzień {dayData.index}</h2>
            
            <div className="content-grid">
                {dayData.data.map((item, index) => (
                    <div key={item._id || index} className={`content-item ${item.type.toLowerCase()}`}>
                        {renderContent(item)}
                    </div>
                ))}
            </div>
        </div>
    );
}