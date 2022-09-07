import {
  ARTICLE_LIST_REQUEST,
  ARTICLE_LIST_SUCCESS,
  ARTICLE_LIST_FAIL,
  ARTICLE_SAVE_REQUEST,
  ARTICLE_SAVE_SUCCESS,
  ARTICLE_SAVE_FAIL,
  ARTICLE_DELETE_REQUEST,
  ARTICLE_DELETE_SUCCESS,
  ARTICLE_DELETE_FAIL,
} from "../constants/articleConstants";

function articleListReducer(state = { articles: [] }, action) {
  switch (action.type) {
    case ARTICLE_LIST_REQUEST:
      return { loading: true, articles: [] };
    case ARTICLE_LIST_SUCCESS:
      return { loading: false, articles: action.payload };
    case ARTICLE_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

function articleDeleteReducer(state = { article: {} }, action) {
  switch (action.type) {
    case ARTICLE_DELETE_REQUEST:
      return { loading: true };
    case ARTICLE_DELETE_SUCCESS:
      return { loading: false, article: action.payload, success: true };
    case ARTICLE_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

function articleSaveReducer(state = { article: {} }, action) {
  switch (action.type) {
    case ARTICLE_SAVE_REQUEST:
      return { loading: true };
    case ARTICLE_SAVE_SUCCESS:
      return { loading: false, success: true, article: action.payload };
    case ARTICLE_SAVE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

export { articleListReducer, articleSaveReducer, articleDeleteReducer };
