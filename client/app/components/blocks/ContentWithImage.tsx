import type { TLink, TImage } from "../../types";
import { Link } from "react-router";
import { StrapiImage } from "../custom/StrapiImage";
import { Button } from "../ui/button";
import { MarkdownContent } from "../custom/Markdown";
import { cn } from "../../lib/utils";

export interface IContentWithImage {
  __component: "blocks.content-with-image";
  id: number;
  reversed: boolean;
  heading: string;
  content: string;
  link: TLink | undefined;
  image: TImage;
}

const styles = {
  section: "py-16",
  container: "container mx-auto px-4",
  wrapper: "grid grid-cols-1 items-center gap-12 lg:grid-cols-2",
  reversed: "lg:[&>*:first-child]:order-2",
  heading: "mb-6 text-3xl font-bold text-foreground lg:text-4xl",
  content: "prose prose-lg mb-8 text-muted-foreground",
  paragraph: "mb-4",
  image: "rounded-lg shadow-lg",
};

export function ContentWithImage(props: IContentWithImage) {
  const { reversed, heading, content, link, image } = props;
  const isExternal = Boolean(link?.isExternal);
  const buttonVariant = link?.type === "PRIMARY" ? "default" : "outline";
  const alt = image?.alternativeText || heading || "Content image";

  return (
    <section
      aria-labelledby="content-with-image-title"
      className={styles.section}
    >
      <div className={styles.container}>
        <div className={cn(styles.wrapper, reversed && styles.reversed)}>
          <div>
            <h2 id="content-with-image-title" className={styles.heading}>
              {heading}
            </h2>

            <MarkdownContent content={content} />

            {link?.href && link?.label && (
              <Button variant={buttonVariant} size="lg" asChild>
                <Link
                  to={link.href}
                  target={isExternal ? "_blank" : undefined}
                  rel={isExternal ? "noopener noreferrer" : undefined}
                >
                  {link.label}
                </Link>
              </Button>
            )}
          </div>

          <StrapiImage src={image?.url} alt={alt} className={styles.image} />
        </div>
      </div>
    </section>
  );
}
