import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import {
  Search,
  MapPin,
  Heart,
  MessageCircle,
  Share2,
  Play,
  Users,
  TrendingUp,
  Clock,
  Video,
  ChevronRight,
  Star,
  Zap,
  X,
  Bell,
  MapIcon,
  ChevronLeft,
  Volume2,
  VolumeX,
  ChevronDown,
  UserPlus,
  DollarSign,
  Award,
  Navigation,
  User,
  Calendar,
} from "lucide-react";
import BottomNav from "./BottomNav";
import CommentsModal from "./CommentsModal";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import UserHomeScreen from "./UserHomeScreen";
import AvatarHomeScreen from "./AvatarHomeScreen";
import EnterpriseHomeScreen from "./EnterpriseHomeScreen";
import DiscoverFeed from "./DiscoverFeed";

// Home component - Main screen with reels and explore features
interface Reel {
  id: number;
  avatarId: string;
  avatarName: string;
  avatarLevel: number;
  avatarImage: string;
  category: string;
  location: string;
  title: string;
  viewers: number;
  isLive: boolean;
  likes: number;
  comments: number;
  shares: number;
  isFollowing: boolean;
  isLiked: boolean;
  thumbnail: string;
  rating: number;
  price: number;
}

const reels: Reel[] = [
  {
    id: 1,
    avatarId: "1",
    avatarName: "Sarah Chen",
    avatarLevel: 42,
    avatarImage: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400",
    category: "Virtual Tours",
    location: "Tokyo, Japan",
    title: "Exploring Shibuya Crossing LIVE 🔴",
    viewers: 1247,
    isLive: true,
    likes: 8924,
    comments: 432,
    shares: 156,
    isFollowing: false,
    isLiked: false,
    thumbnail: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800",
    rating: 4.9,
    price: 25,
  },
  {
    id: 2,
    avatarId: "2",
    avatarName: "Marcus Stone",
    avatarLevel: 38,
    avatarImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
    category: "Shopping",
    location: "New York, USA",
    title: "Supreme Drop Day NYC 🔥",
    viewers: 892,
    isLive: true,
    likes: 6543,
    comments: 298,
    shares: 87,
    isFollowing: true,
    isLiked: true,
    thumbnail: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800",
    rating: 4.8,
    price: 30,
  },
  {
    id: 3,
    avatarId: "3",
    avatarName: "Elena Rodriguez",
    avatarLevel: 56,
    avatarImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400",
    category: "Museums",
    location: "Barcelona, Spain",
    title: "Inside Sagrada Familia ✨",
    viewers: 634,
    isLive: false,
    likes: 12453,
    comments: 567,
    shares: 234,
    isFollowing: false,
    isLiked: false,
    thumbnail: "https://images.unsplash.com/photo-1583422409516-2895a77efded?w=800",
    rating: 5.0,
    price: 35,
  },
  {
    id: 4,
    avatarId: "4",
    avatarName: "Yuki Tanaka",
    avatarLevel: 44,
    avatarImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400",
    category: "Food",
    location: "Osaka, Japan",
    title: "Street Food Heaven 🍜 LIVE",
    viewers: 2103,
    isLive: true,
    likes: 15782,
    comments: 892,
    shares: 456,
    isFollowing: true,
    isLiked: true,
    thumbnail: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800",
    rating: 4.7,
    price: 28,
  },
  {
    id: 5,
    avatarId: "5",
    avatarName: "Ahmed Hassan",
    avatarLevel: 61,
    avatarImage: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400",
    category: "Tours",
    location: "Cairo, Egypt",
    title: "Pyramids of Giza Sunrise 🌅",
    viewers: 445,
    isLive: false,
    likes: 9876,
    comments: 345,
    shares: 178,
    isFollowing: false,
    isLiked: false,
    thumbnail: "https://images.unsplash.com/photo-1572252009286-268acec5ca0a?w=800",
    rating: 4.9,
    price: 27,
  },
  {
    id: 6,
    avatarId: "6",
    avatarName: "Isabella Martinez",
    avatarLevel: 52,
    avatarImage: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400",
    category: "Museums",
    location: "Paris, France",
    title: "Louvre Museum After Hours 🎨",
    viewers: 1568,
    isLive: true,
    likes: 18934,
    comments: 721,
    shares: 312,
    isFollowing: false,
    isLiked: true,
    thumbnail: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=800",
    rating: 4.95,
    price: 40,
  },
  {
    id: 7,
    avatarId: "7",
    avatarName: "David Kim",
    avatarLevel: 35,
    avatarImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400",
    category: "Tech",
    location: "Seoul, South Korea",
    title: "Latest Gadgets in Gangnam 📱",
    viewers: 923,
    isLive: false,
    likes: 7234,
    comments: 412,
    shares: 145,
    isFollowing: true,
    isLiked: false,
    thumbnail: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=800",
    rating: 4.6,
    price: 32,
  },
  {
    id: 8,
    avatarId: "8",
    avatarName: "Sophia Anderson",
    avatarLevel: 48,
    avatarImage: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400",
    category: "Shopping",
    location: "Milan, Italy",
    title: "Fashion Week Shopping Spree 👗",
    viewers: 2456,
    isLive: true,
    likes: 21543,
    comments: 1023,
    shares: 587,
    isFollowing: true,
    isLiked: true,
    thumbnail: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=800",
    rating: 4.85,
    price: 45,
  },
  {
    id: 9,
    avatarId: "9",
    avatarName: "Carlos Rodrigues",
    avatarLevel: 40,
    avatarImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400",
    category: "Events",
    location: "Rio de Janeiro, Brazil",
    title: "Carnival Street Party 🎭 LIVE",
    viewers: 3421,
    isLive: true,
    likes: 28934,
    comments: 1543,
    shares: 892,
    isFollowing: false,
    isLiked: true,
    thumbnail: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800",
    rating: 4.75,
    price: 35,
  },
  {
    id: 10,
    avatarId: "10",
    avatarName: "Mei Zhang",
    avatarLevel: 58,
    avatarImage: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400",
    category: "Food",
    location: "Hong Kong",
    title: "Dim Sum Masterclass 🥟",
    viewers: 1876,
    isLive: false,
    likes: 16782,
    comments: 834,
    shares: 423,
    isFollowing: true,
    isLiked: false,
    thumbnail: "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=800",
    rating: 4.92,
    price: 38,
  },
  {
    id: 11,
    avatarId: "11",
    avatarName: "Lucas Silva",
    avatarLevel: 33,
    avatarImage: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=400",
    category: "Tours",
    location: "Machu Picchu, Peru",
    title: "Ancient Inca Trail Adventure 🏔️",
    viewers: 567,
    isLive: false,
    likes: 9234,
    comments: 289,
    shares: 167,
    isFollowing: false,
    isLiked: false,
    thumbnail: "https://images.unsplash.com/photo-1587595431973-160d0d94add1?w=800",
    rating: 4.88,
    price: 42,
  },
  {
    id: 12,
    avatarId: "12",
    avatarName: "Aisha Patel",
    avatarLevel: 46,
    avatarImage: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400",
    category: "Shopping",
    location: "Dubai, UAE",
    title: "Gold Souk & Luxury Shopping 💎 LIVE",
    viewers: 1987,
    isLive: true,
    likes: 19876,
    comments: 912,
    shares: 534,
    isFollowing: true,
    isLiked: true,
    thumbnail: "https://images.unsplash.com/photo-1512909006721-3d6018887383?w=800",
    rating: 4.78,
    price: 50,
  },
  {
    id: 13,
    avatarId: "13",
    avatarName: "Oliver Brown",
    avatarLevel: 51,
    avatarImage: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400",
    category: "Museums",
    location: "London, UK",
    title: "British Museum Hidden Gems 🏛️",
    viewers: 1234,
    isLive: false,
    likes: 14567,
    comments: 623,
    shares: 298,
    isFollowing: false,
    isLiked: true,
    thumbnail: "https://images.unsplash.com/photo-1555848962-6e79363ec58f?w=800",
    rating: 4.91,
    price: 36,
  },
  {
    id: 14,
    avatarId: "14",
    avatarName: "Nina Petrov",
    avatarLevel: 37,
    avatarImage: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400",
    category: "Events",
    location: "St. Petersburg, Russia",
    title: "White Nights Festival 🌃 LIVE",
    viewers: 2876,
    isLive: true,
    likes: 23456,
    comments: 1234,
    shares: 678,
    isFollowing: true,
    isLiked: false,
    thumbnail: "https://images.unsplash.com/photo-1520106212299-d99c443e4568?w=800",
    rating: 4.82,
    price: 33,
  },
  {
    id: 15,
    avatarId: "15",
    avatarName: "Raj Kumar",
    avatarLevel: 43,
    avatarImage: "https://images.unsplash.com/photo-1507081323647-4d250478b919?w=400",
    category: "Tours",
    location: "Jaipur, India",
    title: "Pink City Palace Tour 🏰",
    viewers: 987,
    isLive: false,
    likes: 11234,
    comments: 456,
    shares: 234,
    isFollowing: false,
    isLiked: false,
    thumbnail: "https://images.unsplash.com/photo-1599661046289-e31897846e41?w=800",
    rating: 4.87,
    price: 29,
  },
  {
    id: 16,
    avatarId: "16",
    avatarName: "Emma Wilson",
    avatarLevel: 55,
    avatarImage: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400",
    category: "Food",
    location: "Bangkok, Thailand",
    title: "Street Food Market Tour 🍲 LIVE",
    viewers: 3124,
    isLive: true,
    likes: 27891,
    comments: 1456,
    shares: 789,
    isFollowing: true,
    isLiked: true,
    thumbnail: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800",
    rating: 4.93,
    price: 31,
  },
  {
    id: 17,
    avatarId: "17",
    avatarName: "Andreas Schmidt",
    avatarLevel: 39,
    avatarImage: "https://images.unsplash.com/photo-1502378735452-bc7d86632805?w=400",
    category: "Tech",
    location: "Berlin, Germany",
    title: "Tech Startup Hub Tour 💻",
    viewers: 734,
    isLive: false,
    likes: 8934,
    comments: 367,
    shares: 189,
    isFollowing: false,
    isLiked: false,
    thumbnail: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800",
    rating: 4.71,
    price: 34,
  },
  {
    id: 18,
    avatarId: "18",
    avatarName: "Kenji Watanabe",
    avatarLevel: 47,
    avatarImage: "https://images.unsplash.com/photo-1463453091185-61582044d556?w=400",
    category: "Shopping",
    location: "Akihabara, Japan",
    title: "Anime & Electronics Paradise 🎮 LIVE",
    viewers: 2234,
    isLive: true,
    likes: 20567,
    comments: 989,
    shares: 512,
    isFollowing: true,
    isLiked: true,
    thumbnail: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800",
    rating: 4.89,
    price: 37,
  },
  {
    id: 19,
    avatarId: "19",
    avatarName: "Maria Gonzalez",
    avatarLevel: 50,
    avatarImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400",
    category: "Museums",
    location: "Madrid, Spain",
    title: "Prado Museum Art Collection 🖼️",
    viewers: 1456,
    isLive: false,
    likes: 15678,
    comments: 678,
    shares: 345,
    isFollowing: false,
    isLiked: true,
    thumbnail: "https://images.unsplash.com/photo-1564399579883-451a5d44ec08?w=800",
    rating: 4.94,
    price: 39,
  },
  {
    id: 20,
    avatarId: "20",
    avatarName: "James Taylor",
    avatarLevel: 41,
    avatarImage: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400",
    category: "Events",
    location: "Austin, Texas",
    title: "Live Music Scene Tour 🎸 LIVE",
    viewers: 1789,
    isLive: true,
    likes: 17234,
    comments: 823,
    shares: 445,
    isFollowing: true,
    isLiked: false,
    thumbnail: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=800",
    rating: 4.76,
    price: 28,
  },
  {
    id: 21,
    avatarId: "21",
    avatarName: "Zara Ali",
    avatarLevel: 54,
    avatarImage: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400",
    category: "Tours",
    location: "Istanbul, Turkey",
    title: "Grand Bazaar Experience 🕌",
    viewers: 1923,
    isLive: false,
    likes: 18567,
    comments: 734,
    shares: 412,
    isFollowing: false,
    isLiked: false,
    thumbnail: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=800",
    rating: 4.86,
    price: 30,
  },
  {
    id: 22,
    avatarId: "22",
    avatarName: "Chen Wei",
    avatarLevel: 49,
    avatarImage: "https://images.unsplash.com/photo-1520409364224-63400afe26e5?w=400",
    category: "Food",
    location: "Shanghai, China",
    title: "Shanghai Night Market 🥢 LIVE",
    viewers: 2678,
    isLive: true,
    likes: 24789,
    comments: 1189,
    shares: 634,
    isFollowing: true,
    isLiked: true,
    thumbnail: "https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?w=800",
    rating: 4.91,
    price: 33,
  },
  {
    id: 23,
    avatarId: "23",
    avatarName: "Sophie Laurent",
    avatarLevel: 36,
    avatarImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400",
    category: "Shopping",
    location: "Paris, France",
    title: "Champs-Élysées Shopping 🛍️",
    viewers: 1456,
    isLive: false,
    likes: 13456,
    comments: 567,
    shares: 289,
    isFollowing: false,
    isLiked: true,
    thumbnail: "https://images.unsplash.com/photo-1549388604-817d15aa0110?w=800",
    rating: 4.79,
    price: 41,
  },
  {
    id: 24,
    avatarId: "24",
    avatarName: "Mohammed Al-Farsi",
    avatarLevel: 45,
    avatarImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
    category: "Tours",
    location: "Petra, Jordan",
    title: "Ancient City of Petra 🏜️ LIVE",
    viewers: 2345,
    isLive: true,
    likes: 22345,
    comments: 1034,
    shares: 567,
    isFollowing: true,
    isLiked: true,
    thumbnail: "https://images.unsplash.com/photo-1579606032821-4e6161c81bd3?w=800",
    rating: 4.96,
    price: 44,
  },
  {
    id: 25,
    avatarId: "25",
    avatarName: "Ana Costa",
    avatarLevel: 42,
    avatarImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400",
    category: "Events",
    location: "Lisbon, Portugal",
    title: "Fado Music Night 🎵",
    viewers: 876,
    isLive: false,
    likes: 10234,
    comments: 423,
    shares: 198,
    isFollowing: false,
    isLiked: false,
    thumbnail: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800",
    rating: 4.84,
    price: 27,
  },
  {
    id: 26,
    avatarId: "26",
    avatarName: "Viktor Petrov",
    avatarLevel: 53,
    avatarImage: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400",
    category: "Tech",
    location: "San Francisco, USA",
    title: "Silicon Valley Tech Tour 🚀 LIVE",
    viewers: 1678,
    isLive: true,
    likes: 16789,
    comments: 734,
    shares: 401,
    isFollowing: true,
    isLiked: false,
    thumbnail: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800",
    rating: 4.77,
    price: 46,
  },
  {
    id: 27,
    avatarId: "27",
    avatarName: "Priya Sharma",
    avatarLevel: 38,
    avatarImage: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400",
    category: "Food",
    location: "Mumbai, India",
    title: "Indian Street Food Tour 🍛",
    viewers: 2123,
    isLive: false,
    likes: 19567,
    comments: 891,
    shares: 478,
    isFollowing: false,
    isLiked: true,
    thumbnail: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800",
    rating: 4.88,
    price: 26,
  },
  {
    id: 28,
    avatarId: "28",
    avatarName: "Hans Mueller",
    avatarLevel: 48,
    avatarImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400",
    category: "Museums",
    location: "Vienna, Austria",
    title: "Imperial Palace Museum 👑 LIVE",
    viewers: 1345,
    isLive: true,
    likes: 15234,
    comments: 678,
    shares: 334,
    isFollowing: true,
    isLiked: true,
    thumbnail: "https://images.unsplash.com/photo-1609137144813-7d9921338f24?w=800",
    rating: 4.92,
    price: 37,
  },
  {
    id: 29,
    avatarId: "29",
    avatarName: "Lara Johnson",
    avatarLevel: 44,
    avatarImage: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400",
    category: "Shopping",
    location: "London, UK",
    title: "Oxford Street Shopping Haul 🎁",
    viewers: 1789,
    isLive: false,
    likes: 16234,
    comments: 723,
    shares: 389,
    isFollowing: false,
    isLiked: false,
    thumbnail: "https://images.unsplash.com/photo-1519558260268-cde7e03a0152?w=800",
    rating: 4.73,
    price: 35,
  },
  {
    id: 30,
    avatarId: "30",
    avatarName: "Taro Suzuki",
    avatarLevel: 57,
    avatarImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400",
    category: "Tours",
    location: "Kyoto, Japan",
    title: "Cherry Blossom Temple Walk 🌸 LIVE",
    viewers: 3456,
    isLive: true,
    likes: 31234,
    comments: 1567,
    shares: 823,
    isFollowing: true,
    isLiked: true,
    thumbnail: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800",
    rating: 4.98,
    price: 43,
  },
];

