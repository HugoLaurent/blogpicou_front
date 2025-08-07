import { useParams, Link } from "react-router-dom";

// Types pour les articles
interface Post {
  id: number;
  title: string;
  description: string;
  category: string;
  date: string;
  imageUrl: string;
  content?: string;
}

// Données des articles (à terme, cela pourrait venir d'une API)
const posts: Post[] = [
  {
    id: 1,
    title: "Boost your conversion rate",
    description:
      "Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde.",
    category: "Marketing",
    date: "Mar 16, 2020",
    imageUrl:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80",
    content: `
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
      
      <h2>Les clés du succès</h2>
      <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
      
      <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
      
      <h2>Mise en pratique</h2>
      <p>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.</p>
    `,
  },
  {
    id: 2,
    title: "How to use search engine optimization to drive sales",
    description:
      "Optio cum necessitatibus dolor voluptatum provident commodi et. Qui aperiam fugiat nemo cumque.",
    category: "Sales",
    date: "Mar 10, 2020",
    imageUrl:
      "https://images.unsplash.com/photo-1552689486-f6773047b7e5?auto=format&fit=crop&w=800&q=80",
    content: `
      <p>Le SEO est un élément crucial pour augmenter vos ventes en ligne. Dans cet article, nous allons explorer les meilleures pratiques pour optimiser votre site web.</p>
      
      <h2>Les fondamentaux du SEO</h2>
      <p>Commençons par les bases : les mots-clés, le contenu de qualité et l'optimisation technique.</p>
      
      <h2>Stratégies avancées</h2>
      <p>Une fois les bases maîtrisées, vous pouvez implémenter des stratégies plus avancées comme le link building et l'optimisation pour la recherche vocale.</p>
    `,
  },
  {
    id: 3,
    title: "Improve your customer experience",
    description:
      "Cupiditate maiores ullam eveniet adipisci in doloribus nulla minus. Voluptas iusto libero adipisci rem et corporis.",
    category: "Business",
    date: "Feb 12, 2020",
    imageUrl:
      "https://images.unsplash.com/photo-1603791440384-56cd371ee9a7?auto=format&fit=crop&w=800&q=80",
    content: `
      <p>L'expérience client est au cœur de toute entreprise prospère. Découvrez comment améliorer chaque point de contact avec vos clients.</p>
      
      <h2>Comprendre vos clients</h2>
      <p>La première étape consiste à vraiment comprendre qui sont vos clients et ce qu'ils attendent de votre service.</p>
      
      <h2>Optimiser les points de contact</h2>
      <p>Chaque interaction compte, du premier contact jusqu'au service après-vente.</p>
    `,
  },
  // Vous pouvez ajouter le contenu complet pour les autres articles
];

export default function Article() {
  const { id } = useParams<{ id: string }>();
  const post = posts.find((p) => p.id === parseInt(id || "0"));

  if (!post) {
    return (
      <div className="bg-white py-16 px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-3xl font-bold text-gray-900">
            Article non trouvé
          </h1>
          <p className="mt-4 text-gray-600">
            L'article que vous recherchez n'existe pas.
          </p>
          <Link
            to="/"
            className="mt-6 inline-block text-blue-600 hover:text-blue-800 underline"
          >
            Retour à l'accueil
          </Link>
        </div>
      </div>
    );
  }

  return (
    <article className="bg-white py-16 px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        {/* Bouton retour */}
        <Link
          to="/"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-8"
        >
          <svg
            className="w-4 h-4 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Retour aux articles
        </Link>

        {/* En-tête de l'article */}
        <header className="mb-8">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
            <span>{post.date}</span>
            <span className="inline-block px-2 py-0.5 rounded-full bg-gray-100 text-gray-600 text-xs font-medium">
              {post.category}
            </span>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {post.title}
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            {post.description}
          </p>
        </header>

        {/* Image de l'article */}
        <div className="mb-8 overflow-hidden rounded-xl">
          <img
            src={post.imageUrl}
            alt={post.title}
            className="w-full h-64 md:h-96 object-cover"
          />
        </div>

        {/* Contenu de l'article */}
        <div
          className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content || "" }}
        />
      </div>
    </article>
  );
}
