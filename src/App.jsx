import { useState } from "react";
import { supabase } from "./services/supabase";
import { useEffect } from "react";

function App() {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({ name: "", age: "" });
  const [editUser, setEditUser] = useState({ name: "", age: "" });

  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    const { data } = await supabase.from("users").select("*");
    setUsers(data);
  }

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  async function createUser(e) {
    e.preventDefault();
    await supabase.from("users").insert({ name: user.name, age: user.age });
    fetchUsers();
    setUser({ name: "", age: "" });
  }

  async function deleteUser(userId) {
    await supabase.from("users").delete().eq("id", userId);
    fetchUsers();
  }

  const displayUser = (userId) => {
    users.map((user) => {
      if (user.id === userId) {
        setEditUser(user);
      }
    });
  };

  const handleEdit = (e) => {
    setEditUser({ ...editUser, [e.target.name]: e.target.value });
  };

  async function editUserInfo(e) {
    e.preventDefault();
    await supabase
      .from("users")
      .update({ name: editUser.name, age: editUser.age })
      .eq("id", editUser.id);
    fetchUsers();
    setEditUser({ name: "", age: "" });
  }

  return (
    <>
      <div className="container py-12">
        <form
          onSubmit={createUser}
          action=""
          className="grid grid-cols-2 max-w-[650px] gap-4 border p-4 rounded-md"
        >
          <label htmlFor="" className="grid grid-cols-1">
            <span>Name:</span>
            <input
              type="text"
              placeholder="Enter name ..."
              value={user.name}
              name="name"
              onChange={handleChange}
              className="border px-2 py-1 rounded-md"
            />
          </label>

          <label htmlFor="" className="grid grid-cols-1">
            <span>Age:</span>
            <input
              type="number"
              placeholder="Enter age ..."
              value={user.age}
              name="age"
              onChange={handleChange}
              className="border px-2 py-1 rounded-md"
            />
          </label>
          <button className="border rounded-md py-1 w-[100px] hover:bg-gray-200 transition-all duration-200">
            {"+ "}Add
          </button>
        </form>
      </div>

      <div className={`container pb-12 transition-all duration-300 ${editUser.id ? "" : "hidden"}`}>
        <p className="py-2 font-medium">Edit User Information:</p>
        <form
          onSubmit={editUserInfo}
          action=""
          className="grid grid-cols-2 max-w-[650px] gap-4 border p-4 rounded-md"
        >
          <label htmlFor="" className="grid grid-cols-1">
            <span>Name:</span>
            <input
              type="text"
              placeholder="Enter name ..."
              value={editUser.name}
              name="name"
              onChange={handleEdit}
              className="border px-2 py-1 rounded-md"
            />
          </label>

          <label htmlFor="" className="grid grid-cols-1">
            <span>Age:</span>
            <input
              type="number"
              placeholder="Enter age ..."
              value={editUser.age}
              name="age"
              onChange={handleEdit}
              className="border px-2 py-1 rounded-md"
            />
          </label>
          <button className="border rounded-md py-1 w-[100px] hover:bg-gray-200 transition-all duration-200">
            Save
          </button>
        </form>
      </div>

      {/* Table START */}
      <table className="table-auto border border-collapse container px-4 py-2 text-center">
        <thead>
          <tr>
            <th className="border">ID</th>
            <th className="border">Name</th>
            <th className="border">Age</th>
            <th className="border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td className="border">{user.id}</td>
              <td className="border">{user.name}</td>
              <td className="border">{user.age}</td>
              <td className="border w-[150px]">
                <button
                  onClick={() => {
                    displayUser(user.id);
                  }}
                  className="border m-1 px-2 py-2 rounded-md hover:bg-sky-700 hover:text-gray-100 transition-all duration-200"
                >
                  <i className="bi bi-pencil flex justify-center items-center"></i>
                </button>
                <button
                  onClick={() => {
                    deleteUser(user.id);
                  }}
                  className="border m-1 px-2 py-2 rounded-md hover:bg-red-700 hover:text-gray-100 transition-all duration-200"
                >
                  <i className="bi bi-trash flex justify-center items-center"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Table END */}
    </>
  );
}

export default App;
