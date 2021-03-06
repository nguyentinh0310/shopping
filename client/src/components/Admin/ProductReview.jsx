import MetaData from 'components/layouts/MetaData';
import { MDBDataTable } from 'mdbreact';
import React, { useEffect, useState } from 'react';
import { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { clearErrors, deleteReview, getProductReviews } from 'redux/actions/reviewAction';
import { DELETE_REVIEW_RESET } from 'redux/contants/reviewContant';
import Sidebar from './SideBar';

const ProductReview = () => {
  const [productId, setProductId] = useState('');

  const dispatch = useDispatch();
  const { error, reviews } = useSelector((state) => state.allReviews);
  const token = useSelector((state) => state.token);
  const { isDeleted, error: deleteError } = useSelector((state) => state.deleteReview);
  useEffect(() => {
    if (error) {
      toast.error(error, {
        position: toast.POSITION.BOTTOM_CENTER,
      });
      dispatch(clearErrors());
    }
    if (productId !== '') {
      dispatch(getProductReviews(token, productId));
    }
    if (deleteError) {
      toast.error(deleteError, {
        position: toast.POSITION.BOTTOM_CENTER,
      });
      dispatch(clearErrors());
    }

    if (isDeleted) {
      toast.success('Xóa đánh giá sản phẩm thành công', {
        position: toast.POSITION.BOTTOM_CENTER,
      });
      dispatch({ type: DELETE_REVIEW_RESET });
    }
  }, [dispatch, error, token, productId, isDeleted, deleteError]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(getProductReviews(token, productId));
  };
  const handleDelete = (token,id) => {
    dispatch(deleteReview(token,id, productId));
  };
  const setReviews = () => {
    const data = {
      columns: [
        {
          label: 'ID',
          field: 'id',
          sort: 'asc',
        },
        {
          label: 'Rating',
          field: 'rating',
          sort: 'asc',
        },
        {
          label: 'Bình luận',
          field: 'comment',
          sort: 'asc',
        },
        // {
        //   label: 'User',
        //   field: 'user',
        //   sort: 'asc',
        // },
        {
          label: 'Hành động',
          field: 'actions',
        },
      ],
      rows: [],
    };

    reviews.forEach((review) => {
      data.rows.push({
        id: review._id,
        rating: review.rating,
        comment: review.comment,
        // user: review.name,

        actions: (
          <button
            className="btn btn-danger py-1 px-2 ml-2"
            onClick={() => handleDelete(token, review._id)}
          >
            <i className="fa fa-trash"></i>
          </button>
        ),
      });
    });

    return data;
  };

  return (
    <Fragment>
      <MetaData title={'Đánh giá sản phẩm'} />
      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>

        <div className="col-12 col-md-10">
          <Fragment>
            <div className="row justify-content-center mt-5">
              <div className="col-5">
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="productId_field">Nhập id sản phẩm</label>
                    <input
                      type="text"
                      id="productId_field"
                      className="form-control"
                      value={productId}
                      onChange={(e) => setProductId(e.target.value)}
                    />
                  </div>

                  <button
                    id="search_button"
                    type="submit"
                    className="btn btn-primary btn-block py-2"
                  >
                    Tìm kiếm
                  </button>
                </form>
              </div>
            </div>

            {reviews && reviews.length > 0 ? (
              <MDBDataTable data={setReviews()} className="px-3" bordered striped hover />
            ) : (
              <p className="mt-5 text-center">Không có đánh giá nào.</p>
            )}
          </Fragment>
        </div>
      </div>
    </Fragment>
  );
};

export default ProductReview;
