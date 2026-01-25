import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import cartReducer from "../features/cart/cartSlice";
import addressReducer from "../features/address/addressSlice";
import orderReducer from "../features/order/orderSlice";
import profileReducer from "../features/profile/profileSlice";
import uiReducer from "../features/ui/uiSlice";
import adminProductReducer from "../features/admin/adminProductSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart:cartReducer,
    address: addressReducer,
    order: orderReducer,
    profile: profileReducer,
    ui: uiReducer,
    adminProduct: adminProductReducer,
  },
});
