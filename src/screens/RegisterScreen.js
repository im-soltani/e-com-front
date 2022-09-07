import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { register } from "../actions/userActions";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Fab, Avatar } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import axios from "axios";
import clsx from "clsx";

function RegisterScreen(props) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const userRegister = useSelector((state) => state.userRegister);
  const { loading, userInfo, error } = userRegister;
  const dispatch = useDispatch();
  const history = useHistory();
  const [uploading, setUploading] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [mailError, setMailError] = useState(false);

  const useStyles = makeStyles((theme) => ({
    margin: {
      marginTop: "12px",
    },
    withoutLabel: {
      marginTop: theme.spacing(3),
    },
    styleButton: {
      marginTop: "12px",
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

  const redirect = props.location.search
    ? props.location.search.split("=")[1]
    : "/home";
  useEffect(() => {
    if (userInfo) {
      props.history.push(redirect);
      window.location.reload(false);
    }
    return () => {
      //
    };
  }, [userInfo]);

  const submitHandler = (e) => {
    const emailError = email && validateEmail(email);
    if (password === rePassword && emailError) {
      e.preventDefault();
      dispatch(register(name, email, password, image));
    } else {
      !(password === rePassword) && setPasswordError(true);
      !emailError && setMailError(true);
    }
  };

  const validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };

  const uploadProfileImage = (e) => {
    const file = e.target.files[0];
    const bodyFormData = new FormData();
    bodyFormData.append("image", file);
    setUploading(true);
    axios
      .post("/api/uploads", bodyFormData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        setImage(response.data);
        setUploading(false);
      })
      .catch((err) => {
        console.log(err);
        setUploading(false);
      });
  };
  return (
    <div className="form">
      <div className="form-container">
        <h2 style={{ margin: "8px" }}>Create Account</h2>
        {loading && (
          <div style={{ margin: "8px", color: "green" }}>Loading...</div>
        )}
        {error && (
          <div style={{ margin: "8px", color: "red" }}>
            * Email est incorrect où déjà existe
          </div>
        )}
        <div style={{ margin: "8px" }}>
          <Fab color="primary" size="small" component="label" aria-label="add">
            <Avatar src={!image ? "/broken-image.jpg" : image} />
            <input
              accept="image/*"
              type="file"
              style={{ display: "none" }}
              onChange={uploadProfileImage}
            />
          </Fab>
          {uploading ? (
            <div style={{ margin: "8px" }}>Uploading...</div>
          ) : (
            <span style={{ margin: "8px" }}> Upload Photo</span>
          )}
        </div>
        <TextField
          id="name"
          style={{ margin: "8px" }}
          label="Name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          variant="outlined"
          className={clsx(classes.input, classes.root)}
          color="secondary"
        />
        <TextField
          id="email"
          label="Email"
          style={{ margin: "8px" }}
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          variant="outlined"
          color="secondary"
          className={clsx(classes.input, classes.root)}
        />
        {mailError && (
          <div style={{ margin: "5px", color: "red" }}> Email Error</div>
        )}
        <TextField
          id="password"
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          variant="outlined"
          color="secondary"
          style={{ margin: "8px" }}
          className={clsx(classes.input, classes.root)}
        />
        <TextField
          id="re-password"
          style={{ margin: "8px" }}
          label="Re-Password"
          type="password"
          value={rePassword}
          onChange={(e) => setRePassword(e.target.value)}
          variant="outlined"
          color="secondary"
          className={clsx(classes.input, classes.root)}
          error={passwordError}
        />
        {passwordError && (
          <div style={{ margin: "5px", color: "red" }}> Password Error</div>
        )}
        <Button
          variant="contained"
          color="secondary"
          className={classes.styleButton}
          disabled={!(name && image && password && rePassword && email)}
          onClick={submitHandler}
          style={{ margin: "8px", outline: "none" }}
        >
          Register
        </Button>

        <div style={{ margin: "8px" }}>Already have an account?</div>

        <Button
          variant="contained"
          onClick={() =>
            history.push(
              redirect === "/home" ? "signin" : "signin?redirect=" + "/home"
            )
          }
          className={classes.defaultButton}
          color="default"
          style={{ margin: "8px", outline: "none" }}
        >
          Sign In
        </Button>
      </div>
    </div>
  );
}
export default RegisterScreen;
