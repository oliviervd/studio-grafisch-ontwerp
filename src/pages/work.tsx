import { h } from "preact";
import { useEffect, useState } from "preact/hooks";
import { fetchPayload } from "../utils/fetchPayload";
import Header from "../components/Header";

const Work = (props) => {
  let work = window.location.href.split("/")[4].replaceAll("%20", " "); // read url (to know which data to fetch)
  const [output, setOutput] = useState([]);
  const [loaded, setLoaded] = useState(false);
  console.log(output);

  const _baseURI = "https://p01--admin-cms--qbt6mytl828m.code.run";

  useEffect(() => {
    fetchPayload(_baseURI, "graphicDesignOutput").then((data) => {
      console.log(data["docs"]);

      for (let i = 0; i < data["docs"].length; i++) {
        let title = data["docs"][i]["title"];
        if (title === work) {
          setOutput(data["docs"][i]);
          setLoaded(true);
        }
      }
    });
  }, []);

  return (
    <div>
      <Header />
      {loaded && (
        <section className="output-grid">
          <div className="info">
            <p className="title">{output.title}</p>
            {output["designer"].map((name) => (
              <p>
                <a href="">{name.fullName}</a>
              </p>
            ))}
            <p>
              <span>{output.info.type.type}</span>
              <span>, {output.info.printFormat}</span>
              <span> {output.info.datePublished.split("-")[0]}</span>
            </p>
          </div>
          <div>
            <img src={output.mainMedia.url} />
          </div>
        </section>
      )}
    </div>
  );
};

export default Work;
