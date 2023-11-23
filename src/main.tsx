import { Router, Route } from "preact-router";
import { h, render } from "preact";
import { useEffect } from "preact/hooks";
import Home from "./pages/index";
import About from "./pages/about";
import Work from "./pages/work";
import { fetchPayloadCache } from "./utils/fetchPayload";
import { useQuery } from "react-query";
import axios from "axios";

const Main = () => {
  /*
  const _baseURI = "https://p01--admin-cms--qbt6mytl828m.code.run";
  useEffect(() => {
    fetchPayloadCache(_baseURI, "graphicDesignOutput");
  }, []);
  */

  const usePosts = () =>
    useQuery("posts", async () => {
      const { data } = await axios.get(
        "https://jsonplaceholder.typicode.com/posts",
      );
      console.log(data);
      return data;
    });

  return (
    <Router>
      <Route path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/work/:title" component={Work} />
    </Router>
  );
};

render(<Main />, document.getElementById("Main"));
