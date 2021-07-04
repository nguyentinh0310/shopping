import Loader from 'components/layouts/Loader';
import MetaData from 'components/layouts/MetaData';
import ListReview from 'components/Review/ListReview';
import React, { Fragment, useEffect, useState } from 'react';
import { Alert, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Carousel } from 'react-responsive-carousel';
import { toast } from 'react-toastify';
import { addItemToCart } from 'redux/actions/cartAction';
import { clearErrors, getProductDetail } from 'redux/actions/productAction';
import { newReview } from 'redux/actions/reviewAction';
import { NEW_REVIEW_RESET } from 'redux/contants/reviewContant';

const ProductDetail = ({ match }) => {
  const formater = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  });

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const token = useSelector((state) => state.token);
  const { loading, product, error } = useSelector((state) => state.productDetail);
  const { error: reviewError, success } = useSelector((state) => state.newReview);

  useEffect(() => {
    // lấy params đúng param sản phẩm
    dispatch(getProductDetail(match.params.id));
    if (error) {
      dispatch(clearErrors());
    }

    if (reviewError) {
      toast.error(reviewError, {
        position: toast.POSITION.BOTTOM_CENTER,
      });
      dispatch(clearErrors());
    }

    if (success) {
      toast.success('Đánh giá sản phẩm thành công', {
        position: toast.POSITION.BOTTOM_CENTER,
      });
      dispatch({ type: NEW_REVIEW_RESET });
    }
  }, [dispatch, error, match.params.id, reviewError, success]);
  const increaseQty = () => {
    const count = document.querySelector('.count');

    if (count.valueAsNumber >= product.stock) return;

    const qty = count.valueAsNumber + 1;
    setQuantity(qty);
  };

  const decreaseQty = () => {
    const count = document.querySelector('.count');

    if (count.valueAsNumber <= 1) return;

    const qty = count.valueAsNumber - 1;
    setQuantity(qty);
  };

  const addToCart = () => {
    if (product.stock === 0) {
      document.getElementById('cart_btn').disabled = true;
    } else {
      dispatch(addItemToCart(match.params.id, quantity));
      toast.success('Thêm vào giỏ thành công', {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
  };

  function setUserRatings() {
    const stars = document.querySelectorAll('.star');

    console.log(stars);
    stars.forEach((star, index) => {
      star.starValue = index + 1;
      ['click', 'mouseover', 'mouseout'].forEach(function (e) {
        star.addEventListener(e, showRatings);
      });
    });

    function showRatings(e) {
      stars.forEach((star, index) => {
        if (e.type === 'click') {
          if (index < this.starValue) {
            star.classList.add('orange');

            setRating(this.starValue);
          } else {
            star.classList.remove('orange');
          }
        }

        if (e.type === 'mouseover') {
          if (index < this.starValue) {
            star.classList.add('yellow');
          } else {
            star.classList.remove('yellow');
          }
        }

        if (e.type === 'mouseout') {
          star.classList.remove('yellow');
        }
      });
    }
  }

  const handleSubmitReview = () => {
    const formData = new FormData();

    formData.set('rating', rating);
    formData.set('comment', comment);
    formData.set('productId', match.params.id);

    dispatch(newReview(token, formData));
  };

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={'Chi tiết sản phẩm'} />
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
                <h3 className="product_title">{product.name}</h3>
                <p className="product_id">Mã sản phẩm: {product._id}</p>
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
                  Trạng thái:
                  <span className={product.stock > 0 ? 'greenColor' : 'redColor'}>
                    {product.stock > 0 ? 'Còn hàng' : 'Hết hàng'}
                  </span>
                </p>

                <hr />
                <hr />

                <h4 className="mt-2">Mô tả:</h4>
                <p className="description">{product.description}</p>
                <hr />
                {user ? (
                  <button
                    id="review_btn"
                    type="button"
                    className="btn btn-primary mt-4"
                    data-toggle="modal"
                    data-target="#ratingModal"
                    onClick={setUserRatings}
                  >
                    Đánh giá
                  </button>
                ) : (
                  <Alert variant="danger">Đăng nhập để đánh giá sản phẩm</Alert>
                )}
                <div className="row mt-2 mb-5">
                  <div className="rating w-50">
                    <div
                      className="modal fade"
                      id="ratingModal"
                      tabIndex="-1"
                      role="dialog"
                      aria-labelledby="ratingModalLabel"
                      aria-hidden="true"
                    >
                      <div className="modal-dialog" role="document">
                        <div className="modal-content">
                          <div className="modal-header">
                            <h3 className="modal-title text-center" id="ratingModalLabel">
                              Đánh giá
                            </h3>
                            <button
                              type="button"
                              className="close"
                              data-dismiss="modal"
                              aria-label="Close"
                            >
                              <span aria-hidden="true">&times;</span>
                            </button>
                          </div>
                          <div className="modal-body">
                            <ul className="stars">
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
                              className="form-control mt-3"
                              value={comment}
                              onChange={(e) => setComment(e.target.value)}
                            ></textarea>

                            <Button
                              id="review_btn"
                              onClick={handleSubmitReview}
                              data-dismiss="modal"
                              aria-label="Close"
                              className="btn my-3 float-right review-btn px-4 text-white"
                            >
                              Đồng ý
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
              {product.reviews && product.reviews.length > 0 && (
                <ListReview reviews={product.reviews} />
              )}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default ProductDetail;
