import React from "react";
import { List, Paper } from "../../atoms";

export const ListPaper = ({ children }) => {
  return (
    <Paper>
      <List>{children}</List>
    </Paper>
  );
};
