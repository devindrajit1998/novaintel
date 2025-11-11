import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Routes, Route } from "react-router-dom";
import { AppLayout } from "@/components/AppLayout";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import NewProject from "./pages/NewProject";
import AIInsights from "./pages/AIInsights";
import ProposalBuilder from "./pages/ProposalBuilder";
import CaseStudies from "./pages/CaseStudies";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const App = () => (
  <TooltipProvider>
    <Toaster />
    <Sonner />
    <Routes>
      {/* Public routes without sidebar */}
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      
      {/* Protected routes with sidebar */}
      <Route path="/dashboard" element={<AppLayout><Dashboard /></AppLayout>} />
      <Route path="/new-project" element={<AppLayout><NewProject /></AppLayout>} />
      <Route path="/insights/:id" element={<AppLayout><AIInsights /></AppLayout>} />
      <Route path="/proposal/:id" element={<AppLayout><ProposalBuilder /></AppLayout>} />
      <Route path="/case-studies" element={<AppLayout><CaseStudies /></AppLayout>} />
      <Route path="/settings" element={<AppLayout><Settings /></AppLayout>} />
      
      {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  </TooltipProvider>
);

export default App;
