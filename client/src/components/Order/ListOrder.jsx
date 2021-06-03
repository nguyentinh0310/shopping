import Loader from "components/layouts/Loader";
import MetaData from "components/layouts/MetaData";
import { MDBDataTable } from "mdbreact";
import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { clearErrors, myOrders } from "redux/actions/orderAction";

const OrderList = () => {
  const formater = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });
  const dispatch = useDispatch();
  const { loading, error, orders } = useSelector((state) => state.myOrder);

  const token = useSelector((state) => state.token);

  useEffect(() => {
    dispatch(myOrders(token));

    if (error) {
      toast.error(error, {
        position: toast.POSITION.BOTTOM_CENTER
      });
      dispatch(clearErrors());
    }
  }, [dispatch, error, token]);
  const setOrders = () => {
    const data = {
      columns: [
        {
          label: "ID",
          field: "id",
          sort: "asc",
        },
        // {
        //   label: "Tên sản phẩm",
        //   field: "name",
        //   sort: "asc",
        // },
        {
          label: "Số lượng",
          field: "numberOfItems",
          sort: "asc",
        },
        {
          label: "Tổng tiền",
          field: "amount",
          sort: "asc",
        },
        {
          label: "Trạng thái",
          field: "status",
          sort: "asc",
        },
        {
          label: "Hành động",
          field: "actions",
          sort: "asc",
        },
      ],
      rows: [],
    };
    orders.forEach((order) => {
      data.rows.push({
        id: order._id,
        // name: order.orderItems.name.id,
        numberOfItems: order.orderItems.length,
        amount: formater.format(order.totalPrice),
        status:
          order.orderStatus &&
          String(order.orderStatus).includes("Đã giao hàng") ? (
            <p className="badge badge-success">{order.orderStatus}</p>
          ) : (
            <p className="badge badge-danger">{order.orderStatus}</p>
          ),
        actions: (
          <Link to={`/order/${order._id}`} className="btn btn-primary">
            <i className="fa fa-eye"></i>
          </Link>
        ),
      });
    });
    return data;
  };

  return (
    <Fragment>
      <MetaData title={"Đơn hàng của bạn"} />

      <h1 className="my-5">Đơn hàng</h1>

      {loading ? (
        <Loader />
      ) : (
        <MDBDataTable
          data={setOrders()}
          className="px-3"
          bordered
          striped
          hover
        />
      )}
    </Fragment>
  );
};

export default OrderList;
