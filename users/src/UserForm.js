import { useState } from "react";

export default function UserForm({ onUserAdd }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    onUserAdd({ name, email });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="userName">Name</label>
        <input
          value={name}
          id="userName"
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="userEmail">Email</label>
        <input
          value={email}
          id="userEmail"
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <button>Add User</button>
    </form>
  );
}
