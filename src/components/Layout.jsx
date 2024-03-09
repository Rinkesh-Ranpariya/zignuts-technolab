import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Container } from "@mui/material";

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col h-full">
      <Navbar />
      <Container maxWidth="xl" className="flex-1 mt-28 mb-10">
        {children}
      </Container>
      <Footer />
    </div>
  );
};

export default Layout;
