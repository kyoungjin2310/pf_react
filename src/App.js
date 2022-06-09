import { Route, Switch } from "react-router-dom";
import "./scss/style.scss";
import Header from "./componetns/common/Header";
import Footer from "./componetns/common/Footer";
//main
import Visual from "./componetns/main/Visual";
import Pics from "./componetns/main/Pics";
import Vids from "./componetns/main/Vids";
//sub
import Department from "./componetns/sub/Department";
import Gallery from "./componetns/sub/Gallery";
import News from "./componetns/sub/News";
import Youtube from "./componetns/sub/Youtube";
import Join from "./componetns/sub/Join";
import Contact from "./componetns/sub/Contact";

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

      <Route path="/about" component={Department} />
      <Route path="/news" component={News} />
      <Route path="/pr/gallery" component={Gallery} />
      <Route path="/pr/youtube" component={Youtube} />
      <Route path="/contact" component={Contact} />
      <Route path="/join" component={Join} />

      <Footer />
    </>
  );
}

export default App;
