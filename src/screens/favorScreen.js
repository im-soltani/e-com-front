import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "@material-ui/core";
import { removeFromFavor } from "../actions/favorActions";

const FavorScreen = (props) => {
  const favorList = useSelector((state) => state.favor.favorItems);
  const dispatch = useDispatch();

  const addToCard = (id) => {
    props.history.push("/cart/" + id + "?qty=" + 1);
  };

  const removeProductFavor = (id) => {
    dispatch(removeFromFavor(id));
  };
  return (
    <div style={{ height: "100%" }}>
      <h2 style={{ margin: "16px", padding: "16px 32px", fontWeight: "bold" }}>
        Your wishlist items
      </h2>
      <div
        style={{
          margin: "32px",
          padding: "8px 32px",
        }}
      >
        <div
          style={{
            padding: "16px",
            background: "#eee",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          {["Image", "Product Name", "Unit Price", "Add To Card", "Action"].map(
            (el) => (
              <span
                style={{
                  margin: "8px",
                  padding: "8px",
                  fontWeight: "bold",
                  fontSize: "20px",
                }}
              >
                {el}
              </span>
            )
          )}
        </div>
        <div>
          {favorList &&
            favorList.map((el) => (
              <Row
                data={el}
                key={el.product}
                addToCad={() => addToCard(el.product)}
                removeFromFavor={() => removeProductFavor(el.product)}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default FavorScreen;

const Row = ({ data, addToCad, removeFromFavor }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "8px 16px",
      }}
    >
      <img src={data.image} alt="product" width="100px" height="200px" />
      <div>{data.name}</div>
      <div>{data.price} DT</div>
      <Button
        variant="contained"
        onClick={addToCad}
        color="secondary"
        style={{ fontSize: "14px", outline: "none" }}
      >
        Add To Card
      </Button>
      <Button
        variant="outlined"
        color="secondary"
        onClick={removeFromFavor}
        style={{ fontSize: "14px", outline: "none" }}
      >
        x
      </Button>
    </div>
  );
};
