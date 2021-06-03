import MetaData from "components/layouts/MetaData";
import React, { useEffect, useState } from "react";
import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { toast } from "react-toastify";
import {
  clearErrors,
  getUserDetails,
  updateUser,
} from "redux/actions/userAction";
import { UPDATE_USER_RESET } from "redux/contants/userContant";
import Sidebar from "./SideBar";

const UpdateUser = ({ match }) => {
  const [role, setRole] = useState("");

  const history = useHistory();
  const dispatch = useDispatch();
  const { isUpdated, error } = useSelector((state) => state.userReducer);
  const { user } = useSelector((state) => state.userDetail);
  const token = useSelector((state) => state.token);

  const userId = match.params.id;

  useEffect(() => {
    console.log(user && user._id !== userId);
    if (user && user._id !== userId) {
      dispatch(getUserDetails(token, userId));
    } else {
      setRole(user.role);
    }
    if (error) {
      toast.error(error, {
        position: toast.POSITION.BOTTOM_CENTER,
      });
      dispatch(clearErrors());
    }
    if (isUpdated) {
      toast.success("Người dùng cập nhật thành công", {
        position: toast.POSITION.BOTTOM_CENTER,
      });
      history.push("/admin/users");
      dispatch({ type: UPDATE_USER_RESET });
    }
  }, [dispatch, history, error, isUpdated, user, userId, token]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set("role", role);

    dispatch(updateUser(token, user._id, formData));
  };

  return (
    <Fragment>
      <MetaData title={`Cập nhật người dùng`} />
      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>

        <div className="col-12 col-md-10">
          <div className="row wrapper">
            <div className="col-10 col-lg-5">
              <form className="shadow-lg" onSubmit={handleSubmit}>
                <h1 className="mt-2 mb-5">Cập nhật người dùng</h1>

                <div className="form-group">
                  <label htmlFor="role_field">Role</label>

                  <select
                    id="role_field"
                    className="form-control"
                    name="role"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                  >
                    <option value="user">user</option>
                    <option value="admin">admin</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="btn update-btn btn-block mt-4 mb-3"
                >
                  Cập nhập
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default UpdateUser;
