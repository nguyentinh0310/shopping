import Loader from "components/layouts/Loader";
import MetaData from "components/layouts/MetaData";
import { MDBDataTable } from "mdbreact";
import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { allOrders, clearErrors, deleteOrder } from "redux/actions/orderAction";
import { DELETE_ORDER_RESET } from "redux/contants/orderContant";
import Sidebar from "./SideBar";

const OrderList = () => {
  const formater = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });
  const history = useHistory();
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector((state) => state.allOrder);
  const token = useSelector((state) => state.token);
  const { isDeleted } = useSelector((state) => state.handleOrder);

  useEffect(() => {
    dispatch(allOrders(token));

    if (error) {
      toast.error(error, {
        position: toast.POSITION.BOTTOM_CENTER
      });
      dispatch(clearErrors());
    }

    if (isDeleted) {
      toast.success("Xoá đơn hàng thành công", {
        position: toast.POSITION.BOTTOM_CENTER
      });
      history.push("/admin/orders");
      dispatch({ type: DELETE_ORDER_RESET });
    }
  }, [dispatch, error, token, isDeleted, history]);

  const setOrders = () => {
    const data = {
      columns: [
        {
          label: "Order ID",
          field: "id",
          sort: "asc",
        },
        {
          label: "No of Items",
          field: "numberOfItems",
          sort: "asc",
        },
        {
          label: "Amount",
          field: "amount",
          sort: "asc",
        },
        {
          label: "Status",
          field: "status",
          sort: "asc",
        },
        {
          label: "Actions",
          field: "actions",
        },
      ],
      rows: [],
    };

    orders.forEach((order) => {
      data.rows.push({
        id: order._id,
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
          <Fragment>
            <Link
              to={`/admin/order/${order._id}`}
              className="btn btn-primary py-1 px-2"
            >
              <i className="fa fa-eye"></i>
            </Link>
            <button
              className="btn btn-danger py-1 px-2 ml-2"
              onClick={() => handleDeleteOrder(token, order._id)}
            >
              <i className="fa fa-trash"></i>
            </button>
          </Fragment>
        ),
      });
    });

    return data;
  };

  const handleDeleteOrder = (token, id) => {
    dispatch(deleteOrder(token, id));
    console.log(id);
  };

  return (
    <Fragment>
      <MetaData title={"Tất cả đơn hàng"} />
      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>

        <div className="col-12 col-md-10">
          <Fragment>
            <h1 className="my-5">All Orders</h1>

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
        </div>
      </div>
    </Fragment>
  );
};

export default OrderList;
