import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  BarChart,
  Settings,
  ShoppingBag,
  Link as LinkIcon,
  DollarSign,
  Home,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import type { User } from "@/types/supabase";

const affiliateLinks = [
  { href: "/dashboard", label: "Overview", icon: Home },
  { href: "/dashboard/links", label: "My Links", icon: LinkIcon },
  { href: "/dashboard/earnings", label: "Earnings", icon: DollarSign },
  { href: "/dashboard/products", label: "Products", icon: ShoppingBag },
  { href: "/dashboard/analytics", label: "Analytics", icon: BarChart },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
];

const businessLinks = [
  { href: "/dashboard", label: "Overview", icon: Home },
  { href: "/dashboard/products", label: "Products", icon: ShoppingBag },
  { href: "/dashboard/orders", label: "Orders", icon: ShoppingBag },
  { href: "/dashboard/analytics", label: "Analytics", icon: BarChart },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
];

export function DashboardSidebar() {
  const { user } = useAuth();
  const links = (user as User)?.user_type === "affiliate" ? affiliateLinks : businessLinks;

  return (
    <div className="w-64 bg-card border-r min-h-screen p-4">
      <div className="space-y-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold">Dashboard</h2>
          <div className="space-y-1">
            {links.map((link) => (
              <Button
                key={link.href}
                variant="ghost"
                className={cn(
                  "w-full justify-start",
                  window.location.pathname === link.href && "bg-accent"
                )}
                asChild
              >
                <Link to={link.href}>
                  <link.icon className="mr-2 h-4 w-4" />
                  {link.label}
                </Link>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}