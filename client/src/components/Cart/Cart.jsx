import { Button } from "react-bootstrap";
import MetaData from "components/layouts/MetaData";
import React, { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { addItemToCart, removeItemFromCart } from "redux/actions/cartAction";

const Cart = () => {
  const formater = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });
  const dispatch = useDispatch();
  const history = useHistory();
  const { cartItems } = useSelector((state) => state.cart);
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  const increaseQty = (id, quantity, stock) => {
    const newQty = quantity + 1;

    if (newQty > stock) return;

    dispatch(addItemToCart(id, newQty));
  };

  const decreaseQty = (id, quantity) => {
    const newQty = quantity - 1;

    if (newQty <= 0) return;

    dispatch(addItemToCart(id, newQty));
  };

  const removeCartItemHandler = (id) => {
    dispatch(removeItemFromCart(id));
    toast.success("Xóa khỏi giỏ hàng thành công!", {
      position: toast.POSITION.BOTTOM_CENTER
    });
  };

  const handleCheckOut = () => {
    if (user && isAuthenticated) {
      history.push("/login?redirect=shipping");
    } else {
      history.push("/shipping");
    }
  };
  return (
    <Fragment>
      <MetaData title={"Trang giỏ hàng"} />
      <div className="container cart">
        {cartItems.length === 0 ? (
          <h2>Giỏ hàng không có sản phẩm nào</h2>
        ) : (
          <Fragment>
            <h2 className="mt-5">
              Giỏ hàng: <b>{cartItems.length} sản phẩm</b>
            </h2>

            <div className="row d-flex justify-content-between">
              <div className="col-12 col-lg-8">
                {cartItems.map((item) => (
                  <Fragment>
                    <hr />

                    <div className="cart__item" key={item.product}>
                      <div className="row">
                        <div className="col-4 col-lg-3">
                          <img
                            src={item.image}
                            alt="Laptop"
                            height="90"
                            width="115"
                          />
                        </div>

                        <div className="col-5 col-lg-3">
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </div>

                        <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                          <p className="card__item--price">
                            {formater.format(item.price)}
                          </p>
                        </div>

                        <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                          <div className="cart__counter d-inline">
                            <span
                              className="btn btn-danger cart__minus"
                              onClick={() =>
                                decreaseQty(item.product, item.quantity)
                              }
                            >
                              -
                            </span>

                            <input
                              type="number"
                              className="form-control count d-inline"
                              value={item.quantity}
                              readOnly
                            />

                            <span
                              className="btn btn-primary cart__plus"
                              onClick={() =>
                                increaseQty(
                                  item.product,
                                  item.quantity,
                                  item.stock
                                )
                              }
                            >
                              +
                            </span>
                          </div>
                        </div>

                        <div className="col-4 col-lg-1 mt-4 mt-lg-0">
                          <i
                            
                            className="fas fa-trash-alt btn btn-danger cart__item--delete"
                            onClick={() => removeCartItemHandler(item.product)}
                          ></i>
                        </div>
                      </div>
                    </div>
                    <hr />
                  </Fragment>
                ))}
              </div>

              <div className="col-12 col-lg-3 my-4 order">
                <div id="order__summary">
                  <h4 className="text-center">Đơn hàng</h4>
                  <hr />
                  <p>
                    Tổng đơn:{" "}
                    <span className="order__summary--values">
                      {cartItems.reduce(
                        (acc, item) => acc + Number(item.quantity),
                        0
                      )}{" "}
                      (sản phẩm)
                    </span>
                  </p>
                  <p>
                    Tổng tiền:{" "}
                    <span className="order__summary--values">
                      {formater.format(
                        cartItems.reduce(
                          (acc, item) => acc + item.quantity * item.price,
                          0
                        )
                      )}
                    </span>
                  </p>

                  <hr />
                  <Button
                    className="btn btn-primary btn-block button__checkout"
                    onClick={handleCheckOut}
                  >
                    Thanh toán
                  </Button>
                </div>
              </div>
            </div>
          </Fragment>
        )}
      </div>
    </Fragment>
  );
};

export default Cart;
