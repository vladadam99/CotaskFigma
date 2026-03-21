import { useState } from "react";
import { useNavigate } from "react-router";
import { ArrowLeft, Video, DollarSign, Clock, MapPin, Tag, Wifi } from "lucide-react";
import { motion } from "motion/react";

export default function GoLive() {
  const navigate = useNavigate();
  const [isLive, setIsLive] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    price: "",
    duration: "30",
  });

  const categories = [
    "Tour",
    "Food Experience",
    "Shopping",
    "Adventure",
    "Cultural",
    "Entertainment",
  ];

  const handleGoLive = () => {
    setIsLive(true);
    // Simulate going live
    setTimeout(() => {
      navigate("/avatar-home");
    }, 2000);
  };

  return (
    <div className="min-h-screen pb-24">
      {/* Header */}
      <div 
        className="sticky top-0 z-20 backdrop-blur-[18px] border-b"
        style={{
          background: "rgba(20, 25, 35, 0.9)",
          borderColor: "rgba(255, 255, 255, 0.06)"
        }}
      >
        <div className="px-6 py-4 flex items-center gap-4">
          <button
            onClick={() => navigate("/avatar-home")}
            className="w-10 h-10 border rounded-full flex items-center justify-center active:scale-95 transition-all"
            style={{ background: "rgba(255, 255, 255, 0.05)", borderColor: "rgba(255, 255, 255, 0.06)" }}
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <div>
            <h1 className="text-[28px] font-bold text-white">Go Live</h1>
            <p className="text-[13px]" style={{ color: "#B8C1D9" }}>Setup your live session</p>
          </div>
        </div>
      </div>

      <div className="px-6 py-8 space-y-6">
        {/* Camera Preview */}
        <div 
          className="rounded-2xl overflow-hidden border backdrop-blur-[18px] aspect-video relative"
          style={{
            background: "rgba(20, 25, 35, 0.65)",
            borderColor: "rgba(255, 255, 255, 0.06)",
            boxShadow: "0 8px 24px rgba(0, 0, 0, 0.4)"
          }}
        >
          {/* Simulated camera feed */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
            <div className="text-center">
              <Video className="mx-auto mb-3" style={{ color: "#4FB6FF" }} size={48} />
              <p className="text-white font-semibold">Camera Preview</p>
              <p className="text-[13px] mt-1" style={{ color: "#B8C1D9" }}>Insta360 X3 Connected</p>
            </div>
          </div>
          {/* Connection status */}
          <div className="absolute top-4 right-4 flex items-center gap-2 px-3 py-2 rounded-full" style={{ background: "rgba(34, 197, 94, 0.9)" }}>
            <Wifi size={14} className="text-white" />
            <span className="text-[11px] text-white font-semibold">Connected</span>
          </div>
        </div>

        {/* Session Details */}
        <div 
          className="rounded-2xl p-5 border backdrop-blur-[18px] space-y-4"
          style={{
            background: "rgba(20, 25, 35, 0.65)",
            borderColor: "rgba(255, 255, 255, 0.06)",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)"
          }}
        >
          <h3 className="text-[20px] font-semibold text-white">Session Details</h3>
          
          {/* Title */}
          <div>
            <label className="block text-[13px] mb-2" style={{ color: "#B8C1D9" }}>
              Title
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g., Walking tour through Venice"
              className="w-full px-4 py-3 rounded-xl border backdrop-blur-[18px] text-white placeholder-[#7E8AA8] outline-none text-[16px]"
              style={{
                background: "rgba(20, 25, 35, 0.5)",
                borderColor: "rgba(255, 255, 255, 0.06)"
              }}
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-[13px] mb-2" style={{ color: "#B8C1D9" }}>
              Category
            </label>
            <div className="grid grid-cols-3 gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFormData({ ...formData, category: cat })}
                  className="px-3 py-2 rounded-xl text-[13px] font-semibold border transition-all"
                  style={{
                    background: formData.category === cat 
                      ? "rgba(79, 182, 255, 0.15)" 
                      : "rgba(20, 25, 35, 0.5)",
                    borderColor: formData.category === cat 
                      ? "rgba(79, 182, 255, 0.4)" 
                      : "rgba(255, 255, 255, 0.06)",
                    color: formData.category === cat ? "#4FB6FF" : "#B8C1D9"
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Price & Duration */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[13px] mb-2" style={{ color: "#B8C1D9" }}>
                Price
              </label>
              <div className="relative">
                <DollarSign 
                  className="absolute left-3 top-1/2 -translate-y-1/2" 
                  size={18} 
                  style={{ color: "#7E8AA8" }}
                />
                <input
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  placeholder="20"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border backdrop-blur-[18px] text-white placeholder-[#7E8AA8] outline-none text-[16px]"
                  style={{
                    background: "rgba(20, 25, 35, 0.5)",
                    borderColor: "rgba(255, 255, 255, 0.06)"
                  }}
                />
              </div>
            </div>
            <div>
              <label className="block text-[13px] mb-2" style={{ color: "#B8C1D9" }}>
                Duration (min)
              </label>
              <select
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border backdrop-blur-[18px] text-white outline-none text-[16px]"
                style={{
                  background: "rgba(20, 25, 35, 0.5)",
                  borderColor: "rgba(255, 255, 255, 0.06)"
                }}
              >
                <option value="20">20 min</option>
                <option value="30">30 min</option>
                <option value="45">45 min</option>
                <option value="60">60 min</option>
              </select>
            </div>
          </div>
        </div>

        {/* Go Live Button */}
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={handleGoLive}
          disabled={!formData.title || !formData.category || !formData.price || isLive}
          className="w-full text-white font-bold py-5 rounded-2xl flex items-center justify-center gap-3 border-0 disabled:opacity-50 active:scale-95 transition-transform"
          style={{ 
            background: formData.title && formData.category && formData.price && !isLive
              ? "linear-gradient(135deg, #FF5A5A 0%, #FF3D3D 100%)"
              : "rgba(255, 90, 90, 0.3)",
            boxShadow: formData.title && formData.category && formData.price && !isLive
              ? "0 8px 24px rgba(255, 58, 58, 0.4)"
              : "none"
          }}
        >
          {isLive ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span className="text-[16px] font-semibold">Going Live...</span>
            </>
          ) : (
            <>
              <Video size={20} />
              <span className="text-[16px] font-semibold">Start Live Session</span>
            </>
          )}
        </motion.button>

        {/* Tips */}
        <div 
          className="rounded-2xl p-4 border backdrop-blur-[18px]"
          style={{
            background: "rgba(79, 182, 255, 0.05)",
            borderColor: "rgba(79, 182, 255, 0.2)",
          }}
        >
          <p className="text-[13px] font-semibold mb-2" style={{ color: "#4FB6FF" }}>
            💡 Tips for a great session:
          </p>
          <ul className="space-y-1 text-[13px]" style={{ color: "#B8C1D9" }}>
            <li>• Ensure good lighting and stable WiFi</li>
            <li>• Keep your camera steady</li>
            <li>• Engage with viewers in chat</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
