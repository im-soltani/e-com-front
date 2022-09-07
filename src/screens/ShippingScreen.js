import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { saveShipping } from "../actions/cartActions";
import CheckoutSteps from "../components/CheckoutSteps";
import { Button, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";

function ShippingScreen(props) {
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("");

  const useStyles = makeStyles((theme) => ({
    select: {
      "& .MuiSelect-select:not([multiple])": {
        fontSize: "14px",
        padding: "17px 14px",
      },
    },
    input: {
      "& .MuiInputBase-input ": {
        fontSize: "16px",
      },
      "& .MuiOutlinedInput-input": {
        padding: "16px 12px",
      },
    },
    root: {
      "& .MuiFormLabel-root": {
        fontSize: "14px",
        background: "#fff",
        padding: "0 8px 0 5px",
      },
    },
  }));

  const classes = useStyles();


  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShipping({ address, city, postalCode, country }));
    props.history.push("payment");
  };
  return (
    <div style={{ margin: "32px" }}>
      <CheckoutSteps step1 step2></CheckoutSteps>
      <div className="form">
        <div className="form-container">
          <h2
            style={{
              margin: "8px",
              fontWeight: "bold",
              padding: "8px",
              textAlign: "center",
            }}
          >
            Shipping
          </h2>
          <TextField
            id="address"
            label="Address"
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            variant="outlined"
            color="secondary"
            style={{ width: "100%", margin: "8px" }}
            className={clsx(classes.input, classes.root)}
          />
          <TextField
            id="city"
            label="City"
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            variant="outlined"
            color="secondary"
            style={{ width: "100%", margin: "8px" }}
            className={clsx(classes.input, classes.root)}
          />
          <TextField
            id="postal-code"
            label="Postal Code"
            type="text"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
            variant="outlined"
            color="secondary"
            style={{ width: "100%", margin: "8px" }}
            className={clsx(classes.input, classes.root)}
          />
          <TextField
            id="country"
            label="Country"
            type="text"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            variant="outlined"
            color="secondary"
            style={{ width: "100%", margin: "8px" }}
            className={clsx(classes.input, classes.root)}
          />

          <Button
            variant="contained"
            color="secondary"
            onClick={submitHandler}
            style={{ margin: "8px", fontSize: "14px" }}
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
}
export default ShippingScreen;
