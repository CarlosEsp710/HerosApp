import { mount } from "enzyme";
import { AuthContext } from "../../auth/authContext";

import { AppRouter } from "../../routers/AppRouter";

describe("AppRouter", () => {
  test("should return login if the user is not logged in", () => {
    const authContext = {
      user: {
        isLoggedIn: false,
      },
    };

    const wrapper = mount(
      <AuthContext.Provider value={authContext}>
        <AppRouter />
      </AuthContext.Provider>
    );

    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find("h2").text()).toBe("Sign in to your account");
  });

  test("should return the marvel page if the user is logged in", () => {
    const authContext = {
      user: {
        isLoggedIn: true,
        name: "Carlos Espejel",
        email: "carlosespejel71@gmail.com",
        imageUrl: "https://avatars.githubusercontent.com/u/57500554?s=96&v=4",
      },
    };

    const wrapper = mount(
      <AuthContext.Provider value={authContext}>
        <AppRouter />
      </AuthContext.Provider>
    );

    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find("h1").text()).toBe("Marvel Screen");
  });
});
