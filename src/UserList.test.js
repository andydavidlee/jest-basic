import { screen, render, within } from "@testing-library/react";
import UserList from "./UserList";

const renderComponent = () => {
  const users = [
    { name: "Andy", email: "andy@lee.com" },
    { name: "Simon", email: "simon@jacobs.com" },
    { name: "Frances", email: "frances@frances.com" },
  ];
  render(<UserList users={users} />);
  return { users };
};

test("render one row per user", () => {
  // Render my component
  renderComponent();
  // Find all the rows in the table
  // logTestingPlaygroundURL() is a function that logs the URL to the Testing Playground;
  //   screen.logTestingPlaygroundURL();
  // Option 1: getByTestId. But have to alter component code.
  const rows = within(screen.getByTestId("users")).getAllByRole("row");
  // Option 2
  // eslint-disable-next-line
  //   const rows = container.querySelectorAll("tbody tr");
  // Assertion: correct number of rows in the table
  expect(rows).toHaveLength(3);
});

test("render the email and name of each user", () => {
  // Render my component
  const { users } = renderComponent();
  for (let user of users) {
    const name = screen.getByRole("cell", { name: user.name });
    const email = screen.getByRole("cell", { name: user.email });

    expect(name).toBeInTheDocument();
    expect(email).toBeInTheDocument();
  }
});
