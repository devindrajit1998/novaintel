import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { 
  Sparkles, 
  ArrowLeft, 
  FileText, 
  Download,
  MessageSquare,
  Send,
  Mic
} from "lucide-react";
import { mockInsights, mockCaseStudies } from "@/lib/mockData";

const AIInsights = () => {
  const { id } = useParams();
  const [chatMessage, setChatMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([
    { role: "assistant", content: "Hi! I'm your AI assistant. Ask me anything about this RFP." }
  ]);

  const handleSendMessage = () => {
    if (!chatMessage.trim()) return;
    
    setChatHistory([
      ...chatHistory,
      { role: "user", content: chatMessage },
      { role: "assistant", content: "Based on the RFP analysis, I can help you understand the client's requirements better. This is a mock response demonstrating the chat functionality." }
    ]);
    setChatMessage("");
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

      <div className="container mx-auto px-6 py-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2">AI Insights</h1>
            <p className="text-muted-foreground">Analysis results for Project #{id || 'new'}</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline">
              <Download className="w-5 h-5" />
              Export
            </Button>
            <Link to={`/proposal/${id || 'new'}`}>
              <Button variant="hero">
                <FileText className="w-5 h-5" />
                Generate Proposal
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column - Insights */}
          <div className="lg:col-span-2 space-y-6">
            {/* Overview Summary */}
            <Card className="glass-card p-6">
              <h2 className="text-2xl font-bold mb-4">Overview Summary</h2>
              <p className="text-muted-foreground leading-relaxed">
                {mockInsights.summary}
              </p>
            </Card>

            {/* Business Challenges */}
            <Card className="glass-card p-6">
              <h2 className="text-2xl font-bold mb-4">Business Challenges</h2>
              <div className="flex flex-wrap gap-2">
                {mockInsights.challenges.map((challenge, index) => (
                  <Badge 
                    key={index} 
                    className="bg-primary/20 text-primary border-primary/30 px-4 py-2 text-sm"
                  >
                    {challenge}
                  </Badge>
                ))}
              </div>
            </Card>

            {/* Discovery Questions */}
            <Card className="glass-card p-6">
              <h2 className="text-2xl font-bold mb-4">Discovery Questions</h2>
              <Accordion type="single" collapsible className="w-full">
                {mockInsights.discoveryQuestions.map((section, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-lg font-semibold">
                      {section.category}
                    </AccordionTrigger>
                    <AccordionContent>
                      <ul className="space-y-2">
                        {section.questions.map((question, qIndex) => (
                          <li key={qIndex} className="text-muted-foreground flex items-start gap-2">
                            <span className="text-primary mt-1">•</span>
                            {question}
                          </li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </Card>

            {/* Value Propositions */}
            <Card className="glass-card p-6">
              <h2 className="text-2xl font-bold mb-4">Value Propositions</h2>
              <ul className="space-y-3">
                {mockInsights.valuePropositions.map((prop, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-gradient-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-xs font-bold">{index + 1}</span>
                    </div>
                    <span className="text-muted-foreground">{prop}</span>
                  </li>
                ))}
              </ul>
            </Card>

            {/* Case Study Recommendations */}
            <Card className="glass-card p-6">
              <h2 className="text-2xl font-bold mb-4">Recommended Case Studies</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {mockCaseStudies.slice(0, 4).map((caseStudy) => (
                  <div 
                    key={caseStudy.id}
                    className="p-4 rounded-lg border border-border/30 bg-muted/20 hover:bg-muted/30 transition-colors cursor-pointer"
                  >
                    <h3 className="font-bold mb-2">{caseStudy.title}</h3>
                    <p className="text-sm text-primary mb-2">{caseStudy.industry}</p>
                    <p className="text-sm text-muted-foreground">{caseStudy.result}</p>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Right Column - Chat */}
          <div className="lg:col-span-1">
            <Card className="glass-card p-6 sticky top-24 h-[calc(100vh-8rem)] flex flex-col">
              <div className="flex items-center gap-2 mb-4">
                <MessageSquare className="w-6 h-6 text-primary" />
                <h2 className="text-2xl font-bold">Chat with RFP</h2>
              </div>

              {/* Chat Messages */}
              <div className="flex-1 overflow-y-auto space-y-4 mb-4">
                {chatHistory.map((msg, index) => (
                  <div
                    key={index}
                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg p-3 ${
                        msg.role === 'user'
                          ? 'bg-primary text-white'
                          : 'bg-muted/50 text-foreground'
                      }`}
                    >
                      {msg.content}
                    </div>
                  </div>
                ))}
              </div>

              {/* Chat Input */}
              <div className="space-y-2">
                <div className="flex gap-2">
                  <Input
                    value={chatMessage}
                    onChange={(e) => setChatMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Ask about the RFP..."
                    className="bg-input/50 border-border/50"
                  />
                  <Button variant="default" size="icon" onClick={handleSendMessage}>
                    <Send className="w-5 h-5" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Mic className="w-5 h-5" />
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground text-center">
                  AI assistant powered by NovaIntel
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIInsights;
