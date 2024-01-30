import { Router, Route } from "preact-router";
import { h, render } from "preact";
import Home from "./pages/index";
import Work from "./pages/work";
import Studio from "./pages/studio";
import { Analytics } from "@vercel/analytics/react"; // analytics
import Helmet from "preact-helmet";
import ReactGA from 'react-ga';
// Initialize React Ga with your tracking ID
ReactGA.initialize('G-LDGY6JD14T');
ReactGA.pageview(window.location.pathname + window.location.search);

const Main = () => {
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
