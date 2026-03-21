import { useNavigate, useLocation } from "react-router";
import { Home, MessageCircle, Settings, Play } from "lucide-react";

export default function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const userRole = localStorage.getItem("userRole") || "user";

  const isActive = (path: string) => location.pathname === path;

  const homePath = userRole === "avatar" ? "/avatar-home" : "/home";

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50">
      <div 
        className="backdrop-blur-[20px] border-t"
        style={{ 
          background: "rgba(45, 21, 21, 0.8)",
          borderColor: "rgba(255, 255, 255, 0.08)",
          boxShadow: "0 -4px 24px rgba(0, 0, 0, 0.3)"
        }}
      >
        <div className="max-w-md mx-auto px-6 py-3 flex items-center justify-around">
          {/* Home */}
          <button
            onClick={() => navigate(homePath)}
            className="flex flex-col items-center gap-1 transition-all active:scale-95"
          >
            <Home 
              size={22} 
              style={{ 
                color: isActive(homePath) ? "#DC2626" : "#9CA3AF",
                filter: isActive(homePath) ? "drop-shadow(0 0 8px rgba(220, 38, 38, 0.6))" : "none"
              }} 
            />
            <span 
              className="text-xs font-medium"
              style={{ color: isActive(homePath) ? "#DC2626" : "#9CA3AF" }}
            >
              Home
            </span>
          </button>

          {/* Messages */}
          <button
            onClick={() => navigate("/messages")}
            className="flex flex-col items-center gap-1 transition-all active:scale-95"
          >
            <MessageCircle 
              size={22} 
              style={{ 
                color: isActive("/messages") ? "#DC2626" : "#9CA3AF",
                filter: isActive("/messages") ? "drop-shadow(0 0 8px rgba(220, 38, 38, 0.6))" : "none"
              }} 
            />
            <span 
              className="text-xs font-medium"
              style={{ color: isActive("/messages") ? "#DC2626" : "#9CA3AF" }}
            >
              Messages
            </span>
          </button>

          {/* Center Action Button */}
          <button
            onClick={() => navigate(userRole === "avatar" ? "/connect-device" : "/discover")}
            className="flex flex-col items-center -mt-6"
          >
            <div 
              className="w-14 h-14 rounded-full flex items-center justify-center shadow-lg active:scale-95 transition-all"
              style={{ 
                background: "linear-gradient(135deg, #DC2626 0%, #991B1B 100%)",
                boxShadow: "0 4px 20px rgba(220, 38, 38, 0.5)"
              }}
            >
              <Play size={24} className="text-white" fill="white" />
            </div>
          </button>

          {/* Profile */}
          <button
            onClick={() => navigate("/profile")}
            className="flex flex-col items-center gap-1 transition-all active:scale-95"
          >
            <Home 
              size={22} 
              style={{ 
                color: isActive("/profile") ? "#DC2626" : "#9CA3AF",
                filter: isActive("/profile") ? "drop-shadow(0 0 8px rgba(220, 38, 38, 0.6))" : "none"
              }} 
            />
            <span 
              className="text-xs font-medium"
              style={{ color: isActive("/profile") ? "#DC2626" : "#9CA3AF" }}
            >
              Profile
            </span>
          </button>

          {/* Settings */}
          <button
            onClick={() => navigate("/settings")}
            className="flex flex-col items-center gap-1 transition-all active:scale-95"
          >
            <Settings 
              size={22} 
              style={{ 
                color: isActive("/settings") ? "#DC2626" : "#9CA3AF",
                filter: isActive("/settings") ? "drop-shadow(0 0 8px rgba(220, 38, 38, 0.6))" : "none"
              }} 
            />
            <span 
              className="text-xs font-medium"
              style={{ color: isActive("/settings") ? "#DC2626" : "#9CA3AF" }}
            >
              Settings
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

// Named export for convenience
export { BottomNav };