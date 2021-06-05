import MetaData from "components/layouts/MetaData";
import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { toast } from "react-toastify";
import { clearErrors, getUser, updateProfile } from "redux/actions/userAction";
import { UPDATE_PROFILE_RESET } from "redux/contants/userContant";

const UpdateProfile = () => {
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState(false);

  const history = useHistory();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { loading, err, isUpdated } = useSelector((state) => state.userReducer);
  const token = useSelector((state) => state.token);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setAvatar(user.avatar.url);
    }
    if (err) {
      toast.error(err, {
        position: toast.POSITION.BOTTOM_CENTER,
      });
      dispatch(clearErrors());
    }
    if (isUpdated) {
      history.push("/profile");
      dispatch(getUser(token));
      toast.success("Cập nhật thành công 😇 !", {
        position: toast.POSITION.BOTTOM_CENTER,
      });
      dispatch({ type: UPDATE_PROFILE_RESET });
    }
  }, [dispatch, history, token, user, isUpdated, err]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set("name", name);
    formData.set("avatar", avatar);
    dispatch(updateProfile(token, formData));
  };


  const onChangeAvatar = (e) => {
    const reader = new FileReader();

    console.log(reader);
    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatar(reader.result);
      }
    };

    reader.readAsDataURL(e.target.files[0]);
  };
  return (
    <Fragment>
      <MetaData title={"Cập nhật trang cá nhân"} />

      <div className="row wrapper profile">
        <div className="col-10 col-lg-5">
          <form
            className="shadow-lg"
            onSubmit={handleSubmit}
            encType="multipart/form-data"
          >
            <h1 className="mt-2 mb-5">Cập nhật trang cá nhân</h1>

            <div className="form-group">
              <label htmlFor="email_field">Họ tên</label>
              <input
                type="name"
                id="name_field"
                className="form-control"
                name="name"
                defaultValue={user.name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="email_field">Avatar</label>
              <div className="profile__avatar">
                <img src={avatar ? avatar : user.avatar.url} alt="" />

                <span>
                  <i className="fas fa-camera"></i>
                  <p>Thay đổi</p>
                  <input
                    type="file"
                    name="file"
                    id="file_up"
                    className='custom-file-input'
                    accept='image/*'
                    onChange={onChangeAvatar}
                  />
                </span>
              </div>
            </div>

            <button
              type="submit"
              className="btn update-btn btn-block mt-4 mb-3"
              disabled={loading ? true : false}
            >
              Cập nhật
            </button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default UpdateProfile;
