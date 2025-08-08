import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

interface Photo {
  url?: string;
  isCover?: boolean;
}

interface Post {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  photos?: Photo[];
}

interface VoyageDetail {
  starting_date: null;
  id: number;
  nom: string;
  dateStart?: string | null;
  posts: Post[];
}

export default function Articles() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [startingDate, setStartingDate] = useState<string | null>(null);
  const [countdown, setCountdown] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const fetchVoyage = async () => {
      try {
        const response = await fetch(`/api/voyages/${id}`);
        const data: VoyageDetail = await response.json();

        if (!response.ok) {
          throw new Error("Erreur lors du chargement du voyage");
        }

        setPosts(data.posts || []);
        setStartingDate(data.starting_date || null);
      } catch (err) {
        setError("Erreur de chargement des données.");
        console.error(err);
      }
    };

    fetchVoyage();
  }, [id]);

  useEffect(() => {
    if (!startingDate) return;

    const target = new Date(startingDate).getTime();

    const updateCountdown = () => {
      const now = Date.now();
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
    const photo = post.photos?.find((p) => p.isCover) || post.photos?.[0];
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

      {error && <div className="mt-8 text-center text-red-500">{error}</div>}

      <div className="mt-16 mx-auto max-w-7xl">
        {posts.length > 0 && (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
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
                    <span>
                      {new Date(post.createdAt).toLocaleDateString("fr-FR")}
                    </span>
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
        )}
      </div>
    </div>
  );
}
