import Loader from "components/layouts/Loader";
import MetaData from "components/layouts/MetaData";
import React, { Fragment, useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { GoogleLogin } from "react-google-login";
import { clearErrors, logIn } from "redux/actions/userAction";
import axios from "axios";

const Login = ({ history, location }) => {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const { email, password } = values;

  const handleOnchange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const dispatch = useDispatch();
  const { loading, err, user, isAuthenticated } = useSelector(
    (state) => state.auth
  );

  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (user && isAuthenticated) {
      history.push(redirect);
      toast.success("Đăng nhập thành công", {
        position: toast.POSITION.BOTTOM_CENTER
      });
    }

    if (err) {
      toast.error(err, {
        position: toast.POSITION.BOTTOM_CENTER
      });
      dispatch(clearErrors());
    }
  }, [dispatch, history, redirect, user, isAuthenticated, err]);

  const handlerSubmit = (e) => {
    e.preventDefault();
    dispatch(logIn(email, password));
  };

  const responseGoogle = async (response) => {
    console.log(response);
  //   try {
  //     const res = await axios.post("/api/auth/google_login", {
  //       tokenId: response.tokenId,
  //     });
  //     // setValues(res.data.message);

  //     toast.success(res.data.message);
  //     // localStorage.setItem("userInfo", JSON.stringify(res));
  //     // history.push("/");
  //   } catch (err) {
  //     console.log(err);
  //     // err.response.data.message && toast.error(err.response.data.message);
  //   }
  };
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={"Đăng nhập"} />
          <div className="row wrapper">
            <div className="col-10 col-lg-5">
              <Form className="shadow-lg" onSubmit={handlerSubmit}>
                <h1 className="mb-3 text-center">Đăng nhập</h1>
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

                <Link to="/forgot-password" className="float-right mb-4">
                  Quên mật khẩu?
                </Link>

                <Button
                  id="login_button"
                  type="submit"
                  className="btn btn-block py-3"
                >
                  Đăng nhập
                </Button>

                <div className="social">
                  <GoogleLogin
                    clientId="216758887760-d4r7nhh99d6gipukedvi378nlakimg7g.apps.googleusercontent.com"
                    buttonText="Đăng nhập với google"
                    onSuccess={responseGoogle}
                    cookiePolicy={"single_host_origin"}
                  />
                </div>
                <Link
                  to="/register"
                  className="d-flex justify-content-center mt-3"
                >
                  <span className="text-decoration-none ">
                    Chưa có tài khoản!
                  </span>
                  &nbsp; Tạo tài khoản?
                </Link>
              </Form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Login;
