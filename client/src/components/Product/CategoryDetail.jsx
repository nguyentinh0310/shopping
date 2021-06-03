import { clearErrors, getProduct } from 'redux/actions/productAction';
import Loader from 'components/layouts/Loader';
import Product from 'components/Product/Product';
import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';

CategoryDetail.propTypes = {

};

function CategoryDetail() {
    const dispatch = useDispatch()
    const { loading, error, products, } = useSelector(state => state.products)
    let cate = useParams()
    useEffect(() => {
        dispatch(getProduct(cate))
        if (error) {
            dispatch(clearErrors())
        }
    }, [dispatch,error, cate])

    return (
        <Fragment>
            {loading ? <Loader /> : (
                <Fragment>
                    <div className="mt-5 container">
                        <h1>Sản phẩm</h1>
                        <div className="row mt-2">
                            {products && products.map(product => (
                                <Product key={product._id} product={product} />
                            ))}
                        </div>
                    </div>
                </Fragment>
            )}

        </Fragment>
    )
}
export default CategoryDetail;