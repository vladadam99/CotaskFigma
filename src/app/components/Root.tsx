import { Outlet } from "react-router";
import DevNavigation from "./DevNavigation";

export default function Root() {
  return (
    <div 
      className="min-h-screen text-white relative"
      style={{
        background: "linear-gradient(to bottom, #1a0e0e 0%, #2d1515 50%, #1a0e0e 100%)"
      }}
    >
      {/* Subtle gradient overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-30">
        <div 
          className="absolute inset-0"
          style={{
            background: "radial-gradient(circle at 50% 0%, rgba(220, 38, 38, 0.15) 0%, transparent 50%)"
          }}
        />
      </div>
      
      <Outlet />
      <DevNavigation />
    </div>
  );
}