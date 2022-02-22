import { mount } from "enzyme";
import { MemoryRouter } from "react-router-dom";
import { AuthContext } from "../../../auth/authContext";

import { NavBar } from "../../../components/ui/NavBar";
import { types } from "../../../types/types";

const mockNavigate = jest.fn();
const mockDispatch = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

describe("test <NavBar />", () => {
  const authContext = {
    user: {
      isLoggedIn: true,
      name: "Carlos Espejel",
      email: "carlosespejel71@gmail.com",
      imageUrl: "https://avatars.githubusercontent.com/u/57500554?s=96&v=4",
    },
    dispatch: mockDispatch,
  };

  test("should return the component <NavBar />", () => {
    const wrapper = mount(
      <AuthContext.Provider value={authContext}>
        <MemoryRouter initialEntries={["/"]}>
          <NavBar />
        </MemoryRouter>
      </AuthContext.Provider>
    );

    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find("img").at(1).prop("alt")).toBe("Carlos Espejel");
  });

  test("should call logout, navigate and dispatch", () => {
    const wrapper = mount(
      <AuthContext.Provider value={authContext}>
        <MemoryRouter initialEntries={["/"]}>
          <NavBar />
        </MemoryRouter>
      </AuthContext.Provider>
    );

    wrapper.find("button").at(0).simulate("click");

    expect(mockDispatch).toHaveBeenCalled();
    expect(mockDispatch).toHaveBeenCalledWith({ type: types.logout });
    expect(mockNavigate).toHaveBeenCalled();
    expect(mockNavigate).toHaveBeenCalledWith("/login", { replace: true });
  });
});
