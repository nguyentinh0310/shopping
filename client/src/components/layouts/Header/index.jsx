import { logOut } from "redux/actions/userAction";
import Search from "components/Search";
import React, { Fragment } from "react";
import { Nav } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Route } from "react-router";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Header = () => {
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);

  const userLink = () => {
    return (
      <li className="navbar__drop-nav">
        <Link to="#" className="navbar__avatar">
          <img src={user.avatar} alt="" /> <span>{user.name} </span>
          <i className="fas fa-caret-down"></i>
        </Link>
        <ul className="navbar__dropdown">
          {user && user.role !== "admin" ? (
            <li>
              {" "}
              <Link to="/orders/me">Đơn hàng</Link>
            </li>
          ) : (
            <li>
              <Link to="/dashboard">Trang quản trị</Link>
            </li>
          )}
          <li>
            <Link to="/profile">Trang cá nhân</Link>
          </li>
          <li>
            <Link to="/" onClick={logOutHandler}>
              Đăng xuất
            </Link>
          </li>
        </ul>
      </li>
    );
  };
  const logOutHandler = () => {
    dispatch(logOut());

    toast.success("Đăng xuất thành công", {
      position: toast.POSITION.BOTTOM_CENTER
    });
  };
  return (
    <Fragment>
      <Nav className="navbar row">
        <div md="col-12 col-md-2 mt-2 mt-md-0 text-center">
          <Link to="/" className="navbar__brand">
            <img src="/images/logo.png" alt="logo" />
          </Link>
        </div>
        <div className="col-12 col-md-6 mt-2 mt-md-0">
          <Route render={({ history }) => <Search history={history} />} />
        </div>
        <div className="col-12 col-md-4 mt-4 mt-md-0 d-flex navbar__center">
          <Link to="/cart" className="mr-3 mt-2 text-decoration-none d-flex">
            <span className="ml-3 navbar__cart">
              <i className="fas fa-shopping-cart"></i>
            </span>
            <span className="ml-1 navbar__cart--count" id="cart-count">
              ({cartItems.length})
            </span>
          </Link>

          {user
            ? userLink()
            : !loading && (
                <Link to="/login" className="btn ml-2 mt-2 navbar__login--btn">
                  Đăng nhập
                </Link>
              )}
        </div>
      </Nav>
    </Fragment>
  );
};

export default Header;
