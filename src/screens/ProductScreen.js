import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { detailsProduct, saveProductReview } from "../actions/productActions";
import Rating from "../components/Rating";
import { PRODUCT_REVIEW_SAVE_RESET } from "../constants/productConstants";
import { TextField, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import moment from "moment";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";

function ProductScreen(props) {
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const productDetails = useSelector((state) => state.productDetails);
  const { product, loading, error } = productDetails;
  const productReviewSave = useSelector((state) => state.productReviewSave);
  const { success: productSaveSuccess } = productReviewSave;
  const dispatch = useDispatch();

  const useStyles = makeStyles((theme) => ({
    input: {
      "& .MuiOutlinedInput-input": {
        padding: "12px 8px",
        fontSize: "16px",
      },
    },
    select: {
      "& .MuiSelect-select:not([multiple])": {
        fontSize: "14px",
      },
    },
    formControl: {
      margin: "16px 0",
    },
    // input: {
    //   "& .MuiInputBase-input ": {
    //     fontSize: "16px",
    //   },
    // },
    root: {
      "& .MuiFormLabel-root": {
        fontSize: "16px",
        background: "#eee",
        padding: "0 8px 0 5px",
      },
    },
  }));

  const classes = useStyles();

  useEffect(() => {
    if (productSaveSuccess) {
      alert("Review submitted successfully.");
      setRating(0);
      setComment("");
      dispatch({ type: PRODUCT_REVIEW_SAVE_RESET });
    }
    dispatch(detailsProduct(props.match.params.id));
    return () => {
      //
    };
  }, [productSaveSuccess]);
  const submitHandler = (e) => {
    e.preventDefault();
    // dispatch actions
    dispatch(
      saveProductReview(props.match.params.id, {
        name: userInfo.name,
        rating: rating,
        comment: comment,
      })
    );
  };
  const handleAddToCart = () => {
    props.history.push("/cart/" + props.match.params.id + "?qty=" + qty);
  };

  return (
    <div>
      <div style={{ padding: "8px 48px", borderBottom: "1px solid #eee" }}>
        <h3 style={{ fontWeight: 600 }}>Product Details</h3>
      </div>
      {loading ? (
        <div style={{ padding: "8px", margin: "8px" }}>Loading...</div>
      ) : error ? (
        <div style={{ padding: "8px", margin: "8px" }}>{error} </div>
      ) : (
        <>
          <div
            className="details"
            style={{
              display: "flex",
              border: "2px solid #eee",
              alignContent: "flex-start",
              padding: "16px 48px",
              margin: "5rem 20rem",
            }}
          >
            <div style={{ position: "relative" }}>
              <img
                src={product.image}
                alt="product"
                width="100%"
                height="100%"
              />
              {product.countInStock > 0 ? (
                <span
                  style={{
                    position: "absolute",
                    top: "10px",
                    right: "15px",
                    padding: "5px 12px",
                    borderRadius: "22px",
                    color: "green",
                    background: "#fff",
                  }}
                >
                  In Stock
                </span>
              ) : (
                <span
                  style={{
                    position: "absolute",
                    top: "10px",
                    right: "15px",
                    padding: "5px 12px",
                    borderRadius: "22px",
                    color: "red",
                    background: "#fff",
                  }}
                >
                  Unavailable
                </span>
              )}
            </div>
            <div
              className="details-info"
              style={{ padding: "8px 18px", width: "100%" }}
            >
              <h2>{product.name}</h2>
              <div
                style={{ fontWeight: 600, color: "#f50057", fontSize: "18px" }}
              >
                {product.price} DT
              </div>
              <div style={{ margin: "16px 0" }}>
                <a href="#reviews">
                  <Rating
                    value={product.rating}
                    text={product.numReviews + " reviews"}
                  />
                </a>
              </div>
              <p
                style={{
                  margin: "16px  0",
                  fontSize: "20px",
                  overflow: "auto",
                  width: "100%",
                }}
              >
                {product.description}
              </p>
              <div
                style={{
                  height: "2px",
                  background: "#eee",
                  padding: "0 8px",
                  margin: "16px 0",
                }}
              />
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  margin: "16px 0",
                }}
              >
                <TextField
                  type="number"
                  defaultValue={1}
                  value={qty}
                  InputProps={{
                    inputProps: {
                      max: product.countInStock,
                      min: 1,
                    },
                  }}
                  className={classes.input}
                  variant="outlined"
                  style={{ width: "120px", padding: "0" }}
                  onChange={(e) => setQty(e.target.value)}
                  label="Qty"
                  color="secondary"
                />
                {product.countInStock > 0 && (
                  <Button
                    onClick={handleAddToCart}
                    variant="outlined"
                    color={"secondary"}
                    style={{
                      fontSize: "13px",
                      marginLeft: "16px",
                      outline: "none",
                    }}
                  >
                    Add To Cart
                  </Button>
                )}
              </div>
            </div>
          </div>
          <div className="content-margined">
            <div
              style={{
                fontSize: "22px",
                padding: "16px 8px",
                textAlign: "center",
                fontWeight: 600,
                cursor: "pointer",
                background: "#eee",
              }}
            >
              Reviews
            </div>
            {!product.reviews.length && (
              <div
                style={{
                  margin: "8px",
                  textAlign: "center",
                  fontWeight: "bold",
                }}
              >
                There is no review
              </div>
            )}
            <div
              className="review"
              id="reviews"
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <div
                style={{
                  margin: "16px 32px",
                  padding: "16px",
                  display: "flex",
                  flexFlow: "wrap",
                }}
                className="container"
              >
                {product.reviews.map((review) => (
                  <div
                    key={review._id}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      margin: "8px",
                      padding: "8px",
                      background: "#eee",
                      height: "fit-content",
                    }}
                    className="col-md-4"
                  >
                    <div style={{ display: "flex" }}>
                      <div style={{ fontWeight: "bold" }}>
                        {review.name.toUpperCase()}
                      </div>
                      <div style={{ marginLeft: "16px" }}>
                        <Rating value={review.rating}></Rating>
                      </div>
                    </div>
                    <p style={{ padding: "8px 16px", alignSelf: "end" }}>
                      {review.comment}
                    </p>
                    <div
                      style={{
                        fontSize: "12px",
                        textAlign: "right",
                      }}
                    >
                      {moment(review.createdAt).format(
                        "MMMM Do YYYY, h:mm:ss a"
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ margin: "16px 32px" }}>
                {userInfo && (
                  <h3 style={{ margin: "8px", fontWeight: "bold" }}>
                    Write a customer review
                  </h3>
                )}
                {userInfo ? (
                  <div className="form-container">
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
                        Rating
                      </InputLabel>
                      <Select
                        native
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                        inputProps={{
                          name: "Rating",
                          id: "outlined-age-native-simple",
                        }}
                        className={classes.select}
                      >
                        <option value={1}> 1- Poor </option>
                        <option value={2}> 2- Fair </option>
                        <option value={3}> 3- Good </option>
                        <option value={4}> 4- Very Good </option>
                        <option value={5}> 5- Excellent </option>
                      </Select>
                    </FormControl>
                    <TextField
                      id="comment"
                      label="Comment"
                      style={{ width: "100%" }}
                      multiline={true}
                      rows={3}
                      type="text"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      variant="outlined"
                      color="secondary"
                    />
                    <Button
                      type="submit"
                      variant="contained"
                      color="secondary"
                      style={{
                        margin: "16px 0",
                        fontSize: "14px",
                        outline: "none",
                      }}
                      onClick={submitHandler}
                    >
                      Submit
                    </Button>
                  </div>
                ) : (
                  <div
                    style={{
                      margin: "8px",
                      fontWeight: "bold",
                      textAlign: "center",
                    }}
                  >
                    Please <Link to="/signin">Sign-in</Link> to write a review.
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
export default ProductScreen;

const desc =
  "Ut enim ad minima veniam, quis nostrum jjjjjjjjjjjsssssss jfbdj jlbfdfjbfd  ddfj jdjf jdjlsjd ldjsdjs ljdlsj ljdlsdj ljdlsjd jds jdsdj ssssssssssssssssssssssssssss  ssssssssssssss  sss         sss jjjjjjjjjjjjjjjjjj jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj           jjjjjjjjjjjjjjjjjjjjjjjjj jjjjjjjjjjjjjjjjjjjjjjjjjj jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj exercitationem  jknl jniiiiiiiiiiiiii oooooooooooooooooo iiiiiiiiiiiiiiiiii iiiiiiiiiiiiiiii ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur.";
