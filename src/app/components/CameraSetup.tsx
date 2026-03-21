import { useState } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import {
  Camera,
  Glasses,
  Smartphone,
  Webcam,
  Wifi,
  WifiOff,
  Play,
  CheckCircle,
  ArrowLeft,
} from "lucide-react";

type DeviceType = "360-camera" | "smart-glasses" | "phone-camera" | "external-camera";

interface Device {
  id: DeviceType;
  name: string;
  icon: any;
  description: string;
}

export default function CameraSetup() {
  const navigate = useNavigate();
  const [selectedDevice, setSelectedDevice] = useState<DeviceType | null>(null);
  const [connectionStatus, setConnectionStatus] = useState<"disconnected" | "connecting" | "connected">("disconnected");
  const [isTestingFeed, setIsTestingFeed] = useState(false);

  const devices: Device[] = [
    {
      id: "360-camera",
      name: "360° Camera",
      icon: Camera,
      description: "Full immersive panoramic view",
    },
    {
      id: "smart-glasses",
      name: "Smart Glasses",
      icon: Glasses,
      description: "First-person perspective streaming",
    },
    {
      id: "phone-camera",
      name: "Phone Camera",
      icon: Smartphone,
      description: "Mobile device camera",
    },
    {
      id: "external-camera",
      name: "External Camera",
      icon: Webcam,
      description: "USB or wireless camera",
    },
  ];

  const handleConnect = () => {
    if (!selectedDevice) return;
    
    setConnectionStatus("connecting");
    setTimeout(() => {
      setConnectionStatus("connected");
    }, 2000);
  };

  const handleTestFeed = () => {
    setIsTestingFeed(true);
    setTimeout(() => {
      setIsTestingFeed(false);
    }, 3000);
  };

  const handleGoLive = () => {
    navigate("/home");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-xl border-b border-border">
        <div className="flex items-center justify-between px-6 py-4">
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-xl hover:bg-secondary transition-colors"
          >
            <ArrowLeft className="text-foreground" size={20} />
          </button>
          <h2 className="text-foreground">Camera Setup</h2>
          <div className="w-9" />
        </div>
      </div>

      <div className="px-6 py-8 max-w-2xl mx-auto space-y-8">
        {/* Device Selection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <h3 className="text-foreground">Select Streaming Device</h3>
          <div className="grid grid-cols-2 gap-4">
            {devices.map((device, index) => {
              const Icon = device.icon;
              return (
                <motion.div
                  key={device.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => {
                    setSelectedDevice(device.id);
                    setConnectionStatus("disconnected");
                  }}
                  className={`cursor-pointer rounded-2xl p-4 border-2 transition-all ${
                    selectedDevice === device.id
                      ? "border-primary bg-primary/5 shadow-lg shadow-primary/20"
                      : "border-border bg-card/50 hover:border-primary/50"
                  }`}
                >
                  <div className="flex flex-col items-center text-center space-y-3">
                    <div
                      className={`p-4 rounded-xl ${
                        selectedDevice === device.id
                          ? "bg-primary/20"
                          : "bg-secondary"
                      }`}
                    >
                      <Icon
                        className={
                          selectedDevice === device.id
                            ? "text-primary"
                            : "text-muted-foreground"
                        }
                        size={28}
                      />
                    </div>
                    <div>
                      <div className="text-sm text-foreground mb-1">
                        {device.name}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {device.description}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Connection Status */}
        {selectedDevice && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl bg-card/50 border border-border p-6 space-y-4"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-foreground">Connection Status</h3>
              <div className="flex items-center gap-2">
                {connectionStatus === "disconnected" && (
                  <WifiOff className="text-muted-foreground" size={20} />
                )}
                {connectionStatus === "connecting" && (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  >
                    <Wifi className="text-primary" size={20} />
                  </motion.div>
                )}
                {connectionStatus === "connected" && (
                  <CheckCircle className="text-green-500" size={20} />
                )}
                <span
                  className={`text-sm ${
                    connectionStatus === "connected"
                      ? "text-green-500"
                      : connectionStatus === "connecting"
                      ? "text-primary"
                      : "text-muted-foreground"
                  }`}
                >
                  {connectionStatus === "disconnected" && "Not Connected"}
                  {connectionStatus === "connecting" && "Connecting..."}
                  {connectionStatus === "connected" && "Connected"}
                </span>
              </div>
            </div>

            {connectionStatus === "disconnected" && (
              <button
                onClick={handleConnect}
                className="w-full py-3 rounded-xl bg-primary text-primary-foreground hover:shadow-lg hover:shadow-primary/30 transition-all"
              >
                Connect Device
              </button>
            )}

            {connectionStatus === "connected" && (
              <div className="space-y-4">
                {/* Video Preview */}
                <div className="relative aspect-video rounded-xl overflow-hidden bg-secondary">
                  {isTestingFeed ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="absolute inset-0 bg-gradient-to-br from-primary/20 to-purple-500/20 flex items-center justify-center"
                    >
                      <div className="text-center space-y-2">
                        <motion.div
                          animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.5, 1, 0.5],
                          }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="w-16 h-16 mx-auto rounded-full bg-primary/30 flex items-center justify-center"
                        >
                          <Play className="text-primary" size={32} />
                        </motion.div>
                        <p className="text-sm text-foreground">Testing Feed...</p>
                      </div>
                    </motion.div>
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center space-y-2">
                        <Camera className="text-muted-foreground mx-auto" size={48} />
                        <p className="text-sm text-muted-foreground">Camera Preview</p>
                      </div>
                    </div>
                  )}
                  
                  {/* Connection Indicator */}
                  <div className="absolute top-4 right-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-background/80 backdrop-blur-sm">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-xs text-foreground">Live</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={handleTestFeed}
                    disabled={isTestingFeed}
                    className="py-3 rounded-xl border border-primary text-primary hover:bg-primary/10 transition-all disabled:opacity-50"
                  >
                    <div className="flex items-center justify-center gap-2">
                      <Play size={18} />
                      <span>Test Feed</span>
                    </div>
                  </button>
                  <button
                    onClick={handleGoLive}
                    className="py-3 rounded-xl bg-primary text-primary-foreground hover:shadow-lg hover:shadow-primary/30 transition-all"
                  >
                    Go Live
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        )}

        {/* Device Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="rounded-2xl bg-primary/5 border border-primary/20 p-4"
        >
          <p className="text-sm text-muted-foreground">
            💡 Make sure your device is fully charged and has a stable internet
            connection before starting a live session.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
