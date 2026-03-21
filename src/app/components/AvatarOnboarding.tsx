import { useState } from "react";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import {
  User,
  Camera,
  Briefcase,
  Settings as SettingsIcon,
  Clock,
  DollarSign,
  Award,
  Shield,
  Video,
  CheckCircle,
  ChevronRight,
  Upload,
  Plus,
  X,
  MapPin,
  Globe,
  Car,
  Bike,
  Train,
} from "lucide-react";

type OnboardingData = {
  // Step 2
  profilePicture: string | null;
  shortBio: string;
  description: string;
  
  // Step 3
  skills: string[];
  customSkill: string;
  
  // Step 4
  canTravel: boolean;
  travelRadius: string;
  equipment: string[];
  languages: string[];
  mobility: string[];
  
  // Step 5
  availability: string[];
  timeSlots: { start: string; end: string };
  timezone: string;
  instantBookings: boolean;
  
  // Step 6
  pricingModel: "per-minute" | "per-session";
  pricePerMinute: string;
  pricePerSession: string;
  packages: { duration: string; price: string }[];
  
  // Step 7
  experienceLevel: string;
  yearsExperience: string;
  certifications: string;
  
  // Step 8
  agreedToRules: boolean;
  
  // Step 9
  demoVideo: string | null;
};

const TOTAL_STEPS = 9;

const skillOptions = [
  "City tours",
  "Travel experiences",
  "Nightlife",
  "Food tours",
  "Adventure (jetski, skydiving, etc.)",
  "Shopping assistant",
  "Real estate viewing",
  "Events / festivals",
  "Virtual companionship",
  "Education / teaching",
  "Custom requests",
];

const equipmentOptions = [
  "Meta Glasses",
  "Insta360",
  "Phone only",
  "Professional camera",
  "VR-compatible setup",
];

const languageOptions = [
  "English",
  "Spanish",
  "French",
  "German",
  "Italian",
  "Portuguese",
  "Chinese",
  "Japanese",
  "Arabic",
  "Hindi",
];

const mobilityOptions = [
  { icon: User, label: "Walking" },
  { icon: Car, label: "Driving" },
  { icon: Bike, label: "Bike" },
  { icon: Train, label: "Public transport" },
];

