import { useState } from "react";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowLeft,
  CreditCard,
  Plus,
  Check,
  Trash2,
  Shield,
  Apple,
  Smartphone,
  DollarSign,
  Calendar,
  Lock,
  AlertCircle,
} from "lucide-react";

interface PaymentMethod {
  id: string;
  type: "card" | "apple_pay" | "google_pay" | "paypal";
  last4?: string;
  brand?: string;
  expiryMonth?: number;
  expiryYear?: number;
  isDefault: boolean;
  holderName?: string;
}

export default function PaymentMethods() {
  const navigate = useNavigate();
  const [showAddCard, setShowAddCard] = useState(false);
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
    {
      id: "1",
      type: "card",
      brand: "Visa",
      last4: "4242",
      expiryMonth: 12,
      expiryYear: 2028,
      isDefault: true,
      holderName: "Alex Johnson",
    },
    {
      id: "2",
      type: "card",
      brand: "Mastercard",
      last4: "8888",
      expiryMonth: 6,
      expiryYear: 2027,
      isDefault: false,
      holderName: "Alex Johnson",
    },
    {
      id: "3",
      type: "apple_pay",
      isDefault: false,
    },
  ]);

  const [newCard, setNewCard] = useState({
    number: "",
    name: "",
    expiry: "",
    cvv: "",
  });

  const setDefaultPayment = (id: string) => {
    setPaymentMethods(
      paymentMethods.map((pm) => ({
        ...pm,
        isDefault: pm.id === id,
      }))
    );
  };

  const deletePaymentMethod = (id: string) => {
    setPaymentMethods(paymentMethods.filter((pm) => pm.id !== id));
  };

  const getCardIcon = (brand?: string) => {
    // In a real app, you'd have actual card brand icons
    return <CreditCard size={24} />;
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(" ");
    } else {
      return value;
    }
  };

  const formatExpiry = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    if (v.length >= 2) {
      return v.slice(0, 2) + "/" + v.slice(2, 4);
    }
    return v;
  };

  const handleAddCard = () => {
    // In a real app, this would integrate with a payment processor
    const newPaymentMethod: PaymentMethod = {
      id: Date.now().toString(),
      type: "card",
      brand: "Visa",
      last4: newCard.number.slice(-4),
      expiryMonth: parseInt(newCard.expiry.split("/")[0]),
      expiryYear: 2000 + parseInt(newCard.expiry.split("/")[1]),
      isDefault: paymentMethods.length === 0,
      holderName: newCard.name,
    };

    setPaymentMethods([...paymentMethods, newPaymentMethod]);
    setShowAddCard(false);
    setNewCard({ number: "", name: "", expiry: "", cvv: "" });
  };

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
              <h2 className="text-foreground font-semibold text-xl">Payment Methods</h2>
              <p className="text-sm text-muted-foreground">
                Manage your payment options
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 py-6 space-y-6">
        {/* Security Notice */}
        <div className="bg-primary/10 border border-primary/20 rounded-2xl p-4 flex items-start gap-3">
          <Shield className="text-primary flex-shrink-0 mt-0.5" size={20} />
          <div>
            <h4 className="text-foreground font-medium mb-1">Secure Payments</h4>
            <p className="text-sm text-muted-foreground">
              Your payment information is encrypted and secure. We never store your
              full card details.
            </p>
          </div>
        </div>

        {/* Payment Methods List */}
        <div className="space-y-3">
          {paymentMethods.map((method) => (
            <motion.div
              key={method.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`rounded-2xl border p-4 transition-all ${
                method.isDefault
                  ? "bg-gradient-to-br from-primary/10 to-purple-500/10 border-primary/30"
                  : "bg-card border-border"
              }`}
            >
              <div className="flex items-start gap-4">
                {/* Icon */}
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  method.type === "card"
                    ? "bg-gradient-to-br from-blue-500 to-purple-500"
                    : method.type === "apple_pay"
                    ? "bg-black"
                    : "bg-gradient-to-br from-green-500 to-teal-500"
                }`}>
                  {method.type === "card" ? (
                    <CreditCard className="text-white" size={24} />
                  ) : method.type === "apple_pay" ? (
                    <Apple className="text-white" size={24} />
                  ) : (
                    <Smartphone className="text-white" size={24} />
                  )}
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <h4 className="font-semibold text-foreground">
                        {method.type === "card"
                          ? `${method.brand} •••• ${method.last4}`
                          : method.type === "apple_pay"
                          ? "Apple Pay"
                          : "Google Pay"}
                      </h4>
                      {method.holderName && (
                        <p className="text-sm text-muted-foreground mt-0.5">
                          {method.holderName}
                        </p>
                      )}
                      {method.expiryMonth && method.expiryYear && (
                        <p className="text-xs text-muted-foreground mt-1">
                          Expires {method.expiryMonth.toString().padStart(2, "0")}/
                          {method.expiryYear.toString().slice(-2)}
                        </p>
                      )}
                    </div>
                    {method.isDefault && (
                      <span className="px-2 py-1 bg-primary/20 text-primary text-xs rounded-full font-medium">
                        Default
                      </span>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 mt-3">
                    {!method.isDefault && (
                      <button
                        onClick={() => setDefaultPayment(method.id)}
                        className="px-3 py-1.5 bg-secondary hover:bg-secondary/80 rounded-lg text-sm transition-all"
                      >
                        Set as Default
                      </button>
                    )}
                    <button
                      onClick={() => deletePaymentMethod(method.id)}
                      className="px-3 py-1.5 text-destructive hover:bg-destructive/10 rounded-lg text-sm transition-all flex items-center gap-1.5"
                    >
                      <Trash2 size={14} />
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Add New Button */}
        {!showAddCard ? (
          <button
            onClick={() => setShowAddCard(true)}
            className="w-full py-4 border-2 border-dashed border-border rounded-2xl text-muted-foreground hover:border-primary/50 hover:text-primary transition-all flex items-center justify-center gap-2"
          >
            <Plus size={20} />
            Add New Payment Method
          </button>
        ) : (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="bg-card border border-border rounded-2xl p-6 space-y-4"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-foreground">Add New Card</h3>
              <button
                onClick={() => setShowAddCard(false)}
                className="p-1 hover:bg-secondary rounded-lg transition-colors"
              >
                <AlertCircle size={18} className="text-muted-foreground" />
              </button>
            </div>

            {/* Card Number */}
            <div className="space-y-2">
              <label className="text-sm text-muted-foreground">Card Number</label>
              <div className="relative">
                <input
                  type="text"
                  value={newCard.number}
                  onChange={(e) =>
                    setNewCard({ ...newCard, number: formatCardNumber(e.target.value) })
                  }
                  placeholder="1234 5678 9012 3456"
                  maxLength={19}
                  className="w-full bg-input border border-border rounded-xl py-3 pl-4 pr-12 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                />
                <CreditCard
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground"
                  size={18}
                />
              </div>
            </div>

            {/* Cardholder Name */}
            <div className="space-y-2">
              <label className="text-sm text-muted-foreground">Cardholder Name</label>
              <input
                type="text"
                value={newCard.name}
                onChange={(e) => setNewCard({ ...newCard, name: e.target.value })}
                placeholder="Alex Johnson"
                className="w-full bg-input border border-border rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              />
            </div>

            {/* Expiry & CVV */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm text-muted-foreground">Expiry Date</label>
                <div className="relative">
                  <input
                    type="text"
                    value={newCard.expiry}
                    onChange={(e) =>
                      setNewCard({ ...newCard, expiry: formatExpiry(e.target.value) })
                    }
                    placeholder="MM/YY"
                    maxLength={5}
                    className="w-full bg-input border border-border rounded-xl py-3 pl-4 pr-10 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  />
                  <Calendar
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                    size={16}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm text-muted-foreground">CVV</label>
                <div className="relative">
                  <input
                    type="text"
                    value={newCard.cvv}
                    onChange={(e) =>
                      setNewCard({ ...newCard, cvv: e.target.value.slice(0, 3) })
                    }
                    placeholder="123"
                    maxLength={3}
                    className="w-full bg-input border border-border rounded-xl py-3 pl-4 pr-10 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  />
                  <Lock
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                    size={16}
                  />
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setShowAddCard(false)}
                className="flex-1 py-3 bg-secondary text-foreground rounded-xl hover:bg-secondary/80 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleAddCard}
                disabled={
                  !newCard.number || !newCard.name || !newCard.expiry || !newCard.cvv
                }
                className="flex-1 py-3 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Add Card
              </button>
            </div>
          </motion.div>
        )}

        {/* Quick Add Options */}
        <div className="space-y-3">
          <h3 className="text-foreground font-semibold">Quick Add</h3>
          <div className="grid grid-cols-2 gap-3">
            <button className="p-4 bg-black border border-border rounded-2xl hover:border-primary/50 transition-all flex items-center justify-center gap-2">
              <Apple className="text-white" size={24} />
              <span className="text-white font-medium">Apple Pay</span>
            </button>
            <button className="p-4 bg-card border border-border rounded-2xl hover:border-primary/50 transition-all flex items-center justify-center gap-2">
              <Smartphone className="text-foreground" size={24} />
              <span className="text-foreground font-medium">Google Pay</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
