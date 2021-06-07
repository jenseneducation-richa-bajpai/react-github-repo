/* import './App.css'; */
import Button from "./components/Button";
import { createUseStyles } from "react-jss";
import React, { useState, useEffect } from "react";
import * as API from "./API/api.js";
import ErrorAlert from "./components/ErrorAlert";

const useStyles = createUseStyles({
  app: {
    textAlign: "center",
    margin: "auto",
    backgroundColor: "#0AD1F7",
    minHeight: "100vh",
  },
  repoData: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonDiv: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
    margin: "2rem",
    fontSize: "2rem",
  },
  "@media (max-width: 576px)": {
    buttonDiv: {
      display: "flex",
      flexDirection: "column",
    },
  },
  dataDiv: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    textAlign: "left",
    fontSize: "2rem",
    backgroundColor: "white",
    Height: "50%",
    maxWidth: "50%",
    borderRadius: "30px",
    margin: "20px",
    padding: "20px",
  },
  header: {
    backgroundColor: "#AD09ED",
    margin: "auto",
    padding: "10px",
    color: "white",
  },
});
//repo names
let repo = {
  0: "eslint/eslint",
  1: "oakwood/front-end-questions",
  2: "babel/babel",
  3: "webpack/webpack",
  4: "storybooks/storybook",
  5: "facebook/react",
  6: "reactjs/redux",
  7: "expressjs/express",
};

function App() {
  const classes = useStyles();
  const [counter, setCounter] = useState(0);
  const [disableBtn, setDisableBtn] = useState(false);
  const [data, setData] = useState({});
  const [showError, setShowError] = useState(false);
  const [errorStatus, setErrorStatus] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [text, setText] = useState("");

  useEffect(() => {
    fetchData(counter);
  }, [counter]);

//increment
  const increment = () => {
    if (counter < 7) {
      setCounter(counter + 1);
    } else {
      setText("Our fav repos are over!");
    }
  };
// decrement
  const decrement = () => {
    if (counter > 0) {
      setCounter(counter - 1);
    } else {
      setText("You cannot go further!");
    }
  };
//fetch data from api
  const fetchData = async () => {
    if (counter >= 0 && counter < 8) {
      setDisableBtn(true);
      setText("Loading Repository..");
      setErrorStatus(null);
      setErrorMsg("");
      try {
        const res = await API.fetchRepos(repo[counter]);
        setData(res);
        setDisableBtn(false);
        setText("");
      } catch (error) {
        setData(null);
        setErrorStatus(error.response.status);
        setErrorMsg(error.response.data.message);
        setShowError(true);
        setTimeout(() => {
          setShowError(false);
        }, 1500);
        setDisableBtn(false);
        setText("");
      }
    }
  };

  return (
    <div className={classes.app}>
      <header className={classes.header}>
        <h1>Code-Exercise</h1>
        <h2>GitHub Repositories</h2>
      </header>
      <div className={classes.repoData}>
        <div className={classes.buttonDiv}>
          <Button
            children=" - DECREMENT"
            callBack={decrement}
            styleBtn={true}
            disabled={disableBtn}
          />
          <p>Counter: {counter}</p>

          <Button
            children=" + INCREMENT"
            callBack={increment}
            styleBtn={false}
            disabled={disableBtn}
          />
        </div>
        {text}
        <div className={classes.dataDiv}>
          <div>{data && <p> 1. Full_name: {data.id && data.full_name}</p>}</div>
          <div>
            {data && <p> 2. Description: {data.id && data.description}</p>}
          </div>
          <div>
            {data && (
              <p> 3. Amount of Stars: {data.id && data.stargazers_count}</p>
            )}
          </div>
        </div>
        {showError && <ErrorAlert status={errorStatus} message={errorMsg} />}
      </div>
    </div>
  );
}

export default App;
