import { useState } from "react";
import { supabase } from "./services/supabase";
import { useEffect } from "react";

function App() {
  const [users, setUsers] = useState([]);

  console.log(users);

  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    const { data } = await supabase.from("users").select("*");
    setUsers(data);
  }

  return (
    <>
      {/* Table START */}
      <table className="table-auto border border-collapse container px-4 py-2 text-center">
        <thead>
          <tr>
            <th className="border">ID</th>
            <th className="border">Name</th>
            <th className="border">Age</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td className="border">{user.id}</td>
              <td className="border">{user.name}</td>
              <td className="border">{user.age}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Table END */}
    </>
  );
}

export default App;
