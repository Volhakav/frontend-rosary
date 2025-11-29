import React, { useState, useEffect } from 'react';
import Piosenka from "../images/Piosenka.png"
import Modlitwa from "../images/Modlitwa_Roz.png"
import Pomoc from "../images/Skoroszyt.png"
/*
const HelpPage = () => {
  const [helpData, setHelpData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchHelpData();
  }, []);

  const fetchHelpData = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://rosary-backend.onrender.com/help');
      if (!response.ok) throw new Error('Błąd pobierania pomocy');
      const data = await response.json();
      setHelpData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const renderItem = (item) => {
    switch (item.type) {
      case "Text":
        return (
          <div key={item.id} className="help-item help-text">
            <div
              className="help-text-content"
              dangerouslySetInnerHTML={{ __html: item.value }}
            />
          </div>
        );

      case "Image":
        return (
          <div key={item.id} className="help-item help-image">
            <div className="help-image-container">
              <img
                src={item.value}
                alt={item.options?.alt || "Ilustracja pomocy"}
                className="help-image-element"
              />
            </div>
          </div>
        );

      case "Video": {
        let cleanUrl = item.value;
        if (cleanUrl.startsWith("hhttps://")) {
          cleanUrl = cleanUrl.replace("hhttps://", "https://");
        }

        let embedUrl = cleanUrl;
        if (cleanUrl.includes("youtube.com/watch?v=")) {
          const videoId = cleanUrl.split("v=")[1].split("&")[0];
          embedUrl = `https://www.youtube.com/embed/${videoId}`;
        } else if (cleanUrl.includes("youtu.be/")) {
          const videoId = cleanUrl.split("youtu.be/")[1].split("?")[0];
          embedUrl = `https://www.youtube.com/embed/${videoId}`;
        }

        return (
          <div key={item.id} className="help-item help-video">
            <div className="video-container">
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
          </div>
        );
      }

      case "Game":
        return (
          <div key={item.id} className="help-item help-game">
            <div className="game-container">
              <iframe
                src={item.value}
                title="Gra"
                width="100%"
                height="360"
                frameBorder="0"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  if (loading) {
    return <div className="help-loading">Ładowanie pomocy...</div>;
  }

  if (error) {
    return <div className="help-error">Błąd: {error}</div>;
  }

  return (
    <div className="help-page">
      <h1>Pomoce</h1>
      <div className="help-content-container">
        {helpData.data?.map((item) => renderItem(item))}
      </div>
    </div>
  );
};
*/

