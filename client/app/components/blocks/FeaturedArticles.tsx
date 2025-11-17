import type { IArticleDetail } from "../custom/ArticleDetail";
import { Link } from "react-router";

import { Card } from "~/components/ui/card";
import { Button } from "~/components/ui/button";

export interface IFeaturedArticles {
  __component: "blocks.featured-articles";
  id: number;
  articles: IArticleDetail[];
}

const styles = {
  section: "py-16 bg-background",
  sectionEmpty: "py-16",
  container: "container mx-auto px-4",
  containerEmpty: "container mx-auto px-4 text-center",
  heading: "text-3xl font-bold text-center mb-12 text-gray-900",
  headingEmpty: "text-3xl font-bold mb-6 text-gray-900",
  subtextEmpty: "text-gray-600",
  grid: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8",
  card: "bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow",
  image: "w-full h-48 object-cover",
  content: "p-6",
  title: "text-xl font-semibold mb-3 text-gray-900",
  description: "text-gray-600 mb-4 line-clamp-3",
  link: "text-blue-600 hover:text-blue-700 font-medium",
};

export function FeaturedArticles(props: IFeaturedArticles) {
  const { articles } = props;
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.heading}>Featured Articles</h2>
        <div className={styles.grid}>
          {articles.map((article, index) => (
            <Card key={article.documentId || index} className={styles.card}>
              <div className={styles.content}>
                <h3 className={styles.title}>{article.title}</h3>
                <p className={styles.description}>{article.description}</p>
                <Button asChild>
                  <Link to={`/articles/${article.slug}`}>Read more → </Link>
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
