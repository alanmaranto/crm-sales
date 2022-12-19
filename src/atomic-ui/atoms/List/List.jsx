import React from "react";
import "./list.scss";

export function List({ children, props, ...rest }) {
  return (
    <div className="list" {...rest}>
      <ul className="list--ul">
        {/* {props.items.map((item) => (
          <li key={item.id}> */}
        {/* {item.name} */}
        {/* {children} */}
        {/* </li>
        ))} */}
        {children}
      </ul>
    </div>
  );
}
