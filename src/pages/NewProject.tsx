import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Upload, Loader2, Sparkles, FileUp } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useProjects } from "@/hooks/useProjects";
import { useToast } from "@/hooks/use-toast";

const NewProject = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { createProject } = useProjects();
  const { toast } = useToast();
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [aiTasks, setAiTasks] = useState({
    challenges: true,
    questions: true,
    caseStudies: true,
    proposal: true,
  });
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      toast({ title: `File "${e.target.files[0].name}" uploaded successfully` });
    }
  };

  const handleAnalyze = () => {
    if (!formData.name || !formData.client || !formData.industry) {
      toast({ title: "Please fill in all required fields", variant: "destructive" });
      return;
    }

    setIsAnalyzing(true);
    
    createProject(formData);
    
    setTimeout(() => {
      setIsAnalyzing(false);
      toast({ title: "Project created successfully!" });
      navigate("/insights/new");
    }, 1500);
  };

  return (
    <div className="container mx-auto px-6 py-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold gradient-text mb-2">Create New Project</h1>
        <p className="text-muted-foreground">Upload client data and start AI-driven presales analysis</p>
      </div>

      <div className="space-y-6">
        {/* Client Information */}
        <Card className="glass-card border-glass-border/30">
          <CardHeader>
            <CardTitle>Client Information</CardTitle>
            <CardDescription>Basic details about the project and client</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="client">Client Name *</Label>
                <Input
                  id="client"
                  placeholder="Enter client name"
                  value={formData.client}
                  onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="name">Project Name *</Label>
                <Input
                  id="name"
                  placeholder="e.g., Healthcare Cloud Migration"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="industry">Industry *</Label>
                <Select
                  value={formData.industry}
                  onValueChange={(value) => setFormData({ ...formData, industry: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select industry" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Healthcare">Healthcare</SelectItem>
                    <SelectItem value="Finance">Finance & Banking</SelectItem>
                    <SelectItem value="Retail">Retail & E-commerce</SelectItem>
                    <SelectItem value="Manufacturing">Manufacturing</SelectItem>
                    <SelectItem value="Insurance">Insurance</SelectItem>
                    <SelectItem value="Technology">Technology</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="region">Region</Label>
                <Input
                  id="region"
                  placeholder="e.g., North America, APAC"
                  value={formData.region}
                  onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="projectType">Project Type</Label>
                <Input
                  id="projectType"
                  placeholder="e.g., Cloud Migration, Digital Transformation"
                  value={formData.project_type}
                  onChange={(e) => setFormData({ ...formData, project_type: e.target.value })}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Upload RFP */}
        <Card className="glass-card border-glass-border/30">
          <CardHeader>
            <CardTitle>Upload RFP</CardTitle>
            <CardDescription>Drag & drop or browse to upload the client's RFP document</CardDescription>
          </CardHeader>
          <CardContent>
            <label className="block">
              <input
                type="file"
                accept=".pdf,.docx,.txt"
                onChange={handleFileChange}
                className="hidden"
              />
              <div className="border-2 border-dashed border-border/50 rounded-lg p-12 text-center hover:border-primary/50 hover:bg-muted/20 transition-all cursor-pointer">
                {file ? (
                  <>
                    <FileUp className="w-12 h-12 text-primary mx-auto mb-4" />
                    <p className="text-lg font-semibold mb-2">{file.name}</p>
                    <p className="text-sm text-muted-foreground">
                      Click to change file
                    </p>
                  </>
                ) : (
                  <>
                    <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-lg font-semibold mb-2">Drag & drop your RFP here</p>
                    <p className="text-sm text-muted-foreground mb-4">
                      Supports PDF, DOCX, TXT (Max 20MB)
                    </p>
                    <Button variant="outline" type="button">Browse Files</Button>
                  </>
                )}
              </div>
            </label>
          </CardContent>
        </Card>

        {/* Select AI Tasks */}
        <Card className="glass-card border-glass-border/30">
          <CardHeader>
            <CardTitle>Select AI Tasks</CardTitle>
            <CardDescription>Choose which AI-powered insights you want to generate</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Checkbox
                  id="challenges"
                  checked={aiTasks.challenges}
                  onCheckedChange={(checked) => 
                    setAiTasks({ ...aiTasks, challenges: checked as boolean })
                  }
                />
                <div className="space-y-1">
                  <Label htmlFor="challenges" className="font-semibold cursor-pointer">
                    Extract Business Challenges
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Identify key pain points and requirements from the RFP
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Checkbox
                  id="questions"
                  checked={aiTasks.questions}
                  onCheckedChange={(checked) => 
                    setAiTasks({ ...aiTasks, questions: checked as boolean })
                  }
                />
                <div className="space-y-1">
                  <Label htmlFor="questions" className="font-semibold cursor-pointer">
                    Generate Discovery Questions
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Create targeted questionnaires to uncover deeper insights
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Checkbox
                  id="caseStudies"
                  checked={aiTasks.caseStudies}
                  onCheckedChange={(checked) => 
                    setAiTasks({ ...aiTasks, caseStudies: checked as boolean })
                  }
                />
                <div className="space-y-1">
                  <Label htmlFor="caseStudies" className="font-semibold cursor-pointer">
                    Recommend Case Studies
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Find relevant success stories matching the client's industry
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Checkbox
                  id="proposal"
                  checked={aiTasks.proposal}
                  onCheckedChange={(checked) => 
                    setAiTasks({ ...aiTasks, proposal: checked as boolean })
                  }
                />
                <div className="space-y-1">
                  <Label htmlFor="proposal" className="font-semibold cursor-pointer">
                    Draft Proposal
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Generate an initial proposal outline based on the analysis
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
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
                Analyzing RFP...
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                Analyze RFP
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
  );
};

export default NewProject;
