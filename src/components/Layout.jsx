import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col h-full">
      <Navbar />
      <div className="mx-12 my-10 flex-1">{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
