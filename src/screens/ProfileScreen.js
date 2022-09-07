import React, { useState, useEffect } from "react";
import { logout, update } from "../actions/userActions";
import { listMyOrders } from "../actions/orderActions";
import { useDispatch, useSelector } from "react-redux";
import { Button, Fab, Avatar } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import moment from "moment";
import clsx from "clsx";

function ProfileScreen(props) {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState("");
  const dispatch = useDispatch();
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const userUpdate = useSelector((state) => state.userUpdate);
  const { loading, success, error } = userUpdate;
  const [uploading, setUploading] = useState(false);
  const myOrderList = useSelector((state) => state.myOrderList);
  const { loading: loadingOrders, orders, error: errorOrders } = myOrderList;

  const handleLogout = () => {
    dispatch(logout());
    props.history.push("/signin");
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(update({ userId: userInfo._id, email, name, password, image }));
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
    linkButton: {
      fontSize: "12px",
      color: "#fff",
      height: "24px",
      textAlign: "center",
      padding: 0,
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
  useEffect(() => {
    if (userInfo) {
      console.log(userInfo.name);
      setEmail(userInfo.email);
      setName(userInfo.name);
      setPassword(userInfo.password);
      setImage(userInfo.image);
    }
    dispatch(listMyOrders());
    return () => {};
  }, [userInfo]);

  return (
    <div className="profile" style={{ height: "100%" }}>
      <div className="profile-info" style={{ height: "100%" }}>
        <div
          className="form-container"
          style={{ height: "100%", margin: "16px" }}
        >
          <h2 style={{ margin: "8px" }}>Profile</h2>
          <div style={{ margin: "8px" }}>
            <Fab
              color="primary"
              size="small"
              component="label"
              aria-label="add"
            >
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
              <span style={{ margin: "8px" }}> Update Profile Photo</span>
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
            color="secondary"
            className={clsx(classes.input, classes.root)}
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
          <TextField
            id="password"
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            variant="outlined"
            className={clsx(classes.input, classes.root)}
            color="secondary"
            style={{ margin: "8px" }}
          />
          <Button
            variant="contained"
            color="secondary"
            className={classes.styleButton}
            onClick={submitHandler}
            style={{ margin: "8px", outline: "none" }}
          >
            Update
          </Button>
          <Button
            variant="contained"
            color="default"
            onClick={handleLogout}
            className={classes.defaultButton}
            style={{ margin: "8px", outline: "none" }}
          >
            Logout
          </Button>
        </div>
      </div>
      <div className="profile-orders content-margined">
        <div style={{ margin: "8px", fontWeight: 600, fontSize: "20px" }}>
          Activities
        </div>
        {loadingOrders ? (
          <div>Loading...</div>
        ) : errorOrders ? (
          <div>{errorOrders} </div>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>N°</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>PAID</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr key={order._id}>
                  <td>{index + 1}</td>
                  <td>
                    {moment(order.createdAt).format("MMMM Do YYYY, h:mm:ss a")}
                  </td>
                  <td>{order.totalPrice} DT</td>
                  <td>{order.isPaid}</td>
                  <td>
                    <Button
                      className={classes.linkButton}
                      variant="contained"
                      style={{ outline: "none" }}
                      color="secondary"
                      onClick={() => props.history.push("/order/" + order._id)}
                    >
                      DETAILS
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default ProfileScreen;
