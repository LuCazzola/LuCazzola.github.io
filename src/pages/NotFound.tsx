import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-center">
        <h1 className="mb-4 font-serif text-5xl text-primary">404</h1>
        <p className="mb-4 text-xl text-muted-foreground">Oops! Page not found</p>
        <a
          href={import.meta.env.BASE_URL}
          onClick={(e) => {
            e.preventDefault();
            // Navigate to the SPA root — react-router will resolve this against the
            // configured basename, so this goes to the landing page rather than
            // the raw '/' filesystem path.
            navigate("/", { replace: true });
          }}
          className="font-semibold text-primary underline hover:text-primary-hover"
        >
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
