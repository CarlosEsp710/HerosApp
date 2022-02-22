import { mount } from "enzyme";
import { MemoryRouter } from "react-router-dom";

import { SearchScreen } from "../../../components/search/SearchScreen";

const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

describe("test <SearchScreen />", () => {
  test("should return properly with default values", () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={["/search"]}>
        <SearchScreen />
      </MemoryRouter>
    );

    expect(wrapper).toMatchSnapshot();
  });

  test("should return Batman and input with queryString value", () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={["/search?q=batman"]}>
        <SearchScreen />
      </MemoryRouter>
    );

    expect(wrapper.find("input").prop("value")).toBe("batman");
    expect(wrapper.find("img").prop("alt")).toBe("Batman");
    expect(wrapper).toMatchSnapshot();
  });

  test("should return error if hero doesn't exist", () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={["/search?q=batman123"]}>
        <SearchScreen />
      </MemoryRouter>
    );

    expect(wrapper.find("strong").text()).toBe("Holy smokes!");
    expect(wrapper.find("span").text().trim()).toBe(
      "No results for 'batman123'."
    );
    expect(wrapper).toMatchSnapshot();
  });

  test("should call navigate to the new page", () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={["/search"]}>
        <SearchScreen />
      </MemoryRouter>
    );

    wrapper.find("input").simulate("change", {
      target: {
        name: "searchText",
        value: "batman",
      },
    });

    wrapper.find("form").simulate("submit", { preventDefault() {} });

    expect(mockNavigate).toHaveBeenCalled();
    expect(mockNavigate).toHaveBeenCalledWith("?q=batman");
  });
});
