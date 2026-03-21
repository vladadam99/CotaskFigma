import { useNavigate } from "react-router";
import { Users, Clock, TrendingUp, Star, ChevronRight } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export default function EnterpriseHomeScreen() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen px-6 py-6 pb-24">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-[28px] font-bold mb-1 text-white">CoTask Beta</h2>
        <p className="text-[13px]" style={{ color: "#B8C1D9" }}>Enterprise Dashboard</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div 
          className="rounded-2xl p-5 border backdrop-blur-[18px]"
          style={{ 
            background: "rgba(20, 25, 35, 0.65)",
            borderColor: "rgba(255, 255, 255, 0.06)",
            boxShadow: "0 8px 24px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(79, 182, 255, 0.05) inset"
          }}
        >
          <div className="flex items-center justify-between mb-2">
            <Users style={{ color: "#8BC6FF" }} size={20} />
          </div>
          <p className="text-[28px] font-bold text-white">24</p>
          <p className="text-[11px]" style={{ color: "#7E8AA8" }}>Active Operators</p>
        </div>
        <div 
          className="rounded-2xl p-5 border backdrop-blur-[18px]"
          style={{ 
            background: "rgba(20, 25, 35, 0.65)",
            borderColor: "rgba(255, 255, 255, 0.06)",
            boxShadow: "0 8px 24px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(79, 182, 255, 0.05) inset"
          }}
        >
          <div className="flex items-center justify-between mb-2">
            <Clock style={{ color: "#4FB6FF" }} size={20} />
          </div>
          <p className="text-[28px] font-bold text-white">156</p>
          <p className="text-[11px]" style={{ color: "#7E8AA8" }}>Active Tasks</p>
        </div>
      </div>

      {/* Team Performance */}
      <div className="mb-8">
        <h3 className="text-[20px] font-semibold mb-4 text-white">Top Performers This Week</h3>
        <div className="space-y-3">
          {[
            {
              name: "Sarah Chen",
              sessions: 42,
              rating: 4.9,
              image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400",
            },
            {
              name: "Marcus Stone",
              sessions: 38,
              rating: 4.8,
              image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
            },
            {
              name: "Elena Rodriguez",
              sessions: 35,
              rating: 5.0,
              image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400",
            },
          ].map((member, idx) => (
            <div
              key={idx}
              className="rounded-2xl p-4 flex items-center gap-4 border backdrop-blur-[18px] cursor-pointer active:scale-[0.98] transition-transform"
              style={{ 
                background: "rgba(20, 25, 35, 0.65)",
                borderColor: "rgba(255, 255, 255, 0.06)",
                boxShadow: "0 8px 24px rgba(0, 0, 0, 0.4)"
              }}
              onClick={() => navigate("/team")}
            >
              <div className="relative">
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white/10">
                  <ImageWithFallback
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-[11px] font-bold border-2 text-gray-900" style={{ borderColor: "#121A2B" }}>
                  {idx + 1}
                </div>
              </div>
              <div className="flex-1">
                <p className="font-semibold mb-1 text-white text-[16px]">{member.name}</p>
                <div className="flex items-center gap-3 text-[13px]" style={{ color: "#B8C1D9" }}>
                  <span>{member.sessions} sessions</span>
                  <div className="flex items-center gap-1">
                    <Star className="fill-yellow-400 text-yellow-400" size={12} />
                    <span>{member.rating}</span>
                  </div>
                </div>
              </div>
              <ChevronRight size={20} style={{ color: "#7E8AA8" }} />
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h3 className="text-[20px] font-semibold mb-4 text-white">Quick Actions</h3>
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => navigate("/team")}
            className="rounded-2xl p-4 flex flex-col items-center gap-2 border active:scale-95 transition-transform backdrop-blur-[18px]"
            style={{ 
              background: "rgba(20, 25, 35, 0.65)",
              borderColor: "rgba(255, 255, 255, 0.06)",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)"
            }}
          >
            <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: "rgba(79, 182, 255, 0.15)" }}>
              <Users style={{ color: "#4FB6FF" }} size={20} />
            </div>
            <span className="text-[13px] font-semibold text-white">Manage Team</span>
          </button>
          <button
            onClick={() => navigate("/tasks")}
            className="rounded-2xl p-4 flex flex-col items-center gap-2 border active:scale-95 transition-transform backdrop-blur-[18px]"
            style={{ 
              background: "rgba(20, 25, 35, 0.65)",
              borderColor: "rgba(255, 255, 255, 0.06)",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)"
            }}
          >
            <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: "rgba(79, 182, 255, 0.15)" }}>
              <Clock style={{ color: "#4FB6FF" }} size={20} />
            </div>
            <span className="text-[13px] font-semibold text-white">View Tasks</span>
          </button>
        </div>
      </div>
    </div>
  );
}