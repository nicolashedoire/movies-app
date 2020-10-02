import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import "./App.scss";

import NavBar from "./components/navbar";
import Dashboard from "./pages/dashboard";
import MoviesDetails from "./pages/movies/details";
import MoviesCreate from "./pages/movies/create";
import MoviesUpdate from "./pages/movies/update";
import SignIn from "./pages/auth/signIn";
import SignUp from "./pages/auth/signUp";

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <Switch>
          <Redirect from={"/"} to={"/movies"} exact />
          <Route exact path="/movies" component={Dashboard} />
          <Route exact path="/movies/new" component={MoviesCreate} />
          <Route exact path="/movies/:id" component={MoviesDetails} />
          <Route exact path="/movies/:id/edit" component={MoviesUpdate} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/signin" component={SignIn} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
