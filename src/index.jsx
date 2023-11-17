import { render } from "preact";
import { useEffect, useState } from "preact/hooks";
import "./style.css";
import { fetchPayload } from "./utils/fetchPayload";
import { serialize } from "./utils/serialize";

export function App() {
  let [language, setLanguage] = useState("aboutEN");
  let [output, setOutput] = useState([]);

  let _baseURI = "https://p01--admin-cms--qbt6mytl828m.code.run";
  let _serializedAbout = "";
  // function to fetch data from API
  let _about = fetchPayload(_baseURI, "StudioGraphicAbout")
    .then((data) => {
      _about = data;
      // fetch array that needs to be serialized based on the language
      let _unserializedAbout = data["docs"][0][language][0];
      // serialize content to HTML :D
      _serializedAbout = serialize(_unserializedAbout);
      renderSerializedAbout();
      renderTranslateTo(language);
    })
    .catch((e) => {
      console.log(e);
    });

  let _output = fetchPayload(_baseURI, "graphicDesignOutput").then((data) => {
    setOutput(data);
  });

  function renderSerializedAbout() {
    const section = document.querySelector(".about");
    section.innerHTML = _serializedAbout;
  }

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

  useEffect(() => {});

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
    </div>
  );
}

render(<App />, document.getElementById("app"));
