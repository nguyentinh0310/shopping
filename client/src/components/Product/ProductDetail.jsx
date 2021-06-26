import { clearErrors, getProductDetail } from "redux/actions/productAction";
import Loader from "components/layouts/Loader";
import MetaData from "components/layouts/MetaData";
import React, { Fragment, useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Carousel } from "react-responsive-carousel";
import { addItemToCart } from "redux/actions/cartAction";
import { toast } from "react-toastify";

const ProductDetail = ({ match }) => {
  const formater = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const { loading, product, error } = useSelector(
    (state) => state.productDetail
  );

  useEffect(() => {
    // lấy params đúng param sản phẩm
    dispatch(getProductDetail(match.params.id));
    if (error) {
      dispatch(clearErrors());
    }
  }, [dispatch, error, match.params.id]);
  const increaseQty = () => {
    const count = document.querySelector(".count");

    if (count.valueAsNumber >= product.stock) return;

    const qty = count.valueAsNumber + 1;
    setQuantity(qty);
  };

  const decreaseQty = () => {
    const count = document.querySelector(".count");

    if (count.valueAsNumber <= 1) return;

    const qty = count.valueAsNumber - 1;
    setQuantity(qty);
  };

  const addToCart = () => {
    if (product.stock === 0) {
      document.getElementById("cart_btn").disabled = true;
    } else {
      dispatch(addItemToCart(match.params.id, quantity));
      toast.success("Thêm vào giỏ thành công",
      {
        position: toast.POSITION.BOTTOM_CENTER
      });
    }
  };

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={"Chi tiết sản phẩm"} />
          <div className="container">
            <div className="row f-flex justify-content-around product">
              <div className="col-12 col-lg-5  img-fluid" id="product_image">
              <Carousel pause="hover">
                  {product.images &&
                    product.images.map((image) => (
                      <img
                        key={image.public_id}
                        className="d-block w-100"
                        src={image.url}
                        alt={product.title}
                      />
                    ))}
                </Carousel>
              </div>

              <div className="col-12 col-lg-7 mt-5">
                <h3>{product.name}</h3>
                <p id="product_id">Mã sản phẩm: {product._id}</p>

                <hr />

                <div className="ratings__outer">
                  <div
                    className="ratings__inner"
                    style={{ width: `${(product.ratings / 5) * 100}% ` }}
                  ></div>
                </div>
                <span className="ratings__reviews col-sm-12 text-center">
                  ({product.numberOfReviews} Đánh giá)
                </span>

                <hr />

                <p id="product_price">{formater.format(product.price)}</p>
                <div className="stockCounter d-inline">
                  <span className="btn btn-danger minus" onClick={decreaseQty}>
                    -
                  </span>

                  <input
                    type="number"
                    className="form-control count d-inline"
                    value={quantity}
                    readOnly
                  />

                  <span className="btn btn-primary plus" onClick={increaseQty}>
                    +
                  </span>
                </div>
                <Button
                  type="button"
                  id="cart_btn"
                  className="btn btn-primary  d-inline ml-4"
                  onClick={addToCart}
                >
                  Thêm vào giỏ hàng
                </Button>

                <hr />

                <p>
                  Trạng thái:{" "}
                  <span
                    className={product.stock > 0 ? "greenColor" : "redColor"}
                  >
                    {product.stock > 0 ? "Còn hàng" : "Hết hàng"}
                  </span>
                </p>

                <hr />
                <hr />

                <h4 className="mt-2">Mô tả:</h4>
                <p>{product.description}</p>
                <hr />

                <Button
                  id="review_btn"
                  type="button"
                  className="mt-4"
                  onClick={handleShow}
                >
                  <span>Đánh giá</span>
                </Button>
                <Modal show={show} onHide={handleClose}>
                  <Modal.Header>
                    <h3>Đánh giá sản phẩm</h3>
                  </Modal.Header>
                  <Modal.Body>
                    <ul className="stars ">
                      <li className="star">
                        <i className="fa fa-star"></i>
                      </li>
                      <li className="star">
                        <i className="fa fa-star"></i>
                      </li>
                      <li className="star">
                        <i className="fa fa-star"></i>
                      </li>
                      <li className="star">
                        <i className="fa fa-star"></i>
                      </li>
                      <li className="star">
                        <i className="fa fa-star"></i>
                      </li>
                    </ul>

                    <textarea
                      name="review"
                      id="review"
                      rows="6"
                      className="form-control mt-3"
                    ></textarea>

                    <Button
                      id="review_btn"
                      onClick={handleClose}
                      className="btn my-3 float-right review-btn px-4 text-white"
                    >
                      Đồng ý
                    </Button>
                  </Modal.Body>
                </Modal>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
}

export default ProductDetail;
