import React from "react";
import { Helmet } from "react-helmet";
import Footer from "./Footer";
import Header from "./Header";
import Sidebar from "./Sidebar";

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
      <Sidebar />
      <main className="content-wrapper">{children}</main>
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
