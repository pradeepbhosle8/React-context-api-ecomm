import React from "react";
import Footer from "./Footer";
import Header from "./Header";
import { Helmet } from "react-helmet";
import UserSidebar from "../../pages/user/UserSidebar";

// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

const Layout = ({ children, title, description, keywords, author }) => {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <meta
          name="description"
          content={description}
          data-react-helmet="true"
        />
        <meta name="keywords" content={keywords} data-react-helmet="true" />
        <meta name="author" content={author} data-react-helmet="true" />
        <title>{title}</title>
      </Helmet>
      <Header />
      <main className="wrapper my-2 p-5">
        {/* <ToastContainer /> */}
        {children}
      </main>
      <Footer />
    </>
  );
};

Layout.defaultProps = {
  title: "Ecommerce App - Shop Now",
  description: "Mern Stack Project",
  keywords: "Mern, React, Node, Mongodb",
  author: "Pradeep Bhosle",
};

export default Layout;
