import React from "react";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  error: {
    justifyContent: "center",
    textAlign: "left",
    fontSize: "2rem",
    backgroundColor: "red",
    Height: "200px",
    maxWidth: "300px",
    borderRadius: "30px",
    margin: "20px",
    padding: "20px",
  },
});

const ErrorAlert = ({ status, message }) => {
  const classes = useStyles();
  return (
    <div className={classes.error}>
      <span>
        ERROR!<br></br>
        {status}: {message}
      </span>
    </div>
  );
};

export default ErrorAlert;
