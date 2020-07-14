import React from "react";
import { Typography } from "@material-ui/core";
import { withRouter } from "react-router-dom";

const Copyright = () => {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © Bus Master "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
};

export default withRouter(Copyright);
