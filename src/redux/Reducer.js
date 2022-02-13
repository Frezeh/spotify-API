import * as ActionTypes from "./ActionTypes";

export const library = (
  state = {
    library: [],
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.ADD_LIBRARY:
      return {
        ...state,
        library: action.payload,
      };

    case ActionTypes.LIBRARY_FAILED:
      return { ...state, errMess: action.payload };

    default:
      return state;
  }
};
