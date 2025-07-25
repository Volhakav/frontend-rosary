import rectImg from "../images/mystery/mystery_2.png"

export default function MysterySection(){
    return(
        <section id="mystery-of-the-rosary" className = "rosary-box">
                <h2>Radosna część różańca</h2>
				<p id="rosary-text">Tajemnica druga – Nawiedzenie św. Elżbiety</p>
				<img src={rectImg}  alt="Nawiedzenie św. Elżbiety" className="mystery" />  
        </section>
    );
}