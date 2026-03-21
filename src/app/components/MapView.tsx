import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowLeft,
  MapPin,
  Star,
  DollarSign,
  Users,
  Zap,
  Globe as GlobeIcon,
  Search,
  Navigation,
  X,
  Map as MapIcon,
  Target,
  Layers,
  RotateCw,
  Sparkles,
} from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import InteractiveMap from "./InteractiveMap";
import BottomNav from "./BottomNav";

// Suppress THREE.js deprecation warnings globally
if (typeof console !== 'undefined') {
  const originalWarn = console.warn;
  console.warn = (...args) => {
    const message = args[0];
    if (
      typeof message === 'string' &&
      (message.includes('THREE.Clock') || 
       message.includes('THREE.THREE.Clock') ||
       message.includes('This module has been deprecated'))
    ) {
      return; // Suppress THREE.js deprecation warnings
    }
    originalWarn.apply(console, args);
  };
}

// Debounce utility for performance
function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;
  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

// Throttle utility for performance
function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle = false;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

// Dynamic import wrapper for Globe
let GlobeComponent: any = null;

interface Operator {
  id: string;
  name: string;
  specialty: string;
  location: string;
  country: string;
  city: string;
  coordinates: { lat: number; lng: number };
  rating: number;
  price: number;
  isLive: boolean;
  image: string;
  activeViewers?: number;
}

interface LocationSuggestion {
  country: string;
  city: string;
  coordinates: { lat: number; lng: number };
}

interface CityLabel {
  lat: number;
  lng: number;
  name: string;
  country: string;
  size: number;
  type: "capital" | "major" | "city";
}

