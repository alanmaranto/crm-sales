import React from "react";
import { Card } from "../../atomic-ui/atoms";
import "./sales-card.scss";

export const SalesUserCard = ({ data, onSubmit }) => {
  return (
    <Card type="secondary" key={data.nationalId}>
      <div className="sales-card-container">
        <>
          <span className="sales-card-container--name">
            {data.firstName} {data.lastName}
          </span>
          <span className="sales-card-container--email">{data.email}</span>
          <div className="sales-card-container--key">
            Birthdate:
            <span className="sales-card-container--key__value">
              {data.birthdate}
            </span>
          </div>
          <div className="sales-card-container--key">
            National Id:
            <span className="sales-card-container--key__value">
              {data.id}
            </span>
          </div>
          {/* useDate-fns to visualize */}
          {/* <span>National Id: {nationalId}</span> */}
        </>
        <div className="sales-card-container--btn-container">
          <button
            className="sales-card-container--btn-container__btn"
            onClick={(e) => onSubmit(e, data)}
          >
            Run model
          </button>
        </div>
      </div>
    </Card>
  );
};
