import { authReducer } from "../../auth/authReducer";
import { types } from "../../types/types";

describe("authReducer", () => {
  const payload = {
    name: "Carlos Espejel",
    email: "carlosespejel71@gmail.com",
    imageUrl: "https://avatars.githubusercontent.com/u/57500554?s=96&v=4",
  };

  test("should return default state", () => {
    const state = authReducer({ isLoggedIn: false }, {});

    expect(state).toEqual({ isLoggedIn: false });
  });

  test("should log in and create the user", () => {
    const action = {
      type: types.login,
      payload: payload,
    };

    const state = authReducer({ isLoggedIn: false }, action);

    expect(state).toEqual({ isLoggedIn: true, ...payload });
  });

  test("should log out and delete the authenticated user", () => {
    const action = {
      type: types.logout,
    };

    const state = authReducer({ isLoggedIn: true, ...payload }, action);

    expect(state).toEqual({ isLoggedIn: false });
  });
});
