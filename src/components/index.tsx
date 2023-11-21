import { render } from "preact";
import { useEffect, useState } from "preact/hooks";
import "../style.css";
import { fetchPayload } from "../utils/fetchPayload";
import { serialize } from "../utils/serialize";
import Masonry from "react-masonry-component";

export function Home() {
  const [language, setLanguage] = useState("aboutEN");
  const [output, setOutput] = useState([]);
  const [about, setAbout] = useState([]);
  const _baseURI = "https://p01--admin-cms--qbt6mytl828m.code.run";

  // function to fetch data from API

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

  // masonry options
  const masonryOptions = {
    gutter: 20,
  };

  const styles = {
    margin: "10px 0", // Adds 10px of space on the top and bottom of each element
  };

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
      <Masonry options={masonryOptions}>
        {output.map((o, index) => (
          <div style={styles}>
            <img
              onClick={() => console.log(o)}
              className={"masonry-item box-shadow"}
              src={o["mainMedia"]["url"]}
            />
          </div>
        ))}
      </Masonry>
    </div>
  );
}

export default Home;
