import Loader from "components/layouts/Loader";
import MetaData from "components/layouts/MetaData";
import React, { useEffect, useState } from "react";
import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { clearErrors, getOrderDetails, updateOrder } from "redux/actions/orderAction";
import { UPDATE_ORDER_RESET } from "redux/contants/orderContant";
import Sidebar from "./SideBar";

const ProccessOrder = ({ match }) => {
  const formater = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });

  const [status, setStatus] = useState("");

  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const { loading, order = {} } = useSelector((state) => state.orderDetail);
  const { shippingInfo, orderItems, user, totalPrice, orderStatus } = order;
  const { error, isUpdated } = useSelector((state) => state.handleOrder);

  const shippingDetails =
    shippingInfo &&
    `${shippingInfo.address}, ${shippingInfo.district}, ${shippingInfo.city} `;

  useEffect(() => {
    dispatch(getOrderDetails(token, match.params.id));

    if (error) {
      toast.error(error, {
        position: toast.POSITION.BOTTOM_CENTER
      });
      dispatch(clearErrors);
    }

    if (isUpdated) {
      toast.success("Cập nhật trạng thái thành công", {
        position: toast.POSITION.BOTTOM_CENTER
      });
      dispatch({ type: UPDATE_ORDER_RESET });
    }
  }, [dispatch, error, isUpdated, match.params.id, token]);

  const handleUpdateStatus = (id) => {
    console.log(id);
    const formData = new FormData();
    formData.set('status', status);

    dispatch(updateOrder(id, formData,token))
  };
  return (
    <Fragment>
      <MetaData title={`Process Order # ${order && order._id}`} />
      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>

        <div className="col-12 col-md-10">
          <Fragment>
            {loading ? (
              <Loader />
            ) : (
              <div className="row d-flex justify-content-around">
                <div className="col-12 col-lg-7 order-details">
                  <h2 className="my-5">Mã đơn hàng {order._id}</h2>

                  <h4 className="mb-4">Thông tin vận chuyển</h4>
                  <p>
                    <b>Tên:</b> {user && user.name}
                  </p>
                  <p>
                    <b>Số điện thoại:</b> {shippingInfo && shippingInfo.phone}
                  </p>
                  <p className="mb-4">
                    <b>Địa chỉ:</b>
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

                <div className="col-12 col-lg-3 mt-5">
                  <h4 className="my-4">Trạng thái</h4>

                  <div className="form-group">
                    <select
                      className="form-control"
                      name="status"
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                    >
                      <option value="Processing">Đang xử lý</option>
                      <option value="Shipped">Đang giao hàng</option>
                      <option value="Delivered">Đã giao hàng</option>
                    </select>
                  </div>

                  <button
                    className="btn btn-primary btn-block"
                    onClick={() => handleUpdateStatus(order._id)}
                  >
                    Cập nhật trạng thái
                  </button>
                </div>
              </div>
            )}
          </Fragment>
        </div>
      </div>
    </Fragment>
  );
};

export default ProccessOrder;
