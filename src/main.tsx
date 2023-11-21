import { Router, Route } from "preact-router";
import { h, render } from "preact";
import Home from "./components/index";

const Main = () => {
  return (
    <Router>
      <Route path="/" component={Home} />
    </Router>
  );
};

render(<Main />, document.getElementById("Main"));
