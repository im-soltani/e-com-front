import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { signin } from "../actions/userActions";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";
import clsx from "clsx";

function SigninScreen({ setActive }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const userSignin = useSelector((state) => state.userSignin);
  const { loading, userInfo, error } = userSignin;
  const dispatch = useDispatch();
  const redirect = window.location.search
    ? window.location.search.split("=")[1]
    : "/home";
  const history = useHistory();

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
      setActive("home");
    }
    return () => {
      //
    };
  }, [userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(signin(email, password));
  };

  const useStyles = makeStyles((theme) => ({
    margin: {
      marginTop: "8px",
    },
    withoutLabel: {
      marginTop: theme.spacing(3),
    },
    styleButton: {
      margin: "8px",
      color: "#e0e0e0",
      fontSize: "16px",
    },
    defaultButton: {
      fontSize: "14px",
      color: "#f50057",
    },

    input: {
      "& .MuiInputBase-input ": {
        fontSize: "16px",
      },
    },
    root: {
      "& .MuiFormLabel-root": {
        fontSize: "16px",
        background: "#fff",
        padding: "0 8px 0 5px",
      },
    },
  }));

  const classes = useStyles();

  const handleCreateAccount = () => {
    const url =
      redirect === "/home" ? "register" : "register?redirect=" + redirect;
    history.push(url);
  };

  return (
    <div className="form">
      <div className="form-container">
        <h2 style={{ margin: "8px" }}>Sign-In</h2>
        {loading && (
          <div style={{ margin: "8px", color: "green", margin: "8px" }}>
            Loading...
          </div>
        )}
        {error && (
          <div style={{ margin: "8px", color: "red" }}>
            * Email ou Password est incorrect{" "}
          </div>
        )}
        <TextField
          id="email"
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          variant="outlined"
          color="secondary"
          style={{ margin: "8px" }}
          className={clsx(classes.input, classes.root)}
        />

        <TextField
          id="outlined-password-input"
          label="Password"
          value={password}
          type="password"
          autoComplete="current-password"
          variant="outlined"
          color="secondary"
          style={{ margin: "8px" }}
          onChange={(e) => setPassword(e.target.value)}
          className={clsx(classes.input, classes.root)}
        />
        <Button
          variant="contained"
          color="secondary"
          className={classes.styleButton}
          style={{ margin: "8px", outline: "none" }}
          onClick={submitHandler}
        >
          Sign In
        </Button>
        <div style={{ margin: "8px" }}>New to amazona?</div>
        <Button
          variant="contained"
          onClick={handleCreateAccount}
          style={{ margin: "8px", outline: "none" }}
          className={classes.defaultButton}
        >
          Create your amazona account
        </Button>
      </div>
    </div>
  );
}
export default SigninScreen;
