import Dashboard from "components/Admin/Dashboard";
import NewProduct from "components/Admin/NewProduct";
import OrderList from "components/Admin/OrderList";
import ProccessOrder from "components/Admin/ProccessOrder";
import ProductList from "components/Admin/ProductList";
import ProductReview from "components/Admin/ProductReview";
import UpdateProduct from "components/Admin/UpdateProduct";
import UpdateUser from "components/Admin/UpdateUser";
import UserList from "components/Admin/UserList";
import ActiveEmail from "components/Auth/ActiveEmail";
import ForgotPassword from "components/Auth/ForgotPassword";
import Login from "components/Auth/Login";
import Profile from "components/Auth/Profile";
import Register from "components/Auth/Register";
import ResetPassword from "components/Auth/ResetPasswod";
import UpdatePassword from "components/Auth/UpdatePassword";
import UpdateProfile from "components/Auth/UpdateProfile";
import Cart from "components/Cart/Cart";
import ComfirmOrder from "components/Cart/ComfirmOrder";
import OrderSuccess from "components/Cart/OrderSuccess";
import Shipping from "components/Cart/Shipping";
import Home from "components/Home";
import ListOrder from "components/Order/ListOrder";
import OrderDetail from "components/Order/OrderDetail";
import ProductDetail from "components/Product/ProductDetail";
import ProtectedRoute from "components/route/ProtectedRoute";
import React from "react";
import { Fragment } from "react";
import { Route, Switch } from "react-router-dom";
// import NotFound from "components/utils/NotFound"

const Routes = () => {
  return (
    <Switch>
      <Fragment>
        <section className="container-fluid">
          <Route path="/" component={Home} exact />
          <Route path="/search/:keyword" component={Home} />
          <Route path="/product/:id" component={ProductDetail} exact />
          <Route path="/register" component={Register} exact />

          {/* Authentication */}
          <Route path="/login" component={Login} exact />
          <Route path="/api/auth/activation/:activation_token" component={ActiveEmail} exact/>
          <Route path="/forgot-password" component={ForgotPassword} exact />
          <Route path="/api/auth/reset-password/:token" component={ ResetPassword} exact />
          <ProtectedRoute path="/profile" component={Profile} exact />
          <ProtectedRoute path="/update-profile" component={UpdateProfile} exact />
          <ProtectedRoute path="/update-password" component={UpdatePassword} exact />
        
          {/* Cart */}
          <Route path="/cart" component={Cart} exact />
          <ProtectedRoute path="/shipping" component={Shipping}  />
          <ProtectedRoute path="/orders/confirm" component={ComfirmOrder} exact />
          <ProtectedRoute path="/payment" component={OrderSuccess} exact />

          {/* Order */}
          <ProtectedRoute path="/orders/me" component={ListOrder} exact />
          <ProtectedRoute path="/order/:id" component={OrderDetail} exact />

          
        </section>
        {/* Admin */}
        <ProtectedRoute path="/dashboard" isAdmin={true} component={Dashboard} exact/>
        <ProtectedRoute path="/admin/products" isAdmin={true} component={ProductList} exact/>
        <ProtectedRoute path="/admin/product" isAdmin={true} component={NewProduct} exact/>
        <ProtectedRoute path="/admin/product/:id" isAdmin={true} component={UpdateProduct} exact/>
        <ProtectedRoute path="/admin/users" isAdmin={true} component={UserList} exact/>
        <ProtectedRoute path="/admin/user/:id" isAdmin={true} component={UpdateUser} exact/>
        <ProtectedRoute path="/admin/orders" isAdmin={true} component={OrderList} exact/>
        <ProtectedRoute path="/admin/order/:id" isAdmin={true} component={ProccessOrder} exact/>
        <ProtectedRoute path="/admin/reviews" isAdmin={true} component={ProductReview} exact/>

      </Fragment>

    </Switch>
  );
}

export default Routes;
