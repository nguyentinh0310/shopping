import MetaData from "components/layouts/MetaData";
import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { toast } from "react-toastify";
import { clearErrors, resetPassword } from "redux/actions/userAction";

const ResetPassword = () => {
  const [data, setData] = useState({
    password: "",
    cf_password: "",
  });
  const { password, cf_password } = data;
  const { token } = useParams();
  const dispatch = useDispatch();
  const { success, err } = useSelector((state) => state.forgotPassword);

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

  const handleOnChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.set("password", password);
    formData.set("confirmPassword", cf_password);
    if (password !== cf_password) {
      toast.error("Mật khẩu không khớp 😢 !");
    } else {
      dispatch(resetPassword(token, formData));
    }
  };

  return (
    <Fragment>
      <MetaData title={"Cài đặt lại mật khẩu"} />
      <div className="row wrapper">
        <div className="col-10 col-lg-5">
          <form className="shadow-lg">
            <h1 className="mb-3">Cài đặt lại mật khẩu</h1>

            <div className="form-group">
              <label htmlFor="password_field">Mật khẩu</label>
              <input
                type="password"
                id="password_field"
                className="form-control"
                name="password"
                value={password}
                onChange={handleOnChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="confirm_password_field">Xác nhận mật khẩu</label>
              <input
                type="password"
                id="confirm_password_field"
                className="form-control"
                name="cf_password"
                value={cf_password}
                onChange={handleOnChange}
              />
            </div>

            <button
              id="new_password_button"
              type="submit"
              className="btn btn-block py-3"
              onClick={handleSubmit}
            >
              Đặt lại mật khẩu
            </button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default ResetPassword;
