import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Home from "./pages/Home";
import Doctors from "./pages/Doctors";
import Doctor from "./pages/Doctor";

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/doctors" exact component={Doctors} />
        <Route path="/doctors/:id" component={Doctor} />
      </Switch>
    </BrowserRouter>
  );
}
