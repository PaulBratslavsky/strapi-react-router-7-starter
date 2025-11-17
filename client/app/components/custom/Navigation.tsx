import { Link } from "react-router";

export function Navigation() {
  return (
    <div className="bg-white p-6 flex justify-center items-center">
      <nav className="w-full max-w-7xl bg-background shadow-shadow border-2 border-border rounded-lg px-4">
          <div className="flex items-center justify-between h-16">
            <Link
              to="/"
              className="text-xl font-base text-foreground hover:text-main transition-colors"
            >
              Your Site
            </Link>

            <div className="flex items-center space-x-8">
              <Link
                to="/"
                className="text-foreground hover:text-main transition-colors font-base hover:translate-x-boxShadowX hover:translate-y-boxShadowY"
              >
                Home
              </Link>
              <Link
                to="/articles"
                className="text-foreground hover:text-main transition-colors font-base hover:translate-x-boxShadowX hover:translate-y-boxShadowY"
              >
                Articles
              </Link>
            </div>
          </div>
      </nav>
    </div>
  );
}
