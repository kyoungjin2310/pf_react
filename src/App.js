import { Route, Switch } from "react-router-dom";
import "./scss/style.scss";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
//main
import Visual from "./components/main/Visual";
import Pics from "./components/main/Pics";
import Vids from "./components/main/Vids";
//sub
import News from "./components/sub/News";
import Join from "./components/sub/Join";
import AboutRoutes from "./routes/AboutRoutes";
import ContactRoutes from "./routes/ContactRoutes";
import PrRoutes from "./routes/PrRoutes";
import Work from "./components/sub/Work";

function App() {
  return (
    <>
      <Switch>
        <Route exact path="/">
          {/* 메인용 header */}
          <Header type={"main"} />
          <Visual />
          <Pics />
          <Vids />
        </Route>

        {/* 서브용 header */}
        <Route path="/" render={() => <Header type={"sub"} />} />
      </Switch>

      <Route path="/about" component={AboutRoutes} />
      <Route path="/work" component={Work} />
      <Route path="/news" component={News} />
      <Route path="/pr" component={PrRoutes} />
      <Route path="/contact" component={ContactRoutes} />
      <Route path="/join" component={Join} />

      <Footer />
    </>
  );
}

export default App;
