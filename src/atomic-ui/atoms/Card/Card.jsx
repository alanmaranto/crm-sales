import React from "react";
import PropTypes from "prop-types";
import "./card.scss";

export function Card({ header, type, children, ...props }) {
  const mode = type === "primary" ? null : "card--secondary";
  return (
    <div className={["card", mode].join(" ")} {...props}>
      {header ? <div className="card-header">{header}</div> : undefined}
      {children}
    </div>
  );
}

Card.defaultValues = {
  type: "primary",
};

Card.propTypes = {
  header: PropTypes.string,
  type: PropTypes.oneOf(["primary", "secondary"]),
  children: PropTypes.node,
};
