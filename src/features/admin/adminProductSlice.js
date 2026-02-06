import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import adminProductService from "../../services/adminProductService";

export const addProduct = createAsyncThunk(
  "admin/addProduct",
  async (productData, thunkAPI) => {
    try {
      return await adminProductService.addProduct(productData);
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Ürün eklenemedi"
      );
    }
  }
);
export const updateProductPrice = createAsyncThunk(
  "admin/updPrice",
  async ({ productId, price }, thunkAPI) => {
    try {
      return await adminProductService.updatePrice(productId, price);
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Fiyat güncellenemedi"
      );
    }
  }
);

export const setProductTeklif = createAsyncThunk(
  "admin/setProductTeklif",
  async (productId, thunkAPI) => {
    try {
      return await adminProductService.setProductTeklif(productId);
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Teklif durumu güncellenemedi"
      );
    }
  }
);
export const updateProductImages = createAsyncThunk(
  "admin/updateImages",
  async ({ productId, images }, thunkAPI) => {
    try {
      return await adminProductService.updateImages(productId, images);
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Fotoğraflar güncellenemedi"
      );
    }
  }
);
export const updateProductStock = createAsyncThunk(
  "admin/updateStock",
  async ({ productId, stock }, thunkAPI) => {
    try {
      return await adminProductService.updateStock(productId, stock);
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Stok güncellenemedi"
      );
    }
  }
);
export const sendDeliveredTruck = createAsyncThunk(
  "admin/deliveredTruck",
  async ({ orderId, trackingNo }, thunkAPI) => {
    try {
      return await adminProductService.deliveredTruck(
        orderId,
        trackingNo
      );
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Kargo bilgisi gönderilemedi"
      );
    }
  }
);
export const updateProductBtu = createAsyncThunk(
  "admin/updateBtu",
  async ({ productId, btu }, thunkAPI) => {
    try {
      return await adminProductService.updateBtu(productId, btu);
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "BTU güncellenemedi"
      );
    }
  }
);
export const setname=createAsyncThunk(
  "admin/setname",
  async ({productId,name},thunkAPI) => {
    try {
      return await adminProductService.setname(productId,name);

      
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "isim güncellenemedi"
      );

      
    }
    
  }
)
export const getAdminProducts = createAsyncThunk(
  "admin/getProducts",
  async (_, thunkAPI) => {
    try {
      return await adminProductService.getProducts();
    } catch (err) {
      return thunkAPI.rejectWithValue("Ürünler alınamadı");
    }
  }
);
export const fetchOrders = createAsyncThunk(
  "adminOrders/fetch",
  async (_, thunkAPI) => {
    try {
      return await adminProductService.getOrders();
    } catch {
      return thunkAPI.rejectWithValue("Siparişler alınamadı");
    }
  }
);

export const startRefund = createAsyncThunk(
  "admin/startRefund",
  async (orderId, thunkAPI) => {
    try {
      return await adminProductService.startRefund(orderId);
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data || "Refund başlatılamadı"
      );
    }
  }
);





const adminProductSlice = createSlice({
  name: "adminProduct",
  initialState: {
    products:[],
    orders:[],
    isLoading: false,
    success: false,
    error: null,
  },
  reducers: {
    resetAdminState: (state) => {
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addProduct.pending, (state) => {
        state.isLoading = true;
        state.success = false;
      })
      .addCase(addProduct.fulfilled, (state) => {
        state.isLoading = false;
        state.success = true;
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        
      })
     .addCase(updateProductPrice.pending, (state) => {
  state.isLoading = true;
})
.addCase(updateProductPrice.fulfilled, (state) => {
  state.isLoading = false;
  state.success = true;
})
.addCase(updateProductPrice.rejected, (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
})
.addCase(updateProductImages.pending, (state) => {
  state.isLoading = true;
  state.success = false;
})
.addCase(updateProductImages.fulfilled, (state) => {
  state.isLoading = false;
  state.success = true;
})
.addCase(updateProductImages.rejected, (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
})
.addCase(updateProductStock.pending, (state) => {
  state.isLoading = true;
  state.success = false;
})
.addCase(updateProductStock.fulfilled, (state) => {
  state.isLoading = false;
  state.success = true;
})
.addCase(updateProductStock.rejected, (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
})
.addCase(sendDeliveredTruck.pending, (state) => {
  state.isLoading = true;
  state.success = false;
})
.addCase(sendDeliveredTruck.fulfilled, (state) => {
  state.isLoading = false;
  state.success = true;
})
.addCase(sendDeliveredTruck.rejected, (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
})
.addCase(updateProductBtu.pending, (state) => {
  state.isLoading = true;
  state.success = false;
})
.addCase(updateProductBtu.fulfilled, (state) => {
  state.isLoading = false;
  state.success = true;
})
.addCase(updateProductBtu.rejected, (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
})
.addCase(getAdminProducts.pending, (state) => {
  state.isLoading = true;
})
.addCase(getAdminProducts.fulfilled, (state, action) => {
  state.isLoading = false;
  state.products = action.payload;
})
.addCase(getAdminProducts.rejected, (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
})
.addCase(fetchOrders.pending, (state) => {
  state.isLoading = true;
})
.addCase(fetchOrders.fulfilled, (state, action) => {
  state.isLoading = false;
  state.orders = action.payload;
})
.addCase(fetchOrders.rejected, (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
})
.addCase(startRefund.pending, (state) => {
  state.isLoading = true;
  state.success = false;
})
.addCase(startRefund.fulfilled, (state) => {
  state.isLoading = false;
  state.success = true;
})
.addCase(startRefund.rejected, (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
})
.addCase(setProductTeklif.pending, (state) => {
  state.isLoading = true;
  state.success = false;
})
.addCase(setProductTeklif.fulfilled, (state) => {
  state.isLoading = false;
  state.success = true;
})
.addCase(setProductTeklif.rejected, (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
})
.addCase(setname.fulfilled,(state)=>{
  state.isLoading=false;
  state.success=true;
})
.addCase(setname.pending, (state) => {
  state.isLoading = true;
  state.success = false;
})
.addCase(setname.rejected, (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
})
      
  },
});


export const { resetAdminState } = adminProductSlice.actions;
export default adminProductSlice.reducer;
