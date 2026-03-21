import { useState } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { Eye, Users, Camera, ArrowRight } from "lucide-react";

const onboardingSteps = [
  {
    icon: Camera,
    title: "Immersive 360° Experience",
    description: "Connect with live operators wearing 360° cameras who stream their real-world view directly to you.",
  },
  {
    icon: Eye,
    title: "Switch Between Views",
    description: "Toggle between First-Person View (FPV) to see exactly what they see, or Third-Person View (TPV) to see the operator and surroundings.",
  },
  {
    icon: Users,
    title: "Guide in Real-Time",
    description: "Watch, chat, and direct your operator through any task - from virtual tours to shopping assistance.",
  },
];

export default function Onboarding() {
  const [currentStep, setCurrentStep] = useState(0);
  const navigate = useNavigate();

  const handleNext = () => {
    if (currentStep < onboardingSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      navigate("/login");
    }
  };

  const handleSkip = () => {
    navigate("/login");
  };

  const step = onboardingSteps[currentStep];
  const Icon = step.icon;

  return (
    <div className="min-h-screen flex flex-col items-center justify-between p-6 max-w-md mx-auto">
      {/* Skip button */}
      <div className="w-full flex justify-end">
        <button
          onClick={handleSkip}
          className="text-muted-foreground hover:text-foreground transition-colors"
        >
          Skip
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center text-center">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-8"
        >
          {/* Icon */}
          <div className="relative mx-auto w-32 h-32 flex items-center justify-center">
            <div className="absolute inset-0 bg-primary/20 rounded-full blur-2xl" />
            <div className="relative bg-card border border-primary/30 rounded-full p-8">
              <Icon className="w-16 h-16 text-primary" strokeWidth={1.5} />
            </div>
          </div>

          {/* Text */}
          <div className="space-y-4">
            <h1 className="text-3xl font-semibold text-foreground">{step.title}</h1>
            <p className="text-muted-foreground text-lg leading-relaxed">
              {step.description}
            </p>
          </div>
        </motion.div>
      </div>

      {/* Bottom section */}
      <div className="w-full space-y-6">
        {/* Progress dots */}
        <div className="flex justify-center gap-2">
          {onboardingSteps.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentStep(index)}
              className={`h-2 rounded-full transition-all ${
                index === currentStep
                  ? "w-8 bg-primary"
                  : "w-2 bg-muted hover:bg-muted-foreground/50"
              }`}
            />
          ))}
        </div>

        {/* Next button */}
        <button
          onClick={handleNext}
          className="w-full bg-primary text-primary-foreground py-4 rounded-2xl font-medium flex items-center justify-center gap-2 hover:bg-primary/90 transition-all active:scale-95"
        >
          {currentStep === onboardingSteps.length - 1 ? "Get Started" : "Next"}
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
