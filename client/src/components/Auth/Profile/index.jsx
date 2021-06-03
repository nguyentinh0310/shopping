import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

import Loader from '../../layouts/Loader'
import MetaData from 'components/layouts/MetaData'

const Profile = () => {

    const { user, loading } = useSelector(state => state.auth)

    return (
        <Fragment>
            {loading ? <Loader /> : (
                <Fragment>
                    <MetaData title={'Trang cá nhân'} />

                    <h2 className="mt-5 ml-5">Trang cá nhân</h2>
                    <div className="row justify-content-around mt-5 user-info">
                        <div className="col-12 col-md-4 text-center">
                            <figure className='avatar avatar-profile'>
                                <img className="rounded-circle img-fluid" src={user.avatar} alt={user.name} />
                            </figure>
                            <Link to="update-profile" id="edit_profile" className="btn btn-primary btn-block my-5">
                                Sửa trang cá nhân
                            </Link>
                        </div>

                        <div className="col-12 col-md-6">
                            <h4>Họ tên</h4>
                            <p>{user.name}</p>

                            <h4>Email</h4>
                            <p>{user.email}</p>

                            <h4>Tham gia</h4>
                            <p>{String(user.createdAt).substring(0, 10)}</p>

                            {user.role !== 'admin' && (
                                <Link to="/orders/me" className="btn btn-danger btn-block mt-5">
                                    Đơn hàng của tôi
                                </Link>
                            )}

                            <Link to="/update-password" className="btn btn-primary btn-block mt-3">
                                Đổi mật khẩu
                            </Link>
                        </div>
                    </div>
                </Fragment>
            )}
        </Fragment>
    )
}
export default Profile