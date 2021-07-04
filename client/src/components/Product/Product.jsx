import React, { Fragment } from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const Product = (props) => {
  const formater = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });

  const { product, col } = props;
  return (
    <Fragment>
      <div className={`col-sm-12 col-md-6 col-lg-${col} my-2 products`}>
        <Card className="products__card ">
          <Link to={`/product/${product._id}`}>
            <Card.Img
              className="products__img mx-auto"
              src={product.images[0].url}
              alt="img"
            />
          </Link>
          <Card.Body className="products__body d-flex flex-column">
            <Card.Title className="products__title ml-2 mt-0 mb-1">
              <Link to={`/product/${product._id}`}>{product.name}</Link>
            </Card.Title>
            <div className="ratings mt-auto ml-2">
              <div className="ratings__outer">
                <div
                  className="ratings__inner "
                  style={{ width: `${(product.ratings / 5) * 100}% ` }}
                ></div>
              </div>
              <span className="ratings__reviews">
                ({product.numberOfReviews} Đánh giá)
              </span>
            </div>
            <Card.Text className="products__text">
              {formater.format(product.price)}
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
    </Fragment>
  );
}

export default Product;
