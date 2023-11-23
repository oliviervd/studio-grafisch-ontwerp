import { useState, useEffect } from "preact/hooks";
import "../style.css";
import { fetchPayload, fetchPayloadCache } from "../utils/fetchPayload";
// import components
import Masonry from "react-masonry-component";
import Header from "../components/Header";
import { Link } from "preact-router";
export function Home() {
  const [output, setOutput] = useState([]);

  const _baseURI = "https://p01--admin-cms--qbt6mytl828m.code.run";

  // cache data
  useEffect(() => {
    const cachedData = localStorage.getItem("graphicDesignOutput");
    if (cachedData) {
      setOutput(JSON.parse(cachedData));
    } else {
      fetchPayload(_baseURI, "graphicDesignOutput").then((data) => {
        console.log(data);
        setOutput(data["docs"]);
        localStorage.setItem(
          "graphicDesignOutput",
          JSON.stringify(data["docs"]),
        );
      });
    }
  }, []);

  // masonry options
  const masonryOptions = {
    gutter: 20,
  };

  const styles = {
    margin: "10px 0", // Adds 10px of space on the top and bottom of each element
  };

  return (
    <div>
      <Header />
      <Masonry options={masonryOptions}>
        {output.map((o, index) => (
          <div style={styles}>
            <Link href={`/work/${o.uri}`}>
              <img
                onClick={() => console.log(o)}
                className={"masonry-item box-shadow"}
                src={o["mainMedia"]["url"]}
                alt={`image depiciting the graphic design: ${o.title}`}
              />
            </Link>
          </div>
        ))}
      </Masonry>
    </div>
  );
}

export default Home;
