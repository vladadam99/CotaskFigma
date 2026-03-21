import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { Home } from "lucide-react";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 max-w-md mx-auto text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        <h1 className="text-6xl font-semibold text-primary">404</h1>
        <div>
          <h2 className="text-2xl font-semibold mb-2">Page Not Found</h2>
          <p className="text-muted-foreground">
            The page you're looking for doesn't exist.
          </p>
        </div>
        <button
          onClick={() => navigate("/home")}
          className="bg-primary text-primary-foreground px-6 py-3 rounded-2xl font-medium flex items-center gap-2 mx-auto hover:bg-primary/90 transition-all active:scale-95"
        >
          <Home className="w-5 h-5" />
          Go Home
        </button>
      </motion.div>
    </div>
  );
}
