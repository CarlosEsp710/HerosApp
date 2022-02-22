import { mount } from "enzyme";
import { MemoryRouter } from "react-router-dom";
import { AuthContext } from "../../../auth/authContext";

import { LoginScreen } from "../../../components/login/LoginScreen";
import { types } from "../../../types/types";

const mockNavigate = jest.fn();
const mockDispatch = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

describe("test <LoginScreen />", () => {
  const authContext = {
    user: {
      isLoggedIn: false,
    },
    dispatch: mockDispatch,
  };

  test("should return the component <LoginScreen />", () => {
    const wrapper = mount(
      <AuthContext.Provider value={authContext}>
        <MemoryRouter initialEntries={["/login"]}>
          <LoginScreen />
        </MemoryRouter>
      </AuthContext.Provider>
    );

    expect(wrapper).toMatchSnapshot();
  });

  test("should call login, navigate and localStorage", () => {
    const wrapper = mount(
      <AuthContext.Provider value={authContext}>
        <MemoryRouter initialEntries={["/login"]}>
          <LoginScreen />
        </MemoryRouter>
      </AuthContext.Provider>
    );

    const action = {
      type: types.login,
      payload: {
        name: "Carlos Espejel",
        email: "carlosespejel71@gmail.com",
        imageUrl: "https://avatars.githubusercontent.com/u/57500554?s=96&v=4",
      },
    };

    wrapper.find("button").simulate("click");

    expect(mockDispatch).toHaveBeenCalled();
    expect(mockDispatch).toHaveBeenCalledWith(action);
    expect(mockNavigate).toHaveBeenCalled();
    expect(mockNavigate).toHaveBeenCalledWith("/", { replace: true });

    localStorage.setItem("lastPath", "/dc");

    wrapper.find("button").simulate("click");

    expect(mockNavigate).toHaveBeenCalledWith("/dc", { replace: true });
  });
});
