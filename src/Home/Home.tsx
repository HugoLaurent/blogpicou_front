import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface Post {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  photos?: { url?: string; is_cover?: boolean }[];
}

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [startingDate, setStartingDate] = useState<string | null>(null);
  const [countdown, setCountdown] = useState<string>("");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("/api");
        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "Erreur lors du chargement des posts"
          );
        }

        setPosts(data);
        if (data.starting_date) {
          setStartingDate(data.starting_date);
        }
      } catch (err: unknown) {
        const errorMessage =
          typeof err === "object" && err !== null && "message" in err
            ? (err as { message?: string }).message
            : undefined;
        setError(errorMessage || "Erreur inconnue");
      }
    };

    fetchPosts();
  }, []);

  useEffect(() => {
    if (!startingDate) return;

    const target = new Date(startingDate).getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const diff = target - now;

      if (diff <= 0) {
        setCountdown("C'est parti !");
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setCountdown(`${days}j ${hours}h ${minutes}m ${seconds}s`);
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [startingDate]);

  const getCoverUrl = (post: Post): string => {
    const photo = post.photos?.find((p) => p.is_cover) || post.photos?.[0];
    return `https://blog-api.lespicousenvoyage.fr/${photo?.url}`;
  };

  return (
    <div className="bg-white py-16 px-6 lg:px-8">
      <div className="mx-auto max-w-7xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Carnet de voyage
        </h2>
        <p className="mt-2 text-lg leading-8 text-gray-600">
          Suivez nos aventures étape par étape.
        </p>
        {startingDate && (
          <div className="mt-6 flex flex-col items-center">
            <span className="text-xl font-semibold text-blue-600">
              Départ dans :
            </span>
            <span className="mt-2 px-4 py-2 rounded-lg bg-blue-100 text-blue-800 text-2xl font-mono tracking-widest shadow">
              {countdown}
            </span>
          </div>
        )}
      </div>

      {error && (
        <div className="mt-8 text-center text-red-500">Erreur : {error}</div>
      )}

      <div className="mt-16 mx-auto max-w-7xl grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {posts.length === 0 &&
          !error &&
          posts.map((post: Post) => (
            <Link
              key={post.id}
              to={`/article/${post.id}`}
              className="transition-transform duration-200 hover:scale-105 block"
            >
              <article className="h-full flex flex-col">
                <div className="overflow-hidden rounded-xl">
                  <img
                    src={getCoverUrl(post)}
                    alt={post.title}
                    className="h-48 w-full object-cover"
                  />
                </div>
                <div className="mt-4 text-sm text-gray-500 flex items-center gap-2">
                  <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                </div>
                <h3 className="mt-2 text-lg font-semibold leading-6 text-gray-900 hover:text-blue-600">
                  {post.title}
                </h3>
                <p className="mt-1 text-sm text-gray-600 line-clamp-3">
                  {post.content?.slice(0, 200)}...
                </p>
              </article>
            </Link>
          ))}
      </div>
    </div>
  );
}
