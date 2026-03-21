import { useState } from "react";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowLeft,
  Search,
  MoreVertical,
  Phone,
  Video,
  Send,
  Smile,
  Paperclip,
  Camera,
  MessageCircle,
  Clock,
  Check,
  CheckCheck,
  Star,
  Archive,
  Trash2,
  Info,
} from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import BottomNav from "./BottomNav";

interface Message {
  id: number;
  text: string;
  sender: "user" | "operator";
  timestamp: string;
  status: "sent" | "delivered" | "read";
}

interface Conversation {
  id: string;
  operatorId: string;
  operatorName: string;
  operatorImage: string;
  operatorLevel: number;
  lastMessage: string;
  timestamp: string;
  unread: number;
  isOnline: boolean;
  isPinned: boolean;
  sessionId?: string;
}

const conversations: Conversation[] = [
  {
    id: "1",
    operatorId: "1",
    operatorName: "Sarah Chen",
    operatorImage: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400",
    operatorLevel: 42,
    lastMessage: "Sure! I can show you the cherry blossoms tomorrow at 2pm 🌸",
    timestamp: "2m ago",
    unread: 2,
    isOnline: true,
    isPinned: true,
    sessionId: "session-123",
  },
  {
    id: "2",
    operatorId: "2",
    operatorName: "Marcus Stone",
    operatorImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
    operatorLevel: 38,
    lastMessage: "The Supreme drop was amazing! Got some great footage for you.",
    timestamp: "1h ago",
    unread: 0,
    isOnline: true,
    isPinned: false,
    sessionId: "session-456",
  },
  {
    id: "3",
    operatorId: "3",
    operatorName: "Elena Rodriguez",
    operatorImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400",
    operatorLevel: 56,
    lastMessage: "Thank you for booking! See you at the museum.",
    timestamp: "3h ago",
    unread: 0,
    isOnline: false,
    isPinned: false,
  },
  {
    id: "4",
    operatorId: "4",
    operatorName: "Yuki Tanaka",
    operatorImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400",
    operatorLevel: 33,
    lastMessage: "We can visit that ramen shop you wanted to see! 🍜",
    timestamp: "Yesterday",
    unread: 1,
    isOnline: false,
    isPinned: false,
  },
  {
    id: "5",
    operatorId: "5",
    operatorName: "Alex Rivera",
    operatorImage: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400",
    operatorLevel: 29,
    lastMessage: "Just finished setting up the 360 camera for your session",
    timestamp: "2d ago",
    unread: 0,
    isOnline: true,
    isPinned: false,
  },
];

