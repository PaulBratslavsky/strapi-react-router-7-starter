import type { TAuthor, TImage } from "../../types"
import { Link } from "react-router";
import { MarkdownContent } from "./Markdown";
import { StrapiImage } from "./StrapiImage";

export interface IArticleDetail {
  documentId: string;
  createdAt: string;
  updatedAt: string;
  title?: string;
  description?: string;
  publishedAt?: string;
  slug?: string;
  author?: TAuthor;
  featuredImage?: TImage;
  content?: string;
}

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../ui/breadcrumb";

const styles = {
  root: "min-h-screen bg-background",
  headerWrapper: "bg-card",
  headerContainer: "container mx-auto px-4 py-8",
  headerInner: "max-w-4xl mx-auto",
  breadcrumb: "mb-8",
  title: "text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight",
  description: "text-xl text-gray-600 leading-relaxed mb-8",
  featuredImageWrapper: "mb-8",
  featuredImage: "rounded-lg",

  bodyContainer: "container mx-auto px-4 py-4",
  bodyInner: "max-w-4xl mx-auto",
  contentCard: "bg-white rounded-lg shadow-sm p-8 lg:p-12",

  authorWrapper: "mt-6 flex items-start space-x-6",
  authorImageWrapper: "w-16 h-16 flex-shrink-0",
  authorImage: "rounded-full",
  authorName: "text-xl font-semibold text-gray-900 mb-2",
  authorBio: "text-gray-600 leading-relaxed",
};

export function ArticleDetail(props: IArticleDetail) {
  const { title, description, content, featuredImage, author } = props;

  return (
    <div className={styles.root}>
      <div className={styles.headerWrapper}>
        <div className={styles.headerContainer}>
          <div className={styles.headerInner}>
            {/* Breadcrumb */}
            <Breadcrumb className={styles.breadcrumb}>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link to="/">Home</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link to="/articles">Articles</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>{title}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>

            <h1 className={styles.title}>{title}</h1>
            <p className={styles.description}>{description}</p>

            {featuredImage?.url && (
              <div className={styles.featuredImageWrapper}>
                <StrapiImage
                  src={featuredImage.url}
                  alt={
                    featuredImage.alternativeText ||
                    title ||
                    "Article image"
                  }
                  aspectRatio="16:9"
                  className={styles.featuredImage}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      <div className={styles.bodyContainer}>
        <div className={styles.bodyInner}>
          <div className={styles.contentCard}>
            <MarkdownContent content={content} />

            {author?.fullName && (
              <div className={styles.authorWrapper}>
                {author.image?.url && (
                  <div className={styles.authorImageWrapper}>
                    <StrapiImage
                      src={author.image.url}
                      alt={author.image.alternativeText || author.fullName}
                      aspectRatio="square"
                      className={styles.authorImage}
                      width={64}
                      height={64}
                    />
                  </div>
                )}
                <div>
                  <h3 className={styles.authorName}>About {author.fullName}</h3>
                  {author.bio && (
                    <p className={styles.authorBio}>{author.bio}</p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
