import React, { useState, useEffect } from "react";
import PartSelector from "./PartSelector";
import SecretSelector from "./SecretSelector";
import DaysList from "./DaysList";
import { useNavigate, useParams } from "react-router-dom";

const mysteries = {
  radosna: ["Zwiastowanie", "Nawiedzenie św. Elżbiety", "Narodzenie Jezusa", "Ofiarowanie w świątyni", "Odnalezienie Jezusa w świątyni"],
  światła: ["Chrzest Jezusa w Jordanie", "Wesele w Kanie Galilejskiej", "Głoszenie Królestwa Bożego i wzywanie do nawrócenia", "Przemienienie na górze Tabor", "Ustanowienie Eucharystii"],
  bolesna: ["Modlitwa w Ogrójcu", "Biczowanie Pana Jezusa", "Cierniem ukoronowanie", "Droga Krzyżowa", "Śmierć Jezusa na krzyżu"],
  chwalebna: ["Zmartwychwstanie Pana Jezusa", "Wniebowstąpienie", "Zesłanie Ducha Świętego", "Wniebowzięcie Maryi", "Ukoronowanie Maryi na Królową nieba i ziemi"]
};

const partNames = {
  radosna: "Radosna",
  światła: "Światła",
  bolesna: "Bolesna",
  chwalebna: "Chwalebna"
};

export default function MenuList() {
  const { part, secret } = useParams();
  const navigate = useNavigate();

  const selectedPart = part || "radosna";
  const selectedSecret = secret || "1";

  const [days, setDays] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchDays = async () => {
      setLoading(true);
      try {
        const res = await fetch(`https://rosary-backend.onrender.com/posts/${selectedPart}/${selectedSecret}`);
        if (!res.ok) throw new Error("Błąd pobierania dni");
        const data = await res.json();
        setDays(data);
      } catch (err) {
        console.error(err);
        setDays([]);
      } finally {
        setLoading(false);
      }
    };

    fetchDays();
  }, [selectedPart, selectedSecret]);

  const handleSecretChange = (secretNumStr) => {
    navigate(`/${selectedPart}/${secretNumStr}`);
  };

  const handlePartChange = (partKey) => {
    navigate(`/${partKey}/1`);
  };

  const handleDaySelect = (day) => {
    navigate(`/${selectedPart}/${selectedSecret}`, { state: { dayId: day } });
  };

  return (
    <div className="menu-container">

      <PartSelector
        parts={Object.keys(mysteries)}
        partNames={partNames}
        selectedPart={selectedPart}
        onPartChange={handlePartChange}
      />

      <SecretSelector
        secrets={mysteries[selectedPart]}
        selectedSecret={selectedSecret}
        onSecretChange={handleSecretChange}
      />

      <DaysList
        days={days}
        loading={loading}
        onDaySelect={handleDaySelect}
      />

      <div className="help-section">
        <button 
          className="btn help-btn" 
          onClick={() => navigate('/pomoc')}
        >
          <i className="fas fa-question-circle"></i> Pomoce
        </button>
      </div>
    </div>
  );
}