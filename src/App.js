import { Route, Switch } from "react-router-dom";
import "./scss/style.scss";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
//main
import Main from "./components/main/Main";
//sub
import Join from "./components/sub/Join";
import AboutRoutes from "./routes/AboutRoutes";
import ContactRoutes from "./routes/ContactRoutes";
import PrRoutes from "./routes/PrRoutes";
import Work from "./components/sub/Work";
import NewsRoutes from "./routes/NewsRoutes";

function App() {
  return (
    <>
      <Switch>
        <Route exact path="/">
          {/* 메인용 header */}
          <Header type={"main"} />
          <Main />
        </Route>

        {/* 서브용 header */}
        <Route path="/" render={() => <Header type={"sub"} />} />
      </Switch>
      <Route path="/about" component={AboutRoutes} />
      <Route path="/work" component={Work} />
      <Route path="/news" component={NewsRoutes} />
      <Route path="/pr" component={PrRoutes} />
      <Route path="/contact" component={ContactRoutes} />
      <Route path="/join" component={Join} />
      <Footer />
    </>
  );
}

export default App;
