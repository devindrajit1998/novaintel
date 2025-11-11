import { 
  Sparkles, 
  LayoutDashboard, 
  FolderPlus, 
  Lightbulb, 
  FileText, 
  BookOpen, 
  Settings as SettingsIcon,
  LogOut
} from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";

const mainItems = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "New Project", url: "/new-project", icon: FolderPlus },
  { title: "Case Studies", url: "/case-studies", icon: BookOpen },
  { title: "Settings", url: "/settings", icon: SettingsIcon },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const { user, signOut } = useAuth();
  const currentPath = location.pathname;
  const collapsed = state === "collapsed";

  const isActive = (path: string) => currentPath === path || currentPath.startsWith(path + "/");

  return (
    <Sidebar className={collapsed ? "w-16" : "w-64"} collapsible="icon">
      <SidebarContent>
        {/* Logo Section */}
        <div className="px-4 py-6 border-b border-border/50">
          <div className="flex items-center gap-2">
            <Sparkles className="w-8 h-8 text-primary" />
            {!collapsed && <span className="text-xl font-bold gradient-text">NovaIntel</span>}
          </div>
        </div>

        <SidebarGroup>
          <SidebarGroupLabel className={collapsed ? "sr-only" : ""}>
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={isActive(item.url)}>
                    <NavLink 
                      to={item.url} 
                      className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-muted/50 transition-colors"
                      activeClassName="bg-primary/10 text-primary font-medium"
                    >
                      <item.icon className="h-5 w-5 flex-shrink-0" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Footer with user info and sign out */}
      <SidebarFooter className="border-t border-border/50 p-4">
        {user && (
          <div className="space-y-2">
            {!collapsed && (
              <div className="px-2 py-1 text-xs text-muted-foreground truncate">
                {user.email}
              </div>
            )}
            <Button
              variant="ghost"
              size={collapsed ? "icon" : "sm"}
              className="w-full justify-start gap-2"
              onClick={signOut}
            >
              <LogOut className="h-4 w-4" />
              {!collapsed && <span>Sign Out</span>}
            </Button>
          </div>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
