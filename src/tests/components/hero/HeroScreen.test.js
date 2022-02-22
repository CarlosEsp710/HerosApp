import { mount } from "enzyme";
import { MemoryRouter, Route, Routes } from "react-router-dom";

import { HeroScreen } from "../../../components/hero/HeroScreen";

const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

describe("test <HeroScreen />", () => {
  const authContext = {
    user: {
      isLoggedIn: true,
    },
  };

  test("should not return <HeroScreen /> if there is no a hero in props", () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={["/hero"]}>
        <Routes>
          <Route path="/hero" element={<HeroScreen />} />
          <Route path="/" element={<h1>No hero page</h1>} />
        </Routes>
      </MemoryRouter>
    );

    expect(wrapper.find("h1").text()).toBe("No hero page");
  });

  test("should return <HeroScreen /> if there is a hero in props", () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={["/hero/marvel-spider"]}>
        <Routes>
          <Route path="/hero/:heroId" element={<HeroScreen />} />
          <Route path="/" element={<h1>No hero page</h1>} />
        </Routes>
      </MemoryRouter>
    );

    expect(wrapper.find("h1").text()).not.toBe("No hero page");
    expect(wrapper.find("h1").text()).toBe("Spider Man");
  });

  test("should return back with the button back", () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={["/hero/marvel-spider"]}>
        <Routes>
          <Route path="/hero/:heroId" element={<HeroScreen />} />
        </Routes>
      </MemoryRouter>
    );

    wrapper.find("button").simulate("click");

    expect(mockNavigate).toHaveBeenCalledWith(-1, { replace: true });
  });

  test("should return 'No hero page' if hero doesn't exist", () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={["/hero/marvel-spider-1234"]}>
        <Routes>
          <Route path="/hero/:heroId" element={<HeroScreen />} />
          <Route path="/" element={<h1>No hero page</h1>} />
        </Routes>
      </MemoryRouter>
    );

    expect(wrapper.find("h1").text()).toBe("No hero page");
  });
});
