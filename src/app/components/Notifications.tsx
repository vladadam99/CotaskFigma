import { useState } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import {
  ArrowLeft,
  Bell,
  BellOff,
  Clock,
  Video,
  Star,
  Heart,
  MessageCircle,
  Award,
  DollarSign,
  Calendar,
  Settings,
  Check,
  X,
} from "lucide-react";
import { BottomNav } from "./BottomNav";

interface Notification {
  id: string;
  type: "session" | "message" | "achievement" | "rating" | "favorite" | "booking" | "payment";
  title: string;
  message: string;
  time: string;
  read: boolean;
  actionable?: boolean;
  action?: {
    label: string;
    path: string;
  };
}

export default function Notifications() {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      type: "session",
      title: "Session Starting Soon",
      message: "Your session with Sarah Chen starts in 15 minutes",
      time: "5m ago",
      read: false,
      actionable: true,
      action: { label: "Join Now", path: "/session/1" },
    },
    {
      id: "2",
      type: "message",
      title: "New Message",
      message: "Marcus Stone sent you a message",
      time: "1h ago",
      read: false,
      actionable: true,
      action: { label: "View", path: "/session/2" },
    },
    {
      id: "3",
      type: "achievement",
      title: "Achievement Unlocked!",
      message: 'You\'ve earned the "Quality Reviewer" badge',
      time: "2h ago",
      read: false,
      actionable: true,
      action: { label: "View", path: "/achievements" },
    },
    {
      id: "4",
      type: "favorite",
      title: "Operator Live",
      message: "Sarah Chen is now live and available",
      time: "3h ago",
      read: true,
      actionable: true,
      action: { label: "Watch", path: "/discover" },
    },
    {
      id: "5",
      type: "rating",
      title: "Rate Your Session",
      message: "How was your session with Elena Rodriguez?",
      time: "5h ago",
      read: true,
      actionable: true,
      action: { label: "Rate Now", path: "/summary/3" },
    },
    {
      id: "6",
      type: "booking",
      title: "Booking Confirmed",
      message: "Your session with Marcus Stone is confirmed for tomorrow at 2 PM",
      time: "1d ago",
      read: true,
    },
    {
      id: "7",
      type: "payment",
      title: "Payment Processed",
      message: "$30.00 charged for session with Sarah Chen",
      time: "2d ago",
      read: true,
    },
  ]);

  const [showSettings, setShowSettings] = useState(false);
  const [notificationSettings, setNotificationSettings] = useState({
    sessions: true,
    messages: true,
    achievements: true,
    favorites: true,
    bookings: true,
    payments: true,
  });

  const unreadCount = notifications.filter((n) => !n.read).length;

  const getIcon = (type: string) => {
    switch (type) {
      case "session":
        return Video;
      case "message":
        return MessageCircle;
      case "achievement":
        return Award;
      case "rating":
        return Star;
      case "favorite":
        return Heart;
      case "booking":
        return Calendar;
      case "payment":
        return DollarSign;
      default:
        return Bell;
    }
  };

  const getIconColor = (type: string) => {
    switch (type) {
      case "session":
        return "text-primary";
      case "message":
        return "text-blue-500";
      case "achievement":
        return "text-yellow-500";
      case "rating":
        return "text-yellow-500";
      case "favorite":
        return "text-red-500";
      case "booking":
        return "text-green-500";
      case "payment":
        return "text-purple-500";
      default:
        return "text-muted-foreground";
    }
  };

  const markAsRead = (id: string) => {
    setNotifications(
      notifications.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
  };

  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter((n) => n.id !== id));
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-xl border-b border-border">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate(-1)}
                className="p-2 rounded-xl hover:bg-secondary transition-colors"
              >
                <ArrowLeft className="text-foreground" size={20} />
              </button>
              <div>
                <h2 className="text-foreground font-semibold text-xl">Notifications</h2>
                {unreadCount > 0 && (
                  <p className="text-sm text-muted-foreground">
                    {unreadCount} unread
                  </p>
                )}
              </div>
            </div>
            <div className="flex items-center gap-2">
              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  className="px-3 py-1.5 rounded-lg text-sm text-primary hover:bg-primary/10 transition-colors"
                >
                  Mark all read
                </button>
              )}
              <button
                onClick={() => setShowSettings(!showSettings)}
                className="p-2 rounded-xl hover:bg-secondary transition-colors"
              >
                <Settings className="text-foreground" size={20} />
              </button>
            </div>
          </div>

          {/* Settings Panel */}
          {showSettings && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-card border border-border rounded-2xl p-4 space-y-3"
            >
              <h3 className="font-semibold text-foreground text-sm mb-2">Notification Preferences</h3>
              {Object.entries(notificationSettings).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between">
                  <span className="text-sm text-foreground capitalize">{key}</span>
                  <button
                    onClick={() =>
                      setNotificationSettings({
                        ...notificationSettings,
                        [key]: !value,
                      })
                    }
                    className={`w-11 h-6 rounded-full transition-colors ${
                      value ? "bg-primary" : "bg-secondary"
                    }`}
                  >
                    <div
                      className={`w-4 h-4 bg-white rounded-full transition-transform ${
                        value ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>
              ))}
            </motion.div>
          )}
        </div>
      </div>

      {/* Notifications List */}
      <div className="px-6 py-4 space-y-2">
        {notifications.length === 0 ? (
          <div className="text-center py-16">
            <BellOff className="text-muted-foreground mx-auto mb-4" size={48} />
            <p className="text-muted-foreground">No notifications yet</p>
          </div>
        ) : (
          notifications.map((notification) => {
            const Icon = getIcon(notification.type);
            const iconColor = getIconColor(notification.type);

            return (
              <motion.div
                key={notification.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className={`rounded-2xl border p-4 transition-all cursor-pointer ${
                  notification.read
                    ? "bg-card border-border"
                    : "bg-primary/5 border-primary/20"
                }`}
                onClick={() => {
                  markAsRead(notification.id);
                  if (notification.action) {
                    navigate(notification.action.path);
                  }
                }}
              >
                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <div className={`p-2 rounded-xl bg-secondary ${!notification.read && "ring-2 ring-primary/20"}`}>
                    <Icon className={iconColor} size={20} />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h4 className={`font-medium ${!notification.read && "text-foreground"}`}>
                        {notification.title}
                      </h4>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground whitespace-nowrap">
                          {notification.time}
                        </span>
                        {!notification.read && (
                          <div className="w-2 h-2 bg-primary rounded-full" />
                        )}
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      {notification.message}
                    </p>

                    {/* Actions */}
                    {notification.actionable && notification.action && (
                      <div className="flex items-center gap-2 mt-3">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(notification.action!.path);
                          }}
                          className="px-4 py-2 rounded-xl bg-primary text-primary-foreground text-sm hover:bg-primary/90 transition-all"
                        >
                          {notification.action.label}
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteNotification(notification.id);
                          }}
                          className="p-2 rounded-xl hover:bg-secondary transition-colors"
                        >
                          <X size={16} className="text-muted-foreground" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })
        )}
      </div>

      <BottomNav />
    </div>
  );
}