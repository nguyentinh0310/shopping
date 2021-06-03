import Loader from "components/layouts/Loader";
import MetaData from "components/layouts/MetaData";
import React, { Fragment, useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { clearErrors, register } from "redux/actions/userAction";

const Register = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    cf_password: "",
  });
  const { name, email, password, cf_password } = values;

  const dispatch = useDispatch();
  const { loading, isAuthenticated, err } = useSelector(
    (state) => state.auth
  );

  const handleOnchange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    if (isAuthenticated) {
      toast.success("Đăng ký thành công! Hãy xác nhận email để bắt đầu 😇 ", {
        position: toast.POSITION.BOTTOM_CENTER
      });
    }
    if (err) {
      toast.error(err, {
        position: toast.POSITION.BOTTOM_CENTER
      });
      dispatch(clearErrors());
    }
  }, [dispatch, isAuthenticated, err]);

  const handlerSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set("name", name);
    formData.set("email", email);
    formData.set("password", password);
    formData.set("cf_password", cf_password);
    if (password !== cf_password) {
      toast.error("Mật khẩu không khớp");
    } else {
      dispatch(register(formData));
    }
  };

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={"Đăng ký"} />
          <div className="row wrapper">
            <div className="col-10 col-lg-5">
              <Form className="shadow-lg" onSubmit={handlerSubmit}>
                <h1 className="mb-3 text-center">Đăng ký</h1>
                <div className="form-group">
                  <label htmlFor="email_field">Họ tên</label>
                  <input
                    type="name"
                    id="name_field"
                    className="form-control"
                    name="name"
                    value={name}
                    onChange={handleOnchange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email_field">Email</label>
                  <input
                    type="email"
                    id="email_field"
                    className="form-control"
                    name="email"
                    value={email}
                    onChange={handleOnchange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="password_field">Mật khẩu</label>
                  <input
                    type="password"
                    id="password_field"
                    className="form-control"
                    name="password"
                    value={password}
                    onChange={handleOnchange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="password_field">Xác nhận mật khẩu</label>
                  <input
                    type="password"
                    id="password_field"
                    className="form-control"
                    name="cf_password"
                    value={cf_password}
                    onChange={handleOnchange}
                  />
                </div>

                <Button
                  id="register_button"
                  type="submit"
                  className="btn btn-block py-3"
                  disabled={loading ? true : false}
                >
                  Đăng ký
                </Button>
              </Form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
}

export default Register;
