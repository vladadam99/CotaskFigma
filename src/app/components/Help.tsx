import { useNavigate } from "react-router";
import { motion } from "motion/react";
import {
  ArrowLeft,
  MessageCircle,
  Mail,
  Phone,
  HelpCircle,
  BookOpen,
  FileText,
  Search,
  ChevronRight,
} from "lucide-react";

const faqCategories = [
  {
    title: "Getting Started",
    questions: [
      {
        q: "How do I book an avatar session?",
        a: "Browse available avatars, select one, choose your preferred time, and confirm payment. You'll receive instant confirmation.",
      },
      {
        q: "What equipment do I need?",
        a: "Just a smartphone with internet connection. Some avatars may offer premium experiences with VR headsets or smart glasses.",
      },
      {
        q: "How do I cancel a booking?",
        a: "Go to Session History, select the session, and tap 'Cancel'. Free cancellation is available up to 24 hours before the session.",
      },
    ],
  },
  {
    title: "Payments & Credits",
    questions: [
      {
        q: "What payment methods are accepted?",
        a: "We accept all major credit cards, debit cards, PayPal, and wallet credits.",
      },
      {
        q: "How do wallet credits work?",
        a: "Purchase credits in advance at discounted rates. Credits never expire and can be used for any session.",
      },
      {
        q: "What's your refund policy?",
        a: "Full refunds for cancellations 24+ hours in advance. Partial refunds may apply for technical issues.",
      },
    ],
  },
  {
    title: "During Sessions",
    questions: [
      {
        q: "What if I have connectivity issues?",
        a: "Sessions pause automatically. Reconnect within 5 minutes to resume, or get a full refund if issues persist.",
      },
      {
        q: "Can I record sessions?",
        a: "Recording depends on the avatar's settings. Some allow recording for an additional fee.",
      },
      {
        q: "How do I tip avatars?",
        a: "Tap the tip icon during or after the session. Tips go 100% to the avatar.",
      },
    ],
  },
];

export default function Help() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-xl border-b border-border">
        <div className="max-w-md mx-auto p-6 flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="w-10 h-10 bg-card border border-border rounded-full flex items-center justify-center hover:border-primary/50 transition-all"
          >
            <ArrowLeft size={20} />
          </button>
          <h2 className="text-xl font-bold">Help & Support</h2>
        </div>
      </div>

      <div className="max-w-md mx-auto px-6 py-6 space-y-6">
        {/* Quick Actions */}
        <div className="grid grid-cols-3 gap-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-br from-primary/20 to-purple-500/20 border border-primary/30 rounded-2xl p-4 flex flex-col items-center gap-2"
          >
            <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
              <MessageCircle className="text-primary" size={24} />
            </div>
            <span className="text-xs font-semibold text-center">Live Chat</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-card border border-border rounded-2xl p-4 flex flex-col items-center gap-2"
          >
            <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center">
              <Mail className="text-foreground" size={24} />
            </div>
            <span className="text-xs font-semibold text-center">Email Us</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-card border border-border rounded-2xl p-4 flex flex-col items-center gap-2"
          >
            <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center">
              <Phone className="text-foreground" size={24} />
            </div>
            <span className="text-xs font-semibold text-center">Call Us</span>
          </motion.button>
        </div>

        {/* Search FAQs */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
          <input
            type="text"
            placeholder="Search frequently asked questions..."
            className="w-full bg-card border border-border rounded-xl pl-11 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>

        {/* Contact Info */}
        <div className="bg-gradient-to-br from-primary/10 to-purple-500/10 border border-primary/20 rounded-2xl p-5 space-y-3">
          <h3 className="font-bold text-lg flex items-center gap-2">
            <HelpCircle className="text-primary" size={20} />
            Need Immediate Help?
          </h3>
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-3 text-sm">
              <Mail className="text-primary" size={16} />
              <span className="text-muted-foreground">support@cotask.com</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="text-primary" size={16} />
              <span className="text-muted-foreground">1-800-AVATAR-HELP</span>
            </div>
            <div className="flex items-center gap-2">
              <MessageCircle className="text-primary" size={16} />
              <span className="text-muted-foreground">Live chat: 24/7 available</span>
            </div>
          </div>
        </div>

        {/* Resources */}
        <div className="space-y-3">
          <h3 className="font-bold text-lg">Resources</h3>
          <motion.button
            whileTap={{ scale: 0.98 }}
            className="w-full bg-card border border-border rounded-2xl p-4 flex items-center gap-4 hover:border-primary/50 transition-all"
          >
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
              <BookOpen className="text-primary" size={20} />
            </div>
            <div className="flex-1 text-left">
              <p className="font-semibold">User Guide</p>
              <p className="text-sm text-muted-foreground">Complete guide to using CoTask</p>
            </div>
            <ChevronRight className="text-muted-foreground" size={20} />
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.98 }}
            className="w-full bg-card border border-border rounded-2xl p-4 flex items-center gap-4 hover:border-primary/50 transition-all"
          >
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
              <FileText className="text-primary" size={20} />
            </div>
            <div className="flex-1 text-left">
              <p className="font-semibold">Terms & Conditions</p>
              <p className="text-sm text-muted-foreground">Read our terms of service</p>
            </div>
            <ChevronRight className="text-muted-foreground" size={20} />
          </motion.button>
        </div>

        {/* FAQs */}
        <div className="space-y-4">
          <h3 className="font-bold text-lg">Frequently Asked Questions</h3>
          {faqCategories.map((category) => (
            <div key={category.title} className="space-y-3">
              <h4 className="font-semibold text-primary">{category.title}</h4>
              {category.questions.map((faq, index) => (
                <details
                  key={index}
                  className="bg-card border border-border rounded-2xl overflow-hidden group"
                >
                  <summary className="p-4 cursor-pointer hover:bg-secondary transition-colors font-medium flex items-center justify-between">
                    {faq.q}
                    <ChevronRight className="text-muted-foreground group-open:rotate-90 transition-transform" size={18} />
                  </summary>
                  <div className="px-4 pb-4 text-sm text-muted-foreground leading-relaxed">
                    {faq.a}
                  </div>
                </details>
              ))}
            </div>
          ))}
        </div>

        {/* Still Need Help */}
        <div className="bg-gradient-to-br from-primary to-purple-500 rounded-2xl p-6 text-center text-white">
          <h3 className="font-bold text-xl mb-2">Still Need Help?</h3>
          <p className="text-white/90 text-sm mb-4">
            Our support team is here 24/7 to assist you
          </p>
          <button className="w-full bg-white text-primary font-bold py-3 rounded-xl hover:bg-white/90 transition-all">
            Start Live Chat
          </button>
        </div>
      </div>
    </div>
  );
}