import { mount } from "enzyme";
import { MemoryRouter } from "react-router-dom";

import { AuthContext } from "../../auth/authContext";
import { DashboardRoutes } from "../../routers/DashboardRoutes";

describe("DashboardRoutes", () => {
  const authContext = {
    user: {
      isLoggedIn: true,
      name: "Carlos Espejel",
      email: "carlosespejel71@gmail.com",
      imageUrl: "https://avatars.githubusercontent.com/u/57500554?s=96&v=4",
    },
  };

  test("should return properly - MarvelScreen", () => {
    const wrapper = mount(
      <AuthContext.Provider value={authContext}>
        <MemoryRouter initialEntries={["/"]}>
          <DashboardRoutes />
        </MemoryRouter>
      </AuthContext.Provider>
    );

    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find("h1").text()).toBe("Marvel Screen");
  });

  test("should return properly - DCScreen", () => {
    const wrapper = mount(
      <AuthContext.Provider value={authContext}>
        <MemoryRouter initialEntries={["/dc"]}>
          <DashboardRoutes />
        </MemoryRouter>
      </AuthContext.Provider>
    );

    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find("h1").text()).toBe("DC Screen");
  });

  test("should return properly - SearchScreen", () => {
    const wrapper = mount(
      <AuthContext.Provider value={authContext}>
        <MemoryRouter initialEntries={["/search"]}>
          <DashboardRoutes />
        </MemoryRouter>
      </AuthContext.Provider>
    );

    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find("h1").text()).toBe("Search Screen");
  });
});
