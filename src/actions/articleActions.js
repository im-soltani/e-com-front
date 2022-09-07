import {
  ARTICLE_LIST_REQUEST,
  ARTICLE_LIST_SUCCESS,
  ARTICLE_LIST_FAIL,
  ARTICLE_SAVE_REQUEST,
  ARTICLE_SAVE_SUCCESS,
  ARTICLE_SAVE_FAIL,
  ARTICLE_DELETE_SUCCESS,
  ARTICLE_DELETE_FAIL,
  ARTICLE_DELETE_REQUEST,
} from "../constants/articleConstants";
import axios from "axios";
import Axios from "axios";

const listArticles = () => async (dispatch) => {
  try {
    dispatch({ type: ARTICLE_LIST_REQUEST });
    const { data } = await axios.get("/api/articles/");
    dispatch({ type: ARTICLE_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: ARTICLE_LIST_FAIL, payload: error.message });
  }
};

const saveArticle = (article) => async (dispatch, getState) => {
  console.log(article, "art");
  try {
    dispatch({ type: ARTICLE_SAVE_REQUEST, payload: article });
    const {
      userSignin: { userInfo },
    } = getState();
    if (!article._id) {
      const { data } = await Axios.post("/api/articles/post", article, {
        headers: {
          Authorization: "Bearer " + userInfo.token,
        },
      });
      dispatch({ type: ARTICLE_SAVE_SUCCESS, payload: data });
    } else {
      const { data } = await Axios.put(
        "/api/articles/post/" + article._id,
        article,
        {
          headers: {
            Authorization: "Bearer " + userInfo.token,
          },
        }
      );
      dispatch({ type: ARTICLE_SAVE_SUCCESS, payload: data });
    }
  } catch (error) {
    dispatch({ type: ARTICLE_SAVE_FAIL, payload: error.message });
  }
};

const deleteArticle = (articleId) => async (dispatch, getState) => {
  try {
    const {
      userSignin: { userInfo },
    } = getState();
    dispatch({ type: ARTICLE_DELETE_REQUEST, payload: articleId });
    const { data } = await axios.delete("/api/articles/delete/" + articleId, {
      headers: {
        Authorization: "Bearer " + userInfo.token,
      },
    });
    dispatch({ type: ARTICLE_DELETE_SUCCESS, payload: data, success: true });
  } catch (error) {
    dispatch({ type: ARTICLE_DELETE_FAIL, payload: error.message });
  }
};

export { listArticles, saveArticle, deleteArticle };
