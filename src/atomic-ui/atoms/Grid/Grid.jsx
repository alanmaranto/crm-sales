import React from "react";
import "./grid.scss";

export function Grid({ children, ...rest }) {
  return (
    <div className="grid" {...rest}>
      {children}
    </div>
  );
}
