import { render, screen, waitFor } from "@testing-library/react";
import user from "@testing-library/user-event";
import UserForm from "./UserForm";

test("it shows two inputs and a button", () => {
  // render the component
  render(<UserForm />);
  // Manipulate the component or find element in it
  const inputs = screen.getAllByRole("textbox");
  const button = screen.getByRole("button");
  // Assertion - make sure the component is doing what we expect it to do
  expect(inputs).toHaveLength(2);
  expect(button).toBeInTheDocument();
});

test("it calls onUserAdd when the form is submitted", () => {
  const mock = jest.fn();
  // Render my component
  render(<UserForm onUserAdd={mock} />);
  // Find the two input
  const nameInput = screen.getByRole("textbox", { name: /name/i });
  const emailInput = screen.getByRole("textbox", { name: /email/i });
  // Simulate typing in a name
  user.click(nameInput);
  user.keyboard("John Doe");
  // Simulate typing in an email
  user.click(emailInput);
  user.keyboard("john@doe.com");
  // Finds the button
  const button = screen.getByRole("button");
  // Click the button
  user.click(button);
  // Expect onUserAdd to have been called
  expect(mock).toHaveBeenCalled();
  expect(mock).toHaveBeenCalledWith({
    name: "John Doe",
    email: "john@doe.com",
  });
});

// // NOT THE BEST IMPLEMENTATION Option 2
//   const argList = [];
//   const callback = (...args) => {
//     argList.push(args);
//   };
// Render my component
// render(<UserForm onUserAdd={callback} />);
//   const [nameInput, emailInput] = screen.getAllByRole("textbox");
// Simulate typing in a name
//   user.click(nameInput);
//   user.keyboard("John Doe");
// Simulate typing in an email
//   user.click(emailInput);
//   user.keyboard("john@doe.com");
// Finds the button
//   const button = screen.getByRole("button");
// Click the button
//   user.click(button);
// Expect onUserAdd to have been called
//   expect(argList).toHaveLength(1);
//   expect(argList[0][0]).toEqual({ name: "John Doe", email: "john@doe.com" });

test("empties the two inputs when form is submitted", async () => {
  render(<UserForm onUserAdd={() => {}} />);
  const nameInput = screen.getByRole("textbox", { name: /name/i });
  const emailInput = screen.getByRole("textbox", { name: /email/i });
  const button = screen.getByRole("button");

  await user.click(nameInput);
  await user.keyboard("John Doe");
  await user.click(emailInput);
  await user.keyboard("john@doe.com");

  await user.click(button);

  expect(nameInput).toHaveValue("");
  expect(emailInput).toHaveValue("");
});
