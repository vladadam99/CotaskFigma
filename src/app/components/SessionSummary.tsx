import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { motion } from "motion/react";
import { 
  CheckCircle, 
  Star, 
  Clock, 
  DollarSign,
  Calendar,
  MessageCircle,
  ArrowRight,
  Download
} from "lucide-react";

export default function SessionSummary() {
  const navigate = useNavigate();
  const { sessionId } = useParams();
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");

  const session = {
    id: sessionId,
    operatorName: "Sarah Chen",
    specialty: "Virtual Tours",
    date: "March 8, 2026",
    duration: "1 hour 23 minutes",
    price: 30,
    status: "completed",
  };

  const handleSubmitReview = () => {
    console.log("Review submitted:", { rating, feedback });
    navigate("/home");
  };

  const handleRebook = () => {
    navigate(`/booking/1`);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 max-w-md mx-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full space-y-8"
      >
        {/* Success Icon */}
        <div className="text-center space-y-4">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="relative mx-auto w-24 h-24 flex items-center justify-center"
          >
            <div className="absolute inset-0 bg-primary/20 rounded-full blur-2xl" />
            <div className="relative bg-primary rounded-full p-6">
              <CheckCircle className="w-12 h-12 text-primary-foreground" strokeWidth={2} />
            </div>
          </motion.div>

          <div>
            <h1 className="text-3xl font-semibold mb-2">Session Complete!</h1>
            <p className="text-muted-foreground">
              Thank you for using CoTask
            </p>
          </div>
        </div>

        {/* Session Details */}
        <div className="bg-card border border-border rounded-2xl p-6 space-y-4">
          <h3 className="font-semibold">Session Summary</h3>
          
          <div className="space-y-3 text-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 text-muted-foreground">
                <MessageCircle className="w-4 h-4" />
                <span>Operator</span>
              </div>
              <span className="font-medium">{session.operatorName}</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 text-muted-foreground">
                <Calendar className="w-4 h-4" />
                <span>Date</span>
              </div>
              <span className="font-medium">{session.date}</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 text-muted-foreground">
                <Clock className="w-4 h-4" />
                <span>Duration</span>
              </div>
              <span className="font-medium">{session.duration}</span>
            </div>

            <div className="border-t border-border pt-3 flex items-center justify-between">
              <div className="flex items-center gap-3 text-muted-foreground">
                <DollarSign className="w-4 h-4" />
                <span>Total Paid</span>
              </div>
              <span className="text-lg font-semibold text-primary">${session.price}</span>
            </div>
          </div>

          <button className="w-full bg-muted text-foreground py-3 rounded-2xl font-medium flex items-center justify-center gap-2 hover:bg-muted/80 transition-all active:scale-95">
            <Download className="w-5 h-5" />
            Download Receipt
          </button>
        </div>

        {/* Rating */}
        <div className="bg-card border border-border rounded-2xl p-6 space-y-4">
          <h3 className="font-semibold">Rate Your Experience</h3>
          
          <div className="flex justify-center gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => setRating(star)}
                className="transition-all hover:scale-110 active:scale-95"
              >
                <Star
                  className={`w-10 h-10 ${
                    star <= rating
                      ? "text-yellow-500 fill-yellow-500"
                      : "text-muted-foreground"
                  }`}
                />
              </button>
            ))}
          </div>

          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="Share your experience (optional)..."
            rows={4}
            className="w-full bg-input border border-border rounded-2xl p-4 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none"
          />

          <button
            onClick={handleSubmitReview}
            disabled={rating === 0}
            className={`w-full py-3 rounded-2xl font-medium transition-all ${
              rating > 0
                ? "bg-primary text-primary-foreground hover:bg-primary/90 active:scale-95"
                : "bg-muted text-muted-foreground cursor-not-allowed"
            }`}
          >
            Submit Review
          </button>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={handleRebook}
            className="w-full bg-card border border-border py-4 rounded-2xl font-medium flex items-center justify-center gap-2 hover:border-primary/50 transition-all"
          >
            Book Again with {session.operatorName}
            <ArrowRight className="w-5 h-5" />
          </motion.button>

          <button
            onClick={() => navigate("/home")}
            className="w-full text-muted-foreground hover:text-foreground transition-colors"
          >
            Back to Home
          </button>
        </div>
      </motion.div>
    </div>
  );
}