import MetaData from "components/layouts/MetaData";
import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { toast } from "react-toastify";
import { clearErrors, newProduct } from "redux/actions/productAction";
import { NEW_PRODUCT_RESET } from "redux/contants/productContant";
import Sidebar from "./SideBar";

const NewProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState(0);
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const categories = ["Quần áo", "Giày dép", "Khác"];

  const history = useHistory();
  const dispatch = useDispatch();
  const { loading, error, success } = useSelector((state) => state.newProduct);
  const token = useSelector((state) => state.token);

  useEffect(() => {
    if (error) {
      toast.error(error, {
        position: toast.POSITION.BOTTOM_CENTER,
      });

      dispatch(clearErrors());
    }
    if (success) {
      toast.success("Tạo sản phẩm thành công", {
        position: toast.POSITION.BOTTOM_CENTER,
      });
      history.push("/admin/products");
      dispatch({ type: NEW_PRODUCT_RESET });
    }
  }, [dispatch, history, error, success]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set("name", name);
    formData.set("price", price);
    formData.set("description", description);
    formData.set("category", category);
    formData.set("stock", stock);

    images.forEach((image) => {
      formData.append("images", image);
    });

    dispatch(newProduct(token, formData));
  };

  const handleOnChange = (e) => {
    const files = Array.from(e.target.files);
    console.log(files);

    setImagesPreview([]);
    setImages([]);
    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((oldArray) => [...oldArray, reader.result]);
          setImages((oldArray) => [...oldArray, reader.result]);
        }
      };



      reader.readAsDataURL(file);
    });
  };
  return (
    <Fragment>
      <MetaData title={"Tạo sản phẩm mới"} />
      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>
        <div className="col-12 col-md-10">
          <Fragment>
            <div className="wrapper my-5">
              <form
                className="shadow-lg"
                onSubmit={handleSubmit}
                encType="multipart/form-data"
              >
                <h1 className="mb-4">Sản phẩm mới</h1>

                <div className="form-group">
                  <label htmlFor="name_field">Tên sản phẩm</label>
                  <input
                    type="text"
                    id="name_field"
                    className="form-control"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="price_field">Giá</label>
                  <input
                    type="text"
                    id="price_field"
                    className="form-control"
                    name="price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="description_field">Description</label>
                  <textarea
                    className="form-control"
                    id="description_field"
                    rows="8"
                    name="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  ></textarea>
                </div>

                <div className="form-group">
                  <label htmlFor="category_field">Thể loại</label>
                  <select
                    className="form-control"
                    id="category_field"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option>--</option>
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="stock_field">Kho</label>
                  <input
                    type="number"
                    id="stock_field"
                    className="form-control"
                    name="stock"
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label>Hình ảnh</label>

                  <div className="custom-file">
                    <input
                      type="file"
                      name="images"
                      className="custom-file-input"
                      id="customFile"
                      accept='image/*'
                      onChange={handleOnChange}
                      multiple
                    />
                    <label className="custom-file-label" htmlFor="customFile">
                      Choose
                    </label>
                  </div>
                </div>

                {imagesPreview.map((img) => (
                  <img
                    src={img}
                    key={img}
                    alt="Images Preview"
                    className="mt-3 mr-2"
                    width="55"
                    height="52"
                  />
                ))}
                <button
                  id="login_button"
                  type="submit"
                  disabled={loading ? true : false}
                  className="btn btn-block py-3"
                >
                  Tạo sản phẩm
                </button>
              </form>
            </div>
          </Fragment>
        </div>
      </div>
    </Fragment>
  );
};

export default NewProduct;
