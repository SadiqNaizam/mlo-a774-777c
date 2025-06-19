import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

// Custom Components
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import AuthFormContainer from '@/components/AuthFormContainer';
import SocialAuthButton from '@/components/SocialAuthButton';

// Shadcn/ui Components
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label'; // Can be used standalone or with Form
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

// Lucide Icons
import { AlertCircle, Mail, Lock, Eye, EyeOff } from 'lucide-react';

const loginFormSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  password: z.string().min(1, { message: 'Password is required.' }),
});

type LoginFormValues = z.infer<typeof loginFormSchema>;

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const handleLogin = async (data: LoginFormValues) => {
    setIsLoading(true);
    setError(null);
    console.log('Login attempt:', data);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Replace with actual authentication logic
    if (data.email === 'user@example.com' && data.password === 'password123') {
      console.log('Login successful, navigating to protected home...');
      // In a real app, you'd set some auth state (e.g., token in localStorage/context)
      navigate('/protected-home');
    } else {
      setError('Invalid email or password. Please try again.');
    }
    setIsLoading(false);
  };

  const handleSocialLogin = (provider: 'google' | 'github') => {
    console.log(`Attempting login with ${provider}`);
    // Placeholder for social login logic
    // This would typically involve redirecting to an OAuth provider
    setError(`Social login with ${provider} is not yet implemented.`);
  };
  
  const handleLogout = () => {
    // No active session on login page, but Header might expect it
    console.log("Logout action called from LoginPage Header (no-op)");
  };

  useEffect(() => {
    console.log('LoginPage loaded');
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Header isAuthenticated={false} onLogout={handleLogout} />
      <main className="flex-grow">
        <AuthFormContainer
          title="Welcome Back!"
          description="Log in to access your AuthSecure account."
          footerLinks={
            <>
              <Link
                to="/password-recovery" // Path from App.tsx
                className="text-sm text-primary hover:underline"
              >
                Forgot password?
              </Link>
              <div className="mt-2">
                <span>Don&apos;t have an account? </span>
                <Link
                  to="/registration" // Path from App.tsx
                  className="font-semibold text-primary hover:underline"
                >
                  Sign up
                </Link>
              </div>
            </>
          }
          socialAuthSection={
            <div className="space-y-3">
              <SocialAuthButton
                provider="google"
                onClick={() => handleSocialLogin('google')}
                isLoading={false} // Manage loading state per button if needed
              />
              <SocialAuthButton
                provider="github"
                onClick={() => handleSocialLogin('github')}
                isLoading={false}
              />
            </div>
          }
        >
          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Login Failed</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleLogin)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="email">Email Address</FormLabel>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <FormControl>
                        <Input
                          id="email"
                          type="email"
                          placeholder="you@example.com"
                          className="pl-10"
                          {...field}
                          disabled={isLoading}
                        />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="password">Password</FormLabel>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <FormControl>
                        <Input
                          id="password"
                          type={showPassword ? 'text' : 'password'}
                          placeholder="••••••••"
                          className="pl-10 pr-10" // Make space for eye icon
                          {...field}
                          disabled={isLoading}
                        />
                      </FormControl>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-1 top-1/2 h-7 w-7 -translate-y-1/2 text-muted-foreground hover:text-primary"
                        onClick={() => setShowPassword(!showPassword)}
                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                        disabled={isLoading}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? 'Logging in...' : 'Log In'}
              </Button>
            </form>
          </Form>
        </AuthFormContainer>
      </main>
      <Footer />
    </div>
  );
};

export default LoginPage;