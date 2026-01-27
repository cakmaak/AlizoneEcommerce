import {HashRouter, BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";

import Home from "../pages/Home/Home";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import Cart from "../pages/Cart/Cart";
import ProductList from "../pages/Product/ProductList";
import AddressList from "../pages/Address/AddressList";
import AddressSelect from "../pages/Orders/AddressSelect";
import About from "../pages/About/About"; 
import ContactPage from "../pages/Contact/ContactPage";
import AddAddress from "../pages/Address/AddAddress";
import ProfilePage from "../pages/Profile/ProfilePage";
import EditAddress from "../pages/Address/EditAddress";
import ProductDetailPage from "../pages/Product/ProductDetailPage";
import References from "../pages/References/References";

import MesafeliSatis from "../pages/Legal/MesafeliSatis";
import OnBilgilendirme from "../pages/Legal/OnBilgilendirme";
import GizlilikKvkk from "../pages/Legal/GizlilikKvkk";
import IadeCayma from "../pages/Legal/IadeCayma";

import PrivateRoute from "./PrivateRoute";
import AdminRoute from "../routes/AdminRoute";

import FakeBank from "../pages/fake/fakeBank";
import OrderSuccess from "../pages/Orders/OrderSuccess";

/* ADMIN */
import AdminLayout from "../components/layout/AdminLayout";
import AdminDashboard from "../pages/Admin/AdminDashboard";
import AdminReferences from "../pages/Admin/References";
import AddProduct from "../pages/Admin/AddProduct";
import UpdatePrice from "../pages/Admin/UpdatePrice";
import UpdateImage from "../pages/Admin/UpdateImage";
import UpdateStock from "../pages/Admin/UpdateStock";
import DeliveredTruck from "../pages/Admin/DelivededTruck";
import UpdateBtu from "../pages/Admin/UpdateBtu";
import AdminOrders from "../pages/Admin/AdminOrders";
import ResetPassword from "../pages/Auth/ResetPassword";
import ForgotPassword from "../pages/Auth/ForgotPassword";
import RefundOrder from "../pages/Admin/RefundOrder"
import Setteklifal from "../pages/Admin/Setteklifal";





const AppRouter = () => {
  return (
    <HashRouter basename="/">
      <Routes>

        {/* 🔥 NAVBAR OLAN SAYFALAR */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home/>} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/products/:id" element={<ProductDetailPage />} />
          <Route path="/references" element={<References />} />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/contact" element={<ContactPage />} />
          <Route path="/about" element={<About />} />

          <Route path="/mesafeli-satis-sozlesmesi" element={<MesafeliSatis />} />
          <Route path="/on-bilgilendirme-formu" element={<OnBilgilendirme />} />
          <Route path="/gizlilik-ve-kvkk" element={<GizlilikKvkk />} />
          <Route path="/iade-cayma" element={<IadeCayma />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />

          <Route path="/fakebank" element={<FakeBank />} />
          <Route path="/order/success/:orderId" element={<OrderSuccess />} />

          {/* 🔒 PRIVATE */}
          <Route
            path="/cart"
            element={
              <PrivateRoute>
                <Cart />
              </PrivateRoute>
            }
          />

          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <ProfilePage />
              </PrivateRoute>
            }
          />

          <Route
            path="/addresses"
            element={
              <PrivateRoute>
                <AddressList />
              </PrivateRoute>
            }
          />

         <Route
  path="/addresses/add"
  element={
    <PrivateRoute>
      <AddAddress />
    </PrivateRoute>
  }
/>

          <Route
            path="/addresses/edit/:id"
            element={
              <PrivateRoute>
                <EditAddress />
              </PrivateRoute>
            }
          />

          <Route
            path="/order/select-address"
            element={
              <PrivateRoute>
                <AddressSelect />
              </PrivateRoute>
            }
          />
        </Route>

        {/* 🛑 ADMIN (NAVBAR YOK) */}
       <Route
  path="/admin"
  element={
    <AdminRoute>
      <AdminLayout />
    </AdminRoute>
  }
>
  <Route index element={<AdminDashboard />} />
  <Route path="adminreferences" element={<AdminReferences />} />
  <Route path="add-product" element={<AddProduct />} /> 
  <Route path="update-price/:id" element={<UpdatePrice />} />
  <Route path="update-image" element={<UpdateImage />} />
  <Route path="update-stock" element={<UpdateStock />} />
  <Route path="update-price" element={<UpdatePrice />} />
  <Route path="delivered-truck" element={<DeliveredTruck />} />
  <Route path="update-btu" element={<UpdateBtu />} />
  <Route path="orders" element={<AdminOrders />} />
  <Route path="refund-order" element={<RefundOrder />} />
  <Route path="set-teklif" element={<Setteklifal />} />
</Route>
      </Routes>
    </HashRouter>
  );
};

export default AppRouter;
