import { useState, useEffect } from "preact/hooks";
import "../style.css";
import { fetchPayload } from "../utils/fetchPayload";
// import components
import Masonry from "react-masonry-component";
import Header from "../components/Header";
export function Home() {
  const [output, setOutput] = useState([]);

  const _baseURI = "https://p01--admin-cms--qbt6mytl828m.code.run";

  useEffect(() => {
    fetchPayload(_baseURI, "graphicDesignOutput").then((data) => {
      console.log(data);
      setOutput(data["docs"]);
    });
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
