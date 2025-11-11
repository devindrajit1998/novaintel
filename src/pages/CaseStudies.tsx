import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Search,
  Plus,
  Eye,
  Edit,
  Trash2,
  TrendingUp
} from "lucide-react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useAuth } from "@/hooks/useAuth";
import { useCaseStudies } from "@/hooks/useCaseStudies";

const CaseStudies = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { caseStudies, isLoading, deleteCaseStudy } = useCaseStudies();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCase, setSelectedCase] = useState<any>(null);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const filteredCases = caseStudies?.filter(cs =>
    cs.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    cs.industry.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this case study?")) {
      deleteCaseStudy(id);
    }
  };

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Case Studies</h1>
        <p className="text-muted-foreground">Browse and manage your success stories</p>
      </div>

      {/* Search and Actions */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            placeholder="Search by keyword or industry..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-input/50 border-border/50"
          />
        </div>
        <Button variant="hero">
          <Plus className="w-5 h-5" />
          Add Case Study
        </Button>
      </div>

      {/* Case Studies Grid */}
      {isLoading ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Loading case studies...</p>
        </div>
      ) : filteredCases.length === 0 ? (
        <Card className="glass-card p-12 text-center">
          <p className="text-muted-foreground mb-4">
            {searchQuery ? "No case studies match your search" : "No case studies yet"}
          </p>
          <Button variant="hero">
            <Plus className="w-5 h-5" />
            Create Your First Case Study
          </Button>
        </Card>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCases.map((caseStudy) => (
            <Card 
              key={caseStudy.id} 
              className="glass-card p-6 hover:scale-105 transition-all cursor-pointer group"
            >
              <div className="flex items-start justify-between mb-4">
                <Badge className="bg-primary/20 text-primary border-primary/30">
                  {caseStudy.industry}
                </Badge>
                <div className="flex gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedCase(caseStudy);
                    }}
                  >
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={(e) => {
                      e.stopPropagation();
                      toast.info("Edit functionality coming soon");
                    }}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(caseStudy.id);
                    }}
                  >
                    <Trash2 className="w-4 h-4 text-destructive" />
                  </Button>
                </div>
              </div>

              <h3 className="text-xl font-bold mb-3">{caseStudy.title}</h3>
              
              <div className="flex items-center gap-2 mb-3 text-accent">
                <TrendingUp className="w-5 h-5" />
                <span className="font-semibold">{caseStudy.result}</span>
              </div>

              <p className="text-sm text-muted-foreground line-clamp-3">
                {caseStudy.description}
              </p>
            </Card>
          ))}
        </div>
      )}

      {/* Case Study Detail Dialog */}
      <Dialog open={!!selectedCase} onOpenChange={() => setSelectedCase(null)}>
        <DialogContent className="glass-card border-border/50 max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl gradient-text">{selectedCase?.title}</DialogTitle>
            <DialogDescription>
              <Badge className="bg-primary/20 text-primary border-primary/30 mt-2">
                {selectedCase?.industry}
              </Badge>
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-accent">
              <TrendingUp className="w-6 h-6" />
              <span className="font-semibold text-lg">{selectedCase?.result}</span>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              {selectedCase?.description}
            </p>
            <div className="flex gap-3 pt-4">
              <Button variant="hero" className="flex-1">Use in Proposal</Button>
              <Button variant="outline" className="flex-1">Edit Details</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CaseStudies;
