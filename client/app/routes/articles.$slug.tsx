import type { Route } from "./+types/articles.$slug";
import { ArticleDetail } from "../components/custom/ArticleDetail";
import { getArticleBySlug } from "../lib/api";
import { handleApiError, getStrapiMedia } from "../lib/utils";

export async function loader({ params }: Route.LoaderArgs) {
  const response = await getArticleBySlug(params.slug);
  handleApiError(response, "article");
  const article = response.data?.[0];
  if (!article) throw new Response("Article not found", { status: 404 });
  return { article };
}

export function meta({ loaderData }: Route.MetaArgs) {
  const { article } = loaderData;
  return [
    { title: article.title },
    { name: "description", content: article.description },
    { property: "og:title", content: article.title },
    { property: "og:description", content: article.description },
    ...(article.featuredImage?.url
      ? [
          {
            property: "og:image",
            content: getStrapiMedia(article.featuredImage.url) || "",
          },
        ]
      : []),
  ];
}

export default function ArticleDetailPage({
  loaderData,
}: Route.ComponentProps) {
  const { article } = loaderData;
  return <ArticleDetail {...article} />;
}
