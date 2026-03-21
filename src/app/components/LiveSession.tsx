import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { 
  ArrowLeft,
  Maximize2, 
  MessageCircle, 
  Send,
  Eye,
  Users,
  PhoneOff,
  RotateCcw
} from "lucide-react";

export default function LiveSession() {
  const navigate = useNavigate();
  const { avatarId } = useParams();
  const [viewMode, setViewMode] = useState<"FPV" | "TPV">("FPV");
  const [showChat, setShowChat] = useState(true);
  const [message, setMessage] = useState("");
  const [duration, setDuration] = useState(0);
  const [messages, setMessages] = useState([
    { id: 1, sender: "avatar", text: "Hi! Welcome to my tour 👋", time: "10:00" },
    { id: 2, sender: "user", text: "Hey! Can we go to the market?", time: "10:01" },
    { id: 3, sender: "avatar", text: "Sure! I'll head that way now.", time: "10:01" },
  ]);

  const avatarInfo = {
    name: "Marco",
    location: "Venice, Italy",
    viewers: 234,
  };

  // Timer
  useEffect(() => {
    const interval = setInterval(() => {
      setDuration((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      setMessages([
        ...messages,
        {
          id: messages.length + 1,
          sender: "user",
          text: message,
          time: new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
      setMessage("");
      
      // Simulate avatar response
      setTimeout(() => {
        setMessages(prev => [...prev, {
          id: prev.length + 1,
          sender: "avatar",
          text: "Got it! 👍",
          time: new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
        }]);
      }, 2000);
    }
  };

  const toggleView = () => {
    setViewMode(viewMode === "FPV" ? "TPV" : "FPV");
  };

  return (
    <div className="h-screen flex flex-col" style={{ background: "#000" }}>
      {/* Video Player */}
      <div className="relative flex-1">
        {/* Simulated 360° video feed */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 via-gray-900 to-purple-900/40 flex items-center justify-center">
          <div className="text-center space-y-4">
            <div 
              className="w-24 h-24 rounded-full flex items-center justify-center mx-auto border-2"
              style={{ 
                background: "rgba(79, 182, 255, 0.1)",
                borderColor: "rgba(79, 182, 255, 0.3)"
              }}
            >
              {viewMode === "FPV" ? (
                <Eye style={{ color: "#4FB6FF" }} size={40} />
              ) : (
                <Users style={{ color: "#4FB6FF" }} size={40} />
              )}
            </div>
            <div>
              <p className="text-white font-semibold text-[20px]">{viewMode}</p>
              <p className="text-[13px]" style={{ color: "#B8C1D9" }}>
                {viewMode === "FPV" ? "First Person View" : "Third Person View"}
              </p>
            </div>
          </div>
        </div>

        {/* Top Bar */}
        <div 
          className="absolute top-0 left-0 right-0 backdrop-blur-[18px] p-4"
          style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.8) 0%, transparent 100%)" }}
        >
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate("/home")}
              className="w-10 h-10 rounded-full flex items-center justify-center active:scale-95 transition-all"
              style={{ background: "rgba(0, 0, 0, 0.6)" }}
            >
              <ArrowLeft className="w-5 h-5 text-white" />
            </button>

            {/* Avatar Info */}
            <div className="flex-1 mx-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                <span className="text-white font-semibold text-[16px]">{avatarInfo.name}</span>
              </div>
              <p className="text-[11px]" style={{ color: "#B8C1D9" }}>{avatarInfo.location}</p>
            </div>

            {/* Viewers & Timer */}
            <div className="text-right">
              <div className="flex items-center gap-2 text-white">
                <Users size={14} />
                <span className="text-[13px] font-semibold">{avatarInfo.viewers}</span>
              </div>
              <p className="text-[11px]" style={{ color: "#B8C1D9" }}>{formatTime(duration)}</p>
            </div>
          </div>
        </div>

        {/* FPV/TPV Toggle Button */}
        <button
          onClick={toggleView}
          className="absolute top-20 right-4 backdrop-blur-[18px] rounded-xl px-4 py-3 border active:scale-95 transition-all"
          style={{
            background: "rgba(20, 25, 35, 0.8)",
            borderColor: "rgba(79, 182, 255, 0.3)",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.5)"
          }}
        >
          <div className="flex items-center gap-2">
            <RotateCcw style={{ color: "#4FB6FF" }} size={18} />
            <span className="text-white font-semibold text-[13px]">{viewMode}</span>
          </div>
        </button>

        {/* Chat Overlay */}
        <AnimatePresence>
          {showChat && (
            <motion.div
              initial={{ x: 300 }}
              animate={{ x: 0 }}
              exit={{ x: 300 }}
              className="absolute bottom-0 right-0 w-80 h-96 backdrop-blur-[18px] border-l border-t rounded-tl-2xl flex flex-col"
              style={{
                background: "rgba(11, 18, 32, 0.95)",
                borderColor: "rgba(255, 255, 255, 0.06)"
              }}
            >
              {/* Chat Header */}
              <div className="p-4 border-b" style={{ borderColor: "rgba(255, 255, 255, 0.06)" }}>
                <div className="flex items-center justify-between">
                  <h3 className="text-white font-semibold text-[16px]">Live Chat</h3>
                  <button
                    onClick={() => setShowChat(false)}
                    className="text-[13px]"
                    style={{ color: "#7E8AA8" }}
                  >
                    Hide
                  </button>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className="max-w-[70%] rounded-2xl px-4 py-2 backdrop-blur-[18px]"
                      style={{
                        background: msg.sender === "user" 
                          ? "rgba(79, 182, 255, 0.2)" 
                          : "rgba(20, 25, 35, 0.8)",
                        border: msg.sender === "user"
                          ? "1px solid rgba(79, 182, 255, 0.3)"
                          : "1px solid rgba(255, 255, 255, 0.06)"
                      }}
                    >
                      <p className="text-white text-[13px]">{msg.text}</p>
                      <p className="text-[10px] mt-1" style={{ color: "#7E8AA8" }}>{msg.time}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Message Input */}
              <div className="p-4 border-t" style={{ borderColor: "rgba(255, 255, 255, 0.06)" }}>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                    placeholder="Type a message..."
                    className="flex-1 px-4 py-2 rounded-xl border backdrop-blur-[18px] text-white placeholder-[#7E8AA8] outline-none text-[13px]"
                    style={{
                      background: "rgba(20, 25, 35, 0.8)",
                      borderColor: "rgba(255, 255, 255, 0.06)"
                    }}
                  />
                  <button
                    onClick={handleSendMessage}
                    className="w-10 h-10 rounded-xl flex items-center justify-center active:scale-95 transition-all"
                    style={{
                      background: "linear-gradient(135deg, #4FB6FF 0%, #2F8BFF 100%)"
                    }}
                  >
                    <Send className="text-white" size={18} />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottom Controls */}
        <div 
          className="absolute bottom-0 left-0 right-0 backdrop-blur-[18px] p-6"
          style={{ background: "linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 100%)" }}
        >
          <div className="flex items-center justify-center gap-6">
            {!showChat && (
              <button
                onClick={() => setShowChat(true)}
                className="backdrop-blur-[18px] rounded-full p-4 border active:scale-95 transition-all relative"
                style={{
                  background: "rgba(20, 25, 35, 0.8)",
                  borderColor: "rgba(255, 255, 255, 0.1)"
                }}
              >
                <MessageCircle className="text-white" size={24} />
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-white text-[10px] font-bold">
                  {messages.filter(m => m.sender === "avatar").length}
                </div>
              </button>
            )}

            <button
              onClick={() => navigate("/home")}
              className="backdrop-blur-[18px] rounded-full px-8 py-4 border active:scale-95 transition-all"
              style={{
                background: "rgba(239, 68, 68, 0.8)",
                borderColor: "rgba(239, 68, 68, 0.3)"
              }}
            >
              <div className="flex items-center gap-3">
                <PhoneOff className="text-white" size={24} />
                <span className="text-white font-semibold text-[16px]">End Session</span>
              </div>
            </button>

            <button
              className="backdrop-blur-[18px] rounded-full p-4 border active:scale-95 transition-all"
              style={{
                background: "rgba(20, 25, 35, 0.8)",
                borderColor: "rgba(255, 255, 255, 0.1)"
              }}
            >
              <Maximize2 className="text-white" size={24} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
