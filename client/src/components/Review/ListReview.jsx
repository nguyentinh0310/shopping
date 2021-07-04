import React from 'react';

const ListReview = ({ reviews }) => {
  return (
    <div className="reviews">
      <h3>Nhận xét</h3>
      <hr />
      {reviews &&
        reviews.map((review) => (
          <div key={review._id} className="review-card my-3">
            <div className="ratings__outer">
              <div
                className="ratings__inner"
                style={{ width: `${(review.rating / 5) * 100}%` }}
              ></div>
            </div>
            <p className="review_user"> {review._id}</p>
            <p className="review_comment">{review.comment}</p>

            <hr />
          </div>
        ))}
    </div>
  );
};

export default ListReview;
