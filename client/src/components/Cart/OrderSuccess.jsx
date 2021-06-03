import React, { Fragment } from "react";
import { Link } from "react-router-dom";

const OrderSuccess = () => {
  return (
    <Fragment>
      <div className="row justify-content-center">
        <div className="col-6 mt-5 text-center">
          <img
            className="my-5 img-fluid d-block mx-auto"
            src="https://icons-for-free.com/iconfiles/png/512/correct+mark+success+tick+valid+yes+icon-1320167819078544687.png"
            alt="Order Success"
            width="200"
            height="200"
          />

          <h2>Đơn hàng của bạn đã được đặt thành công.</h2>

          <Link to="/orders/me">Đi tới đơn hàng</Link>
        </div>
      </div>
    </Fragment>
  );
};

export default OrderSuccess;
