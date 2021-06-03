import React, { useState } from "react";
import { Collapse } from "react-bootstrap";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="sidebar-wrapper">
      <nav id="sidebar">
        <ul className="list-unstyled components">
          <li>
            <Link to="/dashboard">
              <i className="fa fa-tachometer"></i> Dashboard
            </Link>
          </li>

          <li>
            <a
              href="#/"
              data-toggle="collapse"
              aria-expanded="false"
              className="dropdown-toggle"
              onClick={() => setOpen(!open)}
              aria-controls="example-collapse-text"
            >
              <i className="fa fa-product-hunt"></i> Sản phẩm
            </a>
            <Collapse in={open}>
              <ul className="collapse list-unstyled" id="example-collapse-text">
                <li>
                  <Link to="/admin/products">
                    <i className="fa fa-clipboard"></i> Tất cả
                  </Link>
                </li>

                <li>
                  <Link to="/admin/product">
                    <i className="fa fa-plus"></i> Tạo sản phẩm
                  </Link>
                </li>
              </ul>
            </Collapse>
          </li>

          <li>
            <Link to="/admin/orders">
              <i className="fa fa-shopping-basket"></i> Đơn hàng
            </Link>
          </li>

          <li>
            <Link to="/admin/users">
              <i className="fa fa-users"></i> Người dùng
            </Link>
          </li>

          <li>
            <Link to="/admin/reviews">
              <i className="fa fa-star"></i> Đánh giá
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
