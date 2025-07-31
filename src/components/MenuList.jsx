import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function MenuList() {
    const [items, setItems] = useState([]);
    const [dataIsLoaded, setDataIsLoaded] = useState(false);

    const fetchItems = () => {
        fetch("https://rosary-backend.onrender.com/post")
            .then((res) => res.json())
            .then((json) => {
                setItems(json);
                setDataIsLoaded(true);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    };

    useEffect(() => {
        fetchItems(); // pierwsze pobranie

        const interval = setInterval(() => {
            fetchItems(); // kolejne co 60s
        }, 60000);

        return () => clearInterval(interval); // czyszczenie interwału
    }, []);

    if (!dataIsLoaded) {
        return <h1>...</h1>;
    }

    return (
        <ul>
            {items.map((day, index) => (
                <li key={index}>
                    <Link 
                        to={`/day/${day}`} 
                        className="list-buttons"
                    >
                        Dzień {day}
                    </Link>
                </li>
            ))}
        </ul>
    );
}
