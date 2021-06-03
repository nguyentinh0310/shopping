import MetaData from "components/layouts/MetaData";
import React, { useEffect } from "react";
import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "./SideBar";
import { MDBDataTable } from "mdbreact";
import Loader from "components/layouts/Loader";
import { useHistory } from "react-router";
import {
  clearErrors,
  deleteProduct,
  getAdminProducts,
} from "redux/actions/productAction";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { DELETE_PRODUCT_RESET } from "redux/contants/productContant";

const ProductList = () => {
  const formater = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });
  const history = useHistory();
  const dispatch = useDispatch();
  const { loading, error, products } = useSelector((state) => state.products);
  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.handleProduct
  );
  const token = useSelector((state) => state.token);

  useEffect(() => {
    dispatch(getAdminProducts());

    if (error) {
      toast.error(error, {
        position: toast.POSITION.BOTTOM_CENTER,
      });
      dispatch(clearErrors());
    }
    if (deleteError) {
      toast.error(deleteError, {
        position: toast.POSITION.BOTTOM_CENTER,
      });
      dispatch(clearErrors());
    }
    if (isDeleted) {
      history.push("/admin/products");
      toast.success("Xóa sản phẩm thành công", {
        position: toast.POSITION.BOTTOM_CENTER,
      });

      dispatch({ type: DELETE_PRODUCT_RESET });
    }
  }, [dispatch, error, deleteError, history, isDeleted]);
  const setProducts = () => {
    const data = {
      columns: [
        {
          label: "ID",
          field: "id",
          sort: "asc",
        },
        {
          label: "Name",
          field: "name",
          sort: "asc",
        },
        {
          label: "Price",
          field: "price",
          sort: "asc",
        },
        {
          label: "Stock",
          field: "stock",
          sort: "asc",
        },
        {
          label: "Actions",
          field: "actions",
          sort: "asc",
        },
      ],
      rows: [],
    };
    products.forEach((product) => {
      data.rows.push({
        id: product._id,
        name: product.name,
        price: formater.format(product.price),
        stock: product.stock,
        actions: (
          <Fragment>
            <Link
              to={`/admin/product/${product._id}`}
              className="btn btn-primary py-1 px-2"
            >
              <i className="fas fa-pen"></i>
            </Link>
            <button
              className="btn btn-danger py-1 px-2 ml-2"
              onClick={() => handleDeleteProduct(token, product._id)}
            >
              <i className="fa fa-trash"></i>
            </button>
          </Fragment>
        ),
      });
    });
    return data;
  };

  const handleDeleteProduct = (token, id) => {
    dispatch(deleteProduct(token, id));

    console.log(id);
  };
  return (
    <Fragment>
      <MetaData title={"Tất cả sản phẩm"} />
      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>

        <div className="col-12 col-md-10">
          <Fragment>
            <h1 className="my-5 text-center">Tất cả sản phẩm</h1>

            {loading ? (
              <Loader />
            ) : (
              <MDBDataTable
                data={setProducts()}
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

export default ProductList;
