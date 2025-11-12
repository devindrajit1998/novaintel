import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Settings as SettingsIcon, Brain, Save, RotateCcw } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";

const Settings = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  // Profile Settings
  const [name, setName] = useState("John Doe");
  const [email, setEmail] = useState(user?.email || "");
  const [role, setRole] = useState("Presales Manager");

  // Preferences
  const [defaultIndustry, setDefaultIndustry] = useState("technology");
  const [proposalTone, setProposalTone] = useState("professional");
  const [themeMode, setThemeMode] = useState("dark");

  // AI Settings
  const [responseStyle, setResponseStyle] = useState("detailed");
  const [secureMode, setSecureMode] = useState(true);

  const handleSaveProfile = () => {
    toast({ title: "Profile settings saved successfully" });
  };

  const handleSavePreferences = () => {
    toast({ title: "Preferences saved successfully" });
  };

  const handleSaveAI = () => {
    toast({ title: "AI settings saved successfully" });
  };

  const handleResetDefaults = () => {
    setDefaultIndustry("technology");
    setProposalTone("professional");
    setThemeMode("dark");
    setResponseStyle("detailed");
    setSecureMode(true);
    toast({ title: "Settings reset to defaults" });
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold gradient-text mb-2">Settings</h1>
          <p className="text-muted-foreground">Manage your preferences, profile, and AI configuration</p>
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 glass-card">
            <TabsTrigger value="profile">
              <User className="w-4 h-4 mr-2" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="preferences">
              <SettingsIcon className="w-4 h-4 mr-2" />
              Preferences
            </TabsTrigger>
            <TabsTrigger value="ai">
              <Brain className="w-4 h-4 mr-2" />
              AI Settings
            </TabsTrigger>
          </TabsList>

          {/* Profile Settings */}
          <TabsContent value="profile">
            <Card className="glass-card border-glass-border/30">
              <CardHeader>
                <CardTitle>Profile Settings</CardTitle>
                <CardDescription>Update your personal information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your full name"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your.email@company.com"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="role">Role</Label>
                  <Input
                    id="role"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    placeholder="Your role/title"
                  />
                </div>

                <Separator />

                <div className="flex justify-end">
                  <Button onClick={handleSaveProfile} variant="hero">
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Preferences */}
          <TabsContent value="preferences">
            <Card className="glass-card border-glass-border/30">
              <CardHeader>
                <CardTitle>Preferences</CardTitle>
                <CardDescription>Customize your NovaIntel experience</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="industry">Default Industry</Label>
                  <Select value={defaultIndustry} onValueChange={setDefaultIndustry}>
                    <SelectTrigger id="industry">
                      <SelectValue placeholder="Select industry" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="technology">Technology</SelectItem>
                      <SelectItem value="bfsi">Banking & Financial Services</SelectItem>
                      <SelectItem value="healthcare">Healthcare</SelectItem>
                      <SelectItem value="retail">Retail & E-commerce</SelectItem>
                      <SelectItem value="manufacturing">Manufacturing</SelectItem>
                      <SelectItem value="energy">Energy & Utilities</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tone">Proposal Tone</Label>
                  <Select value={proposalTone} onValueChange={setProposalTone}>
                    <SelectTrigger id="tone">
                      <SelectValue placeholder="Select tone" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="professional">Professional</SelectItem>
                      <SelectItem value="casual">Casual & Friendly</SelectItem>
                      <SelectItem value="technical">Technical & Detailed</SelectItem>
                      <SelectItem value="executive">Executive Summary Style</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="theme">Theme Mode</Label>
                  <Select value={themeMode} onValueChange={setThemeMode}>
                    <SelectTrigger id="theme">
                      <SelectValue placeholder="Select theme" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="dark">Dark Mode</SelectItem>
                      <SelectItem value="light">Light Mode</SelectItem>
                      <SelectItem value="auto">Auto (System)</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground">
                    Note: Light mode coming soon
                  </p>
                </div>

                <Separator />

                <div className="flex justify-end">
                  <Button onClick={handleSavePreferences} variant="hero">
                    <Save className="w-4 h-4 mr-2" />
                    Save Preferences
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* AI Settings */}
          <TabsContent value="ai">
            <Card className="glass-card border-glass-border/30">
              <CardHeader>
                <CardTitle>AI Configuration</CardTitle>
                <CardDescription>Configure AI behavior and security settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="response">AI Response Style</Label>
                  <Select value={responseStyle} onValueChange={setResponseStyle}>
                    <SelectTrigger id="response">
                      <SelectValue placeholder="Select style" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="concise">Concise & Brief</SelectItem>
                      <SelectItem value="balanced">Balanced</SelectItem>
                      <SelectItem value="detailed">Detailed & Comprehensive</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground">
                    Controls how verbose AI responses are
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="secure">Secure Mode</Label>
                    <p className="text-sm text-muted-foreground">
                      Enable data encryption and enhanced privacy protection
                    </p>
                  </div>
                  <Switch
                    id="secure"
                    checked={secureMode}
                    onCheckedChange={setSecureMode}
                  />
                </div>

                <div className="p-4 rounded-lg bg-accent/10 border border-accent/30">
                  <h4 className="text-sm font-semibold mb-2 text-accent">AI Model Information</h4>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    <li>• Using GPT-4 for advanced analysis</li>
                    <li>• Context window: 128K tokens</li>
                    <li>• Average response time: 2-3 seconds</li>
                    <li>• RAG-enhanced retrieval from your documents</li>
                  </ul>
                </div>

                <Separator />

                <div className="flex justify-between">
                  <Button onClick={handleResetDefaults} variant="outline">
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Reset to Defaults
                  </Button>
                  <Button onClick={handleSaveAI} variant="hero">
                    <Save className="w-4 h-4 mr-2" />
                    Save AI Settings
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Settings;
