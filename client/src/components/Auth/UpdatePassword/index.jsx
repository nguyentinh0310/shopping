import MetaData from "components/layouts/MetaData";
import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { toast } from "react-toastify";
import { clearErrors, updatePassword } from "redux/actions/userAction";
import { UPDATE_PASSWORD_RESET } from "redux/contants/userContant";

const UpdatePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");
  const [cf_password, setComfirmPassword] = useState("");
  const token = useSelector((state) => state.token);
  const history = useHistory();

  const dispatch = useDispatch();
  const { loading, isUpdated, err } = useSelector((state) => state.userReducer);

  useEffect(() => {
    if (err) {
      toast.error(err, {
        position: toast.POSITION.BOTTOM_CENTER
      });
      dispatch(clearErrors());
    }
    if (isUpdated) {
      toast.success(isUpdated, {
        position: toast.POSITION.BOTTOM_CENTER
      });
      history.push("/profile");
      dispatch({ type: UPDATE_PASSWORD_RESET });
    }
  }, [dispatch, history, isUpdated, err]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.set("oldPassword", oldPassword);
    formData.set("password", password);
    formData.set("cf_password", cf_password);
    if (password !== cf_password) {
      toast.error("Mật khẩu không khớp 😢 !", {
        position: toast.POSITION.BOTTOM_CENTER
      });
    } else {
      dispatch(updatePassword(token, formData));
    }
  };
  return (
    <Fragment>
      <MetaData title={"Change Password"} />

      <div className="row wrapper">
        <div className="col-10 col-lg-5">
          <form className="shadow-lg" onSubmit={handleSubmit}>
            <h1 className="mt-2 mb-5">Cập nhật mật khẩu</h1>
            <div className="form-group">
              <label htmlFor="old_password_field">Mật khẩu cũ</label>
              <input
                type="password"
                id="old_password_field"
                className="form-control"
                name="oldPassword"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="new_password_field">Mật khẩu mới</label>
              <input
                type="password"
                name="password"
                id="new_password_field"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="new_password_field">Xác nhận mật khẩu mới</label>
              <input
                type="password"
                id="new_password_field"
                className="form-control"
                name="cf_password"
                value={cf_password}
                onChange={(e) => setComfirmPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="btn update-btn btn-block mt-4 mb-3"
              disabled={loading ? true : false}
            >
              Cập nhật mật khẩu
            </button>
          </form>
        </div>
      </div>
    </Fragment>
  );
}

export default UpdatePassword;