export default function Messages() {
  const navigate = useNavigate();
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [messageText, setMessageText] = useState("");
  const [showActions, setShowActions] = useState(false);

  const mockMessages: Message[] = selectedConversation
    ? [
        {
          id: 1,
          text: "Hi! I'm interested in booking a session with you.",
          sender: "user",
          timestamp: "10:30 AM",
          status: "read",
        },
        {
          id: 2,
          text: "Hello! I'd be happy to help. What would you like to explore?",
          sender: "operator",
          timestamp: "10:32 AM",
          status: "read",
        },
        {
          id: 3,
          text: "I want to see the cherry blossoms in Tokyo!",
          sender: "user",
          timestamp: "10:35 AM",
          status: "read",
        },
        {
          id: 4,
          text: "Perfect timing! They're in full bloom right now 🌸",
          sender: "operator",
          timestamp: "10:36 AM",
          status: "read",
        },
        {
          id: 5,
          text: "Can we schedule a session for tomorrow?",
          sender: "user",
          timestamp: "10:40 AM",
          status: "read",
        },
        {
          id: 6,
          text: "Sure! I can show you the cherry blossoms tomorrow at 2pm 🌸",
          sender: "operator",
          timestamp: "10:42 AM",
          status: "delivered",
        },
      ]
    : [];

  const filteredConversations = conversations.filter(
    (conv) =>
      conv.operatorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conv.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSendMessage = () => {
    if (messageText.trim()) {
      // In a real app, this would send the message to the backend
      console.log("Sending message:", messageText);
      setMessageText("");
    }
  };

  const handleStartVideoCall = () => {
    if (selectedConversation?.sessionId) {
      navigate(`/session/${selectedConversation.sessionId}`);
    }
  };

  const handleStartCall = () => {
    // Handle audio call
    console.log("Starting audio call");
  };

  const handleViewProfile = () => {
    if (selectedConversation) {
      navigate(`/operator/${selectedConversation.operatorId}`);
    }
  };

  const totalUnread = conversations.reduce((sum, conv) => sum + conv.unread, 0);

  if (selectedConversation) {
    // Chat View
    return (
      <div className="min-h-screen pb-24">
        {selectedConversation ? (
          /* Chat View */
          <div className="flex flex-col h-screen">
            {/* Chat Header */}
            <div
              className="sticky top-0 z-20 backdrop-blur-[18px] border-b"
              style={{
                background: "rgba(20, 25, 35, 0.9)",
                borderColor: "rgba(255, 255, 255, 0.06)",
              }}
            >
              <div className="px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-3 flex-1">
                  <button
                    onClick={() => setSelectedConversation(null)}
                    className="p-2 rounded-xl active:scale-95 transition-transform"
                    style={{ background: "rgba(255, 255, 255, 0.05)" }}
                  >
                    <ArrowLeft className="w-5 h-5 text-white" />
                  </button>
                  <div className="relative">
                    <div className="w-10 h-10 rounded-full overflow-hidden border border-white/10">
                      <ImageWithFallback
                        src={selectedConversation.operatorImage}
                        alt={selectedConversation.operatorName}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {selectedConversation.isOnline && (
                      <div
                        className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2"
                        style={{ borderColor: "#121A2B" }}
                      />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-white text-[16px] truncate">
                      {selectedConversation.operatorName}
                    </h3>
                    <p className="text-[11px]" style={{ color: "#7E8AA8" }}>
                      {selectedConversation.isOnline ? "Online" : "Offline"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    className="p-2 rounded-xl active:scale-95 transition-transform"
                    style={{ background: "rgba(79, 182, 255, 0.1)" }}
                  >
                    <Phone className="w-5 h-5" style={{ color: "#4FB6FF" }} />
                  </button>
                  <button
                    className="p-2 rounded-xl active:scale-95 transition-transform"
                    style={{ background: "rgba(79, 182, 255, 0.1)" }}
                  >
                    <Video className="w-5 h-5" style={{ color: "#4FB6FF" }} />
                  </button>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4 pb-32">
              {mockMessages.map((msg, index) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[75%] ${
                      msg.sender === "user"
                        ? "bg-white/90 backdrop-blur-sm text-gray-900"
                        : "bg-white/5 backdrop-blur-xl border border-white/10 text-white"
                    } rounded-2xl px-4 py-3`}
                  >
                    <p className="text-sm">{msg.text}</p>
                    <div
                      className={`flex items-center gap-1 mt-1 text-xs ${
                        msg.sender === "user" ? "text-gray-600" : "text-white/60"
                      }`}
                    >
                      <span>{msg.timestamp}</span>
                      {msg.sender === "user" && (
                        <>
                          {msg.status === "read" && <CheckCheck size={14} />}
                          {msg.status === "delivered" && <CheckCheck size={14} className="opacity-50" />}
                          {msg.status === "sent" && <Check size={14} className="opacity-50" />}
                        </>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Message Input */}
            <div className="fixed bottom-20 left-0 right-0 bg-[#0a0a0a]/95 backdrop-blur-xl border-t border-white/10 p-4">
              <div className="max-w-md mx-auto">
                <div className="flex items-center gap-2">
                  <button className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:border-white/20 transition-all">
                    <Paperclip size={18} className="text-white" />
                  </button>
                  <button className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:border-white/20 transition-all">
                    <Camera size={18} className="text-white" />
                  </button>
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      value={messageText}
                      onChange={(e) => setMessageText(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                      placeholder="Type a message..."
                      className="w-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-full px-4 py-3 pr-12 focus:outline-none focus:border-white/20 transition-all text-white placeholder:text-white/50"
                    />
                    <button
                      onClick={() => {}}
                      className="absolute right-3 top-1/2 -translate-y-1/2"
                    >
                      <Smile size={20} className="text-white/60 hover:text-white transition-colors" />
                    </button>
                  </div>
                  <button
                    onClick={handleSendMessage}
                    disabled={!messageText.trim()}
                    className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                      messageText.trim()
                        ? "bg-white/90 backdrop-blur-sm text-gray-900 shadow-lg"
                        : "bg-white/5 border border-white/10 text-white/60"
                    }`}
                  >
                    <Send size={18} />
                  </button>
                </div>
              </div>
            </div>

            <BottomNav />
          </div>
        ) : (
          /* Conversations List View */
          <div className="min-h-screen bg-[#0a0a0a] pb-20">
            {/* Header */}
            <div className="sticky top-0 z-20 bg-[#0a0a0a]/95 backdrop-blur-xl border-b border-white/10">
              <div className="px-6 py-4">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h1 className="text-2xl font-bold text-white">Messages</h1>
                    {totalUnread > 0 && (
                      <p className="text-sm text-white/60">
                        {totalUnread} unread {totalUnread === 1 ? "message" : "messages"}
                      </p>
                    )}
                  </div>
                  <button
                    onClick={() => navigate("/search")}
                    className="w-10 h-10 bg-white/5 border border-white/10 rounded-full flex items-center justify-center hover:border-white/20 transition-all"
                  >
                    <Search size={20} className="text-white" />
                  </button>
                </div>

                {/* Search Bar */}
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60" size={18} />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search messages..."
                    className="w-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl px-11 py-3 focus:outline-none focus:border-white/20 transition-all text-white placeholder:text-white/50"
                  />
                </div>
              </div>
            </div>

            {/* Conversations List */}
            <div className="divide-y divide-white/10">
              {filteredConversations.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 px-6 text-center">
                  <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mb-4">
                    <MessageCircle className="text-white" size={32} />
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-white">No conversations found</h3>
                  <p className="text-white/60 mb-6">
                    {searchQuery ? "Try a different search term" : "Start chatting with operators"}
                  </p>
                  {!searchQuery && (
                    <button
                      onClick={() => navigate("/discover")}
                      className="bg-white/90 backdrop-blur-sm text-gray-900 px-6 py-3 rounded-full font-medium hover:bg-white transition-all"
                    >
                      Discover Operators
                    </button>
                  )}
                </div>
              ) : (
                filteredConversations.map((conv) => (
                  <motion.button
                    key={conv.id}
                    onClick={() => setSelectedConversation(conv)}
                    whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.05)" }}
                    className="w-full px-6 py-4 flex items-center gap-4 text-left transition-all"
                  >
                    <div className="relative flex-shrink-0">
                      <div className="w-14 h-14 rounded-full border-2 border-white/20 overflow-hidden">
                        <ImageWithFallback
                          src={conv.operatorImage}
                          alt={conv.operatorName}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      {conv.isOnline && (
                        <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-400 rounded-full border-2 border-[#0a0a0a]" />
                      )}
                      <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-[10px] font-bold text-gray-900 border-2 border-[#0a0a0a]">
                        {conv.operatorLevel}
                      </div>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-sm text-white">{conv.operatorName}</h3>
                          {conv.isPinned && <Star size={14} className="text-white fill-white" />}
                        </div>
                        <span className="text-xs text-white/60">{conv.timestamp}</span>
                      </div>
                      <p className="text-sm text-white/60 truncate">{conv.lastMessage}</p>
                    </div>

                    {conv.unread > 0 && (
                      <div className="flex-shrink-0 min-w-[24px] h-6 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center px-2">
                        <span className="text-xs font-bold text-gray-900">
                          {conv.unread > 9 ? "9+" : conv.unread}
                        </span>
                      </div>
                    )}
                  </motion.button>
                ))
              )}
            </div>

            <BottomNav />
          </div>
        )}
      </div>
    );
  }

  // Conversations List View
  return (
    <div className="min-h-screen bg-[#0a0a0a] pb-20">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-[#0a0a0a]/95 backdrop-blur-xl border-b border-white/10">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-white">Messages</h1>
              {totalUnread > 0 && (
                <p className="text-sm text-white/60">
                  {totalUnread} unread {totalUnread === 1 ? "message" : "messages"}
                </p>
              )}
            </div>
            <button
              onClick={() => navigate("/search")}
              className="w-10 h-10 bg-white/5 border border-white/10 rounded-full flex items-center justify-center hover:border-white/20 transition-all"
            >
              <Search size={20} className="text-white" />
            </button>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60" size={18} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search messages..."
              className="w-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl px-11 py-3 focus:outline-none focus:border-white/20 transition-all text-white placeholder:text-white/50"
            />
          </div>
        </div>
      </div>

      {/* Conversations List */}
      <div className="divide-y divide-white/10">
        {filteredConversations.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 px-6 text-center">
            <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mb-4">
              <MessageCircle className="text-white" size={32} />
            </div>
            <h3 className="text-lg font-semibold mb-2 text-white">No conversations found</h3>
            <p className="text-white/60 mb-6">
              {searchQuery ? "Try a different search term" : "Start chatting with operators"}
            </p>
            {!searchQuery && (
              <button
                onClick={() => navigate("/discover")}
                className="bg-white/90 backdrop-blur-sm text-gray-900 px-6 py-3 rounded-full font-medium hover:bg-white transition-all"
              >
                Discover Operators
              </button>
            )}
          </div>
        ) : (
          filteredConversations.map((conv) => (
            <motion.button
              key={conv.id}
              onClick={() => setSelectedConversation(conv)}
              whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.05)" }}
              className="w-full px-6 py-4 flex items-center gap-4 text-left transition-all"
            >
              <div className="relative flex-shrink-0">
                <div className="w-14 h-14 rounded-full border-2 border-white/20 overflow-hidden">
                  <ImageWithFallback
                    src={conv.operatorImage}
                    alt={conv.operatorName}
                    className="w-full h-full object-cover"
                  />
                </div>
                {conv.isOnline && (
                  <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-400 rounded-full border-2 border-[#0a0a0a]" />
                )}
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-[10px] font-bold text-gray-900 border-2 border-[#0a0a0a]">
                  {conv.operatorLevel}
                </div>
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-sm text-white">{conv.operatorName}</h3>
                    {conv.isPinned && <Star size={14} className="text-white fill-white" />}
                  </div>
                  <span className="text-xs text-white/60">{conv.timestamp}</span>
                </div>
                <p className="text-sm text-white/60 truncate">{conv.lastMessage}</p>
              </div>

              {conv.unread > 0 && (
                <div className="flex-shrink-0 min-w-[24px] h-6 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center px-2">
                  <span className="text-xs font-bold text-gray-900">
                    {conv.unread > 9 ? "9+" : conv.unread}
                  </span>
                </div>
              )}
            </motion.button>
          ))
        )}
      </div>

      <BottomNav />
    </div>
  );
}