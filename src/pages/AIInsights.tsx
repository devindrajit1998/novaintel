import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Brain, Target, Lightbulb, TrendingUp, FileText, Send, Mic, Download } from "lucide-react";
import { mockInsights, mockCaseStudies } from "@/lib/mockData";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";

const AIInsights = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const [chatMessage, setChatMessage] = useState("");
  const [chatHistory, setChatHistory] = useState<Array<{ role: string; message: string }>>([
    { role: "assistant", message: "Hello! I'm your AI assistant. Ask me anything about this RFP." }
  ]);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const handleSendMessage = () => {
    if (!chatMessage.trim()) return;
    
    setChatHistory([...chatHistory, 
      { role: "user", message: chatMessage },
      { role: "assistant", message: "Based on the RFP context, here's my analysis: " + chatMessage }
    ]);
    setChatMessage("");
  };

  const handleExport = () => {
    toast({ title: "Exporting insights as PDF..." });
  };

  const handleGenerateProposal = () => {
    navigate(`/proposal/${id}`);
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold gradient-text mb-2">
            Project #{id || 'new'}
          </h1>
          <p className="text-muted-foreground">AI-Generated Insights and Recommendations</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Left Panel - Insights */}
          <div className="space-y-6">
            {/* Summary */}
            <Card className="glass-card border-glass-border/30">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Brain className="w-5 h-5 text-primary" />
                  <CardTitle>Executive Summary</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{mockInsights.summary}</p>
              </CardContent>
            </Card>

            {/* Business Challenges */}
            <Card className="glass-card border-glass-border/30">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-destructive" />
                  <CardTitle>Business Challenges</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {mockInsights.challenges.map((challenge, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <Badge variant="destructive" className="mt-1 shrink-0">!</Badge>
                      <span className="text-sm">{challenge}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Discovery Questions */}
            <Card className="glass-card border-glass-border/30">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-accent" />
                  <CardTitle>Discovery Questions</CardTitle>
                </div>
                <CardDescription>Tailored questions to uncover deeper insights</CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {mockInsights.discoveryQuestions.map((section, idx) => (
                    <AccordionItem key={idx} value={`item-${idx}`}>
                      <AccordionTrigger className="text-sm font-semibold">
                        {section.category}
                      </AccordionTrigger>
                      <AccordionContent>
                        <ul className="space-y-2 pl-4">
                          {section.questions.map((q, qIdx) => (
                            <li key={qIdx} className="text-sm text-muted-foreground list-disc">{q}</li>
                          ))}
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>

            {/* Value Propositions */}
            <Card className="glass-card border-glass-border/30">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  <CardTitle>Value Propositions</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {mockInsights.valuePropositions.map((vp, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <Badge variant="default" className="mt-1 shrink-0">✓</Badge>
                      <span className="text-sm">{vp}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Recommended Case Studies */}
            <Card className="glass-card border-glass-border/30">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-secondary" />
                  <CardTitle>Recommended Case Studies</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <Carousel className="w-full">
                  <CarouselContent>
                    {mockCaseStudies.slice(0, 4).map((cs) => (
                      <CarouselItem key={cs.id}>
                        <div className="p-4 rounded-lg bg-muted/20 border border-border">
                          <Badge className="mb-2">{cs.industry}</Badge>
                          <h4 className="font-semibold mb-2">{cs.title}</h4>
                          <p className="text-sm text-accent font-medium mb-2">{cs.result}</p>
                          <p className="text-sm text-muted-foreground line-clamp-2">{cs.description}</p>
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious />
                  <CarouselNext />
                </Carousel>
              </CardContent>
            </Card>
          </div>

          {/* Right Panel - Chat with RFP */}
          <div className="lg:sticky lg:top-6 h-fit">
            <Card className="glass-card border-glass-border/30 h-[calc(100vh-8rem)]">
              <CardHeader className="border-b border-border">
                <div className="flex items-center gap-2">
                  <Brain className="w-5 h-5 text-primary" />
                  <CardTitle>Chat with RFP</CardTitle>
                </div>
                <CardDescription>Ask questions and get contextual insights</CardDescription>
              </CardHeader>
              <CardContent className="p-0 flex flex-col h-[calc(100%-5rem)]">
                {/* Chat History */}
                <ScrollArea className="flex-1 p-4">
                  <div className="space-y-4">
                    {chatHistory.map((msg, idx) => (
                      <div
                        key={idx}
                        className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`max-w-[80%] rounded-lg p-3 ${
                            msg.role === "user"
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted text-foreground"
                          }`}
                        >
                          <p className="text-sm">{msg.message}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>

                <Separator />

                {/* Chat Input */}
                <div className="p-4">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Ask anything about this RFP..."
                      value={chatMessage}
                      onChange={(e) => setChatMessage(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                      className="flex-1 bg-muted/50"
                    />
                    <Button size="icon" variant="ghost" onClick={() => toast({ title: "Voice input coming soon!" })}>
                      <Mic className="w-4 h-4" />
                    </Button>
                    <Button size="icon" onClick={handleSendMessage}>
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex gap-4 justify-end">
          <Button variant="outline" onClick={handleExport}>
            <Download className="w-4 h-4" />
            Export Insights
          </Button>
          <Button variant="hero" size="lg" onClick={handleGenerateProposal}>
            Generate Proposal
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AIInsights;
