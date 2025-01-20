import { render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";
import UserForm from "./UserForm";

test("it shows two inputs and a button", () => {
  render(<UserForm />);

  const inputs = screen.getAllByRole("textbox");
  const button = screen.getByRole("button");

  expect(inputs).toHaveLength(2);
  expect(button).toBeInTheDocument();
});

test("it submits the form when the button is clicked", async () => {
  const mockOnUserAdd = jest.fn();

  render(<UserForm onUserAdd={mockOnUserAdd} />);

  const userName = "Bob Smith";
  const userEmail = "bob@smith.com";

  const nameInput = screen.getByRole("textbox", { name: "Name" });
  const emailInput = screen.getByRole("textbox", { name: "Email" });
  const button = screen.getByRole("button");

  await user.type(nameInput, userName);
  await user.type(emailInput, userEmail);
  await user.click(button);

  expect(mockOnUserAdd).toHaveBeenCalledWith({
    name: userName,
    email: userEmail,
  });
});

test("it clears the inputs after submitting the form", async () => {
  render(<UserForm onUserAdd={() => {}} />);

  const nameInput = screen.getByRole("textbox", { name: "Name" });
  const emailInput = screen.getByRole("textbox", { name: "Email" });
  const button = screen.getByRole("button");

  await user.type(nameInput, "Bob Smith");
  await user.type(emailInput, "bob@email.com");
  await user.click(button);

  expect(nameInput).toHaveValue("");
  expect(emailInput).toHaveValue("");
});