const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export default function AvatarOnboarding() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<OnboardingData>({
    profilePicture: null,
    shortBio: "",
    description: "",
    skills: [],
    customSkill: "",
    canTravel: false,
    travelRadius: "",
    equipment: [],
    languages: [],
    mobility: [],
    availability: [],
    timeSlots: { start: "09:00", end: "18:00" },
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    instantBookings: false,
    pricingModel: "per-minute",
    pricePerMinute: "",
    pricePerSession: "",
    packages: [],
    experienceLevel: "",
    yearsExperience: "",
    certifications: "",
    agreedToRules: false,
    demoVideo: null,
  });

  const updateFormData = (field: string, value: any) => {
    setFormData({ ...formData, [field]: value });
  };

  const toggleArrayItem = (field: keyof OnboardingData, item: string) => {
    const currentArray = formData[field] as string[];
    if (currentArray.includes(item)) {
      updateFormData(field, currentArray.filter((i) => i !== item));
    } else {
      updateFormData(field, [...currentArray, item]);
    }
  };

  const handleNext = () => {
    if (currentStep < TOTAL_STEPS) {
      setCurrentStep(currentStep + 1);
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    // Save onboarding data
    localStorage.setItem("avatarOnboardingData", JSON.stringify(formData));
    localStorage.setItem("userRole", "avatar");
    navigate("/avatar-home");
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Step2IdentityOverview formData={formData} updateFormData={updateFormData} />;
      case 2:
        return <Step3Skills formData={formData} updateFormData={updateFormData} toggleArrayItem={toggleArrayItem} />;
      case 3:
        return <Step4Capabilities formData={formData} updateFormData={updateFormData} toggleArrayItem={toggleArrayItem} />;
      case 4:
        return <Step5Availability formData={formData} updateFormData={updateFormData} toggleArrayItem={toggleArrayItem} />;
      case 5:
        return <Step6Pricing formData={formData} updateFormData={updateFormData} />;
      case 6:
        return <Step7Experience formData={formData} updateFormData={updateFormData} />;
      case 7:
        return <Step8Safety formData={formData} updateFormData={updateFormData} />;
      case 8:
        return <Step9Demo formData={formData} updateFormData={updateFormData} />;
      case 9:
        return <Step10Review formData={formData} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen pb-24 relative overflow-hidden">
      {/* Gradient Background */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(135deg, #1a0e0e 0%, #2d1515 100%)",
        }}
      />

      {/* Progress Bar */}
      <div
        className="sticky top-0 z-20 backdrop-blur-[20px] border-b"
        style={{
          background: "rgba(45, 21, 21, 0.9)",
          borderColor: "rgba(255, 255, 255, 0.08)",
        }}
      >
        <div className="px-6 py-4">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-white font-semibold">Complete Your Profile</h2>
            <span className="text-sm" style={{ color: "#9CA3AF" }}>
              Step {currentStep} of {TOTAL_STEPS}
            </span>
          </div>
          <div className="w-full h-2 rounded-full" style={{ background: "rgba(255, 255, 255, 0.1)" }}>
            <motion.div
              className="h-full rounded-full"
              style={{ background: "linear-gradient(135deg, #DC2626 0%, #991B1B 100%)" }}
              initial={{ width: 0 }}
              animate={{ width: `${(currentStep / TOTAL_STEPS) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 px-6 py-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderStep()}
          </motion.div>
        </AnimatePresence>

        {/* Navigation Buttons */}
        <div className="flex gap-3 mt-8">
          {currentStep > 1 && (
            <button
              onClick={handleBack}
              className="px-6 py-3 rounded-2xl font-semibold border transition-all active:scale-95"
              style={{
                background: "rgba(255, 255, 255, 0.05)",
                borderColor: "rgba(255, 255, 255, 0.1)",
                color: "white",
              }}
            >
              Back
            </button>
          )}
          <button
            onClick={handleNext}
            className="flex-1 py-3 rounded-2xl font-semibold flex items-center justify-center gap-2 transition-all active:scale-95"
            style={{
              background: "linear-gradient(135deg, #DC2626 0%, #991B1B 100%)",
              color: "white",
              boxShadow: "0 4px 20px rgba(220, 38, 38, 0.5)",
            }}
          >
            {currentStep === TOTAL_STEPS ? "Complete Profile" : "Continue"}
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}

// Step 2: Identity & Overview
function Step2IdentityOverview({ formData, updateFormData }: any) {
  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
          style={{ background: "linear-gradient(135deg, #DC2626 0%, #991B1B 100%)" }}
        >
          <User className="text-white" size={32} />
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">Your Identity</h2>
        <p className="text-sm" style={{ color: "#9CA3AF" }}>
          Let users know who you are
        </p>
      </div>

      {/* Profile Picture */}
      <div>
        <label className="block text-sm font-medium text-white mb-3">Profile Picture</label>
        <div
          className="border-2 border-dashed rounded-2xl p-8 flex flex-col items-center justify-center cursor-pointer transition-all hover:border-[#DC2626]"
          style={{ borderColor: "rgba(255, 255, 255, 0.2)" }}
        >
          <Camera size={40} style={{ color: "#9CA3AF" }} className="mb-3" />
          <p className="text-white font-medium mb-1">Upload Photo</p>
          <p className="text-xs" style={{ color: "#9CA3AF" }}>
            PNG, JPG up to 5MB
          </p>
        </div>
      </div>

      {/* Short Bio */}
      <div>
        <label className="block text-sm font-medium text-white mb-2">
          Short Bio <span style={{ color: "#9CA3AF" }}>(max 200 characters)</span>
        </label>
        <input
          type="text"
          maxLength={200}
          value={formData.shortBio}
          onChange={(e) => updateFormData("shortBio", e.target.value)}
          placeholder="e.g., Professional Tokyo street food guide"
          className="w-full border rounded-xl px-4 py-3 focus:outline-none transition-all text-white placeholder-[#9CA3AF]"
          style={{
            background: "rgba(26, 14, 14, 0.6)",
            borderColor: "rgba(255, 255, 255, 0.08)",
          }}
        />
        <p className="text-xs mt-1" style={{ color: "#9CA3AF" }}>
          {formData.shortBio.length}/200
        </p>
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium text-white mb-2">What do you offer?</label>
        <textarea
          value={formData.description}
          onChange={(e) => updateFormData("description", e.target.value)}
          placeholder="I do live city tours in London using 360 camera..."
          rows={4}
          className="w-full border rounded-xl px-4 py-3 focus:outline-none transition-all text-white placeholder-[#9CA3AF] resize-none"
          style={{
            background: "rgba(26, 14, 14, 0.6)",
            borderColor: "rgba(255, 255, 255, 0.08)",
          }}
        />
      </div>
    </div>
  );
}

// Step 3: Skills
function Step3Skills({ formData, updateFormData, toggleArrayItem }: any) {
  const [showCustomInput, setShowCustomInput] = useState(false);

  const addCustomSkill = () => {
    if (formData.customSkill.trim()) {
      toggleArrayItem("skills", formData.customSkill);
      updateFormData("customSkill", "");
      setShowCustomInput(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
          style={{ background: "linear-gradient(135deg, #DC2626 0%, #991B1B 100%)" }}
        >
          <Briefcase className="text-white" size={32} />
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">Your Skills</h2>
        <p className="text-sm" style={{ color: "#9CA3AF" }}>
          What services do you offer? (Select all that apply)
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {skillOptions.map((skill) => (
          <button
            key={skill}
            onClick={() => toggleArrayItem("skills", skill)}
            className="px-4 py-2 rounded-full font-medium transition-all active:scale-95 border"
            style={{
              background: formData.skills.includes(skill)
                ? "linear-gradient(135deg, #DC2626 0%, #991B1B 100%)"
                : "rgba(255, 255, 255, 0.05)",
              borderColor: formData.skills.includes(skill)
                ? "#DC2626"
                : "rgba(255, 255, 255, 0.1)",
              color: "white",
            }}
          >
            {skill}
          </button>
        ))}
      </div>

      {/* Custom Skill */}
      {!showCustomInput ? (
        <button
          onClick={() => setShowCustomInput(true)}
          className="w-full py-3 rounded-xl border-2 border-dashed flex items-center justify-center gap-2 font-medium transition-all active:scale-95"
          style={{
            borderColor: "rgba(255, 255, 255, 0.2)",
            color: "#9CA3AF",
          }}
        >
          <Plus size={20} />
          Add Custom Skill
        </button>
      ) : (
        <div className="flex gap-2">
          <input
            type="text"
            value={formData.customSkill}
            onChange={(e) => updateFormData("customSkill", e.target.value)}
            placeholder="Type your custom skill..."
            className="flex-1 border rounded-xl px-4 py-3 focus:outline-none transition-all text-white placeholder-[#9CA3AF]"
            style={{
              background: "rgba(26, 14, 14, 0.6)",
              borderColor: "rgba(255, 255, 255, 0.08)",
            }}
          />
          <button
            onClick={addCustomSkill}
            className="px-4 py-3 rounded-xl font-semibold transition-all active:scale-95"
            style={{
              background: "linear-gradient(135deg, #DC2626 0%, #991B1B 100%)",
              color: "white",
            }}
          >
            Add
          </button>
          <button
            onClick={() => setShowCustomInput(false)}
            className="px-4 py-3 rounded-xl border transition-all active:scale-95"
            style={{
              background: "rgba(255, 255, 255, 0.05)",
              borderColor: "rgba(255, 255, 255, 0.1)",
              color: "white",
            }}
          >
            <X size={20} />
          </button>
        </div>
      )}
    </div>
  );
}

// Step 4: Capabilities
function Step4Capabilities({ formData, updateFormData, toggleArrayItem }: any) {
  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
          style={{ background: "linear-gradient(135deg, #DC2626 0%, #991B1B 100%)" }}
        >
          <SettingsIcon className="text-white" size={32} />
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">Your Capabilities</h2>
        <p className="text-sm" style={{ color: "#9CA3AF" }}>
          Tell us about your equipment and reach
        </p>
      </div>

      {/* Can Travel */}
      <div>
        <label className="block text-sm font-medium text-white mb-3">Can you travel?</label>
        <div className="flex gap-3">
          <button
            onClick={() => updateFormData("canTravel", true)}
            className="flex-1 py-3 rounded-xl font-medium transition-all active:scale-95 border"
            style={{
              background: formData.canTravel
                ? "linear-gradient(135deg, #DC2626 0%, #991B1B 100%)"
                : "rgba(255, 255, 255, 0.05)",
              borderColor: formData.canTravel ? "#DC2626" : "rgba(255, 255, 255, 0.1)",
              color: "white",
            }}
          >
            Yes
          </button>
          <button
            onClick={() => updateFormData("canTravel", false)}
            className="flex-1 py-3 rounded-xl font-medium transition-all active:scale-95 border"
            style={{
              background: !formData.canTravel
                ? "linear-gradient(135deg, #DC2626 0%, #991B1B 100%)"
                : "rgba(255, 255, 255, 0.05)",
              borderColor: !formData.canTravel ? "#DC2626" : "rgba(255, 255, 255, 0.1)",
              color: "white",
            }}
          >
            No
          </button>
        </div>
      </div>

      {/* Travel Radius */}
      {formData.canTravel && (
        <div>
          <label className="block text-sm font-medium text-white mb-2">Travel Radius</label>
          <input
            type="text"
            value={formData.travelRadius}
            onChange={(e) => updateFormData("travelRadius", e.target.value)}
            placeholder="e.g., 50km or worldwide"
            className="w-full border rounded-xl px-4 py-3 focus:outline-none transition-all text-white placeholder-[#9CA3AF]"
            style={{
              background: "rgba(26, 14, 14, 0.6)",
              borderColor: "rgba(255, 255, 255, 0.08)",
            }}
          />
        </div>
      )}

      {/* Equipment */}
      <div>
        <label className="block text-sm font-medium text-white mb-3">What equipment do you have?</label>
        <div className="flex flex-wrap gap-2">
          {equipmentOptions.map((equipment) => (
            <button
              key={equipment}
              onClick={() => toggleArrayItem("equipment", equipment)}
              className="px-4 py-2 rounded-full font-medium transition-all active:scale-95 border"
              style={{
                background: formData.equipment.includes(equipment)
                  ? "linear-gradient(135deg, #DC2626 0%, #991B1B 100%)"
                  : "rgba(255, 255, 255, 0.05)",
                borderColor: formData.equipment.includes(equipment)
                  ? "#DC2626"
                  : "rgba(255, 255, 255, 0.1)",
                color: "white",
              }}
            >
              {equipment}
            </button>
          ))}
        </div>
      </div>

      {/* Languages */}
      <div>
        <label className="block text-sm font-medium text-white mb-3">Languages you speak</label>
        <div className="flex flex-wrap gap-2">
          {languageOptions.map((language) => (
            <button
              key={language}
              onClick={() => toggleArrayItem("languages", language)}
              className="px-4 py-2 rounded-full font-medium transition-all active:scale-95 border"
              style={{
                background: formData.languages.includes(language)
                  ? "linear-gradient(135deg, #DC2626 0%, #991B1B 100%)"
                  : "rgba(255, 255, 255, 0.05)",
                borderColor: formData.languages.includes(language)
                  ? "#DC2626"
                  : "rgba(255, 255, 255, 0.1)",
                color: "white",
              }}
            >
              {language}
            </button>
          ))}
        </div>
      </div>

      {/* Mobility */}
      <div>
        <label className="block text-sm font-medium text-white mb-3">Mobility options</label>
        <div className="grid grid-cols-2 gap-3">
          {mobilityOptions.map((option) => (
            <button
              key={option.label}
              onClick={() => toggleArrayItem("mobility", option.label)}
              className="py-3 rounded-xl font-medium transition-all active:scale-95 border flex items-center justify-center gap-2"
              style={{
                background: formData.mobility.includes(option.label)
                  ? "linear-gradient(135deg, #DC2626 0%, #991B1B 100%)"
                  : "rgba(255, 255, 255, 0.05)",
                borderColor: formData.mobility.includes(option.label)
                  ? "#DC2626"
                  : "rgba(255, 255, 255, 0.1)",
                color: "white",
              }}
            >
              <option.icon size={20} />
              {option.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// Step 5: Availability
function Step5Availability({ formData, updateFormData, toggleArrayItem }: any) {
  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
          style={{ background: "linear-gradient(135deg, #DC2626 0%, #991B1B 100%)" }}
        >
          <Clock className="text-white" size={32} />
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">Availability</h2>
        <p className="text-sm" style={{ color: "#9CA3AF" }}>
          When are you available to stream?
        </p>
      </div>

      {/* Days Available */}
      <div>
        <label className="block text-sm font-medium text-white mb-3">Days available</label>
        <div className="flex flex-wrap gap-2">
          {daysOfWeek.map((day) => (
            <button
              key={day}
              onClick={() => toggleArrayItem("availability", day)}
              className="px-4 py-2 rounded-full font-medium transition-all active:scale-95 border"
              style={{
                background: formData.availability.includes(day)
                  ? "linear-gradient(135deg, #DC2626 0%, #991B1B 100%)"
                  : "rgba(255, 255, 255, 0.05)",
                borderColor: formData.availability.includes(day)
                  ? "#DC2626"
                  : "rgba(255, 255, 255, 0.1)",
                color: "white",
              }}
            >
              {day}
            </button>
          ))}
        </div>
      </div>

      {/* Time Slots */}
      <div>
        <label className="block text-sm font-medium text-white mb-3">Working hours</label>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs mb-2" style={{ color: "#9CA3AF" }}>
              Start time
            </label>
            <input
              type="time"
              value={formData.timeSlots.start}
              onChange={(e) =>
                updateFormData("timeSlots", { ...formData.timeSlots, start: e.target.value })
              }
              className="w-full border rounded-xl px-4 py-3 focus:outline-none transition-all text-white"
              style={{
                background: "rgba(26, 14, 14, 0.6)",
                borderColor: "rgba(255, 255, 255, 0.08)",
              }}
            />
          </div>
          <div>
            <label className="block text-xs mb-2" style={{ color: "#9CA3AF" }}>
              End time
            </label>
            <input
              type="time"
              value={formData.timeSlots.end}
              onChange={(e) =>
                updateFormData("timeSlots", { ...formData.timeSlots, end: e.target.value })
              }
              className="w-full border rounded-xl px-4 py-3 focus:outline-none transition-all text-white"
              style={{
                background: "rgba(26, 14, 14, 0.6)",
                borderColor: "rgba(255, 255, 255, 0.08)",
              }}
            />
          </div>
        </div>
      </div>

      {/* Timezone */}
      <div>
        <label className="block text-sm font-medium text-white mb-2">Timezone</label>
        <input
          type="text"
          value={formData.timezone}
          disabled
          className="w-full border rounded-xl px-4 py-3 text-white"
          style={{
            background: "rgba(26, 14, 14, 0.4)",
            borderColor: "rgba(255, 255, 255, 0.08)",
          }}
        />
        <p className="text-xs mt-1" style={{ color: "#9CA3AF" }}>
          Auto-detected from your device
        </p>
      </div>

      {/* Instant Bookings */}
      <div>
        <label className="block text-sm font-medium text-white mb-3">
          Available for instant bookings?
        </label>
        <div className="flex gap-3">
          <button
            onClick={() => updateFormData("instantBookings", true)}
            className="flex-1 py-3 rounded-xl font-medium transition-all active:scale-95 border"
            style={{
              background: formData.instantBookings
                ? "linear-gradient(135deg, #DC2626 0%, #991B1B 100%)"
                : "rgba(255, 255, 255, 0.05)",
              borderColor: formData.instantBookings ? "#DC2626" : "rgba(255, 255, 255, 0.1)",
              color: "white",
            }}
          >
            Yes
          </button>
          <button
            onClick={() => updateFormData("instantBookings", false)}
            className="flex-1 py-3 rounded-xl font-medium transition-all active:scale-95 border"
            style={{
              background: !formData.instantBookings
                ? "linear-gradient(135deg, #DC2626 0%, #991B1B 100%)"
                : "rgba(255, 255, 255, 0.05)",
              borderColor: !formData.instantBookings ? "#DC2626" : "rgba(255, 255, 255, 0.1)",
              color: "white",
            }}
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
}

// Step 6: Pricing
function Step6Pricing({ formData, updateFormData }: any) {
  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
          style={{ background: "linear-gradient(135deg, #DC2626 0%, #991B1B 100%)" }}
        >
          <DollarSign className="text-white" size={32} />
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">Pricing</h2>
        <p className="text-sm" style={{ color: "#9CA3AF" }}>
          Set your rates
        </p>
      </div>

      {/* Pricing Model */}
      <div>
        <label className="block text-sm font-medium text-white mb-3">Pricing model</label>
        <div className="flex gap-3">
          <button
            onClick={() => updateFormData("pricingModel", "per-minute")}
            className="flex-1 py-3 rounded-xl font-medium transition-all active:scale-95 border"
            style={{
              background:
                formData.pricingModel === "per-minute"
                  ? "linear-gradient(135deg, #DC2626 0%, #991B1B 100%)"
                  : "rgba(255, 255, 255, 0.05)",
              borderColor: formData.pricingModel === "per-minute" ? "#DC2626" : "rgba(255, 255, 255, 0.1)",
              color: "white",
            }}
          >
            Per Minute
          </button>
          <button
            onClick={() => updateFormData("pricingModel", "per-session")}
            className="flex-1 py-3 rounded-xl font-medium transition-all active:scale-95 border"
            style={{
              background:
                formData.pricingModel === "per-session"
                  ? "linear-gradient(135deg, #DC2626 0%, #991B1B 100%)"
                  : "rgba(255, 255, 255, 0.05)",
              borderColor: formData.pricingModel === "per-session" ? "#DC2626" : "rgba(255, 255, 255, 0.1)",
              color: "white",
            }}
          >
            Per Session
          </button>
        </div>
      </div>

      {/* Price Input */}
      {formData.pricingModel === "per-minute" ? (
        <div>
          <label className="block text-sm font-medium text-white mb-2">Price per minute ($)</label>
          <input
            type="number"
            value={formData.pricePerMinute}
            onChange={(e) => updateFormData("pricePerMinute", e.target.value)}
            placeholder="e.g., 2.50"
            step="0.01"
            className="w-full border rounded-xl px-4 py-3 focus:outline-none transition-all text-white placeholder-[#9CA3AF]"
            style={{
              background: "rgba(26, 14, 14, 0.6)",
              borderColor: "rgba(255, 255, 255, 0.08)",
            }}
          />
        </div>
      ) : (
        <div>
          <label className="block text-sm font-medium text-white mb-2">Price per session ($)</label>
          <input
            type="number"
            value={formData.pricePerSession}
            onChange={(e) => updateFormData("pricePerSession", e.target.value)}
            placeholder="e.g., 50"
            step="1"
            className="w-full border rounded-xl px-4 py-3 focus:outline-none transition-all text-white placeholder-[#9CA3AF]"
            style={{
              background: "rgba(26, 14, 14, 0.6)",
              borderColor: "rgba(255, 255, 255, 0.08)",
            }}
          />
        </div>
      )}

      {/* Optional Packages Info */}
      <div
        className="rounded-xl p-4 border"
        style={{
          background: "rgba(220, 38, 38, 0.1)",
          borderColor: "rgba(220, 38, 38, 0.3)",
        }}
      >
        <p className="text-sm" style={{ color: "#DC2626" }}>
          💡 You can add custom packages and special offers after completing your profile
        </p>
      </div>
    </div>
  );
}

// Step 7: Experience
function Step7Experience({ formData, updateFormData }: any) {
  const experienceLevels = ["Beginner", "Intermediate", "Professional"];

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
          style={{ background: "linear-gradient(135deg, #DC2626 0%, #991B1B 100%)" }}
        >
          <Award className="text-white" size={32} />
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">Experience</h2>
        <p className="text-sm" style={{ color: "#9CA3AF" }}>
          Build trust with your expertise
        </p>
      </div>

      {/* Experience Level */}
      <div>
        <label className="block text-sm font-medium text-white mb-3">Experience level</label>
        <div className="space-y-2">
          {experienceLevels.map((level) => (
            <button
              key={level}
              onClick={() => updateFormData("experienceLevel", level)}
              className="w-full py-3 rounded-xl font-medium transition-all active:scale-95 border flex items-center justify-between px-4"
              style={{
                background:
                  formData.experienceLevel === level
                    ? "linear-gradient(135deg, #DC2626 0%, #991B1B 100%)"
                    : "rgba(255, 255, 255, 0.05)",
                borderColor: formData.experienceLevel === level ? "#DC2626" : "rgba(255, 255, 255, 0.1)",
                color: "white",
              }}
            >
              {level}
              {formData.experienceLevel === level && <CheckCircle size={20} />}
            </button>
          ))}
        </div>
      </div>

      {/* Years of Experience */}
      <div>
        <label className="block text-sm font-medium text-white mb-2">Years of experience</label>
        <input
          type="number"
          value={formData.yearsExperience}
          onChange={(e) => updateFormData("yearsExperience", e.target.value)}
          placeholder="e.g., 5"
          className="w-full border rounded-xl px-4 py-3 focus:outline-none transition-all text-white placeholder-[#9CA3AF]"
          style={{
            background: "rgba(26, 14, 14, 0.6)",
            borderColor: "rgba(255, 255, 255, 0.08)",
          }}
        />
      </div>

      {/* Certifications */}
      <div>
        <label className="block text-sm font-medium text-white mb-2">
          Certifications <span style={{ color: "#9CA3AF" }}>(optional)</span>
        </label>
        <textarea
          value={formData.certifications}
          onChange={(e) => updateFormData("certifications", e.target.value)}
          placeholder="List any relevant certifications or qualifications..."
          rows={3}
          className="w-full border rounded-xl px-4 py-3 focus:outline-none transition-all text-white placeholder-[#9CA3AF] resize-none"
          style={{
            background: "rgba(26, 14, 14, 0.6)",
            borderColor: "rgba(255, 255, 255, 0.08)",
          }}
        />
      </div>
    </div>
  );
}

// Step 8: Safety
function Step8Safety({ formData, updateFormData }: any) {
  const rules = [
    "No illegal activities or content",
    "Respect user privacy and boundaries",
    "Professional conduct at all times",
    "Accurate service representation",
    "No discrimination or harassment",
  ];

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
          style={{ background: "linear-gradient(135deg, #DC2626 0%, #991B1B 100%)" }}
        >
          <Shield className="text-white" size={32} />
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">Safety & Rules</h2>
        <p className="text-sm" style={{ color: "#9CA3AF" }}>
          Read and agree to our community guidelines
        </p>
      </div>

      {/* Rules List */}
      <div
        className="rounded-xl p-5 border space-y-3"
        style={{
          background: "rgba(45, 21, 21, 0.6)",
          borderColor: "rgba(255, 255, 255, 0.08)",
        }}
      >
        <h3 className="font-semibold text-white mb-3">Community Guidelines</h3>
        {rules.map((rule, index) => (
          <div key={index} className="flex items-start gap-3">
            <CheckCircle size={20} style={{ color: "#DC2626", flexShrink: 0 }} />
            <p className="text-sm" style={{ color: "#D1D5DB" }}>
              {rule}
            </p>
          </div>
        ))}
      </div>

      {/* ID Verification Notice */}
      <div
        className="rounded-xl p-4 border"
        style={{
          background: "rgba(220, 38, 38, 0.1)",
          borderColor: "rgba(220, 38, 38, 0.3)",
        }}
      >
        <p className="text-sm" style={{ color: "#DC2626" }}>
          📋 ID verification will be required before you can go live. You'll be prompted to complete
          this after profile setup.
        </p>
      </div>

      {/* Agreement */}
      <div>
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={formData.agreedToRules}
            onChange={(e) => updateFormData("agreedToRules", e.target.checked)}
            className="mt-1 rounded"
            style={{ accentColor: "#DC2626" }}
          />
          <span className="text-sm" style={{ color: "#D1D5DB" }}>
            I agree to follow CoTask's community guidelines and terms of service. I understand that
            violations may result in account suspension or termination.
          </span>
        </label>
      </div>
    </div>
  );
}

// Step 9: Demo
function Step9Demo({ formData, updateFormData }: any) {
  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
          style={{ background: "linear-gradient(135deg, #DC2626 0%, #991B1B 100%)" }}
        >
          <Video className="text-white" size={32} />
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">Demo Video</h2>
        <p className="text-sm" style={{ color: "#9CA3AF" }}>
          Show users what to expect from your streams
        </p>
      </div>

      {/* Upload Demo Video */}
      <div
        className="border-2 border-dashed rounded-2xl p-12 flex flex-col items-center justify-center cursor-pointer transition-all hover:border-[#DC2626]"
        style={{ borderColor: "rgba(255, 255, 255, 0.2)" }}
      >
        <Upload size={48} style={{ color: "#9CA3AF" }} className="mb-4" />
        <p className="text-white font-medium mb-2 text-center">Upload Demo Video</p>
        <p className="text-xs text-center" style={{ color: "#9CA3AF" }}>
          MP4, MOV up to 100MB
          <br />
          Show your setup and what you offer
        </p>
      </div>

      {/* Or Test Live */}
      <div className="text-center">
        <p className="text-sm mb-3" style={{ color: "#9CA3AF" }}>
          or
        </p>
        <button
          className="px-6 py-3 rounded-2xl font-semibold border transition-all active:scale-95"
          style={{
            background: "rgba(255, 255, 255, 0.05)",
            borderColor: "rgba(255, 255, 255, 0.1)",
            color: "white",
          }}
        >
          Test Live Stream
        </button>
      </div>

      {/* Skip Notice */}
      <div
        className="rounded-xl p-4 border"
        style={{
          background: "rgba(220, 38, 38, 0.1)",
          borderColor: "rgba(220, 38, 38, 0.3)",
        }}
      >
        <p className="text-sm" style={{ color: "#DC2626" }}>
          💡 You can skip this for now and add a demo video later from your dashboard
        </p>
      </div>
    </div>
  );
}

// Step 10: Review
function Step10Review({ formData }: any) {
  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
          style={{ background: "linear-gradient(135deg, #DC2626 0%, #991B1B 100%)" }}
        >
          <CheckCircle className="text-white" size={32} />
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">Review & Submit</h2>
        <p className="text-sm" style={{ color: "#9CA3AF" }}>
          Check your profile details before submitting
        </p>
      </div>

      {/* Summary Cards */}
      <div className="space-y-4">
        {/* Identity */}
        <div
          className="rounded-xl p-4 border"
          style={{
            background: "rgba(45, 21, 21, 0.6)",
            borderColor: "rgba(255, 255, 255, 0.08)",
          }}
        >
          <h3 className="font-semibold text-white mb-2">Identity</h3>
          <p className="text-sm" style={{ color: "#9CA3AF" }}>
            {formData.shortBio || "No bio added"}
          </p>
        </div>

        {/* Skills */}
        <div
          className="rounded-xl p-4 border"
          style={{
            background: "rgba(45, 21, 21, 0.6)",
            borderColor: "rgba(255, 255, 255, 0.08)",
          }}
        >
          <h3 className="font-semibold text-white mb-2">Skills</h3>
          <div className="flex flex-wrap gap-2">
            {formData.skills.length > 0 ? (
              formData.skills.map((skill: string) => (
                <span
                  key={skill}
                  className="px-3 py-1 rounded-full text-xs"
                  style={{
                    background: "rgba(220, 38, 38, 0.2)",
                    color: "#DC2626",
                  }}
                >
                  {skill}
                </span>
              ))
            ) : (
              <p className="text-sm" style={{ color: "#9CA3AF" }}>
                No skills selected
              </p>
            )}
          </div>
        </div>

        {/* Equipment */}
        <div
          className="rounded-xl p-4 border"
          style={{
            background: "rgba(45, 21, 21, 0.6)",
            borderColor: "rgba(255, 255, 255, 0.08)",
          }}
        >
          <h3 className="font-semibold text-white mb-2">Equipment & Languages</h3>
          <p className="text-sm mb-1" style={{ color: "#D1D5DB" }}>
            Equipment: {formData.equipment.join(", ") || "None"}
          </p>
          <p className="text-sm" style={{ color: "#D1D5DB" }}>
            Languages: {formData.languages.join(", ") || "None"}
          </p>
        </div>

        {/* Pricing */}
        <div
          className="rounded-xl p-4 border"
          style={{
            background: "rgba(45, 21, 21, 0.6)",
            borderColor: "rgba(255, 255, 255, 0.08)",
          }}
        >
          <h3 className="font-semibold text-white mb-2">Pricing</h3>
          <p className="text-sm" style={{ color: "#D1D5DB" }}>
            {formData.pricingModel === "per-minute"
              ? `$${formData.pricePerMinute || "0"} per minute`
              : `$${formData.pricePerSession || "0"} per session`}
          </p>
        </div>
      </div>
    </div>
  );
}
