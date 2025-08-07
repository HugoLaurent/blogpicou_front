export default function LoginPage() {
  return (
    <div className="p-8 text-center">
      <h1 className="text-3xl mb-4">Connexion</h1>
      <a
        href="http://localhost:3000/auth/github"
        className="bg-black text-white px-4 py-2 rounded hover:opacity-80"
      >
        Se connecter avec GitHub
      </a>
    </div>
  );
}
