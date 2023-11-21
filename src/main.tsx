import { Router, Route } from "preact-router";
import { h, render } from "preact";
import Home from "./pages/index";
import About from "./pages/about";

const Main = () => {
  return (
    <Router>
      <Route path="/" component={Home} />
      <Route path="/about" component={About} />
    </Router>
  );
};

render(<Main />, document.getElementById("Main"));
