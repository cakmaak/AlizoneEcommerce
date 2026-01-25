import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createOrder as createOrderApi,cancelOrderApi, } from "../../services/orderApi";

export const createOrder = createAsyncThunk(
  "order/createOrder",
  async ({ addressId }, { rejectWithValue }) => {
    try {
      const data = await createOrderApi({ addressId });
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);
export const cancelOrder = createAsyncThunk(
  "order/cancelOrder",
  async (orderId, { rejectWithValue }) => {
    try {
      return { orderId, ...(await cancelOrderApi(orderId)) };
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);


const orderSlice = createSlice({
  name: "order",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.items.push(action.payload);
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
       .addCase(cancelOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(cancelOrder.fulfilled, (state, action) => {
        state.loading = false;

        const order = state.items.find(
          (o) => o.orderId === action.payload.orderId
        );
        if (order) {
          order.status = "CANCELLED";
        }
      })
      .addCase(cancelOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});


export default orderSlice.reducer;
