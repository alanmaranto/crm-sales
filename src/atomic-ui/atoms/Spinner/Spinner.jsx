import React from "react";
import "./spinner.scss";

export const Spinner = () => (
  <div data-testid="spinner" className="spinner-wrapper">
    <div className="spinner-wrapper__container">
      <span className="spinner-wrapper__container--ball" />
      <span className="spinner-wrapper__container--ball" />
      <span className="spinner-wrapper__container--ball" />
    </div>
  </div>
);
