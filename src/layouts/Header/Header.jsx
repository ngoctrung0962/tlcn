import { Link, matchPath, useLocation } from "react-router-dom";
import "./Header.css";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
function Header() {
  useEffect(() => {
    AOS.init({
      duration: 1500,
    });
  }, []);
  const { pathname } = useLocation();
  console.log(pathname);
  return (
    <nav
      className="navbar navbar-expand-lg fixed-top position-sticky"
      id="header"
    >
      <div className="container align-items-center">
        <Link
          data-aos="flip-right"
          className="navbar-brand justify-content-center align-items-center d-flex"
          to="/"
        >
          <img
            src={require("../../assets/img/logo.gif")}
            width={"auto"}
            height={50}
            alt=""
          />
          <span style={{ color: "rgb(252, 207, 0)" }}>Le</span>gacy
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
            <i
              className="bx bx-user-circle"
              data-bs-toggle="offcanvas"
              href="#offcanvasExample"
              role="button"
              aria-controls="offcanvasExample"
            ></i>

            {/* Show Cart */}
            <div
              className="offcanvas offcanvas-end"
              tabIndex={-1}
              id="offcanvasExample"
              aria-labelledby="offcanvasExampleLabel"
            >
              <div className="offcanvas-header">
                <h5 className="offcanvas-title" id="offcanvasExampleLabel">
                  Your Cart
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
                  <div className="row cart__item">
                    <div className="col-3">
                      <img
                        src="./assets/image/sp5.png"
                        alt="product"
                        className="img-fluid cart__item-img"
                      />
                    </div>
                    <div className="col-7">
                      <div className="cart__item__title">
                        <h5>Luxury ring</h5>
                      </div>
                      <div className="cart__item__price">
                        <p>
                          100$ <span>x 3</span>
                        </p>
                      </div>
                    </div>
                    <div className="col-2 cart__item__delete">
                      <i className="fa-solid fa-times-circle cart__item-remove" />
                    </div>
                  </div>
                  <div className="row cart__item">
                    <div className="col-3">
                      <img
                        src="./assets/image/sp5.png"
                        alt="product"
                        className="img-fluid cart__item-img"
                      />
                    </div>
                    <div className="col-7">
                      <div className="cart__item__title">
                        <h5>Luxury ring</h5>
                      </div>
                      <div className="cart__item__price">
                        <p>
                          100$ <span>x 3</span>
                        </p>
                      </div>
                    </div>
                    <div className="col-2 cart__item__delete">
                      <i className="fa-solid fa-times-circle cart__item-remove" />
                    </div>
                  </div>
                  <div className="row cart__item">
                    <div className="col-3">
                      <img
                        src="./assets/image/sp5.png"
                        alt="product"
                        className="img-fluid cart__item-img"
                      />
                    </div>
                    <div className="col-7">
                      <div className="cart__item__title">
                        <h5>Luxury ring</h5>
                      </div>
                      <div className="cart__item__price">
                        <p>
                          100$ <span>x 3</span>
                        </p>
                      </div>
                    </div>
                    <div className="col-2 cart__item__delete">
                      <i className="fa-solid fa-times-circle cart__item-remove" />
                    </div>
                  </div>
                  <div className="row cart__item">
                    <div className="col-3">
                      <img
                        src="./assets/image/sp5.png"
                        alt="product"
                        className="img-fluid cart__item-img"
                      />
                    </div>
                    <div className="col-7">
                      <div className="cart__item__title">
                        <h5>Luxury ring</h5>
                      </div>
                      <div className="cart__item__price">
                        <p>
                          100$ <span>x 3</span>
                        </p>
                      </div>
                    </div>
                    <div className="col-2 cart__item__delete">
                      <i className="fa-solid fa-times-circle cart__item-remove" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="offcanvas-footer px-3 d-flex justify-content-between align-items-center pb-4">
                <p>
                  Total: <span className="total__price">400$</span>
                </p>
                <button className="btn main-btn">
                  <i className="fa-solid fa-shopping-cart" />
                  <span className="ml-2">Check out</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Header;
