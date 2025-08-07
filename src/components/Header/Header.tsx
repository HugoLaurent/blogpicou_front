import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="flex justify-between p-4 bg-gray-100 border-b border-gray-300">
      <Link
        to="/"
        className="m-0 text-3xl font-bold text-gray-900 hover:text-blue-600 no-underline"
      >
        Mon Blog
      </Link>
      <nav>
        <ul className="flex list-none p-0 mt-4 gap-6">
          <li>
            <Link to="/" className="hover:underline">
              Accueil
            </Link>
          </li>
          <li>
            <Link to="/" className="hover:underline">
              Articles
            </Link>
          </li>
          <li>
            <Link to="/contact" className="hover:underline">
              Contact
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