const topAvatars = [
  {
    id: "1",
    name: "Sarah Chen",
    level: 42,
    rating: 4.9,
    price: 25,
    image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400",
    sessions: 342,
    category: "Tours",
  },
  {
    id: "2",
    name: "Marcus Stone",
    level: 38,
    rating: 4.8,
    price: 30,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
    sessions: 289,
    category: "Shopping",
  },
  {
    id: "3",
    name: "Elena Rodriguez",
    level: 56,
    rating: 5.0,
    price: 35,
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400",
    sessions: 456,
    category: "Museums",
  },
  {
    id: "4",
    name: "Yuki Tanaka",
    level: 44,
    rating: 4.7,
    price: 28,
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400",
    sessions: 412,
    category: "Food",
  },
];

export default function Home() {
  const navigate = useNavigate();
  const [showReels, setShowReels] = useState(false); // Changed to false - card feed is now the default
  const [currentReelIndex, setCurrentReelIndex] = useState(0);
  const [showComments, setShowComments] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");
  const [reelsData, setReelsData] = useState<Reel[]>(reels);
  const [isMuted, setIsMuted] = useState(false);
  const [showLocationSelector, setShowLocationSelector] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState("Current Location");
  const [locationInput, setLocationInput] = useState("");
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  const [showLocationToast, setShowLocationToast] = useState(false);
  const touchStartY = useRef<number>(0);
  const touchEndY = useRef<number>(0);

  // Get user role from localStorage
  const userRole = localStorage.getItem('userRole') || 'user';

  const popularLocations = [
    "Tokyo, Japan",
    "New York, USA",
    "Paris, France",
    "London, UK",
    "Dubai, UAE",
    "Barcelona, Spain",
    "Sydney, Australia",
    "Singapore",
    "Bangkok, Thailand",
    "Rome, Italy",
  ];

  const handleGetCurrentLocation = () => {
    setIsGettingLocation(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            // Use reverse geocoding API to get location name
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`,
              {
                headers: {
                  'User-Agent': 'CoTask/1.0'
                }
              }
            );
            
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            const locationName = data.address?.city || data.address?.town || data.address?.village || data.address?.state || "Current Location";
            const country = data.address?.country || "";
            setSelectedLocation(`${locationName}${country ? ', ' + country : ''}`);
            setLocationInput("");
            setShowLocationSelector(false);
            setShowLocationToast(true);
            setTimeout(() => setShowLocationToast(false), 3000);
          } catch (error) {
            console.error("Error getting location name:", error);
            // Fallback to coordinates if geocoding fails
            setSelectedLocation(`${latitude.toFixed(4)}, ${longitude.toFixed(4)}`);
            setShowLocationSelector(false);
            setShowLocationToast(true);
            setTimeout(() => setShowLocationToast(false), 3000);
          }
          setIsGettingLocation(false);
        },
        (error) => {
          console.error("Error getting location:", error);
          
          // Provide more specific error messages
          let errorMessage = "Unable to get your location. ";
          
          switch (error.code) {
            case error.PERMISSION_DENIED:
              errorMessage += "Please enable location permissions in your browser settings.";
              break;
            case error.POSITION_UNAVAILABLE:
              errorMessage += "Location information is unavailable.";
              break;
            case error.TIMEOUT:
              errorMessage += "Location request timed out.";
              break;
            default:
              errorMessage += "Please try again.";
          }
          
          alert(errorMessage);
          setIsGettingLocation(false);
        }
      );
    } else {
      alert("Geolocation is not supported by your browser");
      setIsGettingLocation(false);
    }
  };

  const handleLocationSubmit = () => {
    if (locationInput.trim()) {
      setSelectedLocation(locationInput.trim());
      setLocationInput("");
      setShowLocationSelector(false);
      setShowLocationToast(true);
      setTimeout(() => setShowLocationToast(false), 3000);
    }
  };

  const categories = [
    "All",
    "Live Now",
    "Tours",
    "Shopping",
    "Food",
    "Museums",
    "Tech",
    "Events",
    "Education",
  ];

  // Filter reels by location and category
  const getFilteredReels = () => {
    let filtered = reelsData;
    
    // Filter by location if not "Current Location"
    if (selectedLocation !== "Current Location") {
      filtered = filtered.filter(reel => 
        reel.location.toLowerCase().includes(selectedLocation.toLowerCase()) ||
        selectedLocation.toLowerCase().includes(reel.location.toLowerCase())
      );
    }
    
    // Filter by category
    if (activeCategory === "Live Now") {
      filtered = filtered.filter(r => r.isLive);
    } else if (activeCategory !== "All") {
      filtered = filtered.filter(r => r.category.toLowerCase().includes(activeCategory.toLowerCase()));
    }
    
    return filtered;
  };

  const filteredReels = getFilteredReels();
  
  // Also filter top avatars by location
  const getFilteredAvatars = () => {
    if (selectedLocation === "Current Location") {
      return topAvatars;
    }
    // This would filter avatars by location in a real app
    // For now, just return all
    return topAvatars;
  };

  const currentReel = filteredReels[currentReelIndex];

  // Filter reels when category changes
  useEffect(() => {
    setCurrentReelIndex(0);
  }, [activeCategory, reelsData]);

  // Handle swipe gestures
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.targetTouches[0].clientY;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndY.current = e.targetTouches[0].clientY;
  };

  const handleTouchEnd = () => {
    const diff = touchStartY.current - touchEndY.current;
    
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        // Swipe up - next reel
        if (currentReelIndex < filteredReels.length - 1) {
          setCurrentReelIndex(currentReelIndex + 1);
        }
      } else {
        // Swipe down - previous reel
        if (currentReelIndex > 0) {
          setCurrentReelIndex(currentReelIndex - 1);
        }
      }
    }
  };

  // Handle mouse wheel for desktop
  const handleWheel = (e: React.WheelEvent) => {
    if (Math.abs(e.deltaY) > 10) {
      if (e.deltaY > 0) {
        // Scroll down - next reel
        if (currentReelIndex < filteredReels.length - 1) {
          setCurrentReelIndex(currentReelIndex + 1);
        }
      } else {
        // Scroll up - previous reel
        if (currentReelIndex > 0) {
          setCurrentReelIndex(currentReelIndex - 1);
        }
      }
    }
  };

  // Handle keyboard navigation
  useEffect(() => {
    if (!showReels) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === "ArrowRight") {
        if (currentReelIndex < filteredReels.length - 1) {
          setCurrentReelIndex(currentReelIndex + 1);
        }
      } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
        if (currentReelIndex > 0) {
          setCurrentReelIndex(currentReelIndex - 1);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [showReels, currentReelIndex, filteredReels.length]);

  const handleLike = () => {
    setReelsData((prev) =>
      prev.map((reel, idx) =>
        idx === currentReelIndex
          ? {
              ...reel,
              isLiked: !reel.isLiked,
              likes: reel.isLiked ? reel.likes - 1 : reel.likes + 1,
            }
          : reel
      )
    );
  };

  const handleFollow = () => {
    setReelsData((prev) =>
      prev.map((reel, idx) =>
        idx === currentReelIndex ? { ...reel, isFollowing: !reel.isFollowing } : reel
      )
    );
  };

  const handleShare = () => {
    // Share functionality
    alert("Share reel!");
  };

  const handleJoinLive = () => {
    navigate(`/session/${currentReel.avatarId}`);
  };

  const handleBookAvatar = (id: string) => {
    navigate(`/booking/${id}`);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] relative overflow-hidden">
      {/* Fullscreen Reels Section */}
      <AnimatePresence mode="wait">
        {showReels && currentReel && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-30 bg-black"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onWheel={handleWheel}
          >
            {/* Reel Background */}
            <div className="absolute inset-0">
              <ImageWithFallback
                src={currentReel.thumbnail}
                alt={currentReel.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80" />
            </div>

            {/* Top Header */}
            <div className="absolute top-0 left-0 right-0 z-40 px-6 pt-8 pb-4 bg-gradient-to-b from-black/60 to-transparent">
              <div className="flex items-center justify-between">
                <h1 className="text-white text-2xl font-bold">CoTask</h1>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => navigate("/search")}
                    className="w-10 h-10 flex items-center justify-center"
                  >
                    <Search className="text-white" size={24} />
                  </button>
                  <button
                    onClick={() => navigate("/messages")}
                    className="w-10 h-10 flex items-center justify-center"
                  >
                    <MessageCircle className="text-white" size={24} />
                  </button>
                </div>
              </div>
            </div>

            {/* Bottom Content */}
            <div className="absolute bottom-0 left-0 right-0 z-40 p-6 pb-24">
              <div className="flex items-end justify-between gap-4">
                {/* Left Side - Reel Info */}
                <div className="flex-1 space-y-3">
                  {/* Avatar Info */}
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className="w-12 h-12 rounded-full border-2 border-primary overflow-hidden">
                        <ImageWithFallback
                          src={currentReel.avatarImage}
                          alt={currentReel.avatarName}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-primary rounded-full flex items-center justify-center text-xs font-bold text-primary-foreground border-2 border-black">
                        {currentReel.avatarLevel}
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-white font-bold text-lg">{currentReel.avatarName}</h3>
                        {currentReel.isLive && (
                          <div className="bg-red-500 px-2 py-0.5 rounded text-white text-xs font-bold flex items-center gap-1 animate-pulse">
                            <div className="w-1.5 h-1.5 bg-white rounded-full" />
                            LIVE
                          </div>
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-white/80 text-sm">
                        <MapPin size={14} />
                        <span>{currentReel.location}</span>
                      </div>
                    </div>
                  </div>

                  {/* Title */}
                  <h2 className="text-white font-semibold text-xl leading-tight">
                    {currentReel.title}
                  </h2>

                  {/* Category & Stats */}
                  <div className="flex items-center gap-4 text-white/80 text-sm">
                    <span className="px-3 py-1 bg-white/10 backdrop-blur-xl rounded-full border border-white/20">
                      {currentReel.category}
                    </span>
                    {currentReel.isLive && (
                      <div className="flex items-center gap-1">
                        <Users size={16} />
                        <span className="font-semibold">{currentReel.viewers.toLocaleString()}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-1">
                      <Star className="text-yellow-500 fill-yellow-500" size={16} />
                      <span className="font-semibold">{currentReel.rating}</span>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="flex items-center gap-2 text-white">
                    <DollarSign size={18} className="text-primary" />
                    <span className="font-bold text-lg">${currentReel.price}/hr</span>
                  </div>
                </div>

                {/* Right Side - Action Buttons */}
                <div className="flex flex-col items-center gap-6">
                  {/* Like */}
                  <button
                    onClick={handleLike}
                    className="flex flex-col items-center gap-1 active:scale-90 transition-transform"
                  >
                    <div
                      className={`w-14 h-14 rounded-full flex items-center justify-center ${
                        currentReel.isLiked
                          ? "bg-red-500"
                          : "bg-white/10 backdrop-blur-xl border border-white/20"
                      }`}
                    >
                      <Heart
                        className={currentReel.isLiked ? "text-white fill-white" : "text-white"}
                        size={24}
                      />
                    </div>
                    <span className="text-white text-xs font-semibold">
                      {currentReel.likes > 999
                        ? `${(currentReel.likes / 1000).toFixed(1)}K`
                        : currentReel.likes}
                    </span>
                  </button>

                  {/* Comment */}
                  <button
                    onClick={() => {
                      setShowComments(true);
                    }}
                    className="flex flex-col items-center gap-1 active:scale-90 transition-transform"
                  >
                    <div className="w-14 h-14 bg-white/10 backdrop-blur-xl rounded-full flex items-center justify-center border border-white/20">
                      <MessageCircle className="text-white" size={24} />
                    </div>
                    <span className="text-white text-xs font-semibold">
                      {currentReel.comments > 999
                        ? `${(currentReel.comments / 1000).toFixed(1)}K`
                        : currentReel.comments}
                    </span>
                  </button>

                  {/* Share */}
                  <button
                    onClick={handleShare}
                    className="flex flex-col items-center gap-1 active:scale-90 transition-transform"
                  >
                    <div className="w-14 h-14 bg-white/10 backdrop-blur-xl rounded-full flex items-center justify-center border border-white/20">
                      <Share2 className="text-white" size={24} />
                    </div>
                    <span className="text-white text-xs font-semibold">
                      {currentReel.shares}
                    </span>
                  </button>

                  {/* Follow */}
                  <button
                    onClick={handleFollow}
                    className="flex flex-col items-center gap-1 active:scale-90 transition-transform"
                  >
                    <div
                      className={`w-14 h-14 rounded-full flex items-center justify-center ${
                        currentReel.isFollowing
                          ? "bg-primary"
                          : "bg-white/10 backdrop-blur-xl border border-white/20"
                      }`}
                    >
                      <UserPlus className="text-white" size={24} />
                    </div>
                    <span className="text-white text-xs font-semibold">
                      {currentReel.isFollowing ? "Following" : "Follow"}
                    </span>
                  </button>

                  {/* Mute */}
                  <button
                    onClick={() => setIsMuted(!isMuted)}
                    className="w-14 h-14 bg-white/10 backdrop-blur-xl rounded-full flex items-center justify-center border border-white/20 active:scale-90 transition-transform"
                  >
                    {isMuted ? (
                      <VolumeX className="text-white" size={24} />
                    ) : (
                      <Volume2 className="text-white" size={24} />
                    )}
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 flex gap-3">
                <motion.button
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  onClick={() => {
                    if (currentReel.isLive) {
                      handleJoinLive();
                    } else {
                      navigate(`/session/${currentReel.avatarId}`);
                    }
                  }}
                  className="flex-1 bg-white text-gray-900 font-semibold py-3.5 rounded-2xl flex items-center justify-center gap-2 active:scale-95 transition-transform"
                >
                  <Zap size={20} />
                  Connect
                </motion.button>

                <motion.button
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 0 }}
                  transition={{ delay: 0.05 }}
                  onClick={() => navigate(`/profile/${currentReel.avatarId}`)}
                  className="flex-1 bg-white/20 backdrop-blur-xl text-white border border-white/30 font-semibold py-3.5 rounded-2xl flex items-center justify-center gap-2 active:scale-95 transition-transform"
                >
                  <User size={20} />
                  View Profile
                </motion.button>

                <motion.button
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  onClick={() => handleBookAvatar(currentReel.avatarId)}
                  className="flex-1 bg-white/20 backdrop-blur-xl text-white border border-white/30 font-semibold py-3.5 rounded-2xl flex items-center justify-center gap-2 active:scale-95 transition-transform"
                >
                  <Calendar size={20} />
                  Book Session
                </motion.button>
              </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex flex-col gap-2">
              {filteredReels.map((_, idx) => (
                <div
                  key={idx}
                  className={`w-1 rounded-full transition-all ${
                    idx === currentReelIndex ? "h-8 bg-primary" : "h-2 bg-white/40"
                  }`}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content (when reels are hidden) */}
      {!showReels && (
        <div className="pb-0">
          {/* Render role-specific home screens */}
          {userRole === 'user' && <DiscoverFeed />}

          {userRole === 'avatar' && <AvatarHomeScreen />}

          {userRole === 'enterprise' && <EnterpriseHomeScreen />}
        </div>
      )}

      {/* Bottom Navigation */}
      <BottomNav
        showReels={showReels}
        setShowReels={setShowReels}
        unreadNotifications={3}
      />

      {/* Comments Modal */}
      <CommentsModal
        isOpen={showComments}
        onClose={() => setShowComments(false)}
        reelTitle={currentReel?.title || ""}
        avatarName={currentReel?.avatarName || ""}
        totalComments={currentReel?.comments || 0}
        reelId={currentReel?.id}
      />

      {/* Location Selector Modal */}
      {showLocationSelector && (
        <div 
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center"
          onClick={() => setShowLocationSelector(false)}
        >
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-card border border-border rounded-t-3xl sm:rounded-3xl p-6 w-full sm:w-[500px] max-h-[80vh] overflow-hidden flex flex-col"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-foreground">Select Location</h3>
              <button
                onClick={() => setShowLocationSelector(false)}
                className="p-2 rounded-full hover:bg-secondary transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto space-y-3">
              <button
                onClick={handleGetCurrentLocation}
                className={`w-full bg-background border rounded-xl px-4 py-4 flex items-center gap-3 hover:border-primary/50 transition-all ${
                  isGettingLocation ? 'border-primary bg-primary/5' : 'border-border'
                }`}
              >
                <Navigation className="text-primary" size={20} />
                <span className="font-medium text-foreground flex-1 text-left">Use Current Location</span>
                {isGettingLocation && (
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                )}
              </button>
              
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={locationInput}
                  onChange={(e) => setLocationInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleLocationSubmit();
                  }}
                  placeholder="Type your location..."
                  className="w-full bg-background border border-border rounded-xl px-4 py-4 flex-1 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                />
                <button
                  onClick={handleLocationSubmit}
                  disabled={!locationInput.trim()}
                  className="w-12 h-12 bg-primary text-white rounded-xl flex items-center justify-center hover:bg-primary/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
                >
                  <MapPin size={20} />
                </button>
              </div>
            </div>

            <button
              onClick={() => navigate("/map")}
              className="mt-4 w-full bg-primary text-white font-semibold py-3 rounded-xl hover:bg-primary/90 transition-all flex items-center justify-center gap-2"
            >
              <MapIcon size={20} />
              Explore on 3D Map
            </button>
          </motion.div>
        </div>
      )}

      {/* Location Toast */}
      {showLocationToast && (
        <div
          className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 bg-card border border-border rounded-3xl px-6 py-4 flex items-center gap-3 shadow-lg"
        >
          <MapPin className="text-primary" size={20} />
          <span className="text-foreground font-medium">Location updated!</span>
        </div>
      )}
    </div>
  );
}