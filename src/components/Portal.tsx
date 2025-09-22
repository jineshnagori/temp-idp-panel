import { Card, CardContent } from "@/components/ui/card";
import { Shield, Database, Users, Key, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface AppTile {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  route: string;
  color: string;
}

const organizationApps: AppTile[] = [
  {
    id: "pg-gatekeeper",
    name: "pgGatekeeper",
    description: "PostgreSQL Time-bound Access Control",
    icon: Shield,
    route: "/pg-gatekeeper",
    color: "from-primary to-primary-glow",
  },
  // Future apps can be added here
];

export const Portal = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">My Apps</h1>
              <p className="text-muted-foreground mt-1">
                Access your organizational applications and tools
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm font-medium">Welcome back</p>
                <p className="text-xs text-muted-foreground">Admin User</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-semibold">
                AU
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-12">
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Applications</h2>
          <p className="text-muted-foreground">
            Click on any application to access its features and functionality
          </p>
        </div>

        {/* App Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {organizationApps.map((app) => (
            <Card
              key={app.id}
              className="group cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-105 border-2 hover:border-primary/20"
              onClick={() => navigate(app.route)}
            >
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center space-y-4">
                  {/* App Icon */}
                  <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${app.color} flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-200`}>
                    <app.icon className="h-8 w-8 text-white" />
                  </div>

                  {/* App Info */}
                  <div className="space-y-2">
                    <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                      {app.name}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {app.description}
                    </p>
                  </div>

                  {/* Launch Arrow */}
                  <div className="flex items-center text-xs text-muted-foreground group-hover:text-primary transition-colors">
                    <span>Launch</span>
                    <ChevronRight className="h-3 w-3 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {/* Coming Soon Placeholder */}
          <Card className="border-dashed border-2 border-muted-foreground/30">
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center space-y-4 opacity-50">
                <div className="w-16 h-16 rounded-xl bg-muted flex items-center justify-center">
                  <Database className="h-8 w-8 text-muted-foreground" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold text-lg text-muted-foreground">
                    More Apps
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Additional applications coming soon
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Stats */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="p-6 text-center">
              <Users className="h-8 w-8 mx-auto mb-3 text-primary" />
              <h3 className="font-semibold mb-1">Active Users</h3>
              <p className="text-2xl font-bold text-primary">24</p>
              <p className="text-sm text-muted-foreground">Across all applications</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <Shield className="h-8 w-8 mx-auto mb-3 text-success" />
              <h3 className="font-semibold mb-1">Security Status</h3>
              <p className="text-2xl font-bold text-success">Secure</p>
              <p className="text-sm text-muted-foreground">All systems operational</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <Key className="h-8 w-8 mx-auto mb-3 text-warning" />
              <h3 className="font-semibold mb-1">Access Requests</h3>
              <p className="text-2xl font-bold text-warning">3</p>
              <p className="text-sm text-muted-foreground">Pending approval</p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};