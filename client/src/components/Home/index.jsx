import Loader from "components/layouts/Loader";
import queryString from "query-string";
import Slider from "rc-slider";
import React, { Fragment, useEffect, useState } from "react";
import Pagination from "react-js-pagination";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router";
import { toast } from "react-toastify";
import { clearErrors, getProduct } from "redux/actions/productAction";
import MetaData from "../layouts/MetaData";
import Product from "../Product/Product";

const { createSliderWithTooltip } = Slider;
const Range = createSliderWithTooltip(Slider.Range);

const Home = ({ match }) => {
  const formater = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });
  const [category, setCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([1, 1000000]);
  const [rating, setRating] = useState(0);

  const categories = ["Quần áo", "Giày dép", "Khác"];

  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const {
    loading,
    error,
    products,
    productsCount,
    resPerPage,
    filteredProductsCount,
  } = useSelector((state) => state.products);
  const keyword = match.params.keyword;

  useEffect(() => {
    history.push({
      pathname: history.location.pathname,
      search: queryString.stringify({ currentPage, price, category, rating }),
    });
  }, [history, currentPage, price, category, rating]);

  useEffect(() => {
    dispatch(getProduct(keyword, currentPage, price, category, rating));
    if (error) {
      toast.error(error, {
        position: toast.POSITION.BOTTOM_CENTER
      });
      dispatch(clearErrors());
    }
  }, [dispatch, error, keyword, currentPage, price, category, rating]);

  const setCurrentPageNumber = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  let count = productsCount;
  if (keyword) {
    count = filteredProductsCount;
  }

  return (
    <Fragment>
      <Fragment>
        <MetaData title={"Trang chủ"} />
        <section className="homepage mt-3 container">
          <div className="row">
            {/* {keyword ? ( */}
            <Fragment>
              <div className="col-6 col-md-2 ">
                <div className="mt-5">
                  <h4 className="mb-3">Thể loại</h4>

                  <ul className="pl-0">
                    {categories.map((category) => (
                      <li
                        style={{
                          cursor: "pointer",
                          listStyleType: "none",
                        }}
                        key={category}
                        onClick={() => setCategory(category)}
                      >
                        {category}
                      </li>
                    ))}
                  </ul>
                </div>

                <hr />

                <div className="mt-5 mr-2">
                  <h4 className="mb-3">Lọc giá</h4>
                  <Range
                    marks={{
                      10000: `10.000`,
                      1000000: `1.000.000`,
                    }}
                    min={10000}
                    max={1000000}
                    defaultValue={[10000, 1000000]}
                    tipFormatter={(value) => `${formater.format(value)}`}
                    value={price}
                    tipProps={{
                      placement: "bottom",
                      visible: true,
                    }}
                    onChange={(price) => setPrice(price)}
                  />
                </div>

                <hr />

                <div className="mt-5">
                  <h4 className="mb-3">Lọc đánh giá</h4>

                  <ul className="pl-0">
                    {[5, 4, 3, 2, 1].map((star) => (
                      <li
                        style={{
                          cursor: "pointer",
                          listStyleType: "none",
                        }}
                        key={star}
                        onClick={() => setRating(star)}
                      >
                        <div className="ratings__outer">
                          <div
                            className="ratings__inner"
                            style={{
                              width: `${star * 20}%`,
                            }}
                          ></div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                <hr />
              </div>
              <div className="col-6 col-md-10">
                {loading ? (
                  <Loader />
                ) : (
                  <div className="row">
                    {products &&
                      products.map((product) => (
                        <Product key={product._id} product={product} col={4} />
                      ))}
                  </div>
                )}
              </div>
            </Fragment>
          </div>
        </section>

        {resPerPage <= count && (
          <div className="d-flex justify-content-center ">
            <Pagination
              activePage={currentPage}
              itemsCountPerPage={resPerPage}
              totalItemsCount={count}
              onChange={setCurrentPageNumber}
              nextPageText={"Tiếp"}
              prevPageText={"Trước"}
              firstPageText={"Đầu"}
              lastPageText={"Cuối"}
              itemClass="page-item"
              linkClass="page-link"
              activeClass="page-item"
            />
          </div>
        )}
      </Fragment>
    </Fragment>
  );
};

export default Home;
