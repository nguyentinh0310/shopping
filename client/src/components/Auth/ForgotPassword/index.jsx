import axios from "axios";
import MetaData from "components/layouts/MetaData";
import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { forgotPassword, clearErrors } from "redux/actions/userAction";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const { loading, success, err } = useSelector(
    (state) => state.forgotPassword
  );

  useEffect(() => {
    if (err) {
      toast.error(err, {
        position: toast.POSITION.BOTTOM_CENTER
      });
      dispatch(clearErrors());
    }
    if (success) {
      toast.success(success, {
        position: toast.POSITION.BOTTOM_CENTER
      });
    }
  }, [dispatch, success, err]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(forgotPassword({ email }));
  };
  return (
    <Fragment>
      <MetaData title={"Quên mật khẩu"} />
      <div className="row wrapper">
        <div className="col-10 col-lg-5">
          <form className="shadow-lg">
            <h1 className="mb-3">Quên mật khẩu</h1>
            <div className="form-group">
              <label htmlFor="email_field">Nhập email</label>
              <input
                type="email"
                id="email_field"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <button
              id="forgot_password_button"
              type="submit"
              className="btn btn-block py-3"
              onClick={handleSubmit}
              disabled={loading ? true : false}
            >
              Gửi email
            </button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default ForgotPassword;
