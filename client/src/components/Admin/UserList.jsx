import Loader from "components/layouts/Loader";
import MetaData from "components/layouts/MetaData";
import { MDBDataTable } from "mdbreact";
import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { allUsers, clearErrors, deleteUser } from "redux/actions/userAction";
import { DELETE_USER_RESET } from "redux/contants/userContant";
import Sidebar from "./SideBar";


const UserList = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector((state) => state.allUser);
  const { isDeleted } = useSelector((state) => state.userReducer);
  const token = useSelector((state) => state.token);

  useEffect(() => {
    dispatch(allUsers(token))
    if (error) {
      toast.error(error, {
        position: toast.POSITION.BOTTOM_CENTER
      });
      dispatch(clearErrors());
    }
    if (isDeleted) {
      history.push("/admin/users");
      toast.success("Xóa người dùng thành công", {
        position: toast.POSITION.BOTTOM_CENTER
      });

      dispatch({ type: DELETE_USER_RESET });
    }
  }, [dispatch, error, isDeleted, history,token]);
  const setUsers = () => {
    const data = {
      columns: [
        {
          label: "User ID",
          field: "id",
          sort: "asc",
        },
        {
          label: "Name",
          field: "name",
          sort: "asc",
        },
        {
          label: "Email",
          field: "email",
          sort: "asc",
        },
        {
          label: "Role",
          field: "role",
          sort: "asc",
        },
        {
          label: "Actions",
          field: "actions",
          sort: "asc",
        },
      ],
      rows: [],
    };
    users.forEach((user) => {
      data.rows.push({
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        actions: (
          <Fragment>
            <Link
              to={`/admin/user/${user._id}`}
              className="btn btn-primary py-1 px-2"
            >
              <i className="fas fa-pen"></i>
            </Link>
            <button
              className="btn btn-danger py-1 px-2 ml-2"
              onClick={() => handleDeleteUser(token, user._id)}
            >
              <i className="fa fa-trash"></i>
            </button>
          </Fragment>
        ),
      });
    });
    return data;
  };

  const handleDeleteUser = (token, id) => {
    dispatch(deleteUser(token, id));

    console.log(id);
  };
  return (
    <Fragment>
      <MetaData title={"Tất cả người dùng"} />
      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>

        <div className="col-12 col-md-10">
          <Fragment>
            <h1 className="my-5 text-center">Tất cả người dùng</h1>

            {loading ? (
              <Loader />
            ) : (
              <MDBDataTable
                data={setUsers()}
                className="px-3"
                bordered
                striped
                hover
              />
            )}
          </Fragment>
        </div>
      </div>
    </Fragment>
  );
}

export default UserList;
