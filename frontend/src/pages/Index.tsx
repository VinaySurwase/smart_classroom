import { useState } from "react";
import Login from "./Login";
import Dashboard from "./Dashboard";
import TimetableForm from "../components/TimetableForm";
import TimetableDisplay from "../components/TimetableDisplay";
import { useToast } from "@/hooks/use-toast";

type AppView = 'login' | 'dashboard' | 'create-timetable' | 'view-timetable';

const Index = () => {
  const [currentView, setCurrentView] = useState<AppView>('login');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [timetableData, setTimetableData] = useState(null);
  const { toast } = useToast();

  const handleLogin = (credentials: { username: string; password: string }) => {
    // Simple authentication simulation
    if (credentials.username && credentials.password) {
      setIsAuthenticated(true);
      setCurrentView('dashboard');
      toast({
        title: "Welcome to Smart Classroom",
        description: "Successfully logged into the timetable management system.",
      });
    } else {
      toast({
        title: "Authentication Failed",
        description: "Please enter valid credentials.",
        variant: "destructive",
      });
    }
  };

  const handleCreateTimetable = () => {
    setCurrentView('create-timetable');
  };

  const handleViewTimetables = () => {
    setCurrentView('view-timetable');
  };

  const handleGenerateTimetable = (data: any) => {
    setTimetableData(data);
    setCurrentView('view-timetable');
    toast({
      title: "Timetable Generated Successfully",
      description: "3 optimized options have been generated for your review.",
    });
  };

  const handleApproveTimetable = (timetableId: number) => {
    toast({
      title: "Timetable Approved",
      description: "The selected timetable has been approved and is now active.",
    });
    setCurrentView('dashboard');
  };

  const handleBackToDashboard = () => {
    setCurrentView('dashboard');
  };

  const handleBackToForm = () => {
    setCurrentView('create-timetable');
  };

  // Render appropriate view based on authentication and current state
  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  switch (currentView) {
    case 'dashboard':
      return (
        <Dashboard
          onCreateTimetable={handleCreateTimetable}
          onViewTimetables={handleViewTimetables}
        />
      );
    case 'create-timetable':
      return (
        <TimetableForm
          onGenerate={handleGenerateTimetable}
          onBack={handleBackToDashboard}
        />
      );
    case 'view-timetable':
      return (
        <TimetableDisplay
          timetableData={timetableData}
          onBack={handleBackToForm}
          onApprove={handleApproveTimetable}
        />
      );
    default:
      return (
        <Dashboard
          onCreateTimetable={handleCreateTimetable}
          onViewTimetables={handleViewTimetables}
        />
      );
  }
};

export default Index;