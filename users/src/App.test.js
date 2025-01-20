import { render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";
import App from "./App";

test("can recieve a new user and show it on a list", async () => {
  const users = [
    { name: "Bob Smith", email: "bob.smith@email.com" },
    { name: "Jane Doe", email: "jane.doe@email.com" },
  ];

  render(<App />);

  for (let userEntry of users) {
    const nameInput = screen.getByRole("textbox", { name: "Name" });
    const emailInput = screen.getByRole("textbox", { name: "Email" });
    const button = screen.getByRole("button");

    await user.type(nameInput, userEntry.name);
    await user.type(emailInput, userEntry.email);
    await user.click(button);

    expect(
      screen.getByRole("cell", { name: userEntry.name })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("cell", { name: userEntry.email })
    ).toBeInTheDocument();
  }
});
