import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon, UserPlus, UserCog, RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface User {
  username: string;
  email: string;
  valid_until: Date;
  regenerate_password?: boolean;
}

export const UserManagement = () => {
  const [activeTab, setActiveTab] = useState<"create" | "update">("create");
  const [userData, setUserData] = useState<User>({
    username: "",
    email: "",
    valid_until: new Date(),
    regenerate_password: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleCreateUser = async () => {
    setIsLoading(true);
    try {
      // Placeholder for API call - will be replaced with actual implementation
      console.log("Creating user:", {
        username: userData.username,
        email: userData.email,
        valid_until: userData.valid_until.toISOString(),
      });
      
      toast({
        title: "User Created",
        description: `User ${userData.username} has been created successfully.`,
      });
      
      // Reset form
      setUserData({
        username: "",
        email: "",
        valid_until: new Date(),
        regenerate_password: false,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create user. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateUser = async () => {
    setIsLoading(true);
    try {
      // Placeholder for API call - will be replaced with actual implementation
      console.log("Updating user:", {
        username: userData.username,
        email: userData.email,
        regenerate_password: userData.regenerate_password,
        valid_until: userData.valid_until.toISOString(),
      });
      
      toast({
        title: "User Updated",
        description: `User ${userData.username} has been updated successfully.`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update user. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex gap-4">
        <Button
          variant={activeTab === "create" ? "default" : "outline"}
          onClick={() => setActiveTab("create")}
          className="flex items-center gap-2"
        >
          <UserPlus className="h-4 w-4" />
          Create User
        </Button>
        <Button
          variant={activeTab === "update" ? "default" : "outline"}
          onClick={() => setActiveTab("update")}
          className="flex items-center gap-2"
        >
          <UserCog className="h-4 w-4" />
          Update User
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {activeTab === "create" ? (
              <>
                <UserPlus className="h-5 w-5" />
                Create New User
              </>
            ) : (
              <>
                <UserCog className="h-5 w-5" />
                Update Existing User
              </>
            )}
          </CardTitle>
          <CardDescription>
            {activeTab === "create"
              ? "Create a new user with time-bound database access"
              : "Update user information and access duration"}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                value={userData.username}
                onChange={(e) => setUserData({ ...userData, username: e.target.value })}
                placeholder="Enter username"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={userData.email}
                onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                placeholder="user@example.com"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Access Valid Until</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !userData.valid_until && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {userData.valid_until ? (
                    format(userData.valid_until, "PPP")
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={userData.valid_until}
                  onSelect={(date) => date && setUserData({ ...userData, valid_until: date })}
                  initialFocus
                  className="p-3 pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
          </div>

          {activeTab === "update" && (
            <div className="flex items-center space-x-2">
              <Switch
                id="regenerate-password"
                checked={userData.regenerate_password}
                onCheckedChange={(checked) => setUserData({ ...userData, regenerate_password: checked })}
              />
              <Label htmlFor="regenerate-password" className="flex items-center gap-2">
                <RefreshCw className="h-4 w-4" />
                Regenerate Password
              </Label>
            </div>
          )}

          <Button
            onClick={activeTab === "create" ? handleCreateUser : handleUpdateUser}
            disabled={isLoading || !userData.username || !userData.email}
            className="w-full"
          >
            {isLoading ? (
              <>
                <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : activeTab === "create" ? (
              "Create User"
            ) : (
              "Update User"
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};