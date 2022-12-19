import React from "react";
import { Card, GridItem, Paper } from "../../atomic-ui/atoms";
import { ListPaper } from "../../atomic-ui/molecules";
import "./crm.scss";

export const SalesColumn = ({ users, title, status }) => {
  return (
    <GridItem>
      <Paper>
        <Card header={title} />
        <ListPaper>
          {users
            .filter((user) => user.status === status)
            .map(({ nationalId, birthdate, firstName, lastName, email }) => (
              <Card type="secondary" key={nationalId}>
                <div className="crm-card-container">
                  <span className="crm-card-container--name">
                    {firstName} {lastName}
                  </span>
                  <span className="crm-card-container--email">{email}</span>
                  <div className="crm-card-container--key">
                    Birthdate:
                    <span className="crm-card-container--key__value">
                      {birthdate}
                    </span>
                  </div>
                  <div className="crm-card-container--key">
                    National Id:
                    <span className="crm-card-container--key__value">
                      {nationalId}
                    </span>
                  </div>
                  {/* useDate-fns to visualize */}
                  {/* <span>National Id: {nationalId}</span> */}
                </div>
              </Card>
            ))}
        </ListPaper>
      </Paper>
    </GridItem>
  );
};
