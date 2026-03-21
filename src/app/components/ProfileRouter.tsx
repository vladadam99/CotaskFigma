import { useEffect } from "react";
import { useNavigate } from "react-router";
import UserProfile from "./UserProfile";
import AvatarProfile from "./AvatarProfile";
import EnterpriseProfile from "./EnterpriseProfile";

export default function ProfileRouter() {
  const navigate = useNavigate();
  const userRole = localStorage.getItem('userRole') || 'user';

  // If this becomes a routing issue, we could redirect instead
  // For now, we'll render the appropriate profile directly
  
  switch (userRole) {
    case 'avatar':
      return <AvatarProfile />;
    case 'enterprise':
      return <EnterpriseProfile />;
    case 'user':
    default:
      return <UserProfile />;
  }
}
