import {
  CATEGORY_LIST_REQUEST,
  CATEGORY_LIST_SUCCESS,
  CATEGORY_LIST_FAIL,
  CATEGORY_SAVE_REQUEST,
  CATEGORY_SAVE_SUCCESS,
  CATEGORY_SAVE_FAIL,
} from "../constants/categoryConstants";
import axios from "axios";
import Axios from "axios";

const listCategories = (
) => async (dispatch) => {
  try {
    dispatch({ type: CATEGORY_LIST_REQUEST });
    const { data } = await axios.get(
      "/api/categories"
    );
    dispatch({ type: CATEGORY_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: CATEGORY_LIST_FAIL, payload: error.message });
  }
};

const saveCategory = (category) => async (dispatch, getState) => {
  try {
    dispatch({ type: CATEGORY_SAVE_REQUEST, payload: category });
    const {
      userSignin: { userInfo },
    } = getState();
    if (!category._id) {
      const { data } = await Axios.post("/api/categories/add", category, {
        headers: {
          Authorization: "Bearer " + userInfo.token,
        },
      });
      dispatch({ type: CATEGORY_SAVE_SUCCESS, payload: data });
    } else {
      const { data } = await Axios.put(
        "/api/categories/" + category._id,
        category,
        {
          headers: {
            Authorization: "Bearer " + userInfo.token,
          },
        }
      );
      dispatch({ type: CATEGORY_SAVE_SUCCESS, payload: data });
    }
  } catch (error) {
    dispatch({ type: CATEGORY_SAVE_FAIL, payload: error.message });
  }
};



export {
  listCategories,
  saveCategory,
};
