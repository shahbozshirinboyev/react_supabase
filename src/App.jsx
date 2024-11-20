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
      <div className="text-red-700">app</div>
    </>
  );
}

export default App;
