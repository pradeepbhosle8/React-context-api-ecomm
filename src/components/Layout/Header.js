import React from "react";
import Menu from "./Menu";
import Search from "../Reusable/Search";

const Header = () => {
  return (
    <>
      {/* <!-- banner bg main start --> */}
      <div className="banner_bg_main">
        {/* <!-- header top section start --> */}
        <div className="container">
          <div className="header_section_top">
            <div className="row">
              <div className="col-sm-12">
                <div
                  className="custom_menu"
                  style={{
                    display: "flex",
                    justifyContent: "space-around",
                    alignItems: "center",
                  }}
                >
                  <Menu />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- header top section start --> */}
        {/* <!-- logo section start --> */}
        <div className="logo_section">
          <div className="container">
            <div className="row">
              <div className="col-sm-12">
                <div className="logo">
                  <a href="index.html">
                    <img src={require("../../assets/images/logo.png")} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- logo section end --> */}
        {/* <!-- header section start --> */}
        <div className="header_section">
          <div className="container">
            <div className="containt_main">
              <div id="mySidenav" className="sidenav">
                <a href="" className="closebtn">
                  &times;
                </a>
                <a href="index.html">Home</a>
                <a href="fashion.html">Fashion</a>
                <a href="electronic.html">Electronic</a>
                <a href="jewellery.html">Jewellery</a>
              </div>
              <span className="toggle_icon">
                <img src={require("../../assets/images/toggle-icon.png")} />
              </span>
              <div className="dropdown">
                <button
                  className="btn btn-secondary dropdown-toggle"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  All Category
                </button>
                <ul className="dropdown-menu">
                  <li>
                    <a className="dropdown-item" href="#">
                      Fashion
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Electronic
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Jewellery
                    </a>
                  </li>
                </ul>
              </div>
              <div className="main">
                {/* <!-- Another variation with a button --> */}
                <Search />
              </div>
              <div className="header_box">
                <div className="login_menu">
                  <ul></ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- header section end --> */}
        {/* <!-- banner section start --> */}
        <div className="banner_section layout_padding">
          <div className="container">
            <div id="my_slider" className="carousel slide" data-ride="carousel">
              <div className="carousel-inner">
                <div className="carousel-item active">
                  <div className="row">
                    <div className="col-sm-12">
                      <h1 className="banner_taital">
                        Get Start <br />
                        Your favriot shoping
                      </h1>
                    </div>
                  </div>
                </div>
                <div className="carousel-item">
                  <div className="row">
                    <div className="col-sm-12">
                      <h1 className="banner_taital">
                        Get Start <br />
                        Your favriot shoping
                      </h1>
                      <div className="buynow_bt">
                        <a href="#">Buy Now</a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="carousel-item">
                  <div className="row">
                    <div className="col-sm-12">
                      <h1 className="banner_taital">
                        Get Start <br />
                        Your favriot shoping
                      </h1>
                      <div className="buynow_bt">
                        <a href="#">Buy Now</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <a
                className="carousel-control-prev"
                href="#my_slider"
                role="button"
                data-slide="prev"
              >
                <i className="fa fa-angle-left"></i>
              </a>
              <a
                className="carousel-control-next"
                href="#my_slider"
                role="button"
                data-slide="next"
              >
                <i className="fa fa-angle-right"></i>
              </a>
            </div>
          </div>
        </div>
        {/* <!-- banner section end --> */}
      </div>
    </>
  );
};

export default Header;
