import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Send, Heart, MoreVertical, Reply } from "lucide-react";

interface Comment {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  text: string;
  likes: number;
  isLiked: boolean;
  timestamp: string;
  replies?: Comment[];
}

interface CommentsModalProps {
  isOpen: boolean;
  onClose: () => void;
  reelTitle: string;
  avatarName: string;
  totalComments: number;
}

export default function CommentsModal({
  isOpen,
  onClose,
  reelTitle,
  avatarName,
  totalComments,
}: CommentsModalProps) {
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState<Comment[]>([
    {
      id: "1",
      userId: "u1",
      userName: "Alex Thompson",
      userAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100",
      text: "This is amazing! Love the quality 🔥",
      likes: 124,
      isLiked: false,
      timestamp: "2m ago",
    },
    {
      id: "2",
      userId: "u2",
      userName: "Jessica Lee",
      userAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100",
      text: "Can you show the other side too?",
      likes: 45,
      isLiked: true,
      timestamp: "5m ago",
    },
    {
      id: "3",
      userId: "u3",
      userName: "Michael Chen",
      userAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100",
      text: "Best guide ever! 👏",
      likes: 89,
      isLiked: false,
      timestamp: "8m ago",
    },
    {
      id: "4",
      userId: "u4",
      userName: "Sarah Williams",
      userAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100",
      text: "How much is the session?",
      likes: 12,
      isLiked: false,
      timestamp: "10m ago",
    },
  ]);

  const handleLikeComment = (commentId: string) => {
    setComments(
      comments.map((comment) =>
        comment.id === commentId
          ? {
              ...comment,
              isLiked: !comment.isLiked,
              likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1,
            }
          : comment
      )
    );
  };

  const handleSendComment = () => {
    if (commentText.trim()) {
      const newComment: Comment = {
        id: Date.now().toString(),
        userId: "current_user",
        userName: "You",
        userAvatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100",
        text: commentText,
        likes: 0,
        isLiked: false,
        timestamp: "Just now",
      };
      setComments([newComment, ...comments]);
      setCommentText("");
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/80 z-50 flex items-end md:items-center justify-center"
        onClick={onClose}
      >
        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ type: "spring", damping: 30, stiffness: 300 }}
          className="bg-card w-full md:max-w-lg md:rounded-t-3xl rounded-t-3xl max-h-[85vh] flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border">
            <div>
              <h3 className="font-bold text-lg">Comments</h3>
              <p className="text-sm text-muted-foreground">
                {totalComments.toLocaleString()} comments
              </p>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center hover:bg-muted transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Comments List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {comments.map((comment) => (
              <div key={comment.id} className="flex gap-3">
                <img
                  src={comment.userAvatar}
                  alt={comment.userName}
                  className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                />
                <div className="flex-1">
                  <div className="bg-secondary rounded-2xl px-4 py-3">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-semibold text-sm">{comment.userName}</h4>
                      <span className="text-xs text-muted-foreground">{comment.timestamp}</span>
                    </div>
                    <p className="text-sm leading-relaxed">{comment.text}</p>
                  </div>
                  <div className="flex items-center gap-4 mt-2 px-2">
                    <button
                      onClick={() => handleLikeComment(comment.id)}
                      className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      <Heart
                        size={14}
                        className={comment.isLiked ? "fill-red-500 text-red-500" : ""}
                      />
                      <span className={comment.isLiked ? "text-red-500 font-semibold" : ""}>
                        {comment.likes}
                      </span>
                    </button>
                    <button className="text-sm text-muted-foreground hover:text-primary transition-colors">
                      Reply
                    </button>
                  </div>
                </div>
                <button className="w-8 h-8 rounded-full hover:bg-secondary flex items-center justify-center flex-shrink-0">
                  <MoreVertical size={16} className="text-muted-foreground" />
                </button>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="p-4 border-t border-border">
            <div className="flex items-center gap-3">
              <img
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100"
                alt="You"
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSendComment()}
                  placeholder="Add a comment..."
                  className="w-full bg-secondary border border-border rounded-full px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                />
                <button
                  onClick={handleSendComment}
                  disabled={!commentText.trim()}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary/90 transition-all"
                >
                  <Send size={16} />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
