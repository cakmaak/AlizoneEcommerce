import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";

// GET adreslerim
export const fetchAddresses = createAsyncThunk(
  "address/fetchAddresses",
  async () => {
    const response = await api.get("/alizone/getmyaddress");
    return response.data;
  }
);

// ADD adres
export const addAddress = createAsyncThunk(
  "address/addAddress",
  async (address) => {
    const response = await api.post("/alizone/add/address", address);
    return response.data;
  }
);

export const updateAddress = createAsyncThunk(
  "address/updateAddress",
  async ({ id, data }) => {
    const response = await api.put(`/alizone/updtadres/${id}`, data);
    return response.data;
  }
);

const addressSlice = createSlice({
  name: "address",
  initialState: {
    items: [],
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAddresses.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAddresses.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchAddresses.rejected, (state) => {
        state.loading = false;
      })
      .addCase(updateAddress.fulfilled,(state,action)=>{
         const index = state.items.findIndex(
    (item) => item.id === action.payload.id
  );
   if (index !== -1) {
    state.items[index] = action.payload;
  }
      })
      
      .addCase(addAddress.fulfilled, (state, action) => {
        state.items.push(action.payload);
      });
      
  },
});

export default addressSlice.reducer;
