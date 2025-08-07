export default function Footer() {
  return (
    <footer className="p-4 bg-gray-100 border-t border-gray-300 text-center mt-8">
      <p className="m-0 text-base">
        © {new Date().getFullYear()} Mon Blog. Tous droits réservés.
      </p>
      <nav>
        <ul className="flex justify-center list-none p-0 mt-4 gap-6">
          <li>
            <a href="#mentions-legales" className="hover:underline">
              Mentions légales
            </a>
          </li>
          <li>
            <a href="#politique-confidentialite" className="hover:underline">
              Politique de confidentialité
            </a>
          </li>
          <li>
            <a href="#contact" className="hover:underline">
              Contact
            </a>
          </li>
        </ul>
      </nav>
    </footer>
  );
}
