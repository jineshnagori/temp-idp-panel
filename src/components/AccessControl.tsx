import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Shield, Database, Plus, X, RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AccessRequest {
  username: string;
  email: string;
  tables: string[];
  permissions: string[];
  justification: string;
}

const AVAILABLE_PERMISSIONS = [
  "SELECT",
  "INSERT", 
  "UPDATE",
  "DELETE",
  "CREATE",
  "DROP",
  "ALTER",
  "INDEX",
];

export const AccessControl = () => {
  const [accessData, setAccessData] = useState<AccessRequest>({
    username: "",
    email: "",
    tables: [],
    permissions: [],
    justification: "",
  });
  const [newTable, setNewTable] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const addTable = () => {
    if (newTable.trim() && !accessData.tables.includes(newTable.trim())) {
      setAccessData({
        ...accessData,
        tables: [...accessData.tables, newTable.trim()],
      });
      setNewTable("");
    }
  };

  const removeTable = (table: string) => {
    setAccessData({
      ...accessData,
      tables: accessData.tables.filter((t) => t !== table),
    });
  };

  const togglePermission = (permission: string) => {
    const isSelected = accessData.permissions.includes(permission);
    if (isSelected) {
      setAccessData({
        ...accessData,
        permissions: accessData.permissions.filter((p) => p !== permission),
      });
    } else {
      setAccessData({
        ...accessData,
        permissions: [...accessData.permissions, permission],
      });
    }
  };

  const handleGrantAccess = async () => {
    setIsLoading(true);
    try {
      // Placeholder for API call - will be replaced with actual implementation
      console.log("Granting access:", accessData);
      
      toast({
        title: "Access Granted",
        description: `Access has been granted to ${accessData.username} for ${accessData.tables.length} table(s).`,
      });
      
      // Reset form
      setAccessData({
        username: "",
        email: "",
        tables: [],
        permissions: [],
        justification: "",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to grant access. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5" />
          Grant Database Access
        </CardTitle>
        <CardDescription>
          Grant specific table and permission access to users
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* User Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              value={accessData.username}
              onChange={(e) => setAccessData({ ...accessData, username: e.target.value })}
              placeholder="Enter username"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={accessData.email}
              onChange={(e) => setAccessData({ ...accessData, email: e.target.value })}
              placeholder="user@example.com"
            />
          </div>
        </div>

        {/* Tables Section */}
        <div className="space-y-3">
          <Label className="flex items-center gap-2">
            <Database className="h-4 w-4" />
            Database Tables
          </Label>
          <div className="flex gap-2">
            <Input
              value={newTable}
              onChange={(e) => setNewTable(e.target.value)}
              placeholder="Enter table name"
              onKeyPress={(e) => e.key === "Enter" && addTable()}
            />
            <Button onClick={addTable} size="sm" disabled={!newTable.trim()}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          {accessData.tables.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {accessData.tables.map((table) => (
                <Badge key={table} variant="secondary" className="flex items-center gap-1">
                  {table}
                  <button
                    onClick={() => removeTable(table)}
                    className="ml-1 hover:text-destructive"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
          )}
        </div>

        {/* Permissions Section */}
        <div className="space-y-3">
          <Label>Permissions</Label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {AVAILABLE_PERMISSIONS.map((permission) => (
              <div key={permission} className="flex items-center space-x-2">
                <Checkbox
                  id={permission}
                  checked={accessData.permissions.includes(permission)}
                  onCheckedChange={() => togglePermission(permission)}
                />
                <Label htmlFor={permission} className="text-sm font-medium">
                  {permission}
                </Label>
              </div>
            ))}
          </div>
        </div>

        {/* Justification */}
        <div className="space-y-2">
          <Label htmlFor="justification">Justification</Label>
          <Textarea
            id="justification"
            value={accessData.justification}
            onChange={(e) => setAccessData({ ...accessData, justification: e.target.value })}
            placeholder="Provide justification for this access request..."
            rows={3}
          />
        </div>

        <Button
          onClick={handleGrantAccess}
          disabled={
            isLoading ||
            !accessData.username ||
            !accessData.email ||
            accessData.tables.length === 0 ||
            accessData.permissions.length === 0 ||
            !accessData.justification
          }
          className="w-full"
        >
          {isLoading ? (
            <>
              <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
              Granting Access...
            </>
          ) : (
            <>
              <Shield className="mr-2 h-4 w-4" />
              Grant Access
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
};