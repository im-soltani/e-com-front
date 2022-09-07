import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { savePayment } from "../actions/cartActions";
import CheckoutSteps from "../components/CheckoutSteps";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";

function PaymentScreen(props) {
  const [paymentMethod, setPaymentMethod] = useState("");

  const useStyles = makeStyles((theme) => ({
    root: {
      "& .MuiFormControlLabel-label": {
        fontSize: "18px",
      },
    },
  }));
  const classes = useStyles();
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePayment({ paymentMethod }));
    props.history.push("placeorder");
  };
  return (
    <div style={{ margin: "32px" }}>
      <CheckoutSteps step1 step2 step3></CheckoutSteps>
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
            Payment
          </h2>
          <FormControlLabel
            className={classes.root}
            control={
              <Radio
                value={paymentMethod === "paybal"}
                onChange={() =>
                  paymentMethod !== "paybal"
                    ? setPaymentMethod("payBal")
                    : setPaymentMethod("")
                }
              />
            }
            label="PayBal"
            style={{ fontSize: "18px", margin: "8px" }}
          />

          <Button
            variant="contained"
            style={{ margin: "8px", fontSize: "14px", outline: "none" }}
            onClick={submitHandler}
            color="secondary"
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
}
export default PaymentScreen;
