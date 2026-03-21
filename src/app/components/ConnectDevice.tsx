import { useState } from "react";
import { useNavigate } from "react-router";
import { ArrowLeft, Camera, Smartphone, Wifi, Check } from "lucide-react";
import { motion } from "motion/react";

export default function ConnectDevice() {
  const navigate = useNavigate();
  const [selectedCamera, setSelectedCamera] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);

  const availableCameras = [
    { id: "360-cam-1", name: "Insta360 X3", type: "360° Camera", battery: 85 },
    { id: "360-cam-2", name: "GoPro MAX", type: "360° Camera", battery: 92 },
    { id: "phone-1", name: "iPhone 14 Pro", type: "Smartphone", battery: 78 },
  ];

  const handleConnect = () => {
    if (!selectedCamera) return;
    
    setIsConnecting(true);
    setTimeout(() => {
      setIsConnecting(false);
      setIsConnected(true);
      setTimeout(() => {
        navigate("/go-live");
      }, 1500);
    }, 2000);
  };

  return (
    <div className="min-h-screen pb-24">
      {/* Header */}
      <div 
        className="sticky top-0 z-20 backdrop-blur-[18px] border-b"
        style={{
          background: "rgba(20, 25, 35, 0.9)",
          borderColor: "rgba(255, 255, 255, 0.06)"
        }}
      >
        <div className="px-6 py-4 flex items-center gap-4">
          <button
            onClick={() => navigate("/avatar-home")}
            className="w-10 h-10 border rounded-full flex items-center justify-center active:scale-95 transition-all"
            style={{ background: "rgba(255, 255, 255, 0.05)", borderColor: "rgba(255, 255, 255, 0.06)" }}
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <div>
            <h1 className="text-[28px] font-bold text-white">Connect Device</h1>
            <p className="text-[13px]" style={{ color: "#B8C1D9" }}>Choose your camera</p>
          </div>
        </div>
      </div>

      <div className="px-6 py-8 space-y-6">
        {/* Connection Status */}
        {isConnected && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl p-4 border backdrop-blur-[18px] flex items-center gap-3"
            style={{
              background: "rgba(34, 197, 94, 0.15)",
              borderColor: "rgba(34, 197, 94, 0.3)",
            }}
          >
            <div className="w-10 h-10 bg-green-400 rounded-full flex items-center justify-center">
              <Check className="text-white" size={20} />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-white">Connected!</p>
              <p className="text-[13px] text-green-200">Redirecting to Go Live...</p>
            </div>
          </motion.div>
        )}

        {/* Available Cameras */}
        <div>
          <h3 className="text-[20px] font-semibold text-white mb-4 flex items-center gap-2">
            <Wifi style={{ color: "#4FB6FF" }} size={20} />
            Available Devices
          </h3>
          <div className="space-y-3">
            {availableCameras.map((camera) => (
              <motion.button
                key={camera.id}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedCamera(camera.id)}
                className="w-full rounded-2xl p-5 border backdrop-blur-[18px] text-left active:scale-[0.98] transition-all"
                style={{
                  background: selectedCamera === camera.id 
                    ? "rgba(79, 182, 255, 0.15)" 
                    : "rgba(20, 25, 35, 0.65)",
                  borderColor: selectedCamera === camera.id 
                    ? "rgba(79, 182, 255, 0.4)" 
                    : "rgba(255, 255, 255, 0.06)",
                  boxShadow: selectedCamera === camera.id 
                    ? "0 0 20px rgba(79, 182, 255, 0.2)" 
                    : "0 4px 12px rgba(0, 0, 0, 0.3)",
                }}
              >
                <div className="flex items-center gap-4">
                  <div 
                    className="w-14 h-14 rounded-xl flex items-center justify-center border"
                    style={{ 
                      background: "rgba(79, 182, 255, 0.1)",
                      borderColor: "rgba(79, 182, 255, 0.2)"
                    }}
                  >
                    {camera.type === "360° Camera" ? (
                      <Camera style={{ color: "#4FB6FF" }} size={24} />
                    ) : (
                      <Smartphone style={{ color: "#4FB6FF" }} size={24} />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="text-[16px] font-semibold text-white mb-1">{camera.name}</p>
                    <p className="text-[13px]" style={{ color: "#B8C1D9" }}>{camera.type}</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-2 h-2 rounded-full"
                        style={{ background: camera.battery > 20 ? "#22c55e" : "#ef4444" }}
                      />
                      <span className="text-[13px]" style={{ color: "#B8C1D9" }}>
                        {camera.battery}%
                      </span>
                    </div>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Instructions */}
        <div 
          className="rounded-2xl p-5 border backdrop-blur-[18px]"
          style={{
            background: "rgba(20, 25, 35, 0.65)",
            borderColor: "rgba(255, 255, 255, 0.06)",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)"
          }}
        >
          <h4 className="text-[16px] font-semibold text-white mb-3">How to connect:</h4>
          <ol className="space-y-2 text-[13px]" style={{ color: "#B8C1D9" }}>
            <li className="flex gap-3">
              <span className="text-white font-semibold">1.</span>
              <span>Turn on your 360° camera or smartphone</span>
            </li>
            <li className="flex gap-3">
              <span className="text-white font-semibold">2.</span>
              <span>Enable WiFi on the device</span>
            </li>
            <li className="flex gap-3">
              <span className="text-white font-semibold">3.</span>
              <span>Select your device from the list above</span>
            </li>
            <li className="flex gap-3">
              <span className="text-white font-semibold">4.</span>
              <span>Tap Connect to start streaming</span>
            </li>
          </ol>
        </div>

        {/* Connect Button */}
        <button
          onClick={handleConnect}
          disabled={!selectedCamera || isConnecting || isConnected}
          className="w-full text-white font-bold py-5 rounded-2xl flex items-center justify-center gap-3 border-0 disabled:opacity-50 active:scale-95 transition-transform"
          style={{ 
            background: selectedCamera && !isConnecting && !isConnected 
              ? "linear-gradient(135deg, #4FB6FF 0%, #2F8BFF 100%)"
              : "rgba(79, 182, 255, 0.3)",
            boxShadow: selectedCamera && !isConnecting && !isConnected 
              ? "0 8px 24px rgba(79, 182, 255, 0.4)"
              : "none"
          }}
        >
          {isConnecting ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span className="text-[16px] font-semibold">Connecting...</span>
            </>
          ) : isConnected ? (
            <>
              <Check size={20} />
              <span className="text-[16px] font-semibold">Connected!</span>
            </>
          ) : (
            <>
              <Wifi size={20} />
              <span className="text-[16px] font-semibold">Connect Device</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
