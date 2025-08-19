import type { Route } from "./+types/$";
import { Link } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "404 - Page Not Found" },
    { name: "description", content: "The page you're looking for doesn't exist." },
  ];
}

const styles = {
  root: "min-h-screen flex items-center justify-center bg-gray-50",
  container: "w-full max-w-md text-center",
  headerWrap: "mb-8",
  code: "text-6xl font-bold text-gray-900 mb-4",
  title: "text-2xl font-semibold text-gray-700 mb-2",
  message: "text-gray-600 mb-8",
  actions: "space-y-4",
  homeLink:
    "block w-full rounded-lg px-6 py-3 bg-blue-600 text-white font-semibold transition-colors hover:bg-blue-700",
  backButton:
    "w-full rounded-lg px-6 py-3 border border-gray-300 text-gray-700 font-semibold transition-colors hover:bg-gray-50",
};

export default function NotFound() {
  const handleBack = () => window.history.back();

  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <div className={styles.headerWrap}>
          <h1 className={styles.code}>404</h1>
          <h2 className={styles.title}>Page Not Found</h2>
          <p className={styles.message}>
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>

        <div className={styles.actions}>
          <Link to="/" className={styles.homeLink} aria-label="Go to homepage">
            Go Home
          </Link>

          <button
            type="button"
            onClick={handleBack}
            className={styles.backButton}
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
}