export default function HelpPage(){
  return(
    <div className="song-description-container">
      <section className="song-container">
        <h2 className="song-title">PIOSENKA</h2>

        <p className="song-intro">
          Przygotowany został specjalny śpiew dla dzieci. Nosi on tytuł
          „Święty różaniec”. Refren podkreśla jego świętość, a
          także wyraża prawdę, że przeżywamy go z Maryją i że prowadzi nas on do
          Boga. Pierwsza zwrotka przypomina, że różaniec jest darem oraz wskazuje
          na poszczególne jego części. W drugiej zwrotce dzieci wyrażają swoje
          zaangażowanie w tę modlitwę.
        </p>

        <div className="song-lyrics">
          <p className="refrain">
            Ref: Różaniec, święty różaniec! Różaniec z Maryją, różaniec! <br />
            Różaniec, święty różaniec! Do Boga prowadzi różaniec!
          </p>

          <div className="verse">
            <p>
              1.Wielki dar Boga, cudowna droga, <br />
              Matka prowadzi, dzieci gromadzi. <br />
              Radość nam głosi, światło przynosi, <br />
              w krzyżu pomaga, niebo wybłaga.
            </p>
          </div>

          <div className="verse">
            <p>
              2.Zło pokonuję, drogi prostuję, <br />
              siebie nawracam, pokój przywracam. <br />
              „Zdrowaś” powtarzam, sercem rozważam, <br />
              łaski wypraszam, chwałę ogłaszam.
            </p>
          </div>
        </div>
        <div className="song-image">
          <img src={Piosenka} className="mystery-song" alt="Piosenka"></img>
        </div>
        <p>Poniżej ten śpiew w wykonaniu zespołu ZIARENKO z parafii Podstolice.</p>
        <a href="https://youtu.be/DVb97zGXmLs">https://youtu.be/DVb97zGXmLs</a>
      </section>
      <section className="description-container">
        <h2 className="description-title">OPIS</h2>

        <p>
          Jak pomóc dzieciom wejść w modlitwę różańcową? Jak zaprosić je do
          codziennego odmawiania dziesiątka różańca? Piękną inicjatywę{" "}
          <strong>Podwórkowych Kółek Różańcowych</strong> –{" "}
          <a href="https://www.pkrd.pl/" target="_blank" rel="noopener noreferrer">
            www.pkrd.pl
          </a>{" "}
          – podjęła przed wieloma laty i kontynuuje Madzia Buczek. W parafiach
          podejmowane są różne działania w tym względzie.
        </p>

        <p>
          We wspólnocie Żywego Różańca Archidiecezji Krakowskiej powstała kolejna
          propozycja. Teksty drukowane są dostępne w wydawnictwie św. Stanisława
          BM –{" "}
          <a
            href="https://stanislawbm.pl/"
            target="_blank"
            rel="noopener noreferrer"
          >
            stanislawbm.pl
          </a>
          .
        </p>

        <h3>Pomoce dla prowadzących</h3>
        <p>
          Dla prowadzących rozmowy z dziećmi w domu i na spotkaniach w grupie
          przygotowany został podręcznik{" "}
          <strong>„Wprowadzenie dzieci w modlitwę różańcową”</strong> (więcej) –{" "}
          <a
            href="https://zr.diecezja.pl/roze-dzieci/"
            target="_blank"
            rel="noopener noreferrer"
          >
            zr.diecezja.pl/roze-dzieci
          </a>
          .
        </p>
        <img src={Modlitwa} className="mystery-song" alt="Modlitwa"></img>

        <h3>Pomoce dla dzieci – drukowane</h3>
        <p>
          Dla dzieci przygotowane są pomoce dwojakiego rodzaju: drukowane i
          elektroniczne. Te pierwsze są następujące:
        </p>
        <ul>
          <li>
            Kartki zawierające myśli do przeżywania każdej z 20 tajemnic różańca;
          </li>
          <li>
            Skoroszyt, do którego dzieci wkładają kolejne kartki z opisem
            różańcowych tajemnic;
          </li>
          <li>
            Obrazki z tytułem, jaki dziecku można nadać, gdy ukończy przeżywanie
            części różańca (więcej) –{" "}
            <a
              href="https://zr.diecezja.pl/roze-dzieci/"
              target="_blank"
              rel="noopener noreferrer"
            >
              zr.diecezja.pl/roze-dzieci
            </a>
            .
          </li>
        </ul>
        <img src={Pomoc} className="mystery-song" alt="Pomoc"></img>

        <h3>Pomoce dla dzieci – internetowe</h3>
        <p>
          Niniejsza strona zawiera pomoce umieszczone w Internecie. Odwiedzający
          witrynę mogą tam znaleźć: krótkie słowo kapłana i jego błogosławieństwo,
          modlące się dzieci, śpiewy, proste zadania związane z tematem
          rozważań, przykłady świętych i inne teksty.
        </p>

        <p>
          Wszystkie pomoce służą temu, aby mobilizować dziecko do codziennej
          modlitwy oraz inspirować je do jej głębszego przeżywania. Dzieci mogą z
          nich korzystać, wchodząc – za zgodą rodziców – na stronę internetową. Jest
          ona dostępna w wersji desktopowej oraz mobilnej.
        </p>

        <p>
          Na każdej kartce, którą otrzymują dzieci, został zamieszczony adres
          internetowy i kod QR, pod którym znajdują się pomoce do tej tajemnicy,
          którą dziecko rozważa, np.{" "}
          <a
            href="https://www.zrdzieci.diecezja.pl/radosna/1"
            target="_blank"
            rel="noopener noreferrer"
          >
            www.zrdzieci.diecezja.pl/radosna/1
          </a>
          .
        </p>

        <p>
          Po wpisaniu tego adresu lub po zeskanowaniu kodu QR otwiera się od razu
          okienko z tajemnicą zwiastowania Najświętszej Maryi Pannie, a pod
          adresem{" "}
          <a
            href="https://www.zrdzieci.diecezja.pl/światła/2"
            target="_blank"
            rel="noopener noreferrer"
          >
            www.zrdzieci.diecezja.pl/światła/2
          </a>{" "}
          znajdują się pomoce do rozważania tajemnicy przemiany wody w wino w Kanie
          Galilejskiej.
        </p>

        <p>
          Po wejściu na stronę ukazuje się ten dzień rozważania tajemnicy, który
          jest aktualnym dniem miesiąca. Zaleca się więc, aby rozpoczynanie
          rozważania kolejnej tajemnicy różańca następowało zawsze w pierwszym dniu
          miesiąca. Takie ustawienie strony jest pomocne dla dziecka, które
          codziennie lub często zagląda na przygotowane pomoce.
        </p>

        <p>
          Zawsze też rodzice i osoby pomagające w formacji mogą wejść przez ogólny
          wykaz części różańca do dowolnej tajemnicy i przejrzeć całość lub wybrać
          konkretny dzień.
        </p>

        <p>
          Rodzice dzieci i osoby pomagające w formacji powinny zapoznać się z
          propozycjami zamieszczonymi w Internecie i zdecydować, w jaki sposób z
          nich korzystać.
        </p>
      </section>
    </div>
    
  );
}



