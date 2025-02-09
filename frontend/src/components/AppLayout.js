import React from "react";
import { Navbar, Sidebar } from "./Navbar";

const AppLayout = ({ children }) => {
  return (
    <div className="app-layout">
      <Navbar />
      <Sidebar />
      <main className="main-content">{children}</main>
    </div>
  );
};

export default AppLayout;
