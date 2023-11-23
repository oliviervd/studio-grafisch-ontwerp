import { Router, Route } from "preact-router";
import { h, render } from "preact";
import { useEffect } from "preact/hooks";
import Home from "./pages/index";
import Work from "./pages/work";
import Studio from "./pages/studio";
import { fetchPayloadCache } from "./utils/fetchPayload";
import { useQuery } from "react-query";
import axios from "axios";
import { Analytics } from "@vercel/analytics/react"; // analytics

const Main = () => {
  //todo: add cacching using react-query

  /*
  const _baseURI = "https://p01--admin-cms--qbt6mytl828m.code.run";
  useEffect(() => {
    fetchPayloadCache(_baseURI, "graphicDesignOutput");
  }, []);
  */

  /* 
  const usePosts = () =>
    useQuery("posts", async () => {
      const { data } = await axios.get(
        "https://jsonplaceholder.typicode.com/posts",
      );
      console.log(data);
      return data;:w

    });

  */

  return (
    <div>
      <Router>
        <Route path="/" component={Home} />
        <Route path="/about/" component={Studio} />
        <Route path="/work/:title" component={Work} />
      </Router>
      <Analytics />
    </div>
  );
};

render(<Main />, document.getElementById("Main"));
