import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { isAuthenticated, logout, user } = useAuth();

  return (
    <nav className="flex justify-between px-10 py-5 my-3 rounded-lg bg-zinc-700">
      <Link to={isAuthenticated ? "tasks" : "/"}>
        <h1 className="text-2xl font-bold">Task Manager</h1>
      </Link>
      <ul className="flex gap-x-2">
        {isAuthenticated ? (
          <>
            <li>Welcome {user.username}</li>
            <li>
              <Link
                to="/add-task"
                className="px-4 py-1 bg-indigo-500 rounded-sm"
              >
                Add Task
              </Link>
            </li>
            <li>
              <Link
                to="/"
                onClick={() => {
                  logout();
                }}
              >
                Logout
              </Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login" className="px-4 py-1 bg-indigo-500 rounded-sm">
                Login
              </Link>
            </li>
            <li>
              <Link
                to="/register"
                className="px-4 py-1 bg-indigo-500 rounded-sm"
              >
                Register
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
