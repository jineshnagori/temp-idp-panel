import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Key, Copy, Eye, EyeOff, RefreshCw, AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const PasswordDecryption = () => {
  const [encryptedData, setEncryptedData] = useState("");
  const [decryptedPassword, setDecryptedPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { toast } = useToast();

  const handleDecrypt = async () => {
    if (!encryptedData.trim()) return;
    
    setIsLoading(true);
    try {
      // Placeholder for API call - will be replaced with actual implementation
      console.log("Decrypting data:", encryptedData);
      
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // Simulate decrypted password
      setDecryptedPassword("temp_password_123");
      
      toast({
        title: "Password Decrypted",
        description: "The password has been successfully decrypted.",
      });
    } catch (error) {
      toast({
        title: "Decryption Failed",
        description: "Failed to decrypt the password. Please check the encrypted data.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = async () => {
    if (decryptedPassword) {
      try {
        await navigator.clipboard.writeText(decryptedPassword);
        toast({
          title: "Copied",
          description: "Password copied to clipboard.",
        });
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to copy password to clipboard.",
          variant: "destructive",
        });
      }
    }
  };

  const clearData = () => {
    setEncryptedData("");
    setDecryptedPassword("");
    setShowPassword(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Key className="h-5 w-5" />
          Password Decryption
        </CardTitle>
        <CardDescription>
          Decrypt encrypted password data using the API endpoint
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <Alert>
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            Handle decrypted passwords with care. Ensure secure transmission and avoid logging sensitive data.
          </AlertDescription>
        </Alert>

        <div className="space-y-2">
          <Label htmlFor="encrypted-data">Encrypted Data</Label>
          <Textarea
            id="encrypted-data"
            value={encryptedData}
            onChange={(e) => setEncryptedData(e.target.value)}
            placeholder="Paste the encrypted data here..."
            rows={4}
            className="font-mono text-sm"
          />
        </div>

        <Button
          onClick={handleDecrypt}
          disabled={isLoading || !encryptedData.trim()}
          className="w-full"
        >
          {isLoading ? (
            <>
              <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
              Decrypting...
            </>
          ) : (
            <>
              <Key className="mr-2 h-4 w-4" />
              Decrypt Password
            </>
          )}
        </Button>

        {decryptedPassword && (
          <Card className="bg-muted/50">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Decrypted Password</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Password</Label>
                <div className="flex items-center gap-2">
                  <Input
                    type={showPassword ? "text" : "password"}
                    value={decryptedPassword}
                    readOnly
                    className="font-mono"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                  <Button variant="outline" size="sm" onClick={copyToClipboard}>
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <Button variant="outline" onClick={clearData} className="w-full">
                Clear Data
              </Button>
            </CardContent>
          </Card>
        )}
      </CardContent>
    </Card>
  );
};