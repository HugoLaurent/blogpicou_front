import { useState } from "react";
import { Link } from "react-router-dom";

export default function Header() {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Exemple de voyages
  const voyages = [
    { name: "Paris", path: "/voyages/paris" },
    { name: "Tokyo", path: "/voyages/tokyo" },
    { name: "New York", path: "/voyages/new-york" },
  ];

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
          <li className="relative">
            <button
              className="hover:underline bg-transparent border-none cursor-pointer"
              onClick={() => setDropdownOpen((open) => !open)}
              onBlur={() => setDropdownOpen(false)}
            >
              Nos voyages
            </button>
            {dropdownOpen && (
              <ul className="absolute left-0 mt-2 bg-white border rounded shadow-lg z-10 min-w-[150px]">
                {voyages.map((voyage) => (
                  <li key={voyage.path}>
                    <Link
                      to={voyage.path}
                      className="block px-4 py-2 hover:bg-gray-100"
                      onClick={() => setDropdownOpen(false)}
                    >
                      {voyage.name}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
}
