import React, { useState } from "react";
import UserForm from "./UserForm";
import UserList from "./UserList";

function App() {
  const [users, setUsers] = useState<{ name: string; email: string }[]>([]);
  const onUserAdd = ({ name, email }: { name: string; email: string }) => {
    const user = { name, email };
    setUsers([...users, user]);
  };
  return (
    <div>
      <UserForm onUserAdd={onUserAdd} />
      <hr />
      <UserList users={users} />
    </div>
  );
}

export default App;
