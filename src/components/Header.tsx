import { useEffect, useState } from "preact/hooks";
import { fetchPayload } from "../utils/fetchPayload";
import { serialize } from "../utils/serialize";

const Header = () => {
  const [language, setLanguage] = useState("descriptionEN");
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
    switch (language) {
      case "descriptionNL":
        translateTo.innerHTML = "vertaal naar: ";
        break;
      case "descriptionEN":
        translateTo.innerHTML = "translate to: ";
        break;
      case "descriptionFr":
        translateTo.innerHTML = "traduire: ";
        break;
    }
  }

  return (
    <div>
      {" "}
      <header>
        <p>
          <div>
            <span className="about"></span>
            <span className="translateTo"></span>
            <a onClick={() => setLanguage("descriptionNL")}>NL</a>/
            <a onClick={() => setLanguage("descriptionEN")}>EN</a>/
            <a onClick={() => setLanguage("descriptionFr")}>FR</a>
          </div>
        </p>
      </header>
    </div>
  );
};
export default Header;
