import { useAuth } from "@/contexts/AuthContext";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
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
  FileText,
  Home as HomeIcon,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";

export function DashboardSidebar() {
  const { user } = useAuth();
  const userType = user?.user_metadata?.user_type;

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

    const adminItems = [
      {
        title: "Users",
        icon: Users,
        href: "/dashboard/users",
      },
      {
        title: "Properties",
        icon: HomeIcon,
        href: "/dashboard/properties",
      },
      {
        title: "Classifieds",
        icon: FileText,
        href: "/dashboard/classifieds",
      },
      {
        title: "Businesses",
        icon: Building2,
        href: "/dashboard/businesses",
      },
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
        title: "Moderation",
        icon: AlertCircle,
        href: "/dashboard/moderation",
      },
      {
        title: "Analytics",
        icon: BarChart3,
        href: "/dashboard/analytics",
      },
      {
        title: "Affiliates",
        icon: Link2,
        href: "/dashboard/affiliates",
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
    ];

    switch (userType) {
      case "super_admin":
        return [...commonItems, ...adminItems];
      case "business":
        return [...commonItems, ...businessItems];
      case "affiliate":
        return [...commonItems, ...affiliateItems];
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