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

// Sepeti getir
export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async (_, { rejectWithValue }) => {
    try {
      const data = await getCart(); 
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Sepet getirilemedi");
    }
  }
);

// Sepete ekle (guestId ile birlikte)
export const addCartItem = createAsyncThunk(
  "cart/addCartItem",
  async ({ productId, quantity, guestId }, thunkAPI) => {
    try {
      // quantity HER ZAMAN 1
      return await addToCart({ productId, quantity: 1, guestId });
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Sepetten sil
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

// Adet güncelle
export const updateCartQuantity = createAsyncThunk(
  "cart/updateQuantity",
  async ({ basketItemId, adet }, { dispatch, rejectWithValue }) => {
    try {
      // Buradaki parametre isminin "quantity" olduğundan emin ol (setCartQuantity öyle bekliyor)
      await setCartQuantity({ basketItemId, quantity: adet });
      
      // ✅ API başarılı olursa sepeti tekrar çek ki isimler ve adetler güncellensin
      dispatch(fetchCart()); 
      return { basketItemId, adet };
    } catch (err) {
      // Hata detayını konsola bas ki Java'da ne patladı görelim
      console.error("Backend Hatası:", err.response?.data);
      return rejectWithValue(err.response?.data);
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
      // FETCH
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

      // ADD
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

      // DELETE
      .addCase(deleteCartItem.fulfilled, (state, action) => {
        const item = state.items.find((i) => i.basketItemId === action.payload);
        if (item) {
          state.totalPrice -= Number(item.fiyat) * Number(item.adet);
        }
        state.items = state.items.filter((i) => i.basketItemId !== action.payload);
      })

      // UPDATE
.addCase(updateCartQuantity.fulfilled, (state, action) => {
  const item = state.items.find(
    (i) => i.basketItemId === action.payload.basketItemId
  );
  if (item) {
    const newQty = Number(action.payload.adet); // 'quantity' değil 'adet'
    const oldQty = Number(item.adet);
    
    state.totalPrice += (newQty - oldQty) * Number(item.fiyat);
    item.adet = newQty;
  }
})
  },
});

export const { clearCartState } = cartSlice.actions;
export default cartSlice.reducer;