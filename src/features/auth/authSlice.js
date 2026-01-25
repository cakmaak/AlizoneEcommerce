import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";
import { decodeJwt } from "../../utils/jwt";

const token = localStorage.getItem("token");
const decoded = token ? decodeJwt(token) : null;

const initialState = {
  user: decoded
    ? { email: decoded.sub, role: decoded.role }
    : null,
  token: token || null,
  isLoading: false,
  error: null,
};

/* =======================
   LOGIN THUNK
======================= */
export const loginUser = createAsyncThunk(
  "auth/login",
  async (data, thunkAPI) => {
    try {
      return await authService.login(data);
    } catch (err) {
      return thunkAPI.rejectWithValue("Email veya Şifre Hatalı");
    }
  }
);



export const registerUser = createAsyncThunk(
  "auth/register",
  async (data, thunkAPI) => {
    try {
      const res = await authService.register(data);
      return res; // { token } dönüyor backend’den
    } catch (err) {
      // err.response.data.message veya fallback
      const message =
        err?.response?.data?.message ||
        err?.message ||
        "Kayıt başarısız";
      return thunkAPI.rejectWithValue(message);
    }
  }
);
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      /* === LOGIN === */
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.token = action.payload.token;

        const decoded = decodeJwt(action.payload.token);
        state.user = {
          email: decoded.sub,
          role: decoded.role,
        };

        localStorage.setItem("token", action.payload.token);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      /* === REGISTER === */
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;

        const decoded = decodeJwt(action.payload.token);
        state.token = action.payload.token;
        state.user = {
          email: decoded.sub,
          role: decoded.role,
        };
        localStorage.setItem("token", action.payload.token);
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload; 
      });
  }, 
});


export const { logout } = authSlice.actions;
export default authSlice.reducer;
