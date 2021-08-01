import CheckoutSteps from "components/Cart/CheckOutSteps";
import MetaData from "components/layouts/MetaData";
import React, { useEffect } from "react";
import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { clearErrors, createOrder } from "redux/actions/orderAction";

const ComfirmOrder = () => {
  const formater = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });
  const history = useHistory();
  const dispatch = useDispatch();
  const { cartItems, shippingInfo } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);
  const token = useSelector((state) => state.token);
  const { error, success } = useSelector((state) => state.newOrder);

  //   Tính toán order
  const itemsPrice = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );
  const shippingPrice = itemsPrice > 500000 ? 0 : 30000;
  const totalPrice = itemsPrice + shippingPrice;

  useEffect(() => {
    if (error) {
      toast.error(error, {
        position: toast.POSITION.BOTTOM_CENTER
      });
      console.log(error);
      dispatch(clearErrors());
    }
    if (success) {
      toast.success("Đặt hàng thành công", {
        position: toast.POSITION.BOTTOM_CENTER
      });
      history.push("/payment");
    }
  }, [dispatch, error, success, history]);

  const cofirmToPayment = () => {
    const order = {
      orderItems: cartItems,
      shippingInfo,
      itemsPrice,
      shippingPrice,
      totalPrice,
    };
    console.log(order);
    dispatch(createOrder(token, order));
  };

  return (
    <Fragment>
      <MetaData title={"Xác nhận đơn hàng"} />

      <CheckoutSteps shipping confirmOrder />

      <div className="row d-flex justify-content-between ">
        <div className="col-12 col-lg-8 mt-5 order-confirm">
          <h4 className="mb-3">Thông tin vận chuyển</h4>
          <p>
            <b>Tên:</b> {user && user.name}
          </p>
          <p>
            <b>Số điện thoại:</b> {shippingInfo.phone}
          </p>
          <p className="mb-4">
            <b>Địa chỉ:</b>{" "}
            {`${shippingInfo.address}, ${shippingInfo.district}, ${shippingInfo.city}`}
          </p>

          <hr />
          <h4 className="mt-4">Giỏ hàng của bạn:</h4>

          {cartItems.map((item) => (
            <Fragment>
              <hr />
              <div className="cart-item my-1" key={item.product}>
                <div className="row">
                  <div className="col-4 col-lg-2">
                    <img src={item.image} alt="img" height="45" width="65" />
                  </div>

                  <div className="col-5 col-lg-6">
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                  </div>

                  <div className="col-4 col-lg-4 mt-4 mt-lg-0">
                    <p>
                      {item.quantity} x {formater.format(item.price)} ={" "}
                      <b>{formater.format(item.quantity * item.price)}</b>
                    </p>
                  </div>
                </div>
              </div>
              <hr />
            </Fragment>
          ))}
        </div>

        <div className="col-12 col-lg-3 my-4">
          <div id="order_summary">
            <h4>Tóm tắt đơn hàng </h4>
            <hr />
            <p>
              Tổng đơn:{" "}
              <span className="order-summary-values">
                {formater.format(itemsPrice)}
              </span>
            </p>
            <p>
              Phí ship:{" "}
              <span className="order-summary-values">
                {formater.format(shippingPrice)}
              </span>
            </p>

            <hr />

            <p>
              Tổng tiền:{" "}
              <span className="order-summary-values">
                {formater.format(totalPrice)}
              </span>
            </p>

            <hr />
            <button
              id="checkout_btn"
              className="btn btn-primary btn-block"
              onClick={cofirmToPayment}
            >
              Hoàn tất thanh toán
            </button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ComfirmOrder;
