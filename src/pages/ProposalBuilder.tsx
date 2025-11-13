import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Sparkles, 
  ArrowLeft, 
  Save,
  Download,
  Plus,
  Trash2,
  Eye
} from "lucide-react";
import { toast } from "sonner";

interface ProposalSection {
  id: string;
  title: string;
  content: string;
}

const ProposalBuilder = () => {
  const { id } = useParams();
  const [template, setTemplate] = useState("executive");
  const [sections, setSections] = useState<ProposalSection[]>([
    {
      id: "intro",
      title: "Introduction",
      content: "We are pleased to present this proposal outlining our comprehensive solution to address your organization's key challenges and drive digital transformation."
    },
    {
      id: "challenges",
      title: "Business Challenges",
      content: "Based on our analysis of your RFP, we understand that your organization faces several critical challenges including legacy system limitations, data silos, and the need for scalable cloud infrastructure."
    },
    {
      id: "solutions",
      title: "Proposed Solutions",
      content: "Our solution architecture leverages cutting-edge cloud technologies, AI-powered analytics, and proven integration methodologies to deliver a comprehensive transformation platform."
    },
    {
      id: "benefits",
      title: "Expected Benefits",
      content: "Implementation of our solution will result in 40% faster time-to-market, 60% reduction in operational costs, and enterprise-grade security compliance."
    }
  ]);

  const handleSave = () => {
    toast.success("Proposal saved successfully!");
  };

  const handleExport = (format: string) => {
    toast.success(`Exporting proposal as ${format.toUpperCase()}...`);
  };

  const handleAddSection = () => {
    const newSection: ProposalSection = {
      id: `section-${Date.now()}`,
      title: "New Section",
      content: "Enter your content here..."
    };
    setSections([...sections, newSection]);
  };

  const handleDeleteSection = (id: string) => {
    setSections(sections.filter(s => s.id !== id));
    toast.success("Section removed");
  };

  const handleUpdateSection = (id: string, field: 'title' | 'content', value: string) => {
    setSections(sections.map(s => 
      s.id === id ? { ...s, [field]: value } : s
    ));
  };

  return (
    <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <Link to="/dashboard" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-4">
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Link>
          <h1 className="text-4xl font-bold mb-2">Proposal Builder</h1>
          <p className="text-muted-foreground">Edit and customize your proposal for Project #{id || 'new'}</p>
        </div>
        
        <div className="mb-6 flex items-center justify-between">
          <div className="flex gap-3">
            <Button variant="glass" onClick={handleSave}>
              <Save className="w-5 h-5" />
              Save Draft
            </Button>
            <Button variant="default" onClick={() => handleExport('pdf')}>
              <Download className="w-5 h-5" />
              Export PDF
            </Button>
            <Button variant="secondary" onClick={() => handleExport('docx')}>
              <Download className="w-5 h-5" />
              Export DOCX
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Editor */}
          <div className="lg:col-span-2 space-y-6">
            {/* Template Selector */}
            <Card className="glass-card p-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold">Template</h2>
                <Select value={template} onValueChange={setTemplate}>
                  <SelectTrigger className="w-[200px] bg-input/50 border-border/50">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="executive">Executive Summary</SelectItem>
                    <SelectItem value="full">Full Proposal</SelectItem>
                    <SelectItem value="quick">Quick Pitch</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </Card>

            {/* Editable Sections */}
            <div className="space-y-4">
              {sections.map((section) => (
                <Card key={section.id} className="glass-card p-6">
                  <div className="flex items-start justify-between mb-4">
                    <Input
                      value={section.title}
                      onChange={(e) => handleUpdateSection(section.id, 'title', e.target.value)}
                      className="text-xl font-bold bg-transparent border-none focus-visible:ring-0 p-0 h-auto"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeleteSection(section.id)}
                    >
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </Button>
                  </div>
                  <Textarea
                    value={section.content}
                    onChange={(e) => handleUpdateSection(section.id, 'content', e.target.value)}
                    className="min-h-[150px] bg-input/50 border-border/50"
                  />
                </Card>
              ))}

              <Button
                variant="outline"
                onClick={handleAddSection}
                className="w-full"
              >
                <Plus className="w-5 h-5" />
                Add Section
              </Button>
            </div>
          </div>

          {/* Preview Panel */}
          <div className="lg:col-span-1">
            <Card className="glass-card p-6 sticky top-24">
              <div className="flex items-center gap-2 mb-4">
                <Eye className="w-6 h-6 text-primary" />
                <h2 className="text-2xl font-bold">Live Preview</h2>
              </div>

              <div className="space-y-6 max-h-[calc(100vh-16rem)] overflow-y-auto">
                <div className="p-4 bg-muted/20 rounded-lg">
                  <h3 className="text-sm font-semibold text-muted-foreground mb-2">
                    PROPOSAL PREVIEW
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    Template: {template === 'executive' ? 'Executive Summary' : template === 'full' ? 'Full Proposal' : 'Quick Pitch'}
                  </p>
                </div>

                {sections.map((section) => (
                  <div key={section.id} className="border-l-2 border-primary/30 pl-4">
                    <h3 className="text-lg font-bold mb-2">{section.title}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-4">
                      {section.content}
                    </p>
                  </div>
                ))}

                <div className="p-4 bg-muted/20 rounded-lg text-center">
                  <p className="text-xs text-muted-foreground">
                    {sections.length} sections • {sections.reduce((acc, s) => acc + s.content.split(' ').length, 0)} words
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
  );
};

export default ProposalBuilder;
