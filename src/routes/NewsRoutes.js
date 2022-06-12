import React from "react";
import { Switch, Route } from "react-router-dom";
import News from "../components/sub/News";

const NewsRoutes = (props) => {
  const { match } = props;
  return (
    <Switch>
      <Route path={`${match.url}`} exact component={News} />
    </Switch>
  );
};

export default NewsRoutes;
