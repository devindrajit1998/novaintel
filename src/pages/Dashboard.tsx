import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
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
  Plus, 
  Briefcase, 
  Clock, 
  Heart, 
  TrendingUp,
  Eye,
  Edit,
  Trash2,
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useProjects } from "@/hooks/useProjects";
import { format } from "date-fns";

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { projects, isLoading, deleteProject } = useProjects();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const getStatusColor = (status: string) => {
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

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this project?")) {
      deleteProject(id);
    }
  };

  const stats = [
    { 
      title: "Active Projects", 
      value: projects?.length || 0, 
      icon: Briefcase,
      color: "text-primary"
    },
    { 
      title: "This Month", 
      value: projects?.filter(p => {
        const created = new Date(p.created_at);
        const now = new Date();
        return created.getMonth() === now.getMonth() && created.getFullYear() === now.getFullYear();
      }).length || 0, 
      icon: Clock,
      color: "text-accent"
    },
    { 
      title: "In Progress", 
      value: projects?.filter(p => p.status === "In Progress").length || 0, 
      icon: Heart,
      color: "text-secondary"
    },
    { 
      title: "Completed", 
      value: projects?.filter(p => p.status === "Completed").length || 0, 
      icon: TrendingUp,
      color: "text-primary-glow"
    },
  ];

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back{user?.email ? `, ${user.email}` : ""}! Here's your presales overview.
        </p>
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
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8">
                    Loading projects...
                  </TableCell>
                </TableRow>
              ) : !projects || projects.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8">
                    No projects yet. Create your first project!
                  </TableCell>
                </TableRow>
              ) : (
                projects.map((project) => (
                  <TableRow key={project.id} className="hover:bg-muted/20">
                    <TableCell className="font-medium">{project.name}</TableCell>
                    <TableCell>{project.client}</TableCell>
                    <TableCell>{project.industry}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(project.status)}>
                        {project.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {format(new Date(project.updated_at), "MMM d, yyyy")}
                    </TableCell>
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
                ))
              )}
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
  );
};

export default Dashboard;
