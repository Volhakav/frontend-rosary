import React, { useState, useEffect } from "react";
import PartSelector from "./PartSelector";
import SecretSelector from "./SecretSelector";
import DaysList from "./DaysList";
import { useNavigate } from "react-router-dom"; 

const mysteries = {
  radosna: [
    "Zwiastowanie",
    "Nawiedzenie św. Elżbiety",
    "Narodzenie Jezusa",
    "Ofiarowanie w świątyni",
    "Odnalezienie Jezusa w świątyni"
  ],
  światła: [
    "Chrzest Jezusa w Jordanie",
    "Wesele w Kanie Galilejskiej",
    "Głoszenie Królestwa Bożego i wzywanie do nawrócenia",
    "Przemienienie na górze Tabor",
    "Ustanowienie Eucharystii"
  ],
  bolesna: [
    "Modlitwa w Ogrójcu",
    "Biczowanie Pana Jezusa",
    "Cierniem ukoronowanie",
    "Droga Krzyżowa",
    "Śmierć Jezusa na krzyżu"
  ],
  chwalebna: [
    "Zmartwychwstanie Pana Jezusa",
    "Wniebowstąpienie",
    "Zesłanie Ducha Świętego",
    "Wniebowzięcie Maryi",
    "Ukoronowanie Maryi na Królową nieba i ziemi"
  ]
};

export default function MenuList() {
  const [parts] = useState(Object.keys(mysteries));
  const [selectedPart, setSelectedPart] = useState("radosna");
  const [selectedSecret, setSelectedSecret] = useState(1);
  const [days, setDays] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Hook do nawigacji

  const fetchDays = async (part, secret) => {
    setLoading(true);
    try {
      const response = await fetch(`https://zrdzieci.diecezja.pl/api/posts/${part}/${secret}`);
      if (!response.ok) throw new Error("Błąd pobierania dni");
      const data = await response.json();
      setDays(data);
    } catch (error) {
      console.error(error);
      setDays([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDays(selectedPart, selectedSecret);
  }, [selectedPart, selectedSecret]);

  const handleDaySelect = (day) => {
    navigate(`/${selectedPart}/${selectedSecret}`, { state: { dayId: day } });
  };

  // Funkcja do otwierania strony pomocy
  const openHelpPage = () => {
    navigate('/pomoc');
  };

  return (
    <div className="menu-container">
      <h2>Wybierz część różańca</h2>
      
      <PartSelector 
        parts={parts} 
        selectedPart={selectedPart} 
        onPartChange={(part) => {
          setSelectedPart(part);
          setSelectedSecret(1);
        }} 
      />
      
      <SecretSelector 
        secrets={mysteries[selectedPart]} 
        selectedSecret={selectedSecret} 
        onSecretChange={setSelectedSecret} 
      />

      <DaysList 
        days={days} 
        loading={loading} 
        onDaySelect={handleDaySelect}
      />

      {/* Przycisk Pomoce */}
      <div className="help-section">
        <button 
          className="btn help-btn" 
          onClick={openHelpPage}
        >
          <i className="fas fa-question-circle"></i> Pomoce
        </button>
      </div>
    </div>
  );
}