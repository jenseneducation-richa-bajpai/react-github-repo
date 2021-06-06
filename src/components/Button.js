import React from "react";
import { createUseStyles } from "react-jss";


const useStyles = createUseStyles({
  myButton1: {
    color: "black",
    borderRadius: 30,
    backgroundColor: "white",
	cursor:'pointer',
    "&:hover": {
      backgroundColor: "black",
      color: "white",
    },
    width: 220,
    height: 55,
    marginRight: "20px",
    "& span": {
      fontWeight: "bold",
    },
  },

  myButton2: {
    color: "white",
    borderRadius: 30,
    backgroundColor: "hotpink",
	cursor:'pointer',
    border: "none",
    "&:hover": {
      backgroundColor: "rebeccapurple",
      color: "white",
      border: "none",
    },
    width: 220,
    height: 55,
    marginLeft: "20px",
    "& span": {
      fontWeight: "bold",
    },
  },
 
  myLabel: {
    fontStyle: "normal",
    fontSize: "1.5rem",
  },
});


const Button = ({ children, callBack, styleBtn, disabled }) => {
  const classes = useStyles();
  
  return (
    <button
      className={styleBtn ? classes.myButton1 : classes.myButton2}
      onClick={callBack}
      disabled={disabled}
    >
      <span className={classes.myLabel} >
        {disabled ? "loading..." : `${children}`}
      </span>
    </button>
  );
};

export default Button;
