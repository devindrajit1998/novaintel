import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Sparkles, Save, RotateCcw } from "lucide-react";
import { toast } from "sonner";

const Settings = () => {
  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "john.doe@company.com",
    role: "Presales Manager"
  });

  const [preferences, setPreferences] = useState({
    defaultIndustry: "healthcare",
    proposalStyle: "executive",
    themeMode: "dark"
  });

  const [aiSettings, setAiSettings] = useState({
    responseTone: "professional",
    secureMode: true
  });

  const handleSave = () => {
    toast.success("Settings saved successfully!");
  };

  const handleReset = () => {
    toast.info("Settings reset to defaults");
  };

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
            <Link to="/dashboard">
              <Button variant="ghost">Back to Dashboard</Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Settings</h1>
          <p className="text-muted-foreground">Manage your profile and preferences</p>
        </div>

        <div className="space-y-6">
          {/* Profile Settings */}
          <Card className="glass-card p-6">
            <h2 className="text-2xl font-bold mb-6">Profile Settings</h2>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  className="bg-input/50 border-border/50"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  className="bg-input/50 border-border/50"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Input
                  id="role"
                  value={profile.role}
                  onChange={(e) => setProfile({ ...profile, role: e.target.value })}
                  className="bg-input/50 border-border/50"
                />
              </div>
            </div>
          </Card>

          {/* Preferences */}
          <Card className="glass-card p-6">
            <h2 className="text-2xl font-bold mb-6">Preferences</h2>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="defaultIndustry">Default Industry</Label>
                <Select
                  value={preferences.defaultIndustry}
                  onValueChange={(value) => setPreferences({ ...preferences, defaultIndustry: value })}
                >
                  <SelectTrigger className="bg-input/50 border-border/50">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="healthcare">Healthcare</SelectItem>
                    <SelectItem value="finance">Finance</SelectItem>
                    <SelectItem value="retail">Retail</SelectItem>
                    <SelectItem value="manufacturing">Manufacturing</SelectItem>
                    <SelectItem value="insurance">Insurance</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="proposalStyle">Proposal Style</Label>
                <Select
                  value={preferences.proposalStyle}
                  onValueChange={(value) => setPreferences({ ...preferences, proposalStyle: value })}
                >
                  <SelectTrigger className="bg-input/50 border-border/50">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="executive">Executive Summary</SelectItem>
                    <SelectItem value="detailed">Detailed</SelectItem>
                    <SelectItem value="technical">Technical</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="themeMode">Theme Mode</Label>
                <Select
                  value={preferences.themeMode}
                  onValueChange={(value) => setPreferences({ ...preferences, themeMode: value })}
                >
                  <SelectTrigger className="bg-input/50 border-border/50">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dark">Dark</SelectItem>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="auto">Auto</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </Card>

          {/* AI Settings */}
          <Card className="glass-card p-6">
            <h2 className="text-2xl font-bold mb-6">AI Settings</h2>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="responseTone">Response Tone</Label>
                <Select
                  value={aiSettings.responseTone}
                  onValueChange={(value) => setAiSettings({ ...aiSettings, responseTone: value })}
                >
                  <SelectTrigger className="bg-input/50 border-border/50">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="professional">Professional</SelectItem>
                    <SelectItem value="casual">Casual</SelectItem>
                    <SelectItem value="technical">Technical</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center justify-between p-4 rounded-lg border border-border/50 bg-muted/20">
                <div>
                  <p className="font-semibold">Secure Mode</p>
                  <p className="text-sm text-muted-foreground">
                    Enhanced data privacy and encryption
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={aiSettings.secureMode}
                    onChange={(e) => setAiSettings({ ...aiSettings, secureMode: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-muted peer-focus:ring-2 peer-focus:ring-primary rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>
            </div>
          </Card>

          {/* Actions */}
          <div className="flex gap-4">
            <Button variant="hero" size="lg" onClick={handleSave} className="flex-1">
              <Save className="w-5 h-5" />
              Save Changes
            </Button>
            <Button variant="outline" size="lg" onClick={handleReset} className="flex-1">
              <RotateCcw className="w-5 h-5" />
              Reset to Default
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
