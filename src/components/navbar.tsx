import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="flex gap-4 p-4 bg-blue-600 text-white flex-wrap">
      
      <Link to="/profile">Профиль</Link>
          <Link to="/tests">Последние тесты</Link>
          <Link to="/results">Результаты</Link>
          <Link to="/balance">Баланс</Link>
          <Link to="/achievements">Достижения</Link>
    </nav>
  );
}
