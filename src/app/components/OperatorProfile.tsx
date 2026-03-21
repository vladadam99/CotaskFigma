import { useNavigate, useParams } from "react-router";
import { motion } from "motion/react";
import { 
  ArrowLeft, 
  Star, 
  MapPin, 
  Clock, 
  Calendar,
  Award,
  Shield,
  TrendingUp,
  Camera,
  Glasses,
  Smartphone
} from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { AvatarLevelBadge, AvatarLevelCard } from "./ui/AvatarLevelBadge";

const reviews = [
  {
    id: 1,
    userName: "Michael B.",
    rating: 5,
    date: "March 5, 2026",
    comment: "Amazing experience! Sarah was professional and showed me all the best spots.",
  },
  {
    id: 2,
    userName: "Jennifer K.",
    rating: 5,
    date: "March 3, 2026",
    comment: "Very knowledgeable and patient. The FPS/TPS switching feature is incredible!",
  },
  {
    id: 3,
    userName: "David L.",
    rating: 4,
    date: "February 28, 2026",
    comment: "Great tour guide. Had a minor connection issue but overall excellent service.",
  },
];

const stats = [
  { icon: Clock, label: "Response time", value: "< 2 min" },
  { icon: Award, label: "Completion rate", value: "99%" },
  { icon: TrendingUp, label: "Repeat clients", value: "85%" },
];

export default function OperatorProfile() {
  const navigate = useNavigate();
  const { operatorId } = useParams();

  const operator = {
    id: operatorId,
    name: "Sarah Chen",
    specialty: "Virtual Tours",
    rating: 4.9,
    reviews: 342,
    sessions: 342,
    price: 25,
    location: "San Francisco, CA",
    languages: ["English", "Mandarin", "Spanish"],
    verified: true,
    level: 5,
    xp: 12450,
    completedSessions: 342,
    equipment: ["360° Camera", "Smart Glasses", "4K Phone Camera"],
    skills: ["Historical Tours", "Museum Guides", "Cultural Experiences", "Food Tours"],
    bio: "Professional tour guide with 5+ years of experience. Specialized in historical sites, museums, and cultural experiences. Equipped with 360° camera for immersive experiences.",
    image: "https://images.unsplash.com/photo-1669296585827-9fb7fa09e025?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaXR5JTIwdG91ciUyMGd1aWRlJTIwc3RyZWV0fGVufDF8fHx8MTc3Mjk2NjY1OHww&ixlib=rb-4.1.0&q=80&w=1080",
    availability: [
      "Monday - Friday: 9AM - 8PM",
      "Saturday: 10AM - 6PM",
      "Sunday: 12PM - 5PM",
    ],
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
          <h2 className="text-xl font-semibold">Operator Profile</h2>
        </div>
      </div>

      <div className="max-w-md mx-auto space-y-6">
        {/* Profile Header */}
        <div className="relative">
          <div className="h-64 relative">
            <ImageWithFallback
              src={operator.image}
              alt={operator.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
          </div>

          <div className="absolute bottom-0 left-0 right-0 px-6 pb-6">
            <div className="flex items-end justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h1 className="text-3xl font-semibold text-white">{operator.name}</h1>
                  {operator.verified && (
                    <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                      <Shield className="w-4 h-4 text-primary-foreground" />
                    </div>
                  )}
                </div>
                <p className="text-white/80">{operator.specialty}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="px-6 space-y-6">
          {/* Rating & Level */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                <span className="text-xl font-semibold">{operator.rating}</span>
              </div>
              <span className="text-muted-foreground">({operator.reviews} reviews)</span>
            </div>
            <AvatarLevelBadge level={operator.level} showName size="md" animated />
          </div>

          {/* Level Details Card */}
          <AvatarLevelCard level={operator.level} />

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div key={stat.label} className="bg-card border border-border rounded-2xl p-4 text-center">
                  <Icon className="w-5 h-5 text-primary mx-auto mb-2" />
                  <p className="text-sm font-semibold">{stat.value}</p>
                  <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
                </div>
              );
            })}
          </div>

          {/* Equipment */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">Equipment</h3>
            <div className="grid grid-cols-1 gap-3">
              {operator.equipment.map((item, index) => {
                const icons = [Camera, Glasses, Smartphone];
                const Icon = icons[index] || Camera;
                return (
                  <div key={item} className="flex items-center gap-3 bg-card border border-border rounded-xl p-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Icon className="text-primary" size={20} />
                    </div>
                    <span className="text-sm text-foreground">{item}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Skills */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">Specialized Skills</h3>
            <div className="flex flex-wrap gap-2">
              {operator.skills.map((skill) => (
                <span
                  key={skill}
                  className="bg-primary/10 border border-primary/20 text-primary px-3 py-1.5 rounded-full text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* About */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">About</h3>
            <p className="text-muted-foreground leading-relaxed">{operator.bio}</p>
          </div>

          {/* Details */}
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-sm">
              <MapPin className="w-5 h-5 text-muted-foreground" />
              <span>{operator.location}</span>
            </div>
            <div className="flex items-start gap-3 text-sm">
              <Calendar className="w-5 h-5 text-muted-foreground mt-0.5" />
              <div className="space-y-1">
                {operator.availability.map((time, i) => (
                  <p key={i}>{time}</p>
                ))}
              </div>
            </div>
          </div>

          {/* Languages */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">Languages</h3>
            <div className="flex flex-wrap gap-2">
              {operator.languages.map((lang) => (
                <span
                  key={lang}
                  className="bg-card border border-border px-4 py-2 rounded-full text-sm"
                >
                  {lang}
                </span>
              ))}
            </div>
          </div>

          {/* Reviews */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Reviews</h3>
            <div className="space-y-3">
              {reviews.map((review) => (
                <div key={review.id} className="bg-card border border-border rounded-2xl p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{review.userName}</p>
                      <p className="text-xs text-muted-foreground">{review.date}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">{review.comment}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Book Button */}
          <div className="sticky bottom-0 bg-background/80 backdrop-blur-xl border-t border-border -mx-6 px-6 py-4">
            <motion.button
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate(`/booking/${operator.id}`)}
              className="w-full bg-primary text-primary-foreground py-4 rounded-2xl font-medium hover:bg-primary/90 transition-all"
            >
              Book Session - ${operator.price}/hr
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
}