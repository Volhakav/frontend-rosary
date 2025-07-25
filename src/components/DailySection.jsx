import { useRef, useState } from "react";
import reactVideo from "../videos/dzien_1.mp4";

export default function DailySection() {
  const videoRef = useRef();
  const [showHidden, setShowHidden] = useState(false); // Domyślnie false = pokazuje przycisk

  function playVideo() {
    if (videoRef.current) {
      videoRef.current.muted = false;
      videoRef.current.play();
    }
  }

  return (
    <section id="daily-message" className="daily-box">
      <h2>Dzień 1</h2>
      <p>Posłuchaj zaproszenia i przyjmij błogosławieństwo</p>

      {/* Pokazuje przycisk tylko jeśli nie pokazano jeszcze wideo */}
      {!showHidden && (
        <button onClick={() => setShowHidden(true)} id="showButton">
          Pokaż więcej
        </button>
      )}

      {/* Pokazuje wideo tylko jeśli kliknięto przycisk */}
      {showHidden && (
        <div id="hiddenElement">
          <video ref={videoRef} width="640" height="360" controls>
            <source src={reactVideo} type="video/mp4" />
            Twoja przeglądarka nie obsługuje odtwarzacza wideo.
          </video>
          <br />
          <button onClick={playVideo}>Odtwórz z dźwiękiem</button>
        </div>
      )}
    </section>
  );
}
