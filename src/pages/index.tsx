import { useState, useEffect } from "preact/hooks";
import "../style.css";
import { fetchPayload } from "../utils/fetchPayload";
import Masonry from "react-masonry-component";
import Header from "../components/Header";
import { Link } from "preact-router";
import {h} from "preact";
import Helmet from "preact-helmet";

export function Home() {
  // init collection for output metadata;
  const [output, setOutput] = useState([]);
  const [gridless, setGridless] = useState(false);
  let _random = [];

  // set _baseURI - todo: put _baseURI in env.
  const _baseURI = "https://p01--admin-cms--qbt6mytl828m.code.run";

  console.log(this.updateParentState);

  // cache data
  useEffect(() => {
    const abortController = new AbortController();

    // clear cache on first time loading the page
    /*
    if (!localStorage.getItem("firstLoad")) {
      localStorage.clear();
      localStorage.setItem("firstLoad", "true");
    }
    */

    localStorage.clear();

    const cachedData = localStorage.getItem("graphicDesignOutput");
    if (cachedData) {
      // check if cachedData exists, if so - use CachedData
      setOutput(JSON.parse(cachedData));
    } else {
      // if cache doesn't exist. Fetch data from Payload.
      fetchPayload(
        _baseURI,
        "graphicDesignOutput",
        abortController.signal,
      ).then((data) => {
        setOutput(data["docs"]);
        // cache fetched data.
        localStorage.setItem(
          "graphicDesignOutput",
          JSON.stringify(data["docs"]),
        );
      });
    }

    // cancel the fetch request when the component unmounts
    return () => {
      abortController.abort();
    };
  }, []);

  // sort items by Date (new to old)
  if (output.length) {
    output.sort((a, b) => {
      let dateA = new Date(a.info.datePublished);
      let dateB = new Date(b.info.datePublished);
      return dateB - dateA; // reverse to show oldest to new.
    });
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
      <Helmet
          title="Studio Grafisch Ontwerp"
          meta={[
            {
              name: "description",
              content: "Studio Grafisch Ontwerp offers a program for recently graduated graphic designers from LUCA School of Arts and KASK & Conservatorium/HOGENT and Howest in which the identity of Design Museum Gent is reviewed. During the renovation and expansion of Design Museum Gent, Studio Grafisch Ontwerp explores the identities a museum can adopt today. Experimentation, self-initiated projects and internal assignments are central with the aim of exploring different (graphic) identities. Members alternate on a regular basis. 019 and Design Museum Gent provide a professional framework throughout the process."
            },
            {
              property:"og:title",
              content: "Studio Grafisch Ontwerp"
            },
            {
              property:"og:type",
              content: 'website'
            },
            {
              property:"og:image",
              content: "https://d2yoaaok6mt608.cloudfront.net/Scherm%C3%82%C2%ADafbeelding%202024-01-30%20om%2016.41.32.png"
            },
            {
              property:"og:description",
              content: "Studio Grafisch Ontwerp offers a program for recently graduated graphic designers from LUCA School of Arts and KASK & Conservatorium/HOGENT and Howest in which the identity of Design Museum Gent is reviewed. During the renovation and expansion of Design Museum Gent, Studio Grafisch Ontwerp explores the identities a museum can adopt today. Experimentation, self-initiated projects and internal assignments are central with the aim of exploring different (graphic) identities. Members alternate on a regular basis. 019 and Design Museum Gent provide a professional framework throughout the process."
            }
          ]}
      />
      <Header setGridless={setGridless} showGrid-={true} />

      {!gridless && (
        <div>
          <Masonry className="masonry-desktop" options={masonryOptions}>
            {output.map((o, index) => (
              <div style={styles}>
                <Link href={`/work/${o.uri}`}>
                  <img
                    className={"masonry-item box-shadow"}
                    loading="lazy"
                    src={o["mainMedia"]["url"]}
                    alt={`image depiciting the graphic design: ${o.title}`}
                  />
                </Link>
              </div>
            ))}
          </Masonry>
          <section class="masonry-mobile gallery">
            {output.map((o, index) => (
              <div style={styles}>
                <Link href={`/work/${o.uri}`}>
                  <img
                    onClick={() => console.log(o)}
                    className={"masonry-item box-shadow"}
                    loading="lazy"
                    src={o["mainMedia"]["url"]}
                    alt={`image depiciting the graphic design: ${o.title}`}
                  />
                </Link>
              </div>
            ))}
          </section>
        </div>
      )}
      {gridless && (
        <section className="gridless__container">
          {output.map((o) => (
            <Link
              href={`/work/${o.uri}`}
              className={`gridless__image-box ${o.info.printFormat} ${o.info.type.type}`}
            >
              <img
                className={"box-shadow-gridless"}
                loading="lazy"
                src={o["mainMedia"]["url"]}
                alt={`image depiciting the graphic design: ${o.title}`}
              />
            </Link>
          ))}
        </section>
      )}
    </div>
  );
}

export default Home;
