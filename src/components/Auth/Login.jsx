import { useState, useEffect } from "react";

function Login() {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const savedUser = sessionStorage.getItem("user");
    if (savedUser) {
      setUser(savedUser);
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (!username.trim()) return;
    sessionStorage.setItem("user", username);
    setUser(username);
    setUsername("");
  };

  const handleLogout = () => {
    sessionStorage.removeItem("user");
    setUser(null);
  };

  if (user) {
    return (
      <div className="flex items-center gap-3">
        <span className="text-sm font-medium text-gray-700">Hola, {user}</span>
        <button
          onClick={handleLogout}
          className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
        >
          Cerrar Sesión
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleLogin} className="flex items-center gap-2">
      <input
        type="text"
        placeholder="Nombre de usuario"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="px-3 py-1 text-sm border rounded focus:outline-none focus:ring-2 focus:ring-sky-500"
      />
      <button
        type="submit"
        className="px-3 py-1 text-sm bg-sky-600 text-white rounded hover:bg-sky-700"
      >
        Ingresar
      </button>
    </form>
  );
}

export default Login;