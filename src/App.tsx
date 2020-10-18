import React, { useEffect, useContext } from "react";
import { BrowserRouter as Router, Switch, Redirect, Route } from "react-router-dom";
import "./App.scss";

import NavBar from "./components/navbar";
import Dashboard from "./pages/dashboard";
import Movies from "./pages/movies/all";
import MoviesDetails from "./pages/movies/details";
import MoviesCreate from "./pages/movies/create";
import MoviesUpdate from "./pages/movies/update";
import Profile from "./pages/profile";
import PrivateRoute from "./components/privateRoute";
import { useSelector } from "react-redux";
import { RootState } from "./store/rootReducer";
import { AuthContext } from "./index";
import { getHistorical } from "./api";
import ErrorPage from "./pages/error";

function App() {
  const uid = useSelector((state: RootState) => state.firebase.auth.uid);
  const context: any = useContext(AuthContext);

  useEffect(() => {
    getHistorical(uid).then((response) => {
      context.setHistorical(response);
    });
  }, []);

  return (
    <Router>
      <div className="app">
        <React.Fragment>
          <NavBar />
          <Switch>
            <Redirect from="/" to={"/dashboard"} exact />
            <PrivateRoute exact path="/dashboard" component={Dashboard} />
            <PrivateRoute exact path="/profile" component={Profile} />
            <PrivateRoute exact path="/movies" component={Movies} />
            <PrivateRoute exact path="/movies/new" component={MoviesCreate} />
            <PrivateRoute exact path="/movies/:id" component={MoviesDetails} />
            <PrivateRoute
              exact
              path="/movies/:id/edit"
              component={MoviesUpdate}
            />
            <Route path="/error" component={ErrorPage} />
            <Redirect from="*" to={"/dashboard"} exact />
          </Switch>
        </React.Fragment>
      </div>
    </Router>
  );
}

export default App;
