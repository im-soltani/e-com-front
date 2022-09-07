import React, { useState } from "react";
import SimpleMap from "./map";
import { Button, TextField } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import clsx from "clsx";
import Axios from "axios";
import PhoneOutlinedIcon from "@material-ui/icons/PhoneOutlined";
import PublicOutlinedIcon from "@material-ui/icons/PublicOutlined";
import RoomOutlinedIcon from "@material-ui/icons/RoomOutlined";
import FacebookIcon from "@material-ui/icons/Facebook";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import TwitterIcon from "@material-ui/icons/Twitter";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector } from "react-redux";

const ContactUs = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");
  const [subject, setSubject] = useState("");
  const { userInfo } = useSelector((state) => state.userSignin);

  const onSendMail = async () => {
    console.log(userInfo, "test");
    const { data } = await Axios.post(
      "/api/sendMail",
      { email, subject, description },
      {
        headers: {
          Authorization: "Bearer " + userInfo.token,
        },
      }
    );
    if (data.success) {
      alert("Email sent successfully");
      setEmail("");
      setName("");
      setDescription("");
      setSubject("");
    }
  };

  const useStyles = makeStyles((theme) => ({
    input: {
      "& .MuiInputBase-input ": {
        fontSize: "16px",
      },
    },
    root: {
      "& .MuiFormLabel-root": {
        fontSize: "16px",
        background: "#eee",
        padding: "0 8px 0 5px",
      },
    },
  }));

  const classes = useStyles();

  return (
    <div style={{ height: "100%", width: "60%", margin: "auto" }}>
      <SimpleMap />
      <div
        style={{ display: "flex", justifyContent: "center", margin: "20px 0" }}
      >
        <Grid
          container
          spacing={2}
          style={{
            marginRight: "12px",
            justifyContent: "center",
            background: "#eee",
            width: "40%",
          }}
        >
          <Grid
            item
            xs={12}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: "16px",
            }}
          >
            <PhoneOutlinedIcon style={{ fontSize: "32px " }} />
            <div style={{ padding: "8px" }}>
              <div>+216 24 627 6562</div>
              <div>+216 25 627 6562</div>
            </div>
          </Grid>
          <Grid
            item
            xs={12}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: "16px",
            }}
          >
            <PublicOutlinedIcon style={{ fontSize: "32px " }} />
            <div style={{ padding: "8px" }}>
              <div>email@gmail.com</div>
              <div>example@gmail.com</div>
            </div>
          </Grid>
          <Grid
            item
            xs={12}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: "16px",
            }}
          >
            <RoomOutlinedIcon style={{ fontSize: "32px " }} />
            <div style={{ padding: "8px" }}>
              <div>Tunis, les Berges de lac</div>
              <div>street, Crossroad 123.</div>
            </div>
          </Grid>
          <Grid
            item
            xs={12}
            style={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <h2 style={{ textAlign: "center" }}>Follow Us</h2>
            <div style={{ textAlign: "center", padding: "8px" }}>
              <FacebookIcon style={{ fontSize: "22px" }} />
              <LinkedInIcon style={{ fontSize: "22px" }} />
              <TwitterIcon style={{ fontSize: "22px" }} />
            </div>
          </Grid>
        </Grid>
        <Grid container spacing={2} style={{ background: "#eee" }}>
          <Grid item xs={12}>
            <h2
              style={{
                padding: "8px",
                fontWeight: "bold",
                textAlign: "center",
                marginBottom: 0,
              }}
            >
              {" "}
              Contact Us
            </h2>
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="name"
              label="Name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              variant="outlined"
              color="secondary"
              style={{ width: "100%" }}
              className={clsx(classes.input, classes.root)}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="email"
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              variant="outlined"
              color="secondary"
              style={{ width: "100%" }}
              className={clsx(classes.input, classes.root)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="subject"
              label="Subject"
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              variant="outlined"
              color="secondary"
              style={{ width: "100%" }}
              className={clsx(classes.input, classes.root)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="description"
              label="Description"
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              variant="outlined"
              color="secondary"
              style={{ width: "100%" }}
              multiline={true}
              className={clsx(classes.input, classes.root)}
              rows={3}
            />
          </Grid>
          <Grid item xs={3}>
            <Button
              color="secondary"
              variant="contained"
              style={{ fontSize: "14px", width: "100%", outline: "none" }}
              onClick={onSendMail}
            >
              Send
            </Button>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default ContactUs;
