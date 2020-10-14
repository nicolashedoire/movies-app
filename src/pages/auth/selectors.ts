import { RootState } from "../../store/rootReducer";

export const getAuth = (state: RootState) => {
  return state.firebase.auth;
};
