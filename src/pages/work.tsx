import { h } from "preact";
import { useEffect, useState } from "preact/hooks";
import { fetchPayload } from "../utils/fetchPayload";
import Helmet from "preact-helmet";
import Header from "../components/Header";

const Work = (props) => {
  let uri = window.location.href.split("/")[4]; // read url (to know which data to fetch)
  const [output, setOutput] = useState([]);
  const [loaded, setLoaded] = useState(false);

  let designer = "";
  console.log(output);

  const _baseURI = "https://p01--admin-cms--qbt6mytl828m.code.run";

  useEffect(() => {
    fetchPayload(_baseURI, "graphicDesignOutput").then((data) => {
      console.log(data["docs"]);

      for (let i = 0; i < data["docs"].length; i++) {
        let _uri = data["docs"][i]["uri"];
        if (_uri === uri) {
          setOutput(data["docs"][i]);
          setLoaded(true);
          designer = output["designer"][0]["fullName"];
        }
      }
    });
  }, []);

  return (
    <div className="work-page">
      {loaded &&
          <Helmet
              title={output.title}
              meta={[
                {
                  name: "description",
                  content: `poster designed by ${designer} titled ${output.title} as part of Studio Grafisch Ontwerp at Design Museum Gent`,
                },
                {
                  name:"og:title",
                  content: `${output.title}`
                },
                {
                  name:"og:type",
                  content: 'website'
                },
                {
                  name:"og:image",
                  content: `${output.mainMedia.url}`
                },
                {
                  name:"og:description",
                  content: `poster designed by ${designer} titled ${output.title} as part of Studio Grafisch Ontwerp at Design Museum Gent`
                },
                {
                  name:"twitter:title",
                  content: `${output.title}`
                }
              ]}
          />
      }

      <Header />

      {loaded && (
        <section className="output-grid">
          <div className="info">
            <p className="title">{output.title}</p>
            {output["designer"].map((name) => (
              <p>
                {!name.portfolio && (
                  <p className="non-click-link" href="">
                    {name.fullName}
                  </p>
                )}
                {name.portfolio && <a href={name.portfolio}>{name.fullName}</a>}
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
          {output.gallery && (
            <div className="gallery">
              {output.gallery.map((im) => (
                <img src={im.image.url} loading="lazy" />
              ))}
            </div>
          )}
        </section>
      )}
    </div>
  );
};

export default Work;
