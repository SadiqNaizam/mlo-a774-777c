import React from 'react';
import { useNavigate } from 'react-router-dom';

// Custom Components
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

// Shadcn/ui Components
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Home as HomeIcon } from 'lucide-react'; // For a welcome icon

const ProtectedHomePage: React.FC = () => {
  console.log('ProtectedHomePage loaded');
  const navigate = useNavigate();

  const handleLogout = () => {
    // In a real app, you'd also clear auth tokens/state here
    console.log('User logging out.');
    navigate('/'); // Navigate to LoginPage, which is at the root path "/"
  };

  // Placeholder user name, in a real app this would come from auth context or user state
  const userName = "Valued User";

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-950">
      <Header isAuthenticated={true} userName={userName} onLogout={handleLogout} />

      <main className="flex-grow container mx-auto px-4 py-8 flex flex-col items-center justify-center">
        <Card className="w-full max-w-lg shadow-xl">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-3">
              <HomeIcon className="h-12 w-12 text-primary" />
            </div>
            <CardTitle className="text-3xl font-bold">Welcome Back, {userName}!</CardTitle>
            <CardDescription className="text-md text-muted-foreground">
              You have successfully logged in to AuthSecure.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-center text-gray-700 dark:text-gray-300">
              This is your personal dashboard. Feel free to explore the application's features.
              Your security is our priority.
            </p>
            
            <div>
              <label htmlFor="userFeedback" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Quick Note (Optional):
              </label>
              <Textarea
                id="userFeedback"
                placeholder="Share a quick thought or feedback..."
                className="resize-none"
                rows={3}
              />
            </div>

            <Button onClick={handleLogout} className="w-full" variant="destructive" size="lg">
              Logout
            </Button>
            <p className="text-xs text-center text-muted-foreground">
              Need to go somewhere else? Use the navigation in the header.
            </p>
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  );
};

export default ProtectedHomePage;