import { render } from "preact";
import { useEffect, useState, useRef } from "preact/hooks";
import "./style.css";
import { fetchPayload } from "./utils/fetchPayload";
import { serialize } from "./utils/serialize";
import Isotope from "isotope-layout";

export function App() {
  const [language, setLanguage] = useState("aboutEN");
  const [output, setOutput] = useState([]);
  const [about, setAbout] = useState([]);
  const [serializedAbout, setSerializedAbout] = useState("");
  const _baseURI = "https://p01--admin-cms--qbt6mytl828m.code.run";

  let _serializedAbout = "";
  // function to fetch data from API
  //
  useEffect(() => {
    fetchPayload(_baseURI, "StudioGraphicAbout")
      .then((data) => {
        console.log(data);
        setAbout(data);
        let _unserializedAbout = data["docs"][0][language][0];
        let _serializedAbout = serialize(_unserializedAbout);
        renderTranslateTo(language);
        const section = document.querySelector(".about");
        section.innerHTML = _serializedAbout;
      })
      .catch((e) => {
        console.log(e);
      });
  }, [language]);

  useEffect(() => {
    fetchPayload(_baseURI, "graphicDesignOutput").then((data) => {
      console.log(data);
      setOutput(data["docs"]);
    });
  }, []);

  const gridRef = useRef(null);
  const isotopeRef = useRef(null);

  useEffect(() => {
    if (gridRef.current) {
      new Isotope(gridRef.current, {
        itemSelector: ".grid-item",
        layoutMode: "masonry",
        masonry: {
          gutter: 10,
        },
      });
    }
  }, []);

  useEffect(() => {
    if (gridRef.current) {
      const iso = Isotope.data(gridRef.current);
      iso.layout();
    }
  }, [output]);

  function renderTranslateTo(lang) {
    const translateTo = document.querySelector(".translateTo");
    switch (language) {
      case "aboutNL":
        translateTo.innerHTML = "vertaal naar: ";
        break;
      case "aboutEN":
        translateTo.innerHTML = "translate to: ";
        break;
      case "aboutFR":
        translateTo.innerHTML = "traduire: ";
        break;
    }
  }

  return (
    <div>
      <header>
        <p>
          <div>
            <span className="about"></span>
            <span className="translateTo"></span>
            <a onClick={() => setLanguage("aboutNL")}>NL</a>/
            <a onClick={() => setLanguage("aboutEN")}>EN</a>/
            <a onClick={() => setLanguage("aboutFR")}>FR</a>
          </div>
        </p>
      </header>
      <section className="grid" ref={gridRef}>
        {output.map((o, index) => (
          <a key={index}>
            <img className={"grid-item"} src={o["mainMedia"]["url"]} />
          </a>
        ))}
      </section>
    </div>
  );
}

render(<App />, document.getElementById("app"));
