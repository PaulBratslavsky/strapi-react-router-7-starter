import { Link } from "react-router";

export function Navigation() {
  return (
    <nav className="bg-background shadow-sm border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-xl font-bold text-foreground hover:text-primary transition-colors">
            Your Site
          </Link>
          
          <div className="flex items-center space-x-8">
            <Link
              to="/"
              className="text-muted-foreground hover:text-primary transition-colors font-medium"
            >
              Home
            </Link>
            <Link
              to="/articles"
              className="text-muted-foreground hover:text-primary transition-colors font-medium"
            >
              Articles
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}