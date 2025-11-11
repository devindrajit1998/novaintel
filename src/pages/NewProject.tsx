import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Sparkles, Upload, ArrowLeft, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";
import { useProjects } from "@/hooks/useProjects";

const NewProject = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { createProject } = useProjects();
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    client: "",
    industry: "",
    project_type: "",
    region: "",
  });

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const handleAnalyze = () => {
    if (!formData.name || !formData.client || !formData.industry) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsAnalyzing(true);
    
    createProject(formData);
    
    setTimeout(() => {
      setIsAnalyzing(false);
      toast.success("Project created successfully!");
      navigate("/dashboard");
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Header */}
      <header className="border-b border-border/50 backdrop-blur-md">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-8 h-8 text-primary" />
              <span className="text-2xl font-bold gradient-text">NovaIntel</span>
            </div>
            <Link to="/dashboard">
              <Button variant="ghost">
                <ArrowLeft className="w-5 h-5" />
                Back to Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Create New Project</h1>
          <p className="text-muted-foreground">Start by entering client details and uploading the RFP</p>
        </div>

        <div className="space-y-6">
          {/* Client Information */}
          <Card className="glass-card p-6">
            <h2 className="text-2xl font-bold mb-6">Project Information</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">Project Name *</Label>
                <Input
                  id="name"
                  placeholder="e.g., Healthcare Cloud Migration"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="bg-input/50 border-border/50"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="client">Client Name *</Label>
                <Input
                  id="client"
                  placeholder="Enter client name"
                  value={formData.client}
                  onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                  className="bg-input/50 border-border/50"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="industry">Industry *</Label>
                <Select
                  value={formData.industry}
                  onValueChange={(value) => setFormData({ ...formData, industry: value })}
                >
                  <SelectTrigger className="bg-input/50 border-border/50">
                    <SelectValue placeholder="Select industry" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Healthcare">Healthcare</SelectItem>
                    <SelectItem value="Finance">Finance</SelectItem>
                    <SelectItem value="Retail">Retail</SelectItem>
                    <SelectItem value="Manufacturing">Manufacturing</SelectItem>
                    <SelectItem value="Insurance">Insurance</SelectItem>
                    <SelectItem value="Education">Education</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="projectType">Project Type</Label>
                <Input
                  id="projectType"
                  placeholder="e.g., Cloud Migration"
                  value={formData.project_type}
                  onChange={(e) => setFormData({ ...formData, project_type: e.target.value })}
                  className="bg-input/50 border-border/50"
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="region">Region</Label>
                <Input
                  id="region"
                  placeholder="e.g., North America"
                  value={formData.region}
                  onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                  className="bg-input/50 border-border/50"
                />
              </div>
            </div>
          </Card>

          {/* RFP Upload */}
          <Card className="glass-card p-6">
            <h2 className="text-2xl font-bold mb-6">Upload RFP (Optional)</h2>
            <div className="border-2 border-dashed border-border/50 rounded-lg p-12 text-center hover:border-primary/50 transition-colors cursor-pointer">
              <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-lg font-semibold mb-2">Drag & drop your RFP here</p>
              <p className="text-sm text-muted-foreground mb-4">
                Supports PDF, DOCX, TXT (Max 20MB)
              </p>
              <Button variant="outline">Browse Files</Button>
            </div>
          </Card>

          {/* AI Configuration */}
          <Card className="glass-card p-6">
            <h2 className="text-2xl font-bold mb-6">AI Configuration</h2>
            <div className="space-y-4">
              {[
                { label: "Extract Business Challenges", description: "Identify pain points and requirements" },
                { label: "Generate Discovery Questions", description: "Create targeted questionnaires" },
                { label: "Recommend Case Studies", description: "Find relevant success stories" },
                { label: "Draft Initial Proposal", description: "Generate proposal outline" },
              ].map((option, index) => (
                <label key={index} className="flex items-start gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="mt-1 rounded border-border"
                  />
                  <div>
                    <p className="font-semibold group-hover:text-primary transition-colors">
                      {option.label}
                    </p>
                    <p className="text-sm text-muted-foreground">{option.description}</p>
                  </div>
                </label>
              ))}
            </div>
          </Card>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <Button
              variant="hero"
              size="lg"
              onClick={handleAnalyze}
              disabled={isAnalyzing}
              className="flex-1"
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Creating Project...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  Create Project
                </>
              )}
            </Button>
            <Link to="/dashboard" className="flex-1">
              <Button variant="outline" size="lg" className="w-full">
                Cancel
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewProject;
