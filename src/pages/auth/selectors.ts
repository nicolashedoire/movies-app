import { RootState } from "../../store/rootReducer";

export const getAuth = (state: RootState) => state.firebase.auth;
export const getUid = (state: RootState) => state.firebase.auth.uid;
export const getProfile = (state: RootState) => state.firebase.profile;
