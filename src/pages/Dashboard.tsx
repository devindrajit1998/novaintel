import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { 
  Sparkles, 
  Plus, 
  Bell, 
  User, 
  Briefcase, 
  Clock, 
  Heart, 
  TrendingUp,
  Eye,
  Edit,
  Trash2
} from "lucide-react";
import { mockProjects, mockStats, Project } from "@/lib/mockData";
import { toast } from "sonner";

const Dashboard = () => {
  const [projects, setProjects] = useState<Project[]>(mockProjects);

  const getStatusColor = (status: Project['status']) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'In Progress':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'On Hold':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'New':
        return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const handleDelete = (id: number) => {
    setProjects(projects.filter(p => p.id !== id));
    toast.success("Project deleted successfully");
  };

  const stats = [
    { 
      title: "Active Projects", 
      value: mockStats.activeProjects, 
      icon: Briefcase,
      color: "text-primary"
    },
    { 
      title: "Time Saved", 
      value: mockStats.timeSaved, 
      icon: Clock,
      color: "text-accent"
    },
    { 
      title: "Client Satisfaction", 
      value: mockStats.clientSatisfaction, 
      icon: Heart,
      color: "text-secondary"
    },
    { 
      title: "Top Domain", 
      value: mockStats.topDomain, 
      icon: TrendingUp,
      color: "text-primary-glow"
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Header */}
      <header className="border-b border-border/50 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-8 h-8 text-primary" />
              <span className="text-2xl font-bold gradient-text">NovaIntel</span>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon">
                <Bell className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <User className="w-5 h-5" />
              </Button>
              <Link to="/new-project">
                <Button variant="hero">
                  <Plus className="w-5 h-5" />
                  New Project
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here's your presales overview.</p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="glass-card p-6 hover:scale-105 transition-all">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">{stat.title}</p>
                    <p className="text-3xl font-bold">{stat.value}</p>
                  </div>
                  <div className={`w-12 h-12 rounded-lg bg-gradient-primary flex items-center justify-center ${stat.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Projects Table */}
        <Card className="glass-card p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold mb-1">Projects</h2>
              <p className="text-muted-foreground">Manage your presales projects</p>
            </div>
            <Link to="/new-project">
              <Button variant="default">
                <Plus className="w-5 h-5" />
                Create Project
              </Button>
            </Link>
          </div>

          <div className="rounded-lg border border-border/50 overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/30">
                  <TableHead>Project Name</TableHead>
                  <TableHead>Client</TableHead>
                  <TableHead>Industry</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Updated</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {projects.map((project) => (
                  <TableRow key={project.id} className="hover:bg-muted/20">
                    <TableCell className="font-medium">{project.name}</TableCell>
                    <TableCell>{project.client}</TableCell>
                    <TableCell>{project.industry}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(project.status)}>
                        {project.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{project.updated}</TableCell>
                    <TableCell>
                      <div className="flex items-center justify-end gap-2">
                        <Link to={`/insights/${project.id}`}>
                          <Button variant="ghost" size="icon">
                            <Eye className="w-4 h-4" />
                          </Button>
                        </Link>
                        <Button variant="ghost" size="icon">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => handleDelete(project.id)}
                        >
                          <Trash2 className="w-4 h-4 text-destructive" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Card>

        {/* AI Trends Widget */}
        <Card className="glass-card p-6 mt-8">
          <h3 className="text-xl font-bold mb-4">AI-Identified Trends</h3>
          <div className="grid md:grid-cols-3 gap-4">
            {["Cloud Migration", "Data Analytics", "Process Automation"].map((trend, index) => (
              <div key={index} className="p-4 rounded-lg bg-muted/20 border border-border/30">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  <span className="font-semibold">{trend}</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  High demand across {Math.floor(Math.random() * 10) + 5} industries
                </p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
