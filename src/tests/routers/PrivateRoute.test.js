import { mount } from "enzyme";
import { MemoryRouter } from "react-router-dom";

import { AuthContext } from "../../auth/authContext";
import { PrivateRoute } from "../../routers/PrivateRoute";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  Navigate: () => <span>Return to login</span>,
}));

describe("test <PrivateRoute />", () => {
  Storage.prototype.setItem = jest.fn();

  const authContext = {
    user: {
      isLoggedIn: true,
      name: "Carlos Espejel",
      email: "carlosespejel71@gmail.com",
      imageUrl: "https://avatars.githubusercontent.com/u/57500554?s=96&v=4",
    },
  };

  test("should return component if user is logged in and save in the localStorage", () => {
    const wrapper = mount(
      <AuthContext.Provider value={authContext}>
        <MemoryRouter initialEntries={["/"]}>
          <PrivateRoute>
            <h1>You are logged in</h1>
          </PrivateRoute>
        </MemoryRouter>
      </AuthContext.Provider>
    );

    expect(wrapper.find("h1").text()).toBe("You are logged in");
    expect(Storage.prototype.setItem).toHaveBeenCalledWith("lastPath", "/");
  });

  test("should return login page if user is not logged in", () => {
    const authContext = {
      user: {
        isLoggedIn: false,
      },
    };

    const wrapper = mount(
      <AuthContext.Provider value={authContext}>
        <MemoryRouter initialEntries={["/"]}>
          <PrivateRoute>
            <h1>You are logged in</h1>
          </PrivateRoute>
        </MemoryRouter>
      </AuthContext.Provider>
    );

    expect(wrapper.find("h1").exists()).toBe(false);
    expect(wrapper.find("span").text()).toBe("Return to login");
  });
});
