import { Router, Route } from "preact-router";
import { h, render } from "preact";
import Home from "./pages/index";
import Work from "./pages/work";
import Studio from "./pages/studio";
import { Analytics } from "@vercel/analytics/react"; // analytics
import Helmet from "preact-helmet";
import ReactGA from 'react-ga';
// Initialize React Ga with your tracking ID
ReactGA.initialize('G-CL57H808E1');


const Main = () => {
  return (
    <div>
      <Helmet
        title="Studio Grafisch Ontwerp - Design Museum Gent"
        meta={[
          {
            name: "description",
            content:
              "Website hosting the outputs created by Studio Grafisch Ontwerp. A collaboration between Design Museum Gent en 019",
          },
        ]}
      />
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
