import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { User, Video, Eye, Plane, Calendar, GraduationCap, Home, Play } from "lucide-react";

export default function RoleSelection() {
  const navigate = useNavigate();

  const handleUserSelect = () => {
    navigate("/signup/user");
  };

  const handleAvatarSelect = () => {
    navigate("/signup/avatar");
  };

  const stats = [
    { value: "12K+", label: "Users" },
    { value: "98K+", label: "Sessions" },
    { value: "150+", label: "Countries" },
  ];

  const categories = [
    { icon: Plane, label: "Travel", color: "#DC2626" },
    { icon: Calendar, label: "Events", color: "#7C3AED" },
    { icon: GraduationCap, label: "Learning", color: "#2563EB" },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-12 relative overflow-hidden">
      {/* Animated background circles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -top-1/4 -left-1/4 w-96 h-96 bg-red-600 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.1, 0.15, 0.1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -bottom-1/4 -right-1/4 w-96 h-96 bg-red-900 rounded-full blur-3xl"
        />
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Logo & Branding */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          {/* Eye Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="mx-auto mb-6 w-20 h-20 rounded-2xl flex items-center justify-center"
            style={{
              background: "linear-gradient(135deg, #DC2626 0%, #991B1B 100%)",
              boxShadow: "0 10px 40px rgba(220, 38, 38, 0.4)"
            }}
          >
            <Eye className="text-white" size={40} />
          </motion.div>

          {/* Title */}
          <h1 className="text-4xl font-bold mb-2 text-white">CoTask</h1>
          <p className="text-sm" style={{ color: "#D1D5DB" }}>
            Experience the world through others
          </p>
        </motion.div>

        {/* Main Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-3 mb-8"
        >
          {/* Join as User */}
          <button
            onClick={handleUserSelect}
            className="w-full py-4 rounded-2xl flex items-center justify-center gap-3 font-semibold text-white transition-all active:scale-95"
            style={{
              background: "linear-gradient(135deg, #DC2626 0%, #991B1B 100%)",
              boxShadow: "0 8px 24px rgba(220, 38, 38, 0.4)"
            }}
          >
            <User size={20} />
            Join as User
          </button>

          {/* Become an Avatar */}
          <button
            onClick={handleAvatarSelect}
            className="w-full py-4 rounded-2xl flex items-center justify-center gap-3 font-semibold text-white border transition-all active:scale-95"
            style={{
              background: "rgba(45, 21, 21, 0.6)",
              borderColor: "rgba(255, 255, 255, 0.1)",
              backdropFilter: "blur(20px)"
            }}
          >
            <Video size={20} />
            Become an Avatar
          </button>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="grid grid-cols-3 gap-4 mb-8"
        >
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <p className="text-2xl font-bold text-white">{stat.value}</p>
              <p className="text-xs" style={{ color: "#9CA3AF" }}>{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}