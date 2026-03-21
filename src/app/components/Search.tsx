import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowLeft,
  Search as SearchIcon,
  MapPin,
  Star,
  DollarSign,
  Filter,
  X,
  TrendingUp,
  Clock,
  Globe,
  Zap,
} from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import BottomNav from "./BottomNav";

interface SearchFilters {
  category: string;
  location: string;
  priceRange: [number, number];
  rating: number;
  availability: string;
}

export default function Search() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [recentSearches, setRecentSearches] = useState([
    "Tokyo tours",
    "Museum guides",
    "Shopping NYC",
  ]);
  const [filters, setFilters] = useState<SearchFilters>({
    category: "all",
    location: "all",
    priceRange: [0, 100],
    rating: 0,
    availability: "all",
  });

  const categories = [
    { id: "all", name: "All", icon: Globe },
    { id: "tours", name: "Virtual Tours", icon: MapPin },
    { id: "shopping", name: "Shopping", icon: Zap },
    { id: "museums", name: "Museums", icon: Clock },
    { id: "food", name: "Food & Dining", icon: Star },
  ];

  const trendingSearches = [
    { query: "Tokyo cherry blossoms", count: "2.3K searches" },
    { query: "NYC fashion week", count: "1.8K searches" },
    { query: "Paris museums", count: "1.5K searches" },
    { query: "Barcelona street art", count: "1.2K searches" },
  ];

  const operators = [
    {
      id: "1",
      name: "Sarah Chen",
      specialty: "Virtual Tours",
      location: "Tokyo, Japan",
      rating: 4.9,
      price: 25,
      isLive: true,
      image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400",
    },
    {
      id: "2",
      name: "Marcus Stone",
      specialty: "Shopping Assistant",
      location: "New York, USA",
      rating: 4.8,
      price: 30,
      isLive: false,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
    },
    {
      id: "3",
      name: "Elena Rodriguez",
      specialty: "Museum Guide",
      location: "Barcelona, Spain",
      rating: 5.0,
      price: 35,
      isLive: true,
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400",
    },
  ];

  const filteredOperators = operators.filter((op) => {
    const matchesQuery = 
      searchQuery === "" ||
      op.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      op.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
      op.location.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = 
      filters.category === "all" ||
      op.specialty.toLowerCase().includes(filters.category);
    
    const matchesPrice = 
      op.price >= filters.priceRange[0] && op.price <= filters.priceRange[1];
    
    const matchesRating = op.rating >= filters.rating;
    
    const matchesAvailability = 
      filters.availability === "all" ||
      (filters.availability === "live" && op.isLive);

    return matchesQuery && matchesCategory && matchesPrice && matchesRating && matchesAvailability;
  });

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query && !recentSearches.includes(query)) {
      setRecentSearches([query, ...recentSearches.slice(0, 4)]);
    }
  };

  const clearFilters = () => {
    setFilters({
      category: "all",
      location: "all",
      priceRange: [0, 100],
      rating: 0,
      availability: "all",
    });
  };

  const activeFiltersCount = 
    (filters.category !== "all" ? 1 : 0) +
    (filters.rating > 0 ? 1 : 0) +
    (filters.availability !== "all" ? 1 : 0) +
    (filters.priceRange[0] > 0 || filters.priceRange[1] < 100 ? 1 : 0);

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-background/80 backdrop-blur-xl border-b border-border">
        <div className="px-6 py-4">
          <div className="flex items-center gap-3 mb-4">
            <button
              onClick={() => navigate(-1)}
              className="p-2 rounded-xl hover:bg-secondary transition-colors"
            >
              <ArrowLeft className="text-foreground" size={20} />
            </button>

            {/* Search Input */}
            <div className="flex-1 relative">
              <SearchIcon
                className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
                size={18}
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder="Search operators, locations..."
                className="w-full bg-card border border-border rounded-xl pl-11 pr-10 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                autoFocus
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-secondary rounded-lg transition-colors"
                >
                  <X size={16} className="text-muted-foreground" />
                </button>
              )}
            </div>

            {/* Filter Button */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="relative p-3 bg-card border border-border rounded-xl hover:border-primary/50 transition-all"
            >
              <Filter size={18} className="text-foreground" />
              {activeFiltersCount > 0 && (
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-primary rounded-full flex items-center justify-center text-xs text-primary-foreground font-semibold">
                  {activeFiltersCount}
                </div>
              )}
            </button>
          </div>

          {/* Categories */}
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setFilters({ ...filters, category: category.id })}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl whitespace-nowrap transition-all ${
                    filters.category === category.id
                      ? "bg-primary text-primary-foreground"
                      : "bg-card border border-border text-foreground hover:border-primary/50"
                  }`}
                >
                  <Icon size={16} />
                  <span className="text-sm font-medium">{category.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Filters Panel */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="border-b border-border overflow-hidden"
          >
            <div className="px-6 py-4 space-y-4">
              {/* Price Range */}
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Price Range: ${filters.priceRange[0]} - ${filters.priceRange[1]}/hr
                </label>
                <div className="flex gap-4">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={filters.priceRange[0]}
                    onChange={(e) =>
                      setFilters({
                        ...filters,
                        priceRange: [parseInt(e.target.value), filters.priceRange[1]],
                      })
                    }
                    className="flex-1"
                  />
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={filters.priceRange[1]}
                    onChange={(e) =>
                      setFilters({
                        ...filters,
                        priceRange: [filters.priceRange[0], parseInt(e.target.value)],
                      })
                    }
                    className="flex-1"
                  />
                </div>
              </div>

              {/* Minimum Rating */}
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Minimum Rating
                </label>
                <div className="flex gap-2">
                  {[0, 3, 4, 4.5, 5].map((rating) => (
                    <button
                      key={rating}
                      onClick={() => setFilters({ ...filters, rating })}
                      className={`flex-1 py-2 rounded-lg text-sm transition-all ${
                        filters.rating === rating
                          ? "bg-primary text-primary-foreground"
                          : "bg-card border border-border hover:border-primary/50"
                      }`}
                    >
                      {rating === 0 ? "Any" : `${rating}+`}
                    </button>
                  ))}
                </div>
              </div>

              {/* Availability */}
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Availability
                </label>
                <div className="flex gap-2">
                  {["all", "live", "scheduled"].map((avail) => (
                    <button
                      key={avail}
                      onClick={() => setFilters({ ...filters, availability: avail })}
                      className={`flex-1 py-2 rounded-lg text-sm capitalize transition-all ${
                        filters.availability === avail
                          ? "bg-primary text-primary-foreground"
                          : "bg-card border border-border hover:border-primary/50"
                      }`}
                    >
                      {avail}
                    </button>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-2">
                <button
                  onClick={clearFilters}
                  className="flex-1 py-2.5 bg-secondary text-foreground rounded-xl hover:bg-secondary/80 transition-all"
                >
                  Clear All
                </button>
                <button
                  onClick={() => setShowFilters(false)}
                  className="flex-1 py-2.5 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-all"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Content */}
      <div className="px-6 py-6">
        {searchQuery === "" ? (
          <div className="space-y-6">
            {/* Recent Searches */}
            {recentSearches.length > 0 && (
              <div>
                <h3 className="text-foreground font-semibold mb-3 flex items-center gap-2">
                  <Clock size={18} />
                  Recent Searches
                </h3>
                <div className="space-y-2">
                  {recentSearches.map((search, index) => (
                    <div
                      key={index}
                      className="w-full flex items-center justify-between p-3 bg-card border border-border rounded-xl hover:border-primary/50 transition-all"
                    >
                      <button
                        onClick={() => setSearchQuery(search)}
                        className="flex-1 text-left text-foreground"
                      >
                        {search}
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setRecentSearches(recentSearches.filter((_, i) => i !== index));
                        }}
                        className="p-1 hover:bg-secondary rounded-lg"
                      >
                        <X size={14} className="text-muted-foreground" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Trending */}
            <div>
              <h3 className="text-foreground font-semibold mb-3 flex items-center gap-2">
                <TrendingUp size={18} />
                Trending Now
              </h3>
              <div className="space-y-2">
                {trendingSearches.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => setSearchQuery(item.query)}
                    className="w-full flex items-center justify-between p-3 bg-card border border-border rounded-xl hover:border-primary/50 transition-all text-left"
                  >
                    <span className="text-foreground">{item.query}</span>
                    <span className="text-xs text-muted-foreground">{item.count}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Results Count */}
            <div className="flex items-center justify-between">
              <p className="text-muted-foreground">
                {filteredOperators.length} results found
              </p>
            </div>

            {/* Results */}
            {filteredOperators.length === 0 ? (
              <div className="text-center py-16">
                <SearchIcon className="text-muted-foreground mx-auto mb-4" size={48} />
                <p className="text-muted-foreground">No operators found</p>
                <button
                  onClick={clearFilters}
                  className="mt-4 px-6 py-2 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-all"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredOperators.map((operator) => (
                  <motion.div
                    key={operator.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    onClick={() => navigate(`/operator/${operator.id}`)}
                    className="bg-card border border-border rounded-2xl p-4 flex items-center gap-4 hover:border-primary/50 transition-all cursor-pointer"
                  >
                    {/* Image */}
                    <div className="relative w-20 h-20 flex-shrink-0">
                      <ImageWithFallback
                        src={operator.image}
                        alt={operator.name}
                        className="w-full h-full object-cover rounded-xl"
                      />
                      {operator.isLive && (
                        <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-background animate-pulse" />
                      )}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-foreground truncate mb-1">
                        {operator.name}
                      </h3>
                      <p className="text-sm text-muted-foreground truncate mb-2">
                        {operator.specialty}
                      </p>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                          {operator.rating}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {operator.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <DollarSign className="w-3 h-3" />
                          {operator.price}/hr
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
      <BottomNav />
    </div>
  );
}