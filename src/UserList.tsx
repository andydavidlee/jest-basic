import React from "react";

const UserList = ({ users }: { users: { name: string; email: string }[] }) => {
  const renderedUsers = users.map(
    (user: { name: string; email: string }, index: number) => {
      return (
        <tr key={index}>
          <td>{user.name}</td>
          <td>{user.email}</td>
        </tr>
      );
    }
  );

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
        </tr>
      </thead>
      <tbody data-testid="users">{renderedUsers}</tbody>
    </table>
  );
};

export default UserList;
