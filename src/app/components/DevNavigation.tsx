import { useNavigate, useLocation } from "react-router";
import { motion } from "motion/react";
import { X } from "lucide-react";
import { useState } from "react";

export default function DevNavigation() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const routes = [
    { path: "/", name: "Onboarding" },
    { path: "/login", name: "Login" },
    { path: "/role-selection", name: "Role Selection" },
    { path: "/camera-setup", name: "Camera Setup" },
    { path: "/home", name: "Home" },
    { path: "/discover", name: "Discovery Feed" },
    { path: "/map", name: "Live Map" },
    { path: "/search", name: "Search" },
    { path: "/favorites", name: "Favorites" },
    { path: "/wallet", name: "Wallet" },
    { path: "/booking/1", name: "Booking" },
    { path: "/session/1", name: "Live Session" },
    { path: "/operator/1", name: "Operator Profile" },
    { path: "/summary/1", name: "Session Summary" },
    { path: "/profile", name: "User Profile" },
    { path: "/achievements", name: "Achievements" },
    { path: "/notifications", name: "Notifications" },
    { path: "/payment-methods", name: "Payment Methods" },
    { path: "/session-history", name: "Session History" },
    { path: "/operator-dashboard", name: "Operator Dashboard" },
    { path: "/enterprise", name: "Enterprise Dashboard" },
  ];

  return (
    <>
      {/* Toggle Button */}
      

      {/* Navigation Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          className="fixed bottom-24 left-6 z-50 w-80 max-h-[70vh] overflow-y-auto bg-card border border-border rounded-2xl shadow-xl"
        >
          <div className="p-4 border-b border-border">
            <h3 className="font-semibold text-foreground">Navigation</h3>
            <p className="text-xs text-muted-foreground mt-1">
              Current: {location.pathname}
            </p>
          </div>
          <div className="p-2 space-y-1">
            {routes.map((route) => (
              <button
                key={route.path}
                onClick={() => {
                  navigate(route.path);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-3 py-2 rounded-lg transition-all ${
                  location.pathname === route.path
                    ? "bg-primary/10 text-primary"
                    : "hover:bg-secondary text-foreground"
                }`}
              >
                {route.name}
              </button>
            ))}
          </div>
        </motion.div>
      )}
    </>
  );
}