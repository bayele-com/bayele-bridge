import { useAuth } from "@/contexts/AuthContext";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  BarChart3,
  Building2,
  CircleDollarSign,
  Home,
  Link2,
  Package,
  Settings,
  ShoppingCart,
  Users,
} from "lucide-react";

export function DashboardSidebar() {
  const { user } = useAuth();
  const userType = user?.user_metadata?.user_type;

  // Define menu items based on user type
  const getMenuItems = () => {
    const commonItems = [
      {
        title: "Overview",
        icon: Home,
        href: "/dashboard",
      },
      {
        title: "Settings",
        icon: Settings,
        href: "/dashboard/settings",
      },
    ];

    const affiliateItems = [
      {
        title: "My Links",
        icon: Link2,
        href: "/dashboard/links",
      },
      {
        title: "Earnings",
        icon: CircleDollarSign,
        href: "/dashboard/earnings",
      },
      {
        title: "Products",
        icon: Package,
        href: "/dashboard/products",
      },
    ];

    const businessItems = [
      {
        title: "Products",
        icon: Package,
        href: "/dashboard/products",
      },
      {
        title: "Orders",
        icon: ShoppingCart,
        href: "/dashboard/orders",
      },
      {
        title: "Analytics",
        icon: BarChart3,
        href: "/dashboard/analytics",
      },
    ];

    const adminItems = [
      {
        title: "Users",
        icon: Users,
        href: "/dashboard/users",
      },
      {
        title: "Businesses",
        icon: Building2,
        href: "/dashboard/businesses",
      },
    ];

    switch (userType) {
      case "affiliate":
        return [...commonItems, ...affiliateItems];
      case "business":
        return [...commonItems, ...businessItems];
      case "admin":
        return [...commonItems, ...adminItems];
      default:
        return commonItems;
    }
  };

  const menuItems = getMenuItems();

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Dashboard</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.href} className="flex items-center gap-2">
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}