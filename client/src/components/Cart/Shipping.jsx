import React, { Fragment, useState } from "react";
import MetaData from "../layouts/MetaData";
import CheckoutSteps from "./CheckOutSteps";
import dataCity from "components/data.json";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { saveShippingInfo } from "redux/actions/cartAction";
import { toast } from "react-toastify";

const Shipping = () => {
  const { shippingInfo } = useSelector((state) => state.cart);

  const [address, setAddress] = useState(shippingInfo.address);
  const [district, setDistrict] = useState(shippingInfo.district);
  const [city, setCity] = useState(shippingInfo.city);
  const [phone, setPhone] = useState(shippingInfo.phone);

  // const [address, setAddress] = useState('');
  // const [district, setDistrict] = useState('');
  // const [city, setCity] = useState('');
  // const [phone, setPhone] = useState('');

  const history = useHistory();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (phone.length !== 10) {
      toast.error("Số điện thoại dịnh dạng 10 số ", {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    } else if (!address || !district || !city) {
      toast.error("Mời nhập các trường", {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    } else {
      dispatch(saveShippingInfo({ address, district, city, phone }));
      history.push("/orders/confirm");
    }
  };

  return (
    <Fragment>
      <MetaData title={"Thông tin vận chuyển"} />

      <CheckoutSteps shipping />

      <div className="row wrapper">
        <div className="col-10 col-lg-5">
          <form className="shadow-lg" onSubmit={handleSubmit}>
            <h1 className="mb-4">Thông tin vận chuyển</h1>
            <div className="form-group">
              <label htmlFor="city_field">Thành phố</label>
              <select
                id="city_field"
                className="form-control"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
              >
                <option>--</option>
                {dataCity.map((city) => (
                  <option value={city.name} key={city.name}>
                    {city.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="district_field">Quận/Huyện</label>
              <select
                id="district_field"
                className="form-control"
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                required
              >
                <option>--</option>
                {dataCity.map(
                  (itemCity) =>
                    itemCity.name === city &&
                    itemCity.huyen.map((huyen) => (
                      <option value={huyen.name} key={huyen.name}>
                        {huyen.name}
                      </option>
                    ))
                )}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="address_field">Địa chỉ cụ thể</label>
              <input
                type="text"
                id="address_field"
                className="form-control"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone_field">Số điện thoại</label>
              <input
                type="phone"
                id="phone_field"
                className="form-control"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>

            <button
              id="shipping_btn"
              type="submit"
              className="btn btn-block py-3"
            >
              Tiếp tục
            </button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default Shipping;
