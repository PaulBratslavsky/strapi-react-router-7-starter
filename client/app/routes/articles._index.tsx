import type { Route } from "./+types/articles._index";
import { Link } from "react-router";
import { StrapiImage } from "../components/custom/StrapiImage";
import { getArticles } from "../lib/api";
import { handleApiError } from "../lib/utils";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "../components/ui/card";
import { Button } from "../components/ui/button";

export async function loader({}: Route.LoaderArgs) {
  const response = await getArticles();
  handleApiError(response, "articles");
  return response;
}

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Articles" },
    { name: "description", content: "Read our latest articles and insights." },
  ];
}

const styles = {
  root: "min-h-screen bg-gray-50",
  container: "container mx-auto px-4 py-16",
  header: "text-center mb-12",
  title: "text-4xl font-bold text-gray-900 mb-4",
  subtitle: "text-xl text-gray-600 max-w-2xl mx-auto",

  emptyWrap: "text-center py-12",
  emptyText: "text-gray-600 text-lg",

  grid: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",

  card: "pt-0 pb-8 group hover:shadow-lg transition-shadow overflow-hidden",
  imageWrapper: "overflow-hidden",
  image: "group-hover:scale-105 transition-transform duration-300",

  cardHeader: "pb-3",
  metaRow: "flex items-center gap-2 text-sm text-muted-foreground mb-2",
  badge: "text-xs",
  cardTitle:
    "text-xl font-semibold group-hover:text-primary transition-colors line-clamp-2",

  cardContent: "pt-0",
  description: "text-muted-foreground line-clamp-3 leading-relaxed",

  cardFooter: "pt-0",
  readMoreBtn: "p-0 h-auto font-medium group/button",
  readMoreIcon:
    "w-4 h-4 ml-2 group-hover/button:translate-x-1 transition-transform",
};

export default function ArticlesIndex({ loaderData }: Route.ComponentProps) {
  const response = loaderData;
  const articles = response.data || [];

  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Articles</h1>
          <p className={styles.subtitle}>
            Discover insights, tutorials, and stories from our team
          </p>
        </div>

        {articles.length === 0 ? (
          <div className={styles.emptyWrap}>
            <p className={styles.emptyText}>No articles found.</p>
          </div>
        ) : (
          <div className={styles.grid}>
            {articles.map((article) => (
              <Card key={article.documentId} className={styles.card}>
                {article.featuredImage?.url && (
                  <div className={styles.imageWrapper}>
                    <StrapiImage
                      src={article.featuredImage.url}
                      alt={
                        article.featuredImage.alternativeText || article.title
                      }
                      aspectRatio="16:9"
                      className={styles.image}
                    />
                  </div>
                )}

                <CardHeader className={styles.cardHeader}>
                  <div className={styles.metaRow}>
                    <time dateTime={article.publishedAt}>
                      {article.publishedAt 
                        ? new Date(article.publishedAt).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            }
                          )
                        : "No date"}
                    </time>
                  </div>

                  <h2 className={styles.cardTitle}>{article.title}</h2>
                </CardHeader>

                <CardContent className={styles.cardContent}>
                  <p className={styles.description}>{article.description}</p>
                </CardContent>

                <CardFooter className={styles.cardFooter}>
                  <Button
                    variant="ghost"
                    className={styles.readMoreBtn}
                    asChild
                  >
                    <Link to={`/articles/${article.slug}`}>
                      Read more
                      <svg
                        className={styles.readMoreIcon}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
