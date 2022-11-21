import { Link, matchPath, useLocation } from "react-router-dom";
import "./Header.css";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Badge, Menu, MenuItem } from "@mui/material";
import { handleDeleteFromCart } from "../../redux/cartRedux";
import { AiFillEye, AiFillDelete } from "react-icons/ai";
import { BiHistory } from "react-icons/bi";
import { useState } from "react";
import { deleteDetailUser } from "../../redux/userRedux";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import { Dropdown } from "react-bootstrap";

function Header() {
  useEffect(() => {
    AOS.init({
      duration: 1500,
    });
  }, []);

  const { pathname } = useLocation();
  const { listCart, totalQuantity, totalPrice } = useSelector(
    (state) => state.cart
  );
  const user = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();
  const handleSubmitDeleteFromCart = async (courseId) => {
    await handleDeleteFromCart(courseId, user?.username, dispatch);
  };
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    Swal.fire({
      title: "Bạn chắc chắn muốn đăng xuất?",
      denyButtonText: "Hủy",
      showDenyButton: true,
      confirmButtonText: `Đăng xuất`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        await Cookies.remove("token");
        await Cookies.remove("username");
        await dispatch(deleteDetailUser());
        Swal.fire("Đăng xuất thành công!", "", "success");
      }
    });
  };

  return (
    <nav
      className="navbar navbar-expand-lg fixed-top position-sticky"
      id="header"
    >
      <div className="container align-items-center">
        <Link
          data-aos="flip-right"
          className="navbar-brand  justify-content-center align-items-center d-flex"
          to="/"
        >
          <img
            src={require("../../assets/img/112-book-morph-outline.gif")}
            width={"auto"}
            height={40}
            alt=""
          />
          <span style={{ color: "#ff5336" }}>Le</span>gacy
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <i className="bx bx-menu"></i>
        </button>
        <div
          className="collapse navbar-collapse grow"
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 align-items-center">
            <li className="nav-item ">
              <Link
                className={
                  matchPath("/", pathname) ? "nav-link active" : "nav-link"
                }
                to="/"
              >
                <div className="d-flex flex-column align-items-center">
                  <i className="bx bx-home"></i>
                  <span>Home</span>
                </div>
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={
                  matchPath("/courses", pathname)
                    ? "nav-link active"
                    : "nav-link"
                }
                to="/courses"
              >
                <div className="d-flex flex-column align-items-center">
                  <i className="bx bx-store"></i>
                  <span>Courses</span>
                </div>
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={
                  matchPath("/blog", pathname) ? "nav-link active" : "nav-link"
                }
                to="/blog"
              >
                <div className="d-flex flex-column align-items-center">
                  <i className="bx bxl-blogger"></i>
                  <span>Blogs</span>
                </div>
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={
                  matchPath("/contact", pathname)
                    ? "nav-link active"
                    : "nav-link"
                }
                to="/contact"
              >
                <div className="d-flex flex-column align-items-center">
                  <i className="bx bxs-contact"></i>
                  <span>Contact Us</span>
                </div>
              </Link>
            </li>
          </ul>
          <div className="d-flex justify-content-center align-items-center nav__tool-user">
            <form className="d-flex align-items-center me-3 form__search">
              <input
                className="form-control me-3 nav__search"
                type="search"
                placeholder="Tìm kiếm khóa học"
                aria-label="Search"
              />
              <i className="bx bx-search"></i>
            </form>
            {/* <i
              className="bx bx-user-circle me-3"
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
              style={{ cursor: "pointer" }}
            ></i> */}
            {/* <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem>
                <Link to={`/account/${user.username}`}>Profile</Link>{" "}
              </MenuItem>
              <MenuItem
                onClick={() => {
                  handleClose();
                  handleLogout();
                }}
              >
                Logout
              </MenuItem>
            </Menu> */}

            <Dropdown>
              <Dropdown.Toggle
                id="dropdown-basic"
                style={{
                  backgroundColor: "transparent",
                  border: "none",
                  cursor: "pointer",
                  margin: "0px",
                  padding: "0px",
                }}
              >
                <i
                  className="bx bx-user-circle"
                  style={{ cursor: "pointer", margin: "0px", padding: "0px" }}
                ></i>
              </Dropdown.Toggle>
              <Dropdown.Menu className="drop__menu">
                <Dropdown.Item>
                  <Link to={`/account/${user.username}`}>Profile</Link>{" "}
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => {
                    handleClose();
                    handleLogout();
                  }}
                >
                  Đăng xuất
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

            <Badge badgeContent={listCart.length} showZero color="warning">
              <FaShoppingCart
                data-bs-toggle="offcanvas"
                href="#offcanvasExample"
                role="button"
                aria-controls="offcanvasExample"
                color="#ff5336"
                size={20}
              />
            </Badge>
            {/* Show Cart */}
            <div
              className="offcanvas offcanvas-end"
              tabIndex={-1}
              id="offcanvasExample"
              aria-labelledby="offcanvasExampleLabel"
            >
              <div className="offcanvas-header">
                <h5 className="offcanvas-title" id="offcanvasExampleLabel">
                  Giỏ hàng của bạn
                </h5>
                <button
                  type="button"
                  className="btn-close text-reset"
                  data-bs-dismiss="offcanvas"
                  aria-label="Close"
                />
              </div>
              <div className="offcanvas-body">
                <div className="container">
                  {listCart?.map((item, index) => (
                    <div
                      key={index}
                      className="row cart__item d-flex justify-content-between align-items-center"
                    >
                      <div className="col-3 justify-content-center align-items-center d-flex flex-column">
                        <img
                          src={require("../../assets/img/backgroundLogin.gif")}
                          alt="product"
                          className="img-fluid cart__item-img"
                        />
                      </div>
                      <div className="col-7 justify-content-center  d-flex flex-column">
                        <div className="cart__item__title">
                          <h5>{item?.name}</h5>
                        </div>
                        <div className="cart__item__price">
                          <p className="m-0">
                            {item?.price} <span>VNĐ</span>
                          </p>
                        </div>
                      </div>
                      <div className="col-2 cart__item__delete">
                        <i
                          className="bx bx-trash btn__delete__cart"
                          onClick={() => handleSubmitDeleteFromCart(item?.id)}
                        ></i>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="offcanvas-footer px-3 d-flex justify-content-between align-items-center pb-4 cart__total_price">
                <p>
                  Tổng cộng:{" "}
                  <span className="total__price">{totalPrice} VNĐ</span>
                </p>
                <button className="main__btn">Check out</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Header;
