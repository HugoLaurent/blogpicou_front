import { ArrowDown, Menu } from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import image from "./../../assets/image.png";

export default function Header() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  type Voyage = { id: number; nom: string };
  const [voyages, setVoyages] = useState<Voyage[]>([]);

  useEffect(() => {
    const fetchVoyages = async () => {
      try {
        const response = await fetch("/api/voyages");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setVoyages(data);
      } catch (error) {
        console.error("Failed to fetch voyages:", error);
        return [];
      }
    };
    fetchVoyages();
  }, []);

  return (
    <header
      className="relative flex justify-between p-4 border-b border-gray-300 overflow-visible"
      style={{
        backgroundImage: `url(${image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "180px",
      }}
    >
      <div className="absolute inset-0 bg-black/40 pointer-events-none" />
      <div className="relative flex w-full justify-between items-center">
        <Link
          to="/"
          className="m-0 text-4xl font-extrabold text-white drop-shadow-lg hover:text-blue-200 no-underline"
        >
          Les Picous En Voyage
        </Link>
        {/* Desktop nav */}
        <nav className="hidden md:block">
          <ul className="flex list-none p-0 gap-8">
            <li>
              <Link
                to="/"
                className="text-white font-medium hover:underline hover:text-blue-200"
              >
                Accueil
              </Link>
            </li>
            <li className="relative">
              <button
                className="text-white font-medium hover:underline bg-transparent border-none cursor-pointer flex items-center gap-1"
                onClick={() => setDropdownOpen((open) => !open)}
                onBlur={() => setDropdownOpen(false)}
              >
                Nos voyages
                <ArrowDown />
              </button>
              {dropdownOpen && (
                <ul className="absolute left-0 mt-2 bg-white border rounded shadow-lg z-10 min-w-[150px] overflow-auto max-h-60">
                  {voyages.map((voyage) => (
                    <li key={voyage.id}>
                      <Link
                        to={`/voyages/${voyage.id}`}
                        className="block px-4 py-2 hover:bg-blue-50"
                        onClick={() => setDropdownOpen(false)}
                      >
                        {voyage.nom}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          </ul>
        </nav>
        {/* Mobile nav */}
        <div className="md:hidden">
          <button
            className="text-white bg-transparent border-none cursor-pointer"
            onClick={() => setMobileMenuOpen((open) => !open)}
            aria-label="Ouvrir le menu"
          >
            <Menu size={32} />
          </button>
          {mobileMenuOpen && (
            <div className="absolute top-full right-4 left-4 bg-white rounded shadow-lg z-20 mt-2">
              <ul className="flex flex-col list-none p-4 gap-4">
                <li>
                  <Link
                    to="/"
                    className="text-black font-medium hover:underline hover:text-blue-600"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Accueil
                  </Link>
                </li>
                <li>
                  <details>
                    <summary className="cursor-pointer flex items-center gap-1 font-medium text-black">
                      Nos voyages <ArrowDown size={18} />
                    </summary>
                    <ul className="pl-4 mt-2">
                      {voyages.map((voyage) => (
                        <li key={voyage.id}>
                          <Link
                            to={`/voyages/${voyage.id}`}
                            className="block px-4 py-2 hover:bg-blue-50"
                            onClick={() => setDropdownOpen(false)}
                          >
                            {voyage.nom}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </details>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
