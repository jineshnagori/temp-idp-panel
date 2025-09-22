import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserManagement } from "./UserManagement";
import { AccessControl } from "./AccessControl";
import { PasswordDecryption } from "./PasswordDecryption";
import { Shield, Users, Key, Database } from "lucide-react";

export const PgGatekeeper = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary text-primary-foreground">
                <Shield className="h-6 w-6" />
              </div>
              <div>
                <h1 className="text-xl font-semibold">pgGatekeeper</h1>
                <p className="text-sm text-muted-foreground">PostgreSQL Time-bound Access Control</p>
              </div>
            </div>
            <button 
              onClick={() => window.history.back()}
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              ← Back to Portal
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-2">Access Management Dashboard</h2>
          <p className="text-muted-foreground">
            Manage user access, permissions, and time-bound database connections
          </p>
        </div>

        <Tabs defaultValue="users" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="users" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              User Management
            </TabsTrigger>
            <TabsTrigger value="access" className="flex items-center gap-2">
              <Database className="h-4 w-4" />
              Access Control
            </TabsTrigger>
            <TabsTrigger value="decrypt" className="flex items-center gap-2">
              <Key className="h-4 w-4" />
              Password Decryption
            </TabsTrigger>
          </TabsList>

          <TabsContent value="users">
            <UserManagement />
          </TabsContent>

          <TabsContent value="access">
            <AccessControl />
          </TabsContent>

          <TabsContent value="decrypt">
            <PasswordDecryption />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};