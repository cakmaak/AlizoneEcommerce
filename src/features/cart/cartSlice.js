import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getCart,
  addToCart,
  removeFromCart,
  setCartQuantity,
} from "../../services/cartApi";

/* =======================
   ASYNC THUNKS
======================= */

export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async (_, { rejectWithValue }) => {
    try {
      const data = await getCart(); // api çağrısı
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Sepet getirilemedi");
    }
  }
);

export const addCartItem = createAsyncThunk(
  "cart/addCartItem",
  async ({ productId, quantity }, thunkAPI) => {
    try {
      // 🔴 quantity HER ZAMAN 1
      return await addToCart({ productId, quantity: 1 });
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const deleteCartItem = createAsyncThunk(
  "cart/deleteCartItem",
  async (basketItemId, thunkAPI) => {
    try {
      await removeFromCart(basketItemId);
      return basketItemId;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const updateCartQuantity = createAsyncThunk(
  "cart/updateCartQuantity",
  async ({ basketItemId, quantity }, thunkAPI) => {
    try {
      await setCartQuantity({ basketItemId, quantity });
      return { basketItemId, quantity };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

/* =======================
   SLICE
======================= */

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    totalPrice: 0,
    loading: false,
    error: null,
  },
  reducers: {
     clearCartState: (state) => {
      state.items = [];
      state.totalPrice = 0;
    },
  },
  extraReducers: (builder) => {
    builder

      /* FETCH */
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload || [];

        state.totalPrice = state.items.reduce(
          (sum, item) => sum + Number(item.fiyat) * Number(item.adet),
          0
        );
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
.addCase(addCartItem.fulfilled, (state, action) => {
  const incoming = action.payload;

  const exists = state.items.find(
    (item) => item.productId === incoming.productId
  );

  if (exists) {
    exists.adet += incoming.adet;
    state.totalPrice += Number(incoming.fiyat) * Number(incoming.adet);
    return;
  }

  state.items.push(incoming);
  state.totalPrice += Number(incoming.fiyat) * Number(incoming.adet);
})


      /* DELETE */
      .addCase(deleteCartItem.fulfilled, (state, action) => {
        const item = state.items.find(
          (i) => i.basketItemId === action.payload
        );

        if (item) {
          state.totalPrice -= Number(item.fiyat) * Number(item.adet);
        }

        state.items = state.items.filter(
          (i) => i.basketItemId !== action.payload
        );
      })

      /* UPDATE */
      .addCase(updateCartQuantity.fulfilled, (state, action) => {
        const item = state.items.find(
          (i) => i.basketItemId === action.payload.basketItemId
        );

        if (item) {
          state.totalPrice +=
            (Number(action.payload.quantity) - Number(item.adet)) *
            Number(item.fiyat);

          item.adet = action.payload.quantity;
        }
      });
  },
});

export const { clearCartState } = cartSlice.actions; 

export default cartSlice.reducer;
