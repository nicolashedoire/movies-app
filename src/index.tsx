import React, { createContext, useState } from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import "bootstrap/dist/css/bootstrap.min.css";
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import RootReducer from "./store/rootReducer";
import { Provider } from "react-redux";
import {
  ReactReduxFirebaseProvider,
  getFirebase,
  actionTypes as rrfActionTypes,
  isLoaded,
} from "react-redux-firebase";
import { constants as rfConstants } from "redux-firestore";
import firebase from "./firebase";
import { createFirestoreInstance } from "redux-firestore";
import { useSelector } from "react-redux";
import SignIn from "./pages/auth/signIn";
import SignUp from "./pages/auth/signUp";
import NavBar from "./components/navbar";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { RootState } from "./store/rootReducer";

const extraArgument = {
  getFirebase,
};

// react-redux-firebase config
const rrfConfig = {
  userProfile: "users",
  // useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
};

const middleware = [
  ...getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [
        // just ignore every redux-firebase and react-redux-firebase action type
        ...Object.keys(rfConstants.actionTypes).map(
          (type) => `${rfConstants.actionsPrefix}/${type}`
        ),
        ...Object.keys(rrfActionTypes).map(
          (type) => `@@reactReduxFirebase/${type}`
        ),
      ],
      ignoredPaths: ["firebase", "firestore"],
    },
    thunk: {
      extraArgument,
    },
  }),
];

const store = configureStore({ reducer: RootReducer, middleware });

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance, // <- needed if using firestore
};

interface IContextProps {
  uid: string;
  historical: Array<any>;
  historicalCount: number;
  setHistorical: Function;
}

export const AuthContext = createContext({} as IContextProps);

function AuthIsLoaded({ children }: any) {
  const [historical, setHistorical] = useState([]);
  const auth = useSelector((state: RootState) => state.firebase.auth);
  const uid = useSelector((state: RootState) => state.firebase.auth.uid);
  if (!isLoaded(auth))
    return (
      <div>
        <p className="text-center mt-4">Chargement...</p>
      </div>
    );

  return uid ? (
    <AuthContext.Provider
      value={{
        uid,
        historical,
        historicalCount: historical.length,
        setHistorical: setHistorical,
      }}
    >
      {children}
    </AuthContext.Provider>
  ) : (
    <React.Fragment>
      <Router>
        <NavBar />
        <Switch>
          <Redirect from="/" to={"/signin"} exact />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/signin" component={SignIn} />
          <Redirect from="*" to={"/signin"} exact />
        </Switch>
      </Router>
    </React.Fragment>
  );
}

ReactDOM.render(
  <Provider store={store}>
    <ReactReduxFirebaseProvider {...rrfProps}>
      <AuthIsLoaded>
        <App />
      </AuthIsLoaded>
    </ReactReduxFirebaseProvider>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
