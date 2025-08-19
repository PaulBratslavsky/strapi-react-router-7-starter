export type TImage = {
  id: number;
  documentId: string;
  alternativeText: string | null;
  url: string;
};

export type TLink = {
  id: number;
  href: string;
  label: string;
  isExternal: boolean;
  isButtonLink: boolean;
  type: "PRIMARY" | "SECONDARY";
};

export type TCard = {
  id: number;
  heading: string;
  text: string;
};

export type TAuthor = {
  fullName: string;
  bio?: string;
  image?: TImage;
};

