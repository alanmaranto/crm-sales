import React from "react";
import { Card, Button } from "../../atomic-ui/atoms";
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
            <span className="sales-card-container--key__value">{data.id}</span>
          </div>
        </>
        {data.status === "prospect" ? undefined : (
          <div className="sales-card-container--btn-container">
            <Button onClick={(e) => onSubmit(e, data)}>Run model</Button>
          </div>
        )}
      </div>
    </Card>
  );
};
