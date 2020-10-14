import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getFirebase } from "react-redux-firebase";

const initialState = {
  loginSuccess: false,
  loginError: false,
};

interface Credentials {
  email: string;
  password: string;
}

const slice = createSlice({
  name: "Auth",
  initialState: initialState,
  reducers: {},
});

export default slice;
