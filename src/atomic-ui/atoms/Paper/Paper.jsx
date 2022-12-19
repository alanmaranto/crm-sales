import React from "react";
import "./paper.scss";

export function Paper({ children, ...rest }) {
  return (
    <div className="paper" {...rest}>
      {children}
    </div>
  );
}
