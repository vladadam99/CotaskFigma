import { createBrowserRouter } from "react-router";
import Root from "./components/Root";
import RoleSelection from "./components/RoleSelection";
import UserLogin from "./components/UserLogin";
import UserSignup from "./components/UserSignup";
import UserOnboarding from "./components/UserOnboarding";
import AvatarLogin from "./components/AvatarLogin";
import AvatarSignup from "./components/AvatarSignup";
import AvatarOnboarding from "./components/AvatarOnboarding";
import Home from "./components/Home";
import DiscoverFeed from "./components/DiscoverFeed";
import LiveSession from "./components/LiveSession";
import Messages from "./components/Messages";
import UserProfile from "./components/UserProfile";
import AvatarHomeScreen from "./components/AvatarHomeScreen";
import ConnectDevice from "./components/ConnectDevice";
import GoLive from "./components/GoLive";
import Settings from "./components/Settings";
import NotFound from "./components/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: RoleSelection },
      { path: "role-selection", Component: RoleSelection },
      { path: "login/user", Component: UserLogin },
      { path: "signup/user", Component: UserSignup },
      { path: "onboarding/user", Component: UserOnboarding },
      { path: "login/avatar", Component: AvatarLogin },
      { path: "signup/avatar", Component: AvatarSignup },
      { path: "onboarding/avatar", Component: AvatarOnboarding },
      
      // User routes
      { path: "home", Component: Home },
      { path: "discover", Component: DiscoverFeed },
      { path: "live/:avatarId", Component: LiveSession },
      { path: "messages", Component: Messages },
      { path: "profile", Component: UserProfile },
      
      // Avatar routes
      { path: "avatar-home", Component: AvatarHomeScreen },
      { path: "connect-device", Component: ConnectDevice },
      { path: "go-live", Component: GoLive },
      
      // Shared routes
      { path: "settings", Component: Settings },
      
      { path: "*", Component: NotFound },
    ],
  },
]);