export default function MapView() {
  const navigate = useNavigate();
  const [selectedOperator, setSelectedOperator] = useState<Operator | null>(null);
  const [viewMode, setViewMode] = useState<"globe" | "map">("globe"); // Always globe now
  const [category, setCategory] = useState("all");
  const [showLiveOnly, setShowLiveOnly] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [showNearby, setShowNearby] = useState(false);
  const [globeLoaded, setGlobeLoaded] = useState(false);
  const [globeReady, setGlobeReady] = useState(false);
  const [altitude, setAltitude] = useState(2.5);
  const [showLabels, setShowLabels] = useState(true);
  const [enableRotation, setEnableRotation] = useState(true);
  const [dimensions, setDimensions] = useState({ width: window.innerWidth, height: window.innerHeight });
  const globeEl = useRef<any>();

  const operators: Operator[] = [
    {
      id: "1",
      name: "Sarah Chen",
      specialty: "Virtual Tours",
      location: "Tokyo Tower, Minato",
      country: "Japan",
      city: "Tokyo",
      coordinates: { lat: 35.6586, lng: 139.7454 },
      rating: 4.9,
      price: 25,
      isLive: true,
      image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400",
      activeViewers: 12,
    },
    {
      id: "2",
      name: "Marcus Stone",
      specialty: "Shopping Assistant",
      location: "Times Square, Manhattan",
      country: "USA",
      city: "New York",
      coordinates: { lat: 40.7580, lng: -73.9855 },
      rating: 4.8,
      price: 30,
      isLive: true,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
      activeViewers: 8,
    },
    {
      id: "3",
      name: "Elena Rodriguez",
      specialty: "Museum Guide",
      location: "Sagrada Familia",
      country: "Spain",
      city: "Barcelona",
      coordinates: { lat: 41.4036, lng: 2.1744 },
      rating: 5.0,
      price: 35,
      isLive: false,
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400",
    },
    {
      id: "4",
      name: "Yuki Tanaka",
      specialty: "Food Explorer",
      location: "Dotonbori District",
      country: "Japan",
      city: "Osaka",
      coordinates: { lat: 34.6686, lng: 135.5004 },
      rating: 4.7,
      price: 28,
      isLive: true,
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400",
      activeViewers: 5,
    },
    {
      id: "5",
      name: "Alex Rivera",
      specialty: "Adventure Guide",
      location: "Torres del Paine",
      country: "Chile",
      city: "Patagonia",
      coordinates: { lat: -51.0, lng: -73.0 },
      rating: 4.9,
      price: 40,
      isLive: false,
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400",
    },
    {
      id: "6",
      name: "Sophie Martin",
      specialty: "Art Tours",
      location: "Louvre Museum",
      country: "France",
      city: "Paris",
      coordinates: { lat: 48.8606, lng: 2.3376 },
      rating: 4.8,
      price: 32,
      isLive: true,
      image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400",
      activeViewers: 15,
    },
    {
      id: "7",
      name: "Ahmed Hassan",
      specialty: "Historical Tours",
      location: "Great Pyramids of Giza",
      country: "Egypt",
      city: "Cairo",
      coordinates: { lat: 29.9792, lng: 31.1342 },
      rating: 4.9,
      price: 27,
      isLive: false,
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400",
    },
    {
      id: "8",
      name: "Maria Santos",
      specialty: "Beach Guide",
      location: "Copacabana Beach",
      country: "Brazil",
      city: "Rio de Janeiro",
      coordinates: { lat: -22.9711, lng: -43.1822 },
      rating: 4.6,
      price: 24,
      isLive: true,
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400",
      activeViewers: 9,
    },
    {
      id: "9",
      name: "David Kim",
      specialty: "Tech Tours",
      location: "Silicon Valley",
      country: "USA",
      city: "San Francisco",
      coordinates: { lat: 37.3875, lng: -122.0575 },
      rating: 4.7,
      price: 45,
      isLive: true,
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400",
      activeViewers: 6,
    },
    {
      id: "10",
      name: "Isabella Rossi",
      specialty: "Culinary Tours",
      location: "Colosseum Area",
      country: "Italy",
      city: "Rome",
      coordinates: { lat: 41.8902, lng: 12.4922 },
      rating: 5.0,
      price: 38,
      isLive: false,
      image: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=400",
    },
    {
      id: "11",
      name: "James Cooper",
      specialty: "Architecture Tours",
      location: "Tower Bridge",
      country: "UK",
      city: "London",
      coordinates: { lat: 51.5055, lng: -0.0754 },
      rating: 4.8,
      price: 33,
      isLive: true,
      image: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=400",
      activeViewers: 11,
    },
    {
      id: "12",
      name: "Fatima Al-Rashid",
      specialty: "Cultural Tours",
      location: "Burj Khalifa",
      country: "UAE",
      city: "Dubai",
      coordinates: { lat: 25.1972, lng: 55.2744 },
      rating: 4.9,
      price: 50,
      isLive: true,
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400",
      activeViewers: 20,
    },
    {
      id: "13",
      name: "Chen Wei",
      specialty: "Historic Sites",
      location: "Great Wall",
      country: "China",
      city: "Beijing",
      coordinates: { lat: 40.4319, lng: 116.5704 },
      rating: 4.7,
      price: 29,
      isLive: false,
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400",
    },
    {
      id: "14",
      name: "Priya Sharma",
      specialty: "Temple Tours",
      location: "Taj Mahal",
      country: "India",
      city: "Agra",
      coordinates: { lat: 27.1751, lng: 78.0421 },
      rating: 5.0,
      price: 22,
      isLive: true,
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400",
      activeViewers: 14,
    },
    {
      id: "15",
      name: "Liam O'Brien",
      specialty: "Nature Tours",
      location: "Sydney Opera House",
      country: "Australia",
      city: "Sydney",
      coordinates: { lat: -33.8568, lng: 151.2153 },
      rating: 4.8,
      price: 35,
      isLive: true,
      image: "https://images.unsplash.com/photo-1463453091185-61582044d556?w=400",
      activeViewers: 7,
    },
  ];

  // Top 60 major world cities
  const worldCities: CityLabel[] = [
    { lat: 35.6762, lng: 139.6503, name: "Tokyo", country: "Japan", size: 1.0, type: "capital" },
    { lat: 31.2304, lng: 121.4737, name: "Shanghai", country: "China", size: 0.9, type: "major" },
    { lat: 40.7128, lng: -74.006, name: "New York", country: "USA", size: 1.0, type: "major" },
    { lat: 19.4326, lng: -99.1332, name: "Mexico City", country: "Mexico", size: 0.9, type: "capital" },
    { lat: -23.5505, lng: -46.6333, name: "São Paulo", country: "Brazil", size: 0.9, type: "major" },
    { lat: 28.6139, lng: 77.2090, name: "Delhi", country: "India", size: 0.9, type: "capital" },
    { lat: 30.0444, lng: 31.2357, name: "Cairo", country: "Egypt", size: 0.8, type: "capital" },
    { lat: 39.9042, lng: 116.4074, name: "Beijing", country: "China", size: 0.9, type: "capital" },
    { lat: 51.5074, lng: -0.1278, name: "London", country: "UK", size: 0.9, type: "capital" },
    { lat: 48.8566, lng: 2.3522, name: "Paris", country: "France", size: 0.9, type: "capital" },
    { lat: 55.7558, lng: 37.6173, name: "Moscow", country: "Russia", size: 0.9, type: "capital" },
    { lat: 41.0082, lng: 28.9784, name: "Istanbul", country: "Turkey", size: 0.9, type: "major" },
    { lat: 34.0522, lng: -118.2437, name: "Los Angeles", country: "USA", size: 0.8, type: "major" },
    { lat: -22.9068, lng: -43.1729, name: "Rio de Janeiro", country: "Brazil", size: 0.8, type: "major" },
    { lat: 37.5665, lng: 126.9780, name: "Seoul", country: "S. Korea", size: 0.8, type: "capital" },
    { lat: 19.0760, lng: 72.8777, name: "Mumbai", country: "India", size: 0.8, type: "major" },
    { lat: 34.6937, lng: 135.5023, name: "Osaka", country: "Japan", size: 0.7, type: "major" },
    { lat: -6.2088, lng: 106.8456, name: "Jakarta", country: "Indonesia", size: 0.8, type: "capital" },
    { lat: 22.3193, lng: 114.1694, name: "Hong Kong", country: "China", size: 0.7, type: "major" },
    { lat: 13.7563, lng: 100.5018, name: "Bangkok", country: "Thailand", size: 0.8, type: "capital" },
    { lat: 23.8103, lng: 90.4125, name: "Dhaka", country: "Bangladesh", size: 0.7, type: "capital" },
    { lat: 24.8607, lng: 67.0011, name: "Karachi", country: "Pakistan", size: 0.7, type: "major" },
    { lat: 41.8781, lng: -87.6298, name: "Chicago", country: "USA", size: 0.7, type: "major" },
    { lat: 52.5200, lng: 13.4050, name: "Berlin", country: "Germany", size: 0.7, type: "capital" },
    { lat: 41.9028, lng: 12.4964, name: "Rome", country: "Italy", size: 0.7, type: "capital" },
    { lat: 40.4168, lng: -3.7038, name: "Madrid", country: "Spain", size: 0.7, type: "capital" },
    { lat: 41.3851, lng: 2.1734, name: "Barcelona", country: "Spain", size: 0.7, type: "major" },
    { lat: 45.4642, lng: 9.1900, name: "Milan", country: "Italy", size: 0.7, type: "major" },
    { lat: 25.2048, lng: 55.2708, name: "Dubai", country: "UAE", size: 0.7, type: "major" },
    { lat: 1.3521, lng: 103.8198, name: "Singapore", country: "Singapore", size: 0.7, type: "capital" },
    { lat: 35.6892, lng: 51.3890, name: "Tehran", country: "Iran", size: 0.7, type: "capital" },
    { lat: 23.8859, lng: 45.0792, name: "Riyadh", country: "Saudi Arabia", size: 0.7, type: "capital" },
    { lat: -34.6037, lng: -58.3816, name: "Buenos Aires", country: "Argentina", size: 0.7, type: "capital" },
    { lat: -33.8688, lng: 151.2093, name: "Sydney", country: "Australia", size: 0.7, type: "major" },
    { lat: -37.8136, lng: 144.9631, name: "Melbourne", country: "Australia", size: 0.7, type: "major" },
    { lat: 43.6532, lng: -79.3832, name: "Toronto", country: "Canada", size: 0.7, type: "major" },
    { lat: 6.5244, lng: 3.3792, name: "Lagos", country: "Nigeria", size: 0.7, type: "major" },
    { lat: -26.2041, lng: 28.0473, name: "Johannesburg", country: "S. Africa", size: 0.7, type: "major" },
    { lat: 14.5995, lng: 120.9842, name: "Manila", country: "Philippines", size: 0.7, type: "capital" },
    { lat: 10.8231, lng: 106.6297, name: "Ho Chi Minh", country: "Vietnam", size: 0.7, type: "major" },
    { lat: -12.0464, lng: -77.0428, name: "Lima", country: "Peru", size: 0.7, type: "capital" },
    { lat: 4.7110, lng: -74.0721, name: "Bogotá", country: "Colombia", size: 0.7, type: "capital" },
    { lat: -33.4489, lng: -70.6693, name: "Santiago", country: "Chile", size: 0.7, type: "capital" },
    { lat: 37.7749, lng: -122.4194, name: "San Francisco", country: "USA", size: 0.7, type: "major" },
    { lat: 12.9716, lng: 77.5946, name: "Bangalore", country: "India", size: 0.7, type: "major" },
    { lat: 52.3676, lng: 4.9041, name: "Amsterdam", country: "Netherlands", size: 0.6, type: "capital" },
    { lat: 50.0755, lng: 14.4378, name: "Prague", country: "Czech Rep.", size: 0.6, type: "capital" },
    { lat: 48.2082, lng: 16.3738, name: "Vienna", country: "Austria", size: 0.6, type: "capital" },
    { lat: 59.3293, lng: 18.0686, name: "Stockholm", country: "Sweden", size: 0.6, type: "capital" },
    { lat: 55.6761, lng: 12.5683, name: "Copenhagen", country: "Denmark", size: 0.6, type: "capital" },
    { lat: 37.9838, lng: 23.7275, name: "Athens", country: "Greece", size: 0.6, type: "capital" },
    { lat: 25.0330, lng: 121.5654, name: "Taipei", country: "Taiwan", size: 0.6, type: "capital" },
    { lat: 3.1390, lng: 101.6869, name: "Kuala Lumpur", country: "Malaysia", size: 0.6, type: "capital" },
    { lat: 21.0285, lng: 105.8542, name: "Hanoi", country: "Vietnam", size: 0.6, type: "capital" },
    { lat: -1.2921, lng: 36.8219, name: "Nairobi", country: "Kenya", size: 0.6, type: "capital" },
    { lat: 33.8869, lng: 35.5131, name: "Beirut", country: "Lebanon", size: 0.6, type: "capital" },
    { lat: 39.9334, lng: 32.8597, name: "Ankara", country: "Turkey", size: 0.6, type: "capital" },
    { lat: 25.2854, lng: 51.5310, name: "Doha", country: "Qatar", size: 0.6, type: "capital" },
    { lat: 38.9072, lng: -77.0369, name: "Washington DC", country: "USA", size: 0.7, type: "capital" },
    { lat: 25.7617, lng: -80.1918, name: "Miami", country: "USA", size: 0.6, type: "major" },
    // Additional 180+ cities for comprehensive global coverage
    { lat: 29.7604, lng: -95.3698, name: "Houston", country: "USA", size: 0.6, type: "major" },
    { lat: 33.4484, lng: -112.0740, name: "Phoenix", country: "USA", size: 0.6, type: "major" },
    { lat: 39.7392, lng: -104.9903, name: "Denver", country: "USA", size: 0.5, type: "major" },
    { lat: 47.6062, lng: -122.3321, name: "Seattle", country: "USA", size: 0.6, type: "major" },
    { lat: 42.3601, lng: -71.0589, name: "Boston", country: "USA", size: 0.6, type: "major" },
    { lat: 33.7490, lng: -84.3880, name: "Atlanta", country: "USA", size: 0.6, type: "major" },
    { lat: 32.7767, lng: -96.7970, name: "Dallas", country: "USA", size: 0.6, type: "major" },
    { lat: 45.4215, lng: -75.6972, name: "Ottawa", country: "Canada", size: 0.5, type: "capital" },
    { lat: 49.2827, lng: -123.1207, name: "Vancouver", country: "Canada", size: 0.6, type: "major" },
    { lat: 45.5017, lng: -73.5673, name: "Montreal", country: "Canada", size: 0.6, type: "major" },
    { lat: 20.6597, lng: -103.3496, name: "Guadalajara", country: "Mexico", size: 0.6, type: "major" },
    { lat: 25.6866, lng: -100.3161, name: "Monterrey", country: "Mexico", size: 0.6, type: "major" },
    { lat: 9.9281, lng: -84.0907, name: "San José", country: "Costa Rica", size: 0.5, type: "capital" },
    { lat: 8.9824, lng: -79.5199, name: "Panama City", country: "Panama", size: 0.5, type: "capital" },
    { lat: 10.4806, lng: -66.9036, name: "Caracas", country: "Venezuela", size: 0.6, type: "capital" },
    { lat: -15.7975, lng: -47.8919, name: "Brasília", country: "Brazil", size: 0.6, type: "capital" },
    { lat: -12.9714, lng: -38.5014, name: "Salvador", country: "Brazil", size: 0.5, type: "major" },
    { lat: -34.9011, lng: -56.1645, name: "Montevideo", country: "Uruguay", size: 0.5, type: "capital" },
    { lat: 53.3498, lng: -6.2603, name: "Dublin", country: "Ireland", size: 0.6, type: "capital" },
    { lat: 50.8503, lng: 4.3517, name: "Brussels", country: "Belgium", size: 0.6, type: "capital" },
    { lat: 47.3769, lng: 8.5417, name: "Zurich", country: "Switzerland", size: 0.6, type: "major" },
    { lat: 50.1109, lng: 8.6821, name: "Frankfurt", country: "Germany", size: 0.6, type: "major" },
    { lat: 48.1351, lng: 11.5820, name: "Munich", country: "Germany", size: 0.6, type: "major" },
    { lat: 53.5511, lng: 9.9937, name: "Hamburg", country: "Germany", size: 0.6, type: "major" },
    { lat: 45.7489, lng: 4.8467, name: "Lyon", country: "France", size: 0.5, type: "major" },
    { lat: 43.2965, lng: 5.3698, name: "Marseille", country: "France", size: 0.5, type: "major" },
    { lat: 38.7223, lng: -9.1393, name: "Lisbon", country: "Portugal", size: 0.6, type: "capital" },
    { lat: 39.4699, lng: -0.3763, name: "Valencia", country: "Spain", size: 0.5, type: "major" },
    { lat: 37.3891, lng: -5.9845, name: "Seville", country: "Spain", size: 0.5, type: "major" },
    { lat: 40.8518, lng: 14.2681, name: "Naples", country: "Italy", size: 0.5, type: "major" },
    { lat: 43.7696, lng: 11.2558, name: "Florence", country: "Italy", size: 0.5, type: "major" },
    { lat: 44.4268, lng: 26.1025, name: "Bucharest", country: "Romania", size: 0.6, type: "capital" },
    { lat: 42.6977, lng: 23.3219, name: "Sofia", country: "Bulgaria", size: 0.5, type: "capital" },
    { lat: 44.7866, lng: 20.4489, name: "Belgrade", country: "Serbia", size: 0.5, type: "capital" },
    { lat: 47.4979, lng: 19.0402, name: "Budapest", country: "Hungary", size: 0.6, type: "capital" },
    { lat: 52.2297, lng: 21.0122, name: "Warsaw", country: "Poland", size: 0.6, type: "capital" },
    { lat: 50.4501, lng: 30.5234, name: "Kyiv", country: "Ukraine", size: 0.6, type: "capital" },
    { lat: 59.9311, lng: 30.3609, name: "St Petersburg", country: "Russia", size: 0.7, type: "major" },
    { lat: 41.7151, lng: 44.8271, name: "Tbilisi", country: "Georgia", size: 0.5, type: "capital" },
    { lat: 31.7683, lng: 35.2137, name: "Jerusalem", country: "Israel", size: 0.5, type: "capital" },
    { lat: 32.0853, lng: 34.7818, name: "Tel Aviv", country: "Israel", size: 0.5, type: "major" },
    { lat: 33.3128, lng: 44.3615, name: "Baghdad", country: "Iraq", size: 0.6, type: "capital" },
    { lat: 21.4858, lng: 39.1925, name: "Jeddah", country: "Saudi Arabia", size: 0.6, type: "major" },
    { lat: 24.4539, lng: 54.3773, name: "Abu Dhabi", country: "UAE", size: 0.6, type: "capital" },
    { lat: 23.6850, lng: 58.4055, name: "Muscat", country: "Oman", size: 0.5, type: "capital" },
    { lat: 41.3275, lng: 69.2785, name: "Tashkent", country: "Uzbekistan", size: 0.5, type: "capital" },
    { lat: 51.1694, lng: 71.4491, name: "Astana", country: "Kazakhstan", size: 0.5, type: "capital" },
    { lat: 34.5553, lng: 69.2075, name: "Kabul", country: "Afghanistan", size: 0.5, type: "capital" },
    { lat: 33.6844, lng: 73.0479, name: "Islamabad", country: "Pakistan", size: 0.5, type: "capital" },
    { lat: 31.5497, lng: 74.3436, name: "Lahore", country: "Pakistan", size: 0.6, type: "major" },
    { lat: 27.7172, lng: 85.3240, name: "Kathmandu", country: "Nepal", size: 0.5, type: "capital" },
    { lat: 6.9271, lng: 79.8612, name: "Colombo", country: "Sri Lanka", size: 0.5, type: "capital" },
    { lat: 16.8661, lng: 96.1951, name: "Yangon", country: "Myanmar", size: 0.5, type: "major" },
    { lat: 11.5564, lng: 104.9282, name: "Phnom Penh", country: "Cambodia", size: 0.5, type: "capital" },
    { lat: -6.9175, lng: 107.6191, name: "Bandung", country: "Indonesia", size: 0.5, type: "major" },
    { lat: -7.2575, lng: 112.7521, name: "Surabaya", country: "Indonesia", size: 0.5, type: "major" },
    { lat: 10.3157, lng: 123.8854, name: "Cebu", country: "Philippines", size: 0.5, type: "major" },
    { lat: -41.2865, lng: 174.7762, name: "Wellington", country: "New Zealand", size: 0.5, type: "capital" },
    { lat: -36.8485, lng: 174.7633, name: "Auckland", country: "New Zealand", size: 0.6, type: "major" },
    { lat: -27.4698, lng: 153.0251, name: "Brisbane", country: "Australia", size: 0.6, type: "major" },
    { lat: -31.9505, lng: 115.8605, name: "Perth", country: "Australia", size: 0.6, type: "major" },
    { lat: -35.2820, lng: 149.1287, name: "Canberra", country: "Australia", size: 0.5, type: "capital" },
    { lat: 59.3293, lng: 18.0686, name: "Stockholm", country: "Sweden", size: 0.6, type: "capital" },
    { lat: 60.1699, lng: 24.9384, name: "Helsinki", country: "Finland", size: 0.5, type: "capital" },
    { lat: 59.9139, lng: 10.7522, name: "Oslo", country: "Norway", size: 0.5, type: "capital" },
    { lat: 64.1466, lng: -21.9426, name: "Reykjavik", country: "Iceland", size: 0.5, type: "capital" },
    { lat: 13.7367, lng: 100.5232, name: "Chiang Mai", country: "Thailand", size: 0.5, type: "major" },
    { lat: 7.8804, lng: 98.3923, name: "Phuket", country: "Thailand", size: 0.4, type: "major" },
    { lat: 35.1796, lng: 129.0756, name: "Busan", country: "S. Korea", size: 0.6, type: "major" },
    { lat: 30.2672, lng: 120.1531, name: "Hangzhou", country: "China", size: 0.6, type: "major" },
    { lat: 23.1291, lng: 113.2644, name: "Guangzhou", country: "China", size: 0.7, type: "major" },
    { lat: 22.5431, lng: 114.0579, name: "Shenzhen", country: "China", size: 0.7, type: "major" },
    { lat: 30.5728, lng: 114.3055, name: "Wuhan", country: "China", size: 0.6, type: "major" },
    { lat: 29.5630, lng: 106.5516, name: "Chongqing", country: "China", size: 0.6, type: "major" },
    { lat: 22.3964, lng: 114.1095, name: "Kowloon", country: "Hong Kong", size: 0.6, type: "major" },
    { lat: 43.8563, lng: 125.3245, name: "Changchun", country: "China", size: 0.5, type: "major" },
    { lat: 36.6700, lng: 117.0206, name: "Jinan", country: "China", size: 0.5, type: "major" },
    { lat: 26.0614, lng: 119.3061, name: "Fuzhou", country: "China", size: 0.5, type: "major" },
    { lat: 24.4798, lng: 118.0894, name: "Xiamen", country: "China", size: 0.5, type: "major" },
    { lat: 36.0611, lng: 103.8343, name: "Lanzhou", country: "China", size: 0.5, type: "major" },
    { lat: 29.8683, lng: 121.5440, name: "Ningbo", country: "China", size: 0.5, type: "major" },
    { lat: 31.8903, lng: 117.2808, name: "Hefei", country: "China", size: 0.5, type: "major" },
    { lat: 28.2282, lng: 112.9388, name: "Changsha", country: "China", size: 0.5, type: "major" },
    { lat: 30.6600, lng: 104.0633, name: "Chengdu", country: "China", size: 0.6, type: "major" },
    { lat: 36.6512, lng: 101.7782, name: "Xining", country: "China", size: 0.4, type: "major" },
    { lat: 29.4316, lng: 106.9123, name: "Chongqing", country: "China", size: 0.6, type: "major" },
    { lat: 25.0453, lng: 102.7141, name: "Kunming", country: "China", size: 0.5, type: "major" },
    { lat: 26.5783, lng: 106.7135, name: "Guiyang", country: "China", size: 0.5, type: "major" },
    { lat: 22.8170, lng: 108.3665, name: "Nanning", country: "China", size: 0.5, type: "major" },
    { lat: 43.8256, lng: 87.6168, name: "Ürümqi", country: "China", size: 0.5, type: "major" },
    { lat: 29.5500, lng: 91.1000, name: "Lhasa", country: "Tibet", size: 0.4, type: "capital" },
    { lat: 47.9221, lng: 106.9155, name: "Ulaanbaatar", country: "Mongolia", size: 0.5, type: "capital" },
    { lat: 39.0392, lng: 125.7625, name: "Pyongyang", country: "N. Korea", size: 0.5, type: "capital" },
    { lat: 35.9078, lng: 127.7669, name: "Daejeon", country: "S. Korea", size: 0.5, type: "major" },
    { lat: 35.5384, lng: 129.3114, name: "Ulsan", country: "S. Korea", size: 0.5, type: "major" },
    { lat: 37.4563, lng: 126.7052, name: "Incheon", country: "S. Korea", size: 0.5, type: "major" },
    { lat: 33.4996, lng: 126.5312, name: "Jeju", country: "S. Korea", size: 0.4, type: "major" },
    { lat: 35.1815, lng: 136.9066, name: "Nagoya", country: "Japan", size: 0.6, type: "major" },
    { lat: 34.6937, lng: 135.5023, name: "Osaka", country: "Japan", size: 0.7, type: "major" },
    { lat: 35.0116, lng: 135.7681, name: "Kyoto", country: "Japan", size: 0.6, type: "major" },
    { lat: 34.3853, lng: 132.4553, name: "Hiroshima", country: "Japan", size: 0.5, type: "major" },
    { lat: 33.5904, lng: 130.4017, name: "Fukuoka", country: "Japan", size: 0.5, type: "major" },
    { lat: 43.0642, lng: 141.3469, name: "Sapporo", country: "Japan", size: 0.5, type: "major" },
    { lat: 26.2124, lng: 127.6809, name: "Naha", country: "Japan", size: 0.4, type: "major" },
    { lat: 36.3270, lng: 59.6200, name: "Mashhad", country: "Iran", size: 0.5, type: "major" },
    { lat: 29.6097, lng: 52.5313, name: "Shiraz", country: "Iran", size: 0.5, type: "major" },
    { lat: 32.6546, lng: 51.6746, name: "Isfahan", country: "Iran", size: 0.5, type: "major" },
    { lat: 38.0833, lng: 46.2919, name: "Tabriz", country: "Iran", size: 0.5, type: "major" },
    { lat: 17.3850, lng: 78.4867, name: "Hyderabad", country: "India", size: 0.6, type: "major" },
    { lat: 13.0827, lng: 80.2707, name: "Chennai", country: "India", size: 0.6, type: "major" },
    { lat: 22.5726, lng: 88.3639, name: "Kolkata", country: "India", size: 0.6, type: "major" },
    { lat: 18.5204, lng: 73.8567, name: "Pune", country: "India", size: 0.5, type: "major" },
    { lat: 23.0225, lng: 72.5714, name: "Ahmedabad", country: "India", size: 0.5, type: "major" },
    { lat: 26.9124, lng: 75.7873, name: "Jaipur", country: "India", size: 0.5, type: "major" },
    { lat: 28.7041, lng: 77.1025, name: "New Delhi", country: "India", size: 0.7, type: "capital" },
    { lat: 11.0168, lng: 76.9558, name: "Coimbatore", country: "India", size: 0.4, type: "major" },
    { lat: 8.5241, lng: 76.9366, name: "Thiruvananthapuram", country: "India", size: 0.4, type: "major" },
    { lat: 9.9312, lng: 76.2673, name: "Kochi", country: "India", size: 0.4, type: "major" },
    { lat: 15.3173, lng: 75.7139, name: "Hubli", country: "India", size: 0.4, type: "major" },
    { lat: 21.1458, lng: 79.0882, name: "Nagpur", country: "India", size: 0.4, type: "major" },
    { lat: 25.5941, lng: 85.1376, name: "Patna", country: "India", size: 0.4, type: "major" },
    { lat: 26.8467, lng: 80.9462, name: "Lucknow", country: "India", size: 0.5, type: "major" },
    { lat: 30.7333, lng: 76.7794, name: "Chandigarh", country: "India", size: 0.4, type: "capital" },
    { lat: 31.6340, lng: 74.8723, name: "Amritsar", country: "India", size: 0.4, type: "major" },
    { lat: 23.2599, lng: 77.4126, name: "Bhopal", country: "India", size: 0.4, type: "major" },
    { lat: 22.7196, lng: 75.8577, name: "Indore", country: "India", size: 0.4, type: "major" },
    { lat: -6.2146, lng: 106.8451, name: "Jakarta", country: "Indonesia", size: 0.8, type: "capital" },
    { lat: -8.6705, lng: 115.2126, name: "Denpasar", country: "Indonesia", size: 0.5, type: "major" },
    { lat: -6.9666, lng: 110.4203, name: "Semarang", country: "Indonesia", size: 0.4, type: "major" },
    { lat: -7.7956, lng: 110.3695, name: "Yogyakarta", country: "Indonesia", size: 0.4, type: "major" },
    { lat: 3.5952, lng: 98.6722, name: "Medan", country: "Indonesia", size: 0.5, type: "major" },
    { lat: -1.2709, lng: 116.8317, name: "Balikpapan", country: "Indonesia", size: 0.4, type: "major" },
    { lat: -5.1477, lng: 119.4327, name: "Makassar", country: "Indonesia", size: 0.4, type: "major" },
    { lat: 3.0738, lng: 101.5183, name: "Shah Alam", country: "Malaysia", size: 0.4, type: "major" },
    { lat: 5.4164, lng: 100.3327, name: "George Town", country: "Malaysia", size: 0.4, type: "major" },
    { lat: 1.4927, lng: 103.7414, name: "Johor Bahru", country: "Malaysia", size: 0.4, type: "major" },
    { lat: 5.9749, lng: 116.0724, name: "Kota Kinabalu", country: "Malaysia", size: 0.4, type: "major" },
    { lat: 1.5535, lng: 110.3593, name: "Kuching", country: "Malaysia", size: 0.4, type: "major" },
    { lat: 18.7883, lng: 98.9853, name: "Chiang Rai", country: "Thailand", size: 0.4, type: "major" },
    { lat: 12.9236, lng: 100.8825, name: "Pattaya", country: "Thailand", size: 0.4, type: "major" },
    { lat: 7.0070, lng: 100.4925, name: "Hat Yai", country: "Thailand", size: 0.4, type: "major" },
    { lat: 16.0544, lng: 103.6522, name: "Udon Thani", country: "Thailand", size: 0.4, type: "major" },
    { lat: 18.7060, lng: 99.0105, name: "Chiang Mai", country: "Thailand", size: 0.5, type: "major" },
    // Additional 200+ cities for comprehensive coverage when zoomed in
    { lat: 36.7783, lng: -119.4179, name: "Fresno", country: "USA", size: 0.4, type: "city" },
    { lat: 35.2271, lng: -80.8431, name: "Charlotte", country: "USA", size: 0.5, type: "major" },
    { lat: 30.2672, lng: -97.7431, name: "Austin", country: "USA", size: 0.5, type: "major" },
    { lat: 35.4676, lng: -97.5164, name: "Oklahoma City", country: "USA", size: 0.4, type: "city" },
    { lat: 39.7684, lng: -86.1581, name: "Indianapolis", country: "USA", size: 0.4, type: "city" },
    { lat: 41.2565, lng: -95.9345, name: "Omaha", country: "USA", size: 0.4, type: "city" },
    { lat: 35.1495, lng: -90.0490, name: "Memphis", country: "USA", size: 0.4, type: "city" },
    { lat: 36.1627, lng: -86.7816, name: "Nashville", country: "USA", size: 0.4, type: "city" },
    { lat: 38.2527, lng: -85.7585, name: "Louisville", country: "USA", size: 0.4, type: "city" },
    { lat: 43.0389, lng: -87.9065, name: "Milwaukee", country: "USA", size: 0.4, type: "city" },
    { lat: 39.2904, lng: -76.6122, name: "Baltimore", country: "USA", size: 0.4, type: "city" },
    { lat: 32.7157, lng: -117.1611, name: "San Diego", country: "USA", size: 0.5, type: "major" },
    { lat: 37.3382, lng: -121.8863, name: "San Jose", country: "USA", size: 0.5, type: "major" },
    { lat: 33.5207, lng: -112.2630, name: "Glendale", country: "USA", size: 0.3, type: "city" },
    { lat: 33.4484, lng: -112.0740, name: "Mesa", country: "USA", size: 0.3, type: "city" },
    { lat: 40.7608, lng: -111.8910, name: "Salt Lake City", country: "USA", size: 0.4, type: "city" },
    { lat: 35.7796, lng: -78.6382, name: "Raleigh", country: "USA", size: 0.4, type: "city" },
    { lat: 27.9506, lng: -82.4572, name: "Tampa", country: "USA", size: 0.4, type: "city" },
    { lat: 28.5383, lng: -81.3792, name: "Orlando", country: "USA", size: 0.4, type: "city" },
    { lat: 38.5816, lng: -121.4944, name: "Sacramento", country: "USA", size: 0.4, type: "city" },
    { lat: 43.6150, lng: -116.2023, name: "Boise", country: "USA", size: 0.3, type: "city" },
    { lat: 35.0844, lng: -106.6504, name: "Albuquerque", country: "USA", size: 0.4, type: "city" },
    { lat: 32.2226, lng: -110.9747, name: "Tucson", country: "USA", size: 0.4, type: "city" },
    { lat: 21.3099, lng: -157.8581, name: "Honolulu", country: "USA", size: 0.4, type: "city" },
    { lat: 61.2181, lng: -149.9003, name: "Anchorage", country: "USA", size: 0.4, type: "city" },
    { lat: 46.8721, lng: -96.7898, name: "Fargo", country: "USA", size: 0.3, type: "city" },
    { lat: 41.6005, lng: -93.6091, name: "Des Moines", country: "USA", size: 0.3, type: "city" },
    { lat: 44.9778, lng: -93.2650, name: "Minneapolis", country: "USA", size: 0.4, type: "city" },
    { lat: 39.7392, lng: -104.9903, name: "Aurora", country: "USA", size: 0.3, type: "city" },
    { lat: 51.2538, lng: -85.3232, name: "Thunder Bay", country: "Canada", size: 0.3, type: "city" },
    { lat: 46.4917, lng: -84.3458, name: "Sault Ste Marie", country: "Canada", size: 0.3, type: "city" },
    { lat: 49.8954, lng: -97.1385, name: "Winnipeg", country: "Canada", size: 0.4, type: "city" },
    { lat: 50.4452, lng: -104.6189, name: "Regina", country: "Canada", size: 0.3, type: "city" },
    { lat: 52.1332, lng: -106.6700, name: "Saskatoon", country: "Canada", size: 0.3, type: "city" },
    { lat: 53.9333, lng: -122.7497, name: "Prince George", country: "Canada", size: 0.3, type: "city" },
    { lat: 49.8844, lng: -119.4960, name: "Kelowna", country: "Canada", size: 0.3, type: "city" },
    { lat: 48.4284, lng: -123.3656, name: "Victoria", country: "Canada", size: 0.3, type: "city" },
    { lat: 43.6426, lng: -79.3871, name: "Mississauga", country: "Canada", size: 0.3, type: "city" },
    { lat: 43.2557, lng: -79.8711, name: "Hamilton", country: "Canada", size: 0.3, type: "city" },
    { lat: 42.9849, lng: -81.2453, name: "London", country: "Canada", size: 0.3, type: "city" },
    { lat: 46.8139, lng: -71.2080, name: "Quebec City", country: "Canada", size: 0.4, type: "city" },
    { lat: 44.6488, lng: -63.5752, name: "Halifax", country: "Canada", size: 0.3, type: "city" },
    { lat: 47.5615, lng: -52.7126, name: "St. John's", country: "Canada", size: 0.3, type: "city" },
    { lat: 20.9674, lng: -89.5926, name: "Mérida", country: "Mexico", size: 0.4, type: "city" },
    { lat: 17.0732, lng: -96.7266, name: "Oaxaca", country: "Mexico", size: 0.3, type: "city" },
    { lat: 19.0414, lng: -98.2063, name: "Puebla", country: "Mexico", size: 0.4, type: "city" },
    { lat: 22.1565, lng: -100.9855, name: "San Luis Potosí", country: "Mexico", size: 0.3, type: "city" },
    { lat: 20.6597, lng: -100.3899, name: "Querétaro", country: "Mexico", size: 0.3, type: "city" },
    { lat: 32.6277, lng: -115.4525, name: "Tijuana", country: "Mexico", size: 0.4, type: "city" },
    { lat: 31.6904, lng: -106.4245, name: "Ciudad Juárez", country: "Mexico", size: 0.4, type: "city" },
    { lat: 25.5428, lng: -103.4068, name: "Torreón", country: "Mexico", size: 0.3, type: "city" },
    { lat: 21.8853, lng: -102.2916, name: "Aguascalientes", country: "Mexico", size: 0.3, type: "city" },
    { lat: 17.9896, lng: -92.9475, name: "Villahermosa", country: "Mexico", size: 0.3, type: "city" },
    { lat: 16.7569, lng: -93.1292, name: "Tuxtla Gutiérrez", country: "Mexico", size: 0.3, type: "city" },
    { lat: 13.6929, lng: -89.2182, name: "San Salvador", country: "El Salvador", size: 0.4, type: "capital" },
    { lat: 14.0723, lng: -87.1921, name: "Tegucigalpa", country: "Honduras", size: 0.4, type: "capital" },
    { lat: 15.7835, lng: -90.2308, name: "Guatemala City", country: "Guatemala", size: 0.4, type: "capital" },
    { lat: 12.1364, lng: -86.2514, name: "Managua", country: "Nicaragua", size: 0.4, type: "capital" },
    { lat: 17.2510, lng: -88.7590, name: "Belize City", country: "Belize", size: 0.3, type: "city" },
    { lat: 14.6349, lng: -90.5069, name: "Antigua", country: "Guatemala", size: 0.3, type: "city" },
    { lat: 10.9685, lng: -74.7813, name: "Barranquilla", country: "Colombia", size: 0.4, type: "city" },
    { lat: 6.2518, lng: -75.5636, name: "Medellín", country: "Colombia", size: 0.5, type: "major" },
    { lat: 3.4516, lng: -76.5320, name: "Cali", country: "Colombia", size: 0.4, type: "city" },
    { lat: 7.1254, lng: -73.1198, name: "Bucaramanga", country: "Colombia", size: 0.3, type: "city" },
    { lat: 11.0041, lng: -74.8070, name: "Santa Marta", country: "Colombia", size: 0.3, type: "city" },
    { lat: 10.3910, lng: -75.4794, name: "Cartagena", country: "Colombia", size: 0.4, type: "city" },
    { lat: -3.7437, lng: -38.5237, name: "Fortaleza", country: "Brazil", size: 0.4, type: "city" },
    { lat: -5.7945, lng: -35.2110, name: "Natal", country: "Brazil", size: 0.3, type: "city" },
    { lat: -2.5307, lng: -44.3068, name: "São Luís", country: "Brazil", size: 0.3, type: "city" },
    { lat: -1.4558, lng: -48.4902, name: "Belém", country: "Brazil", size: 0.4, type: "city" },
    { lat: -20.3155, lng: -40.3128, name: "Vitória", country: "Brazil", size: 0.3, type: "city" },
    { lat: -27.5954, lng: -48.5480, name: "Florianópolis", country: "Brazil", size: 0.3, type: "city" },
    { lat: -3.1019, lng: -60.0250, name: "Manaus", country: "Brazil", size: 0.4, type: "city" },
    { lat: -9.6658, lng: -35.7353, name: "Maceió", country: "Brazil", size: 0.3, type: "city" },
    { lat: -16.6869, lng: -49.2648, name: "Goiânia", country: "Brazil", size: 0.4, type: "city" },
    { lat: -7.2306, lng: -35.8811, name: "Campina Grande", country: "Brazil", size: 0.3, type: "city" },
    { lat: -10.2127, lng: -48.3603, name: "Palmas", country: "Brazil", size: 0.3, type: "city" },
    { lat: -23.2237, lng: -45.9009, name: "São José dos Campos", country: "Brazil", size: 0.3, type: "city" },
    { lat: -22.2711, lng: -54.8056, name: "Campo Grande", country: "Brazil", size: 0.3, type: "city" },
    { lat: -5.0892, lng: -42.8019, name: "Teresina", country: "Brazil", size: 0.3, type: "city" },
    { lat: -8.7619, lng: -63.9039, name: "Porto Velho", country: "Brazil", size: 0.3, type: "city" },
    { lat: -0.9700, lng: -67.8248, name: "São Gabriel da Cachoeira", country: "Brazil", size: 0.2, type: "city" },
    { lat: -18.8800, lng: -48.2527, name: "Uberlândia", country: "Brazil", size: 0.3, type: "city" },
    { lat: -20.4697, lng: -54.6201, name: "Campo Grande", country: "Brazil", size: 0.3, type: "city" },
    { lat: -23.5333, lng: -46.6253, name: "São Paulo", country: "Brazil", size: 0.9, type: "major" },
    { lat: -22.8305, lng: -47.0608, name: "Campinas", country: "Brazil", size: 0.4, type: "city" },
    { lat: -25.2637, lng: -57.5759, name: "Asunción", country: "Paraguay", size: 0.4, type: "capital" },
    { lat: -25.4284, lng: -54.6153, name: "Ciudad del Este", country: "Paraguay", size: 0.3, type: "city" },
    { lat: -23.1815, lng: -50.9995, name: "Londrina", country: "Brazil", size: 0.3, type: "city" },
    { lat: -23.3045, lng: -51.1696, name: "Maringá", country: "Brazil", size: 0.3, type: "city" },
    { lat: -1.8312, lng: -78.1834, name: "Ambato", country: "Ecuador", size: 0.3, type: "city" },
    { lat: -2.8974, lng: -79.0047, name: "Cuenca", country: "Ecuador", size: 0.3, type: "city" },
    { lat: -2.1709, lng: -79.9224, name: "Guayaquil", country: "Ecuador", size: 0.4, type: "major" },
    { lat: -0.2298, lng: -78.5249, name: "Quito", country: "Ecuador", size: 0.4, type: "capital" },
    { lat: -3.9939, lng: -79.2042, name: "Loja", country: "Ecuador", size: 0.3, type: "city" },
    { lat: -4.8990, lng: -80.0978, name: "Machala", country: "Ecuador", size: 0.3, type: "city" },
    { lat: -6.2614, lng: -79.8371, name: "Chiclayo", country: "Peru", size: 0.3, type: "city" },
    { lat: -8.1116, lng: -79.0288, name: "Trujillo", country: "Peru", size: 0.4, type: "city" },
    { lat: -13.5320, lng: -71.9675, name: "Cusco", country: "Peru", size: 0.4, type: "city" },
    { lat: -16.4090, lng: -71.5375, name: "Arequipa", country: "Peru", size: 0.4, type: "city" },
    { lat: -9.1900, lng: -75.0152, name: "Huánuco", country: "Peru", size: 0.3, type: "city" },
    { lat: -11.9933, lng: -77.0550, name: "Callao", country: "Peru", size: 0.3, type: "city" },
    { lat: -17.3935, lng: -66.1570, name: "Cochabamba", country: "Bolivia", size: 0.3, type: "city" },
    { lat: -17.7833, lng: -63.1821, name: "Santa Cruz", country: "Bolivia", size: 0.4, type: "city" },
    { lat: -19.0333, lng: -65.2627, name: "Sucre", country: "Bolivia", size: 0.3, type: "capital" },
    { lat: -14.8350, lng: -64.9000, name: "Trinidad", country: "Bolivia", size: 0.2, type: "city" },
    { lat: -24.7829, lng: -65.4232, name: "Salta", country: "Argentina", size: 0.3, type: "city" },
    { lat: -27.4692, lng: -58.8306, name: "Corrientes", country: "Argentina", size: 0.3, type: "city" },
    { lat: -38.9516, lng: -68.0591, name: "Neuquén", country: "Argentina", size: 0.3, type: "city" },
    { lat: -41.1335, lng: -71.3103, name: "Bariloche", country: "Argentina", size: 0.3, type: "city" },
    { lat: -54.8019, lng: -68.3029, name: "Ushuaia", country: "Argentina", size: 0.3, type: "city" },
    { lat: -31.4201, lng: -64.1888, name: "Córdoba", country: "Argentina", size: 0.4, type: "city" },
    { lat: -34.9214, lng: -57.9544, name: "La Plata", country: "Argentina", size: 0.3, type: "city" },
    { lat: -26.8241, lng: -65.2226, name: "San Miguel de Tucumán", country: "Argentina", size: 0.3, type: "city" },
    { lat: -31.5375, lng: -68.5364, name: "San Juan", country: "Argentina", size: 0.3, type: "city" },
    { lat: -33.0153, lng: -71.5500, name: "Valparaíso", country: "Chile", size: 0.3, type: "city" },
    { lat: -29.9027, lng: -71.2519, name: "La Serena", country: "Chile", size: 0.3, type: "city" },
    { lat: -41.4717, lng: -72.9362, name: "Puerto Montt", country: "Chile", size: 0.3, type: "city" },
    { lat: -53.1638, lng: -70.9171, name: "Punta Arenas", country: "Chile", size: 0.3, type: "city" },
    { lat: -22.4569, lng: -68.9267, name: "Antofagasta", country: "Chile", size: 0.3, type: "city" },
    { lat: -18.4783, lng: -70.3126, name: "Arica", country: "Chile", size: 0.3, type: "city" },
    { lat: -27.3668, lng: -70.3323, name: "Copiapó", country: "Chile", size: 0.3, type: "city" },
    { lat: -35.4264, lng: -71.6554, name: "Talca", country: "Chile", size: 0.3, type: "city" },
    { lat: -38.7359, lng: -72.5904, name: "Temuco", country: "Chile", size: 0.3, type: "city" },
    { lat: -45.5752, lng: -72.0662, name: "Coyhaique", country: "Chile", size: 0.2, type: "city" },
    { lat: -33.0472, lng: -71.6127, name: "Viña del Mar", country: "Chile", size: 0.3, type: "city" },
    { lat: 64.9631, lng: -19.0208, name: "Akureyri", country: "Iceland", size: 0.3, type: "city" },
    { lat: 65.6835, lng: -18.1235, name: "Húsavík", country: "Iceland", size: 0.2, type: "city" },
    { lat: 63.4198, lng: -19.0123, name: "Vik", country: "Iceland", size: 0.2, type: "city" },
    { lat: 61.9241, lng: 25.7482, name: "Tampere", country: "Finland", size: 0.3, type: "city" },
    { lat: 65.0121, lng: 25.4651, name: "Oulu", country: "Finland", size: 0.3, type: "city" },
    { lat: 60.4518, lng: 22.2666, name: "Turku", country: "Finland", size: 0.3, type: "city" },
    { lat: 62.2426, lng: 25.7473, name: "Jyväskylä", country: "Finland", size: 0.3, type: "city" },
    { lat: 67.8558, lng: 20.2253, name: "Kiruna", country: "Sweden", size: 0.2, type: "city" },
    { lat: 63.8258, lng: 20.2630, name: "Umeå", country: "Sweden", size: 0.3, type: "city" },
    { lat: 57.7089, lng: 11.9746, name: "Gothenburg", country: "Sweden", size: 0.4, type: "city" },
    { lat: 55.6050, lng: 13.0038, name: "Malmö", country: "Sweden", size: 0.3, type: "city" },
    { lat: 58.5877, lng: 16.1924, name: "Linköping", country: "Sweden", size: 0.3, type: "city" },
    { lat: 59.8586, lng: 17.6389, name: "Uppsala", country: "Sweden", size: 0.3, type: "city" },
    { lat: 63.4305, lng: 10.3951, name: "Trondheim", country: "Norway", size: 0.3, type: "city" },
    { lat: 60.3913, lng: 5.3221, name: "Bergen", country: "Norway", size: 0.3, type: "city" },
    { lat: 58.9700, lng: 5.7331, name: "Stavanger", country: "Norway", size: 0.3, type: "city" },
    { lat: 69.6492, lng: 18.9553, name: "Tromsø", country: "Norway", size: 0.3, type: "city" },
    { lat: 56.1629, lng: 10.2039, name: "Aarhus", country: "Denmark", size: 0.3, type: "city" },
    { lat: 55.3959, lng: 10.3883, name: "Odense", country: "Denmark", size: 0.3, type: "city" },
    { lat: 57.0488, lng: 9.9217, name: "Aalborg", country: "Denmark", size: 0.3, type: "city" },
  ];

  const locationSuggestions: LocationSuggestion[] = useMemo(
    () =>
      worldCities.map((city) => ({
        country: city.country,
        city: city.name,
        coordinates: { lat: city.lat, lng: city.lng },
      })),
    []
  );

  // Load Globe component
  useEffect(() => {
    if (viewMode === "globe" && !GlobeComponent) {
      setGlobeLoaded(false);
      setGlobeReady(false);
      
      import("react-globe.gl")
        .then((module) => {
          GlobeComponent = module.default;
          setGlobeLoaded(true);
          setTimeout(() => setGlobeReady(true), 200);
        })
        .catch((error) => {
          console.error("Failed to load Globe:", error);
          alert("Failed to load 3D Globe. Please refresh the page.");
        });
    } else if (viewMode === "globe" && GlobeComponent) {
      setGlobeLoaded(true);
      setTimeout(() => setGlobeReady(true), 100);
    }
  }, [viewMode]);

  // Optimized window resize handler with debouncing
  useEffect(() => {
    const handleResize = debounce(() => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }, 150);

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Debounced search query for performance
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  const filteredOperators = useMemo(() => {
    let filtered = operators.filter((op) => {
      if (showLiveOnly && !op.isLive) return false;
      if (category !== "all" && !op.specialty.toLowerCase().includes(category)) return false;
      if (debouncedSearchQuery) {
        const query = debouncedSearchQuery.toLowerCase();
        return (
          op.name.toLowerCase().includes(query) ||
          op.city.toLowerCase().includes(query) ||
          op.country.toLowerCase().includes(query) ||
          op.location.toLowerCase().includes(query)
        );
      }
      return true;
    });

    if (showNearby && userLocation) {
      filtered = filtered
        .map((op) => ({
          ...op,
          distance: getDistance(userLocation, op.coordinates),
        }))
        .sort((a: any, b: any) => a.distance - b.distance)
        .slice(0, 5);
    }

    return filtered;
  }, [operators, showLiveOnly, category, debouncedSearchQuery, showNearby, userLocation]);

  const filteredLocations = useMemo(() => {
    if (!debouncedSearchQuery) return [];
    const query = debouncedSearchQuery.toLowerCase();
    return locationSuggestions.filter(
      (loc) =>
        loc.city.toLowerCase().includes(query) || loc.country.toLowerCase().includes(query)
    ).slice(0, 50); // Limit results for performance
  }, [debouncedSearchQuery, locationSuggestions]);

  const getDistance = useCallback(
    (coord1: { lat: number; lng: number }, coord2: { lat: number; lng: number }) => {
      const R = 6371;
      const dLat = ((coord2.lat - coord1.lat) * Math.PI) / 180;
      const dLng = ((coord2.lng - coord1.lng) * Math.PI) / 180;
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos((coord1.lat * Math.PI) / 180) *
          Math.cos((coord2.lat * Math.PI) / 180) *
          Math.sin(dLng / 2) *
          Math.sin(dLng / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      return R * c;
    },
    []
  );

  const getUserLocation = useCallback(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const coords = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setUserLocation(coords);
          setShowNearby(true);

          if (globeEl.current && viewMode === "globe" && globeReady) {
            try {
              globeEl.current.pointOfView({ lat: coords.lat, lng: coords.lng, altitude: 1.5 }, 1000);
            } catch (e) {
              console.error("Error setting point of view:", e);
            }
          }
        },
        (error) => {
          // Silent handling for permission-based errors (common in sandboxed environments)
          // Only show alerts for actual user-initiated failures
          if (error.code === 1) {
            // PERMISSION_DENIED - This is expected in many environments, just silently fail
            // Don't spam console or alert the user
            return;
          }

          // For other errors, provide user-friendly feedback
          let errorMessage = "Location unavailable";
          let errorDetails = "";

          switch (error.code) {
            case 2: // POSITION_UNAVAILABLE
              errorMessage = "Location Unavailable";
              errorDetails = "Your location information is currently unavailable.";
              break;
            case 3: // TIMEOUT
              errorMessage = "Location Request Timed Out";
              errorDetails = "The request took too long. Please try again.";
              break;
            default:
              errorMessage = "Location Error";
              errorDetails = "Could not retrieve your location.";
          }

          // Only show non-intrusive notification
          console.warn(`Geolocation: ${errorMessage} - ${errorDetails}`);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
        }
      );
    } else {
      // Silently handle lack of geolocation support
      console.warn("Geolocation is not supported by this browser");
    }
  }, [viewMode, globeReady]);

  const flyToLocation = useCallback(
    (coords: { lat: number; lng: number }) => {
      if (globeEl.current && viewMode === "globe" && globeReady) {
        try {
          globeEl.current.pointOfView({ lat: coords.lat, lng: coords.lng, altitude: 1.2 }, 1000);
        } catch (e) {
          console.error("Error flying to location:", e);
        }
      }
      setSearchQuery("");
      setShowSearch(false);
    },
    [viewMode, globeReady]
  );

  // Globe operator points - memoized and optimized
  const pointsData = useMemo(() => {
    return filteredOperators.map((op) => ({
      lat: op.coordinates.lat,
      lng: op.coordinates.lng,
      size: op.isLive ? 0.3 : 0.15, // Slightly reduced for better performance
      color: op.isLive ? "#00d9ff" : "#888",
      operator: op,
    }));
  }, [filteredOperators]);

  // Simplified point label generator for better performance
  const pointLabelGenerator = useCallback((d: any) => {
    const op = d.operator;
    // Simplified tooltip with less HTML for better performance
    return `
      <div style="background: rgba(0, 0, 0, 0.92); padding: 10px; border-radius: 8px; border: 1px solid #8b5cf6; color: white; min-width: 160px;">
        <div style="font-weight: 700; font-size: 13px; margin-bottom: 4px;">${op.name}</div>
        <div style="font-size: 11px; color: #aaa;">📍 ${op.city}</div>
        <div style="display: flex; justify-content: space-between; margin-top: 6px; padding-top: 6px; border-top: 1px solid rgba(255,255,255,0.15);">
          <span style="font-size: 11px;">⭐ ${op.rating}</span>
          <span style="color: #8b5cf6; font-weight: 700; font-size: 11px;">$${op.price}/hr</span>
        </div>
        ${op.isLive ? `<div style="margin-top: 6px; padding: 4px; background: #ef4444; border-radius: 4px; text-align: center; font-size: 10px; font-weight: 700;">🔴 LIVE</div>` : ""}
      </div>
    `;
  }, []);

  // Smart label filtering based on zoom - AGGRESSIVELY optimized for performance
  const labelsData = useMemo(() => {
    if (!showLabels) return [];

    // STRICT LIMITS TO PREVENT LAG
    // Far view - only top megacities (8-10 cities)
    if (altitude > 2.5) {
      return worldCities.filter((c) => c.size >= 1.0 && c.type === "capital").slice(0, 10);
    }
    // High view - major cities and capitals (15-20 cities)
    else if (altitude > 2.0) {
      return worldCities.filter((c) => c.size >= 0.9).slice(0, 20);
    }
    // Medium view - major cities only (25-30 cities)
    else if (altitude > 1.5) {
      return worldCities.filter((c) => c.size >= 0.7 && c.type !== "city").slice(0, 30);
    }
    // Close view - limited cities for performance (35 max)
    else if (altitude > 1.0) {
      return worldCities.filter((c) => c.size >= 0.6).slice(0, 35);
    }
    // Very close view - minimal labels (25 max)
    else if (altitude > 0.5) {
      return worldCities.filter((c) => c.size >= 0.5).slice(0, 25);
    }
    // Extreme close view - very few labels to maintain performance (15 max)
    else {
      return worldCities.filter((c) => c.size >= 0.6).slice(0, 15);
    }
  }, [altitude, showLabels]);

  // Auto-rotate and altitude tracking with optimized performance
  useEffect(() => {
    if (viewMode === "globe" && globeEl.current && globeReady) {
      try {
        const controls = globeEl.current.controls();
        if (controls) {
          controls.autoRotate = enableRotation;
          controls.autoRotateSpeed = 0.3;
          controls.enableDamping = true;
          controls.dampingFactor = 0.2; // Increased damping for smoother, less jittery motion
          controls.enableZoom = true;
          controls.enablePan = true;
          controls.enableRotate = true;
          controls.minDistance = 150; // Increased to prevent extreme zoom lag
          controls.maxDistance = 500;
          controls.rotateSpeed = 0.5; // Reduced for more controlled rotation
          controls.zoomSpeed = 0.8; // Reduced for smoother, more controlled zooming
          controls.panSpeed = 0.5; // Reduced for smoother panning
          controls.mouseButtons = {
            LEFT: 2,   // ROTATE
            MIDDLE: 1, // DOLLY (zoom)
            RIGHT: 0   // PAN
          };
          controls.touches = {
            ONE: 2,   // ROTATE
            TWO: 1    // DOLLY_PAN
          };
        }

        // Optimized altitude tracking with adaptive interval
        let animationFrameId: number;
        let lastUpdateTime = 0;
        const UPDATE_INTERVAL = 400; // Slower updates for better performance
        
        const checkAltitude = (currentTime: number) => {
          try {
            if (globeEl.current && currentTime - lastUpdateTime >= UPDATE_INTERVAL) {
              const pov = globeEl.current.pointOfView();
              // Only update if altitude changed significantly
              if (pov && Math.abs(pov.altitude - altitude) > 0.15) {
                setAltitude(pov.altitude);
                lastUpdateTime = currentTime;
              }
            }
          } catch (e) {
            // Silent fail
          }
          animationFrameId = requestAnimationFrame(checkAltitude);
        };

        animationFrameId = requestAnimationFrame(checkAltitude);
        return () => {
          if (animationFrameId) {
            cancelAnimationFrame(animationFrameId);
          }
        };
      } catch (e) {
        console.error("Error setting up globe controls:", e);
      }
    }
  }, [viewMode, globeReady, enableRotation]);

  return (
    <div className="min-h-screen bg-[#0a0a0a] relative overflow-hidden">
      {/* Header */}
      <div className="relative z-20 bg-[#0a0a0a]/95 backdrop-blur-xl border-b border-white/10">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate(-1)}
                className="p-2 rounded-xl hover:bg-white/5 transition-colors"
              >
                <ArrowLeft className="text-white" size={20} />
              </button>
              <div>
                <h2 className="text-white font-semibold text-xl flex items-center gap-2">
                  <GlobeIcon className="text-white/90" size={20} />
                  3D Earth View
                </h2>
                <p className="text-sm text-white/60">
                  {filteredOperators.filter((o) => o.isLive).length} live • {filteredOperators.length} total • Zoom out if slow
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowSearch(!showSearch)}
                className="p-2 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition-colors"
                title="Search locations"
              >
                <Search size={20} className="text-white" />
              </button>
              <button
                onClick={getUserLocation}
                className={`p-2 rounded-xl transition-colors ${
                  showNearby
                    ? "bg-white/90 text-gray-900"
                    : "bg-white/5 border border-white/10 hover:border-white/20 text-white"
                }`}
                title="Find operators near me"
              >
                <Navigation size={20} />
              </button>
              <button
                onClick={() => setShowLabels(!showLabels)}
                className={`p-2 rounded-xl transition-colors ${
                  showLabels
                    ? "bg-white/90 text-gray-900"
                    : "bg-white/5 border border-white/10 text-white"
                }`}
                title={showLabels ? "Hide city labels" : "Show city labels"}
              >
                <Layers size={20} />
              </button>
              <button
                onClick={() => setEnableRotation(!enableRotation)}
                className={`p-2 rounded-xl transition-colors ${
                  enableRotation
                    ? "bg-white/90 text-gray-900"
                    : "bg-white/5 border border-white/10 text-white"
                }`}
                title={enableRotation ? "Stop rotation" : "Auto rotate"}
              >
                <RotateCw size={20} />
              </button>
            </div>
          </div>

          {/* Search Bar */}
          <AnimatePresence>
            {showSearch && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="mb-4 overflow-hidden"
              >
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60" size={18} />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search cities, countries, operators..."
                    className="w-full bg-white/5 border border-white/10 rounded-xl pl-11 pr-10 py-3 focus:outline-none focus:border-white/20 transition-all text-white placeholder:text-white/50"
                    autoFocus
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-lg hover:bg-white/10 transition-colors"
                    >
                      <X size={16} className="text-white" />
                    </button>
                  )}
                </div>

                {searchQuery && (
                  <div className="mt-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl max-h-64 overflow-y-auto">
                    {filteredLocations.length > 0 && (
                      <div className="p-2">
                        <p className="text-xs text-white/60 px-2 py-1 font-medium">LOCATIONS</p>
                        {filteredLocations.slice(0, 8).map((loc, index) => (
                          <button
                            key={index}
                            onClick={() => flyToLocation(loc.coordinates)}
                            className="w-full text-left px-3 py-2 rounded-lg hover:bg-white/10 transition-colors flex items-center gap-2"
                          >
                            <MapPin className="text-white/90 flex-shrink-0" size={16} />
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-white truncate">{loc.city}</p>
                              <p className="text-xs text-white/60 truncate">{loc.country}</p>
                            </div>
                          </button>
                        ))}
                      </div>
                    )}
                    {filteredOperators.length > 0 && (
                      <div className="p-2 border-t border-white/10">
                        <p className="text-xs text-white/60 px-2 py-1 font-medium">OPERATORS</p>
                        {filteredOperators.slice(0, 5).map((op) => (
                          <button
                            key={op.id}
                            onClick={() => {
                              setSelectedOperator(op);
                              flyToLocation(op.coordinates);
                            }}
                            className="w-full text-left px-3 py-2 rounded-lg hover:bg-white/10 transition-colors flex items-center gap-3"
                          >
                            <img
                              src={op.image}
                              alt={op.name}
                              className="w-8 h-8 rounded-full object-cover flex-shrink-0 border-2 border-white/20"
                            />
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-white truncate">{op.name}</p>
                              <p className="text-xs text-white/60 truncate">
                                {op.city}, {op.country}
                              </p>
                            </div>
                            {op.isLive && (
                              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse flex-shrink-0" />
                            )}
                          </button>
                        ))}
                      </div>
                    )}
                    {filteredLocations.length === 0 && filteredOperators.length === 0 && (
                      <p className="text-sm text-white/60 text-center py-4">No results found</p>
                    )}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Filters */}
          <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
            <button
              onClick={() => setShowLiveOnly(!showLiveOnly)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl whitespace-nowrap transition-all flex-shrink-0 ${
                showLiveOnly ? "bg-red-500/90 text-white" : "bg-white/5 border border-white/10 text-white"
              }`}
            >
              <div
                className={`w-2 h-2 rounded-full ${
                  showLiveOnly ? "bg-white animate-pulse" : "bg-red-400"
                }`}
              />
              Live Only
            </button>
            {["all", "tours", "shopping", "food", "museum", "tech"].map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-4 py-2 rounded-xl capitalize whitespace-nowrap transition-all flex-shrink-0 ${
                  category === cat
                    ? "bg-white/90 text-gray-900"
                    : "bg-white/5 border border-white/10 text-white"
                }`}
              >
                {cat === "all" ? "All" : cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Globe Container */}
      <div className="relative h-[calc(100vh-280px)] overflow-auto" style={{ willChange: 'transform', touchAction: 'pan-y' }}>
        {!globeLoaded || !globeReady ? (
            <div className="w-full h-full flex items-center justify-center bg-[#0a0a0a]">
              <div className="text-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                >
                  <GlobeIcon className="w-16 h-16 text-white/90 mx-auto mb-4" />
                </motion.div>
                <p className="text-white text-lg font-semibold">Loading 3D Earth...</p>
                <p className="text-white/60 text-sm mt-2">Optimizing performance...</p>
              </div>
            </div>
          ) : GlobeComponent ? (
            <div className="w-full h-full bg-black" style={{ willChange: 'contents' }}>
              <GlobeComponent
                ref={globeEl}
                width={dimensions.width}
                height={dimensions.height - 280}
                globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
                bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
                backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
                pointsData={pointsData}
                pointAltitude={0.01}
                pointRadius="size"
                pointColor="color"
                pointLabel={pointLabelGenerator}
                onPointClick={(point: any) => {
                  setSelectedOperator(point.operator);
                }}
                labelsData={labelsData}
                labelLat="lat"
                labelLng="lng"
                labelText="name"
                labelSize={(d: any) => Math.max(d.size * 0.6, 0.4)}
                labelDotRadius={(d: any) => Math.max(d.size * 0.15, 0.08)}
                labelColor={() => "#8b5cf6"}
                labelResolution={2}
                labelAltitude={0.02}
                atmosphereColor="#8b5cf6"
                atmosphereAltitude={0.15}
                rendererConfig={{
                  antialias: false,
                  alpha: false,
                  powerPreference: "high-performance",
                  precision: "lowp",
                }}
                animateIn={false}
                waitForGlobeReady={true}
                onGlobeReady={() => {
                  // Aggressively optimize renderer settings after globe is ready
                  if (globeEl.current) {
                    const scene = globeEl.current.scene();
                    const renderer = globeEl.current.renderer();
                    if (renderer) {
                      // Lower pixel ratio for better performance
                      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.0));
                      // Disable shadows for performance
                      renderer.shadowMap.enabled = false;
                    }
                    // Optimize camera and scene
                    const camera = globeEl.current.camera();
                    if (camera) {
                      camera.far = 4000; // Reduce render distance
                    }
                  }
                }}
              />
            </div>
          ) : null}
      </div>

      {/* Performance Info */}
      {globeReady && (
        <div className="fixed bottom-32 left-6 z-20 bg-[#0a0a0a]/90 backdrop-blur-xl border border-white/10 rounded-xl px-3 py-2 text-xs">
          <div className="flex items-center gap-2">
            <div
              className={`w-2 h-2 rounded-full animate-pulse ${ 
                altitude > 2.5 ? "bg-green-400" : altitude > 1.5 ? "bg-yellow-400" : altitude > 1.0 ? "bg-orange-400" : "bg-red-400"
              }`}
            />
            <div>
              <p className="text-white/60 text-xs">
                {altitude > 2.5 ? "🌍 Global View" : altitude > 1.5 ? "🌎 Continental" : altitude > 1.0 ? "🌏 Regional" : "🔍 Close-up"}
              </p>
              {showLabels && (
                <p className="text-white font-semibold">{labelsData.length} cities</p>
              )}
              {altitude < 1.0 && (
                <p className="text-xs text-orange-400 mt-1">Zoom out for better performance</p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Bottom Sheet - Selected Operator */}
      <AnimatePresence>
        {selectedOperator && (
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 z-30 bg-[#0a0a0a]/95 backdrop-blur-xl border-t border-white/10 rounded-t-3xl shadow-2xl"
          >
            <div className="px-6 py-6 max-w-md mx-auto">
              <div
                className="w-12 h-1 bg-white/20 rounded-full mx-auto mb-4 cursor-pointer"
                onClick={() => setSelectedOperator(null)}
              />

              <div className="flex gap-4">
                <div className="relative w-24 h-24 rounded-2xl overflow-hidden flex-shrink-0 border-2 border-white/20">
                  <ImageWithFallback
                    src={selectedOperator.image}
                    alt={selectedOperator.name}
                    className="w-full h-full object-cover"
                  />
                  {selectedOperator.isLive && (
                    <div className="absolute top-2 left-2 bg-red-500/90 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                      <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                      LIVE
                    </div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="text-xl font-semibold text-white mb-1">
                    {selectedOperator.name}
                  </h3>
                  <p className="text-sm text-white/60 mb-2">{selectedOperator.specialty}</p>
                  <div className="flex items-center gap-3 text-sm mb-2">
                    <span className="flex items-center gap-1 text-white/60">
                      <MapPin size={14} />
                      {selectedOperator.city}, {selectedOperator.country}
                    </span>
                    <span className="flex items-center gap-1">
                      <Star className="text-yellow-400 fill-yellow-400" size={14} />
                      <span className="font-medium text-white">{selectedOperator.rating}</span>
                    </span>
                  </div>
                  <p className="text-xs text-white/60">{selectedOperator.location}</p>
                  {selectedOperator.activeViewers && (
                    <div className="flex items-center gap-1 text-xs text-white/80 mt-2">
                      <Users size={12} />
                      {selectedOperator.activeViewers} watching now
                    </div>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mt-4">
                <button
                  onClick={() => navigate(`/operator/${selectedOperator.id}`)}
                  className="py-3 bg-white/5 text-white rounded-xl hover:bg-white/10 transition-all font-medium border border-white/10"
                >
                  View Profile
                </button>
                <button
                  onClick={() =>
                    selectedOperator.isLive
                      ? navigate(`/session/${selectedOperator.id}`)
                      : navigate(`/booking/${selectedOperator.id}`)
                  }
                  className="py-3 bg-white/90 text-gray-900 rounded-xl hover:bg-white transition-all font-medium flex items-center justify-center gap-2"
                >
                  {selectedOperator.isLive ? (
                    <>
                      <Zap size={18} />
                      Join Live
                    </>
                  ) : (
                    <>
                      <DollarSign size={18} />
                      Book ${selectedOperator.price}
                    </>
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Stats Bar */}
      <div className="relative z-10 bg-[#0a0a0a]/95 backdrop-blur-xl border-t border-white/10 px-6 py-4">
        <div className="flex items-center justify-around max-w-md mx-auto">
          <div className="text-center">
            <p className="text-2xl font-bold text-white">{filteredOperators.length}</p>
            <p className="text-xs text-white/60">{showNearby ? "Nearby" : "Total"}</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-green-400">
              {filteredOperators.filter((o) => o.isLive).length}
            </p>
            <p className="text-xs text-white/60">Live Now</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-400">
              {filteredOperators
                .filter((o) => o.activeViewers)
                .reduce((sum, o) => sum + (o.activeViewers || 0), 0)}
            </p>
            <p className="text-xs text-white/60">Viewers</p>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
}