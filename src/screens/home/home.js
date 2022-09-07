import React, { useState, useEffect } from "react";
import Carousel from "./caroussel";
import { cls } from "reactutils";
import { useSelector, useDispatch } from "react-redux";
import { listProducts } from "../../actions/productActions";
import { useHistory } from "react-router-dom";
import { FormControlLabel } from "@material-ui/core";
import Favorite from "@material-ui/icons/Favorite";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";
import Checkbox from "@material-ui/core/Checkbox";
import { addToFavor, removeFromFavor } from "../../actions/favorActions";
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { addToCart, removeFromCart } from "../../actions/cartActions";
import CircularProgress from "@material-ui/core/CircularProgress";
import Example from "../chat";
import Rating from "../../components/Rating";

import supportIcon from "./24-hours-support.png";
import shippingIcon from "./icons8-free-shipping-50.png";
import discountIcon from "./cart_discount_online_sale_shopping_store_tag_icon_123216.png";
import moneyReturnIcon from "./kissclipart-money-return-white-transparent-clipart-computer-ic-bbff750db7834787.png";

const Home = ({ setNav }) => {
  const productList = useSelector((state) => state.productList);
  const { products, loading, error } = productList;
  const [active, setActive] = useState("");
  const [searchKeyword] = useState("");
  const category = "";
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listProducts(category, searchKeyword, active));

    return () => {
      //
    };
  }, [active, dispatch, searchKeyword]);
  return (
    <>
      <Carousel />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
          padding: "48px 38px 38px",
        }}
      >
        {listItems.map((el, index) => (
          <Item data={el} key={index} />
        ))}
      </div>
      <div
        className="dailyDeals"
        style={{
          position: "relative",
          padding: "32px 48px",
          textAlign: "center",
          fontWeight: "bold",
          fontSize: "26px",
          margin: "auto",
          width: "fit-content",
        }}
      >
        DAILY DEALS!
      </div>
      <div
        className="listView"
        style={{
          position: "relative",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {list &&
          list.map((el, index) => (
            <span
              key={index}
              style={{
                margin: "8px",
                padding: "8px",
                cursor: "pointer",
                fontSize: "20px",
                fontWeight: "bold",
              }}
              className={cls(
                "listViewItem",
                active === el.key && active !== "all" ? "active" : "",
                active === "all" ? "position" : ""
              )}
              onClick={() => setActive(el.key)}
            >
              {el.label}
            </span>
          ))}
      </div>
      {error && <div style={{ margin: "8px" }}>{error}</div>}

      <div
        // className="container"
        style={{
          position: "relative",
          display: "flex",
          justifyContent: "center",
          flexFlow: "wrap",
          margin: "0 80px",
        }}
      >
        {loading && <div style={{ margin: "8px" }}>Loading ...</div>}
        {products &&
          products.map((prd, index) => (
            <ProductCard key={index} data={prd} setNav={setNav} />
          ))}
      </div>
      <Example />
    </>
  );
};
export default Home;

const Item = ({ data }) => {
  const { image, title, description } = data;
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        margin: "8px",
        padding: "8px",
      }}
    >
      <img src={image} alt="icon" width="60px" height="60px" />
      <div style={{ padding: "12px" }}>
        <div>{title}</div>
        <div>{description}</div>
      </div>
    </div>
  );
};

const listItems = [
  {
    title: "Free Shipping",
    image: shippingIcon,
    description: "Free shipping on all order",
  },
  {
    title: "Support 24/7",
    image: supportIcon,
    description: "Free shipping on all order",
  },
  {
    title: "Money Return",
    image: moneyReturnIcon,
    description: "Free shipping on all order",
  },
  {
    title: "Order Discount",
    image: discountIcon,
    description: "Free shipping on all order",
  },
];

const list = [
  {
    label: "Newest",
    key: "",
    onClick: () => {},
  },
  {
    label: "Lowest",
    key: "lowest",
    onClick: () => {},
  },
  {
    label: "Highest",
    key: "highest",
    onClick: () => {},
  },
];

const ProductCard = ({ data, setNav }) => {
  const cart = useSelector((state) => state.cart.cartItems);
  const favor = useSelector((state) => state.favor.favorItems);

  const { rating, name, image, price, _id } = data;
  const history = useHistory();
  const dispatch = useDispatch();

  const handleAddToFavor = (id) => {
    dispatch(addToFavor(id));
  };

  const handleRemoveFromFavor = (id) => {
    dispatch(removeFromFavor(_id));
  };

  const handleAddToCart = (id) => {
    dispatch(addToCart(id, 1));
  };

  const handleRemoveFromCart = (id) => {
    dispatch(removeFromCart(_id));
  };

  return (
    <div
      className="productCard"
      style={{
        margin: "16px",
        padding: "8px",
        width: "25em",
        height: "auto",
        cursor: "pointer",
        position: "relative",
      }}
      onClick={() => {
        setNav("");
        history.push("/product/" + _id);
      }}
    >
      <img
        src={image}
        alt="product"
        width="100%"
        height="250em"
        className="productImage"
      />

      <h3
        style={{
          textAlign: "center",
          fontWeight: "bold",
          fontSize: "20px",
          padding: "8px 0",
        }}
      >
        {name}
      </h3>
      <div style={{ textAlign: "center" }}>
        <Rating value={rating} />
      </div>
      <div
        style={{
          textAlign: "center",
          fontWeight: "bold",
          fontSize: "14px",
          padding: "8px 0",
        }}
      >
        {price} DT
      </div>
      <div
        style={{
          display: "flex",
          position: "absolute",
          top: "10px",
          color: "rgb(255, 255, 255)",
          left: "300px",
        }}
      >
        <FormControlLabel
          control={
            <Checkbox
              icon={
                <FavoriteBorder style={{ fontSize: "28px", color: "red" }} />
              }
              checkedIcon={<Favorite style={{ fontSize: "28px" }} />}
              checked={favor.map((el) => el.product).includes(_id)}
              style={{ fontSize: "28px" }}
              name="checkedH"
            />
          }
          label=""
          onClick={(e) => {
            e.stopPropagation();
            !favor.map((el) => el.product).includes(_id)
              ? handleAddToFavor(_id)
              : handleRemoveFromFavor(_id);
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
              checkedIcon={<ShoppingCartIcon style={{ fontSize: "28px" }} />}
              checked={cart.map((el) => el.product).includes(_id)}
              style={{ fontSize: "28px" }}
              name="checkedH"
            />
          }
          label=""
          onClick={(e) => {
            e.stopPropagation();
            !cart.map((el) => el.product).includes(_id)
              ? handleAddToCart(_id)
              : handleRemoveFromCart(_id);
          }}
        />
      </div>
    </div>
  );
};
