import { Hero, type IHero } from "./Hero";
import { SectionHeading, type ISectionHeading } from "./SectionHeading";
import { CardGrid, type ICardGrid } from "./CardGrid";
import { ContentWithImage, type IContentWithImage } from "./ContentWithImage";
import { MarkdownText, type IMarkdownText } from "./MarkdownText";
import { PersonCard, type IPersonCard } from "./PersonCard";
import { FeaturedArticles, type IFeaturedArticles } from "./FeaturedArticles";

export type Block =
  | IHero
  | ISectionHeading
  | ICardGrid
  | IContentWithImage
  | IMarkdownText
  | IPersonCard
  | IFeaturedArticles;

interface BlockRendererProps {
  blocks: Block[];
}

export function BlockRenderer({ blocks }: BlockRendererProps) {
  const renderBlock = (block: Block) => {
    switch (block.__component) {
      case "blocks.hero":
        return <Hero key={block.id} {...block} />;
      case "blocks.section-heading":
        return <SectionHeading key={block.id} {...block} />;
      case "blocks.card-grid":
        return <CardGrid key={block.id} {...block} />;
      case "blocks.content-with-image":
        return <ContentWithImage key={block.id} {...block} />;
      case "blocks.markdown":
        return <MarkdownText key={block.id} {...block} />;
      case "blocks.person-card":
        return <PersonCard key={block.id} {...block} />;
      case "blocks.featured-articles":
        return <FeaturedArticles key={block.id} {...block} />;
      default:
        return null;
    }
  };

  return <div>{blocks.map((block) => renderBlock(block))}</div>;
}
