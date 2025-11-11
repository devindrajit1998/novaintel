import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Bell, User } from "lucide-react";

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!loading && !user && location.pathname !== "/login" && location.pathname !== "/") {
      navigate("/login");
    }
  }, [user, loading, navigate, location.pathname]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-hero">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="min-h-screen flex w-full bg-gradient-hero">
        <AppSidebar />
        
        <div className="flex-1 flex flex-col w-full">
          {/* Header */}
          <header className="sticky top-0 z-40 border-b border-border/50 backdrop-blur-md bg-background/80">
            <div className="flex h-16 items-center gap-4 px-6">
              <SidebarTrigger className="hover:bg-muted/50" />
              
              <div className="flex-1" />
              
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" className="h-9 w-9">
                  <Bell className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="h-9 w-9">
                  <User className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 overflow-auto">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
