import { useState } from "react";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowLeft,
  Wallet as WalletIcon,
  DollarSign,
  Plus,
  ArrowUpRight,
  ArrowDownRight,
  TrendingUp,
  Gift,
  Crown,
  Zap,
  Clock,
  CreditCard,
  Check,
  Sparkles,
  Users,
  Star,
} from "lucide-react";

interface Transaction {
  id: string;
  type: "credit" | "debit" | "reward" | "refund";
  amount: number;
  description: string;
  date: string;
  status: "completed" | "pending";
}

interface SubscriptionTier {
  id: string;
  name: string;
  price: number;
  credits: number;
  features: string[];
  popular?: boolean;
  color: string;
}

export default function Wallet() {
  const navigate = useNavigate();
  const [showAddCredits, setShowAddCredits] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState(50);
  const [showSubscriptions, setShowSubscriptions] = useState(false);

  const balance = {
    credits: 125,
    usd: 125,
    pending: 25,
  };

  const transactions: Transaction[] = [
    {
      id: "1",
      type: "debit",
      amount: 30,
      description: "Session with Sarah Chen",
      date: "2 hours ago",
      status: "completed",
    },
    {
      id: "2",
      type: "credit",
      amount: 100,
      description: "Credits purchased",
      date: "1 day ago",
      status: "completed",
    },
    {
      id: "3",
      type: "reward",
      amount: 15,
      description: "Referral bonus - Emily Chen joined",
      date: "2 days ago",
      status: "completed",
    },
    {
      id: "4",
      type: "debit",
      amount: 45,
      description: "Session with Marcus Stone",
      date: "3 days ago",
      status: "completed",
    },
    {
      id: "5",
      type: "credit",
      amount: 50,
      description: "Monthly subscription credits",
      date: "5 days ago",
      status: "completed",
    },
    {
      id: "6",
      type: "reward",
      amount: 10,
      description: "Achievement unlocked bonus",
      date: "1 week ago",
      status: "completed",
    },
  ];

  const quickAmounts = [25, 50, 100, 250];

  const subscriptionTiers: SubscriptionTier[] = [
    {
      id: "basic",
      name: "Basic",
      price: 0,
      credits: 0,
      features: [
        "Pay per session",
        "Standard support",
        "Basic features",
      ],
      color: "from-gray-500 to-gray-600",
    },
    {
      id: "pro",
      name: "Pro",
      price: 29,
      credits: 50,
      features: [
        "50 credits/month ($50 value)",
        "10% bonus on purchases",
        "Priority support",
        "Early access to features",
        "No booking fees",
      ],
      popular: true,
      color: "from-blue-500 to-purple-500",
    },
    {
      id: "premium",
      name: "Premium",
      price: 79,
      credits: 150,
      features: [
        "150 credits/month ($150 value)",
        "20% bonus on purchases",
        "VIP support",
        "Exclusive operators",
        "Free cancellations",
        "Custom requests",
      ],
      color: "from-yellow-400 to-orange-500",
    },
  ];

  const handleAddCredits = () => {
    // In a real app, this would integrate with payment processor
    console.log(`Adding ${selectedAmount} credits`);
    setShowAddCredits(false);
  };

  const totalSpent = transactions
    .filter((t) => t.type === "debit")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalEarned = transactions
    .filter((t) => t.type === "credit" || t.type === "reward")
    .reduce((sum, t) => sum + t.amount, 0);

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-xl border-b border-border">
        <div className="px-6 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate(-1)}
              className="p-2 rounded-xl hover:bg-secondary transition-colors"
            >
              <ArrowLeft className="text-foreground" size={20} />
            </button>
            <div>
              <h2 className="text-foreground font-semibold text-xl">Wallet</h2>
              <p className="text-sm text-muted-foreground">Manage your credits</p>
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 py-6 space-y-6">
        {/* Balance Card */}
        <div className="bg-gradient-to-br from-primary via-primary to-purple-500 rounded-3xl p-6 text-white relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white rounded-full blur-2xl" />
          </div>

          <div className="relative">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <WalletIcon size={24} />
                <span className="text-sm opacity-90">VTM Credits</span>
              </div>
              <button
                onClick={() => setShowSubscriptions(!showSubscriptions)}
                className="p-2 bg-white/20 backdrop-blur-sm rounded-xl hover:bg-white/30 transition-all"
              >
                <Crown size={18} />
              </button>
            </div>

            <div className="mb-4">
              <p className="text-5xl font-bold mb-2">{balance.credits}</p>
              <p className="text-sm opacity-80">≈ ${balance.usd} USD</p>
            </div>

            {balance.pending > 0 && (
              <div className="flex items-center gap-2 text-sm opacity-90">
                <Clock size={14} />
                <span>{balance.pending} credits pending</span>
              </div>
            )}

            <button
              onClick={() => setShowAddCredits(true)}
              className="mt-6 w-full py-3 bg-white text-primary rounded-xl font-medium hover:bg-white/90 transition-all flex items-center justify-center gap-2"
            >
              <Plus size={18} />
              Add Credits
            </button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-card border border-border rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 bg-green-500/10 rounded-lg flex items-center justify-center">
                <TrendingUp className="text-green-500" size={16} />
              </div>
              <span className="text-sm text-muted-foreground">Earned</span>
            </div>
            <p className="text-2xl font-bold text-green-500">+{totalEarned}</p>
          </div>
          <div className="bg-card border border-border rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 bg-blue-500/10 rounded-lg flex items-center justify-center">
                <ArrowDownRight className="text-blue-500" size={16} />
              </div>
              <span className="text-sm text-muted-foreground">Spent</span>
            </div>
            <p className="text-2xl font-bold text-blue-500">{totalSpent}</p>
          </div>
        </div>

        {/* Referral Banner */}
        <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-2xl p-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center flex-shrink-0">
              <Gift className="text-white" size={20} />
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-foreground mb-1">Earn Free Credits</h4>
              <p className="text-sm text-muted-foreground mb-3">
                Refer friends and get 15 credits for each signup
              </p>
              <button className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl text-sm font-medium hover:opacity-90 transition-all">
                Invite Friends
              </button>
            </div>
          </div>
        </div>

        {/* Subscription Tiers */}
        <AnimatePresence>
          {showSubscriptions && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="space-y-3"
            >
              <h3 className="font-semibold text-foreground">Subscription Plans</h3>
              {subscriptionTiers.map((tier) => (
                <motion.div
                  key={tier.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`rounded-2xl border p-4 ${
                    tier.popular
                      ? "bg-gradient-to-br from-primary/10 to-purple-500/10 border-primary/30"
                      : "bg-card border-border"
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-12 h-12 bg-gradient-to-br ${tier.color} rounded-xl flex items-center justify-center`}
                      >
                        {tier.id === "premium" ? (
                          <Crown className="text-white" size={24} />
                        ) : tier.id === "pro" ? (
                          <Zap className="text-white" size={24} />
                        ) : (
                          <Star className="text-white" size={24} />
                        )}
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground">{tier.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          {tier.price === 0 ? "Free" : `$${tier.price}/month`}
                        </p>
                      </div>
                    </div>
                    {tier.popular && (
                      <span className="px-2 py-1 bg-primary text-primary-foreground text-xs rounded-full font-medium">
                        Popular
                      </span>
                    )}
                  </div>

                  <ul className="space-y-2 mb-4">
                    {tier.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Check className="text-green-500 flex-shrink-0" size={14} />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {tier.id !== "basic" && (
                    <button className="w-full py-2.5 bg-primary text-primary-foreground rounded-xl font-medium hover:bg-primary/90 transition-all">
                      Subscribe
                    </button>
                  )}
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Transactions */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-foreground">Recent Transactions</h3>
            <button className="text-sm text-primary hover:underline">View All</button>
          </div>

          <div className="space-y-2">
            {transactions.map((transaction) => (
              <motion.div
                key={transaction.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-card border border-border rounded-xl p-3 flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      transaction.type === "credit"
                        ? "bg-green-500/10"
                        : transaction.type === "reward"
                        ? "bg-purple-500/10"
                        : transaction.type === "refund"
                        ? "bg-blue-500/10"
                        : "bg-red-500/10"
                    }`}
                  >
                    {transaction.type === "credit" ? (
                      <ArrowDownRight
                        className="text-green-500 rotate-180"
                        size={18}
                      />
                    ) : transaction.type === "reward" ? (
                      <Gift className="text-purple-500" size={18} />
                    ) : transaction.type === "refund" ? (
                      <ArrowUpRight className="text-blue-500" size={18} />
                    ) : (
                      <ArrowUpRight className="text-red-500" size={18} />
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {transaction.description}
                    </p>
                    <p className="text-xs text-muted-foreground">{transaction.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p
                    className={`font-semibold ${
                      transaction.type === "debit"
                        ? "text-red-500"
                        : "text-green-500"
                    }`}
                  >
                    {transaction.type === "debit" ? "-" : "+"}
                    {transaction.amount}
                  </p>
                  <p className="text-xs text-muted-foreground capitalize">
                    {transaction.status}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Add Credits Modal */}
      <AnimatePresence>
        {showAddCredits && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-end md:items-center justify-center p-6"
            onClick={() => setShowAddCredits(false)}
          >
            <motion.div
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "100%", opacity: 0 }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="bg-background border border-border rounded-3xl p-6 max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-xl font-semibold text-foreground mb-4">Add Credits</h3>

              {/* Quick Amounts */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                {quickAmounts.map((amount) => (
                  <button
                    key={amount}
                    onClick={() => setSelectedAmount(amount)}
                    className={`p-4 rounded-2xl border transition-all ${
                      selectedAmount === amount
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-card border-border hover:border-primary/50"
                    }`}
                  >
                    <p className="text-2xl font-bold">{amount}</p>
                    <p className="text-xs opacity-80">${amount}</p>
                  </button>
                ))}
              </div>

              {/* Custom Amount */}
              <div className="mb-6">
                <label className="text-sm text-muted-foreground mb-2 block">
                  Or enter custom amount
                </label>
                <div className="relative">
                  <DollarSign
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
                    size={18}
                  />
                  <input
                    type="number"
                    value={selectedAmount}
                    onChange={(e) => setSelectedAmount(parseInt(e.target.value) || 0)}
                    className="w-full bg-card border border-border rounded-xl pl-11 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  />
                </div>
              </div>

              {/* Summary */}
              <div className="bg-secondary/30 rounded-2xl p-4 mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Credits</span>
                  <span className="font-semibold">{selectedAmount}</span>
                </div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Bonus (0%)</span>
                  <span className="font-semibold">0</span>
                </div>
                <div className="border-t border-border pt-2 flex items-center justify-between">
                  <span className="font-semibold">Total</span>
                  <span className="text-xl font-bold text-primary">${selectedAmount}</span>
                </div>
              </div>

              {/* Payment Method */}
              <button
                onClick={() => navigate("/payment-methods")}
                className="w-full mb-3 py-3 bg-card border border-border rounded-xl flex items-center justify-between hover:border-primary/50 transition-all"
              >
                <div className="flex items-center gap-3">
                  <CreditCard className="text-foreground" size={18} />
                  <span className="text-foreground">Visa •••• 4242</span>
                </div>
                <span className="text-primary text-sm">Change</span>
              </button>

              {/* Actions */}
              <div className="flex gap-3">
                <button
                  onClick={() => setShowAddCredits(false)}
                  className="flex-1 py-3 bg-secondary text-foreground rounded-xl hover:bg-secondary/80 transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddCredits}
                  className="flex-1 py-3 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-all font-medium"
                >
                  Add Credits
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
