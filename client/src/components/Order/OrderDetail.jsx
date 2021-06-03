import Loader from "components/layouts/Loader";
import MetaData from "components/layouts/MetaData";
import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { clearErrors, getOrderDetails } from "redux/actions/orderAction";

const OrderDetail = ({ match }) => {
  const formater = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const {
    loading,
    error,
    order = {},
  } = useSelector((state) => state.orderDetail);
  const { shippingInfo, orderItems, user, totalPrice, orderStatus } = order;

  const shippingDetails =
    shippingInfo &&
    `${shippingInfo.address}, ${shippingInfo.district}, ${shippingInfo.city} `;

  useEffect(() => {
    dispatch(getOrderDetails(token, match.params.id));

    if (error) {
      toast.error(error, {
        position: toast.POSITION.BOTTOM_CENTER
      });
      dispatch(clearErrors());
    }
  }, [dispatch, error, token, match.params.id]);
  return (
    <Fragment>
      <MetaData title="Chi tiết đơn hàng" />
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="container">
            <div className="row d-flex justify-content-between">
              <div className="col-12 col-lg-8 mt-5 order-details">
                <h1 className="my-5">Mã đơn hàng: {order._id}</h1>

                <h4 className="mb-4">Thông tin vận chuyển</h4>
                <p>
                  <b>Tên:</b> {user && user.name}
                </p>
                <p>
                  <b>Số điện thoại:</b> {shippingInfo && shippingInfo.phone}
                </p>
                <p className="mb-4">
                  <b>Địa chỉ: </b>
                  {shippingDetails}
                </p>
                <p>
                  <b>Tổng tiền:</b> {formater.format(totalPrice)}
                </p>

                <hr />
                <h4 className="my-4">Trạng thái đơn hàng:</h4>
                <p
                  className={
                    order.orderStatus &&
                    String(order.orderStatus).includes("Đã giao hàng")
                      ? "greenColor"
                      : "redColor"
                  }
                >
                  <b>{orderStatus}</b>
                </p>

                <h4 className="my-4">Các mặt hàng:</h4>

                <hr />
                <div className="cart-item my-1">
                  {orderItems &&
                    orderItems.map((item) => (
                      <div key={item.product} className="row my-5">
                        <div className="col-4 col-lg-2">
                          <img
                            src={item.image}
                            alt={item.name}
                            height="45"
                            width="65"
                          />
                        </div>

                        <div className="col-5 col-lg-5">
                          <Link to={`/products/${item.product}`}>
                            {item.name}
                          </Link>
                        </div>

                        <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                          <p>{formater.format(item.price)}</p>
                        </div>

                        <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                          <p>x {item.quantity} </p>
                        </div>
                      </div>
                    ))}
                </div>
                <hr />
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default OrderDetail;
