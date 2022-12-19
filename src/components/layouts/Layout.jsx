import React from "react";
import "./layout.scss";

export const Layout = ({ title = "Crm-Sales", children }) => {
  return (
    <div className="layout-container">
      <div className="layout-container--children">{children}</div>
    </div>
  );
};
