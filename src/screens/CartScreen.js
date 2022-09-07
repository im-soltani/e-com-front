import React, { useEffect } from "react";
import { addToCart, removeFromCart } from "../actions/cartActions";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";

function CartScreen(props) {
  const cart = useSelector((state) => state.cart);

  const { cartItems } = cart;

  const useStyles = makeStyles((theme) => ({
    input: {
      "& .MuiOutlinedInput-input": {
        padding: "5px",
      },
    },
    select: {
      "& .MuiSelect-select:not([multiple])": {
        fontSize: "14px",
        padding: "8px 32px",
      },
    },
    formControl: {
      margin: "16px 0",
    },
  }));

  const classes = useStyles();

  const productId = props.match.params.id;
  const qty = props.location.search
    ? Number(props.location.search.split("=")[1])
    : 1;
  const dispatch = useDispatch();
  const removeFromCartHandler = (productId) => {
    dispatch(removeFromCart(productId));
  };
  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  const checkoutHandler = () => {
    props.history.push("/signin?redirect=shipping");
  };

  return (
    <>
      <div className="cart">
        <div className="cart-list">
          <div className="cart-list-container">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "8px 32px",
                borderBottom: "2px solid #eee",
                marginBottom: "16px",
              }}
            >
              <h3 style={{ fontSize: "20px", fontWeight: "bold" }}>
                Shopping Cart
              </h3>
              <div style={{ fontSize: "20px", fontWeight: "bold" }}>Price</div>
            </div>
            {cartItems.length === 0 ? (
              <div
                style={{ margin: "8px", fontSize: "20px", fontWeight: "bold" }}
              >
                Cart is empty
              </div>
            ) : (
              cartItems.map((item) => (
                <div style={{ padding: "8px 32px", display: "flex" }}>
                  <div className="cart-image">
                    <img
                      src={item.image}
                      alt="product"
                      width="180em"
                      height="150em"
                    />
                  </div>
                  <div className="cart-name">
                    <div
                      style={{
                        padding: "8px 16px",
                        fontSize: "20px",
                        fontWeight: "bold",
                      }}
                    >
                      <Link to={"/product/" + item.product}>{item.name}</Link>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        marginLeft: "16px",
                      }}
                    >
                      <FormControl
                        variant="outlined"
                        className={classes.formControl}
                        color="secondary"
                      >
                        <InputLabel
                          htmlFor="outlined-rating-native-simple"
                          style={{
                            fontSize: "20px",
                            background: "#fff",
                          }}
                        >
                          Qty
                        </InputLabel>
                        <Select
                          native
                          value={item.qty}
                          onChange={(e) =>
                            dispatch(addToCart(item.product, e.target.value))
                          }
                          inputProps={{
                            name: "Qty",
                            id: "outlined-qty-native-simple",
                          }}
                          className={classes.select}
                        >
                          {[...Array(item.countInStock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </Select>
                      </FormControl>
                      <Button
                        onClick={() => removeFromCartHandler(item.product)}
                        variant="outlined"
                        color={"secondary"}
                        style={{
                          fontSize: "13px",
                          marginLeft: "16px",
                          outline: "none",
                        }}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                  <div className="cart-price">{item.price} DT</div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "16px 32px",
          background: "#eee",
          margin: "0 16px 20px",
        }}
      >
        <h3 style={{ fontWeight: "bold", fontSize: "22px" }}>
          Total ( {cartItems.reduce((a, c) => a + c.qty, 0)} items) :{" "}
          {cartItems.reduce((a, c) => a + c.price * c.qty, 0)} DT
        </h3>
        <Button
          onClick={checkoutHandler}
          disabled={cartItems.length === 0}
          variant="contained"
          color="secondary"
          style={{ fontSize: "14px", outline: "none" }}
        >
          Proceed To Checkout
        </Button>
      </div>
    </>
  );
}

export default CartScreen;
