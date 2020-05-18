import React, { Fragment } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { defaultStartPath } from "Constants/defaultValues";

import TvShowList from "Pages/tvshows/list";
import ShowDetails from "Pages/tvshows/details";

export default function App({ location }) {
  return location.pathname === "/" ? (
    <Redirect to={defaultStartPath} />
  ) : (
    <Fragment>
      <Switch>
        <Route path="/tvshows/:id" component={ShowDetails} />
        <Route path="/tvshows" component={TvShowList} />
      </Switch>
    </Fragment>
  );
}
