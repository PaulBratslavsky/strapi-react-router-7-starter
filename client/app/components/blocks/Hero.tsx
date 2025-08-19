import type { TImage, TLink } from "../../types";
import { StrapiImage } from "../custom/StrapiImage";
import { Button } from "../ui/button";
import { Link } from "react-router";

export interface IHero {
  __component: "blocks.hero";
  id: number;
  heading: string;
  text: string;
  links: TLink[];
  image: TImage;
}

const styles = {
  section:
    "bg-gradient-to-r from-primary to-primary/80 text-primary-foreground py-20",
  container: "container mx-auto px-4",
  grid: "grid grid-cols-1 lg:grid-cols-2 gap-12 items-center",
  heading: "text-4xl lg:text-6xl font-bold mb-6",
  text: "text-xl mb-8 text-primary-foreground/80",
  linksFlex: "flex flex-col sm:flex-row gap-4",
  image: "rounded-lg shadow-2xl",
};

export function Hero(props: IHero) {
  const { heading, text, links, image } = props;

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.grid}>
          <div>
            <h1 className={styles.heading}>{heading}</h1>
            <p className={styles.text}>{text}</p>
            <div className={styles.linksFlex}>
              {links.map((link) => (
                <Button key={link.id} size="lg" asChild>
                  <Link
                    to={link.href}
                    target={link.isExternal ? "_blank" : undefined}
                    rel={link.isExternal ? "noopener noreferrer" : undefined}
                  >
                    {link.label}
                  </Link>
                </Button>
              ))}
            </div>
          </div>
          <div>
            <StrapiImage
              src={image.url}
              alt={image.alternativeText || heading}
              className={styles.image}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
