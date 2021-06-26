import Footer from "components/layouts/Footer";
import Header from "components/layouts/Header";
import ScrollToTop from "components/layouts/ScrollToTop";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getToken } from "redux/actions/tokenAction";
import { getUser } from "redux/actions/userAction";
import "./App.scss";
import { Suspense } from 'react';

import Routes from "./Routes";

function App() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    const fistLogin = localStorage.getItem("userInfo");
  if (fistLogin) {
      dispatch(getToken());
    }
  }, [dispatch, isAuthenticated]);

  useEffect(() => {
    if (token) {
      dispatch(getUser(token));
    }
  }, [dispatch, token]);
  return (
    <Suspense fallback={<div>Loading ...</div>}>

    <Router>
      <div className="App">
        <ScrollToTop/>
        <Header />
        <Routes />
        <ToastContainer  />

        <Footer />
      </div>
    </Router>
    </Suspense>
  );
}

export default App;
