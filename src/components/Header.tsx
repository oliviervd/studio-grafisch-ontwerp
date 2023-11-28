import { useEffect, useState } from "preact/hooks";
import { fetchPayload } from "../utils/fetchPayload";
import { serialize } from "../utils/serialize";

const Header = ({ setGridless }) => {
  const [language, setLanguage] = useState("descriptionNL");
  const [about, setAbout] = useState([]);
  const _baseURI = "https://p01--admin-cms--qbt6mytl828m.code.run";

  // function to fetch data from API

  useEffect(() => {
    fetchPayload(_baseURI, "studios")
      .then((data) => {
        //console.log(data["docs"][0]["textBlock"].language);
        setAbout(data);
        let _unserializedAbout = data["docs"][0]["textBlock"][language][0];
        //console.log(_unserializedAbout);
        let _serializedAbout = serialize(_unserializedAbout);
        renderTranslateTo(language);
        const section = document.querySelector(".about");
        section.innerHTML = _serializedAbout;
      })
      .catch((e) => {
        console.log(e);
      });
  }, [language]);

  function renderTranslateTo(lang) {
    const translateTo = document.querySelector(".translateTo");
    const setGrid = document.querySelector(".setGrid");
    const on = document.querySelector(".on");
    const off = document.querySelector(".off");
    switch (language) {
      case "descriptionNL":
        translateTo.innerHTML = " Vertaal naar: ";
        setGrid.innerHTML = "Zet grid: ";
        on.innerHTML = "aan";
        off.innerHTML = "uit.";
        break;
      case "descriptionEN":
        translateTo.innerHTML = " Translate to: ";
        setGrid.innerHTML = "Turn grid: ";
        on.innerHTML = "on";
        off.innerHTML = "off.";

        break;
      case "descriptionFr":
        translateTo.innerHTML = " Traduire: ";
        setGrid.innerHTML = "La grille: ";
        on.innerHTML = "activez";
        off.innerHTML = "désactivez.";

        break;
    }
  }

  function handleClick(state) {
    setGridless(state);
  }

  return (
    <div>
      {" "}
      <header className="main-header">
        <p>
          <div>
            <span className="about"></span>
            <span className="translateTo"></span>
            <a onClick={() => setLanguage("descriptionNL")}>NL</a>/
            <a onClick={() => setLanguage("descriptionEN")}>EN</a>/
            <a onClick={() => setLanguage("descriptionFr")}>FR. </a>
            <span className="setGrid"></span>
            <a className="on" onClick={() => handleClick(false)}></a>/
            <a className="off" onClick={() => handleClick(true)}></a>
          </div>
        </p>
      </header>
      <header className="pseudo-header">
        <p>
          <a href="/">Studio Grafisch Ontwerp</a>
        </p>
      </header>
    </div>
  );
};
export default Header;
