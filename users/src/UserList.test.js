import { render, screen, within } from "@testing-library/react";
import UserList from "./UserList";

const renderComponent = () => {
  const users = [
    { name: "Bob Smith", email: "bob.smith@email.com" },
    { name: "Jane Doe", email: "jane.doe@email.com" },
  ];

  const { container } = render(<UserList users={users} />);

  return { users, container };
};

test("it shows a table with a row for each user", () => {
  renderComponent();

  const rows = within(screen.getByTestId("users")).getAllByRole("row", {
    hidden: true,
  });
  expect(rows).toHaveLength(2); // 1 header + 2 rows
});

test("it shows a table with a row for each user (alternative approach)", () => {
  const { container } = renderComponent();

  // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
  const rows = container.querySelectorAll("tbody tr");

  expect(rows).toHaveLength(2); // 1 header + 2 rows
});

test("it renders the name and email of each user", () => {
  const { users } = renderComponent();

  for (let user of users) {
    expect(screen.getByRole("cell", { name: user.name })).toBeInTheDocument();
    expect(screen.getByRole("cell", { name: user.email })).toBeInTheDocument();
  }
});
