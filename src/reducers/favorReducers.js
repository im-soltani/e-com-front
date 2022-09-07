import { FAVOR_ADD_ITEM, FAVOR_REMOVE_ITEM } from "../constants/favorConstants";

function favorReducer(state = { favorItems: [] }, action) {
  switch (action.type) {
    case FAVOR_ADD_ITEM:
      const item = action.payload;
      const product = state.favorItems.find((x) => x.product === item.product);
      if (product) {
        return {
          favorItems: state.favorItems.map((x) =>
            x.product === product.product ? item : x
          ),
        };
      }
      return { favorItems: [...state.favorItems, item] };
    case FAVOR_REMOVE_ITEM:
      return {
        favorItems: state.favorItems.filter(
          (x) => x.product !== action.payload
        ),
      };
    default:
      return state;
  }
}

export { favorReducer };
