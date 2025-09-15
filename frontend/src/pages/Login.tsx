import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GraduationCap, Lock, User } from "lucide-react";
import heroImage from "@/assets/hero-education.jpg";

interface LoginProps {
  onLogin: (credentials: { username: string; password: string }) => void;
}

const Login = ({ onLogin }: LoginProps) => {
  const [credentials, setCredentials] = useState({ username: "", password: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(credentials);
  };

  return (
    <div className="min-h-screen flex">
      {/* Hero Image Section */}
      <div 
        className="hidden lg:flex lg:w-1/2 bg-cover bg-center relative"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-primary-dark/70"></div>
        <div className="relative z-10 flex flex-col justify-center px-12 text-white">
          <h2 className="text-4xl font-bold mb-4">Smart Classroom</h2>
          <h3 className="text-2xl mb-6">Timetable Scheduler</h3>
          <p className="text-lg opacity-90 leading-relaxed">
            Advanced scheduling system for higher education institutions with optimized classroom utilization, faculty management, and automated timetable generation.
          </p>
          <div className="mt-8 space-y-2">
            <p className="text-sm opacity-80">✓ Maximized classroom utilization</p>
            <p className="text-sm opacity-80">✓ Minimized faculty workload</p>
            <p className="text-sm opacity-80">✓ NEP 2020 compliant</p>
          </div>
        </div>
      </div>

      {/* Login Form Section */}
      <div className="flex-1 flex items-center justify-center p-8 bg-gradient-hero">
        <div className="w-full max-w-md space-y-8">
          {/* Header */}
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-primary/10 rounded-full">
                <GraduationCap className="h-8 w-8 text-primary" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-foreground">Smart Classroom</h1>
            <p className="text-muted-foreground mt-2">Timetable Scheduler System</p>
          </div>

          {/* Login Form */}
          <Card className="card-elevated">
            <CardHeader className="space-y-2 text-center">
              <CardTitle className="text-xl">Authorized Access</CardTitle>
              <CardDescription>
                Login to access the timetable management system
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="username"
                      type="text"
                      placeholder="Enter your username"
                      value={credentials.username}
                      onChange={(e) => setCredentials(prev => ({ ...prev, username: e.target.value }))}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="Enter your password"
                      value={credentials.password}
                      onChange={(e) => setCredentials(prev => ({ ...prev, password: e.target.value }))}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
                <Button type="submit" variant="hero" className="w-full">
                  Sign In
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Footer */}
          <p className="text-center text-sm text-muted-foreground">
            Government of Jharkhand - Department of Higher and Technical Education
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;