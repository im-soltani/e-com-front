import Axios from "axios";
import Cookie from "js-cookie";
import { FAVOR_ADD_ITEM, FAVOR_REMOVE_ITEM } from "../constants/favorConstants";

const addToFavor = (productId) => async (dispatch, getState) => {
  try {
    const { data } = await Axios.get("/api/products/" + productId);
    dispatch({
      type: FAVOR_ADD_ITEM,
      payload: {
        product: data._id,
        name: data.name,
        image: data.image,
        price: data.price,
        countInStock: data.countInStock,
        // qty,
      },
    });
    const {
      favor: { favorItems },
    } = getState();
    Cookie.set("favorItems", JSON.stringify(favorItems));
  } catch (error) {}
};
const removeFromFavor = (productId) => (dispatch, getState) => {
  dispatch({ type: FAVOR_REMOVE_ITEM, payload: productId });

  const {
    favor: { favorItems },
  } = getState();
  Cookie.set("favorItems", JSON.stringify(favorItems));
};

export { addToFavor, removeFromFavor };
