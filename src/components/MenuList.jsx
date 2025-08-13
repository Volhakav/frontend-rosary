import React, { useState, useEffect } from "react";
import PartSelector from "./PartSelector";
import SecretSelector from "./SecretSelector";
import DaysList from "./DaysList";

export default function MenuList() {
  const [parts] = useState(["radosna", "bolesna", "chwalebna", "świetlana"]);
  const [selectedPart, setSelectedPart] = useState("radosna"); //bedzie zmiana w zaleznosci od daty

  const [secrets] = useState([1, 2, 3, 4, 5]);
  const [selectedSecret, setSelectedSecret] = useState(1); // tu też będzie zmiana w zależności od daty

  const [days, setDays] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchDays = async (part, secret) => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:3000/posts/${part}/${secret}`);
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
    window.location.href = `/day/${selectedPart}/${selectedSecret}/${day}`;
    }


  return (
    <div className="menu-container">
      <PartSelector 
        parts={parts} 
        selectedPart={selectedPart} 
        onPartChange={setSelectedPart} 
      />
      
      <SecretSelector 
        secrets={secrets} 
        selectedSecret={selectedSecret} 
        onSecretChange={setSelectedSecret} 
      />

      <DaysList 
        days={days} 
        loading={loading} 
        onDaySelect={handleDaySelect}
        />
    </div>
  );
}