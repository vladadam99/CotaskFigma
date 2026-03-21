import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { motion } from "motion/react";
import { ArrowLeft, Star, Clock, Calendar, DollarSign, Check } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

const timeSlots = [
  "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
  "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM",
  "05:00 PM", "06:00 PM", "07:00 PM", "08:00 PM",
];

const durations = [
  { value: 1, label: "1 hour", price: 25 },
  { value: 2, label: "2 hours", price: 45 },
  { value: 3, label: "3 hours", price: 65 },
];

export default function Booking() {
  const navigate = useNavigate();
  const { operatorId } = useParams();
  const [selectedDate, setSelectedDate] = useState("2026-03-09");
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedDuration, setSelectedDuration] = useState(durations[0]);

  // Mock operator data
  const operator = {
    id: operatorId,
    name: "Sarah Chen",
    specialty: "Virtual Tours",
    rating: 4.9,
    sessions: 342,
    price: 25,
    image: "https://images.unsplash.com/photo-1669296585827-9fb7fa09e025?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaXR5JTIwdG91ciUyMGd1aWRlJTIwc3RyZWV0fGVufDF8fHx8MTc3Mjk2NjY1OHww&ixlib=rb-4.1.0&q=80&w=1080",
  };

  const handleBook = () => {
    if (selectedTime) {
      navigate(`/session/${Date.now()}`);
    }
  };

  return (
    <div className="min-h-screen pb-20">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-xl border-b border-border">
        <div className="max-w-md mx-auto p-6 flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="w-10 h-10 bg-card border border-border rounded-full flex items-center justify-center hover:border-primary/50 transition-all active:scale-95"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h2 className="text-xl font-semibold">Book Session</h2>
        </div>
      </div>

      <div className="max-w-md mx-auto px-6 space-y-6 mt-6">
        {/* Operator Card */}
        <div className="bg-card border border-border rounded-2xl overflow-hidden">
          <div className="relative h-48">
            <ImageWithFallback
              src={operator.image}
              alt={operator.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4">
              <h3 className="text-xl font-semibold text-white">{operator.name}</h3>
              <p className="text-sm text-white/80">{operator.specialty}</p>
            </div>
          </div>

          <div className="p-4 flex items-center justify-between border-t border-border">
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-1.5">
                <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                <span className="font-medium">{operator.rating}</span>
              </div>
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <Clock className="w-4 h-4" />
                <span>{operator.sessions} sessions</span>
              </div>
            </div>
          </div>
        </div>

        {/* Date Selection */}
        <div className="space-y-3">
          <label className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="w-4 h-4" />
            Select Date
          </label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            min="2026-03-09"
            className="w-full bg-input border border-border rounded-2xl py-3.5 px-4 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
          />
        </div>

        {/* Duration Selection */}
        <div className="space-y-3">
          <label className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="w-4 h-4" />
            Session Duration
          </label>
          <div className="grid grid-cols-3 gap-3">
            {durations.map((duration) => (
              <button
                key={duration.value}
                onClick={() => setSelectedDuration(duration)}
                className={`p-3 rounded-2xl border transition-all ${
                  selectedDuration.value === duration.value
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-card border-border hover:border-primary/50"
                }`}
              >
                <div className="text-sm font-medium">{duration.label}</div>
                <div className="text-xs opacity-80">${duration.price}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Time Slots */}
        <div className="space-y-3">
          <label className="text-sm text-muted-foreground">Select Time</label>
          <div className="grid grid-cols-3 gap-2">
            {timeSlots.map((time) => (
              <button
                key={time}
                onClick={() => setSelectedTime(time)}
                className={`py-3 px-4 rounded-2xl border text-sm font-medium transition-all ${
                  selectedTime === time
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-card border-border hover:border-primary/50"
                }`}
              >
                {time}
              </button>
            ))}
          </div>
        </div>

        {/* Price Summary */}
        <div className="bg-card border border-border rounded-2xl p-4 space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Session ({selectedDuration.label})</span>
            <span className="font-medium">${selectedDuration.price}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Service fee</span>
            <span className="font-medium">$5</span>
          </div>
          <div className="border-t border-border pt-3 flex items-center justify-between">
            <span className="font-semibold">Total</span>
            <span className="text-xl font-semibold text-primary flex items-center gap-1">
              <DollarSign className="w-5 h-5" />
              {selectedDuration.price + 5}
            </span>
          </div>
        </div>

        {/* Book Button */}
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={handleBook}
          disabled={!selectedTime}
          className={`w-full py-4 rounded-2xl font-medium flex items-center justify-center gap-2 transition-all ${
            selectedTime
              ? "bg-primary text-primary-foreground hover:bg-primary/90 active:scale-95"
              : "bg-muted text-muted-foreground cursor-not-allowed"
          }`}
        >
          <Check className="w-5 h-5" />
          Confirm Booking
        </motion.button>
      </div>
    </div>
  );
}