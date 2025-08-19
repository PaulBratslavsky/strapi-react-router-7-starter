import type { Route } from "./+types/home";
import { BlockRenderer } from "../components/blocks";
import { getLandingPage } from "../lib/api";
import { handleApiError } from "../lib/utils";

export async function loader({}: Route.LoaderArgs) {
  const response = await getLandingPage();
  handleApiError(response, "landing page");
  if (!response?.data)
    throw new Response("Landing page not found", { status: 404 });
  return response.data;
}

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Landing Page" },
    { name: "description", content: "This is the main website page." },
  ];
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const response = loaderData;

  return (
    <main>
      <BlockRenderer blocks={response.blocks} />
    </main>
  );
}
