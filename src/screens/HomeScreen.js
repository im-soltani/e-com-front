import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { listProducts } from "../actions/productActions";
import { TextField } from "@material-ui/core";
import { listCategories } from "../actions/categoryActions";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Rating from "../components/Rating";
import { uniqBy } from "lodash";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import { makeStyles } from "@material-ui/core/styles";
import { addToFavor, removeFromFavor } from "../actions/favorActions";
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { addToCart, removeFromCart } from "../actions/cartActions";
import clsx from "clsx";
import Favorite from "@material-ui/icons/Favorite";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";

function HomeScreen({ setActive }) {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [category, setCategory] = useState("");
  const productList = useSelector((state) => state.productList);
  const categoryList = useSelector((state) => state.categoryList.categories);
  const { products, loading, error } = productList;
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cartItems);
  const favor = useSelector((state) => state.favor.favorItems);
  const history = useHistory();

  const useStyles = makeStyles((theme) => ({
    input: {
      "& .MuiInputBase-input ": {
        fontSize: "14px",
      },
      "& .MuiOutlinedInput-input": {
        padding: "15px 14px",
      },
    },
    root: {
      "& .MuiFormLabel-root": {
        fontSize: "14px",
        background: "#fff",
        padding: "0 8px 0 5px",
      },
    },
    select: {
      "& .MuiSelect-select:not([multiple])": {
        fontSize: "14px",
        padding: "15px 14px",
      },
    },
  }));
  const classes = useStyles();

  useEffect(() => {
    dispatch(listProducts(category));
    dispatch(listCategories());

    return () => {
      //
    };
  }, [category, dispatch]);

  let listOfProduct = products;

  if (searchKeyword) {
    // do search here
    const expr = new RegExp(searchKeyword, "i");
    listOfProduct = listOfProduct.filter((nal) => expr.test(nal["name"]));
  }

  const sortHandler = (e) => {
    setSortOrder(e.target.value);
    dispatch(listProducts(category, searchKeyword, sortOrder));
  };

  const handleAddToFavor = (id) => {
    dispatch(addToFavor(id));
  };

  const handleRemoveFromFavor = (id) => {
    dispatch(removeFromFavor(id));
  };

  const handleAddToCart = (id) => {
    console.log(id, "idddddddd");
    dispatch(addToCart(id, 1));
  };

  const handleRemoveFromCart = (id) => {
    dispatch(removeFromCart(id));
  };

  return (
    <div style={{ display: "flex", alignItems: "flex-start" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          padding: "32px",
          margin: "32px",
        }}
      >
        <TextField
          id="search"
          label="Search Product"
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
          variant="outlined"
          type="search"
          color="secondary"
          style={{ width: "18em" }}
          className={clsx(classes.input, classes.root)}
        />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontWeight: "bold",
              fontSize: "16px",
              textAlign: "center",
              margin: "16px 0",
            }}
          >
            Select Category
          </div>
          {categoryList &&
            uniqBy(categoryList, "label").map((el, index) => {
              return (
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={category === el.label}
                      onClick={(e) =>
                        category !== el.label
                          ? setCategory(el.label)
                          : setCategory("")
                      }
                      name="checkedA"
                    />
                  }
                  label={el.label}
                  style={{ padding: "8px", width: "fit-content" }}
                />
              );
            })}
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          padding: "32px",
          margin: "35px 4em",
        }}
      >
        <div style={{ padding: "8px",  width: "250px"  }}>
          <FormControl
            variant="outlined"
            className={classes.formControl}
            color="secondary"
            style={{ width: "100%" }}
          >
            <InputLabel
              htmlFor="outlined-rating-native-simple"
              style={{
                fontSize: "18px",
                background: "#fff",
              }}
            >
              Sort Product
            </InputLabel>
            <Select
              native
              value={sortOrder}
              onChange={sortHandler}
              inputProps={{
                name: "Ratin",
                id: "outlined-age-native-simple",
              }}
              className={classes.select}
            >
              {[
                { label: "Newest", value: "" },
                { label: "Highest", value: "highest" },
                { label: "Lowest", value: "lowest" },
              ].map(({ label }, index) => (
                <option
                  key={index}
                  style={{ padding: "16px 8px" }}
                  value={label}
                >
                  {label}
                </option>
              ))}
            </Select>
          </FormControl>
        </div>
        {loading ? (
          <div style={{ padding: "8px", margin: "8px" }}>Loading...</div>
        ) : error ? (
          <div style={{ padding: "8px", margin: "8px" }}>{error}</div>
        ) : (
          <div
            className="products"
            style={{ display: "flex", flexFlow: "wrap" }}
          >
            {listOfProduct &&
              listOfProduct.map((product) => (
                <div
                  className="product"
                  key={product._id}
                  style={{
                    margin: "50px",
                    position: "relative",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    setActive("");
                    history.push("/product/" + product._id);
                  }}
                >
                  <img
                    className="product-image"
                    src={product.image}
                    alt="product"
                    width="300em"
                    height="290em"
                  />
                  <div
                    className="product-name"
                    style={{
                      padding: "8px",
                      textAlign: "center",
                      fontWeight: "bold",
                      color: "#f50057",
                      fontSize: "26px"
                    }}
                  >
                    {product.name}
                  </div>
                  <div
                    className="product-brand"
                    style={{
                      padding: "8px",
                      textAlign: "center",
                      fontSize: "22px",
                    }}
                  >
                    <b> Brand: </b>
                    {product.brand}
                  </div>
                  <div
                    className="product-price"
                    style={{ padding: "8px", textAlign: "center", fontSize: "22px" }}
                  >
                    {product.price} DT
                  </div>
                  <div
                    className="product-rating"
                    style={{ textAlign: "center", padding: "8px" }}
                  >
                    <Rating
                      value={product.rating}
                      text={product.numReviews + " reviews"}
                    />
                  </div>
                  <div
                    style={{
                      display: "flex",
                      position: "absolute",
                      top: "10px",
                      color: "rgb(255, 255, 255)",
                      left: "200px",
                    }}
                  >
                    <FormControlLabel
                      control={
                        <Checkbox
                          icon={
                            <FavoriteBorder
                              style={{ fontSize: "28px", color: "red" }}
                            />
                          }
                          checkedIcon={
                            <Favorite style={{ fontSize: "28px" }} />
                          }
                          checked={favor
                            .map((el) => el.product)
                            .includes(product._id)}
                          style={{ fontSize: "28px" }}
                          name="checkedH"
                        />
                      }
                      label=""
                      onClick={(e) => {
                        e.stopPropagation();
                        !favor.map((el) => el.product).includes(product._id)
                          ? handleAddToFavor(product._id)
                          : handleRemoveFromFavor(product._id);
                      }}
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          icon={
                            <ShoppingCartOutlinedIcon
                              style={{ fontSize: "28px", color: "red" }}
                            />
                          }
                          checkedIcon={
                            <ShoppingCartIcon style={{ fontSize: "28px" }} />
                          }
                          checked={cart
                            .map((el) => el.product)
                            .includes(product._id)}
                          style={{ fontSize: "28px" }}
                          name="checkedH"
                        />
                      }
                      label=""
                      onClick={(e) => {
                        e.stopPropagation();
                        !cart.map((el) => el.product).includes(product._id)
                          ? handleAddToCart(product._id)
                          : handleRemoveFromCart(product._id);
                      }}
                    />
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
}
export default HomeScreen;
