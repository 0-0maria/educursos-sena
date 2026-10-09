import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import Login from "../Auth/Login";

function Header() {
  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white shadow-sm">
      <div className="logo">
        <Link to="/">
          <h2 className="text-xl font-bold text-sky-600">EduCursos</h2>
        </Link>
      </div>
      <Navbar />
      <div className="login-container">
        <Login />
      </div>
    </header>
  );
}

export default Header;