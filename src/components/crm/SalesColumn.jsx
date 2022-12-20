import React from "react";
import { Card, GridItem, Paper } from "../../atomic-ui/atoms";
import { ListPaper } from "../../atomic-ui/molecules";
import { SalesUserCard } from "./SalesUserCard";

export const SalesColumn = ({ users, title, status, onClick }) => {
  return (
    <GridItem>
      <Paper>
        <Card header={title} />
        <ListPaper>
          {users
            .filter((user) => user.status === status)
            .map((user) => (
              <SalesUserCard
                key={user.nationalId}
                data={user}
                onSubmit={onClick}
              />
            ))}
        </ListPaper>
      </Paper>
    </GridItem>
  );
};
