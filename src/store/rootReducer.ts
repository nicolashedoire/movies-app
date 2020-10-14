import { combineReducers } from "@reduxjs/toolkit";
import AuthReducer from "./authReducer";
import { firestoreReducer } from "redux-firestore";
import { firebaseReducer } from "react-redux-firebase";

const rootReducer = combineReducers({
  auth: AuthReducer,
  firestore: firestoreReducer,
  firebase: firebaseReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
