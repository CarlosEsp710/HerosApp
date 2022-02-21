import { types } from "../types/types";

export const authReducer = (state = {}, action) => {
  switch (action.type) {
    case types.login:
      return {
        ...action.payload,
        isLoggedIn: true,
      };

    case types.logout:
      return {
        isLoggedIn: false,
      };

    default:
      return state;
  }
};
