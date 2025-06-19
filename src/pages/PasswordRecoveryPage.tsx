import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import AuthFormContainer from '@/components/AuthFormContainer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { toast } from 'sonner'; // Using sonner for toasts as per App.tsx
import { Mail, KeyRound, AlertTriangle, CheckCircle } from 'lucide-react';

const emailSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
});

const passwordResetSchema = z.object({
  newPassword: z.string().min(8, { message: "Password must be at least 8 characters." }),
  confirmPassword: z.string().min(8, { message: "Password must be at least 8 characters." }),
}).refine(data => data.newPassword === data.confirmPassword, {
  message: "Passwords do not match.",
  path: ["confirmPassword"], // Set error on confirmPassword field
});

type EmailFormValues = z.infer<typeof emailSchema>;
type PasswordResetFormValues = z.infer<typeof passwordResetSchema>;

const PasswordRecoveryPage: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<1 | 2>(1);
  const [isLoading, setIsLoading] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [alertMessage, setAlertMessage] = useState<{ type: 'success' | 'error'; title: string; message: string } | null>(null);
  const navigate = useNavigate();

  console.log('PasswordRecoveryPage loaded');

  const emailForm = useForm<EmailFormValues>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: "",
    },
  });

  const passwordResetForm = useForm<PasswordResetFormValues>({
    resolver: zodResolver(passwordResetSchema),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });

  const handleRequestResetSubmit = async (values: EmailFormValues) => {
    setIsLoading(true);
    setAlertMessage(null);
    console.log("Requesting password reset for:", values.email);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    setUserEmail(values.email);
    setIsLoading(false);
    toast.success(`Password reset instructions sent to ${values.email}.`, {
      description: "Please check your inbox (and spam folder).",
    });
    setAlertMessage({
        type: 'success',
        title: 'Check Your Email',
        message: `If an account exists for ${values.email}, you will receive an email with instructions on how to reset your password.`,
    });
    // For this demo, we'll proceed to step 2 directly.
    // In a real app, the user would click a link in their email.
    setCurrentStep(2); 
  };

  const handlePasswordResetSubmit = async (values: PasswordResetFormValues) => {
    setIsLoading(true);
    setAlertMessage(null);
    console.log("Resetting password with new password for email:", userEmail);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    setIsLoading(false);
    toast.success("Password successfully reset!", {
      description: "You can now log in with your new password.",
    });
    setAlertMessage({
        type: 'success',
        title: 'Password Reset Successful',
        message: 'Your password has been updated. You can now log in.',
    });

    // Redirect to login page after a short delay
    setTimeout(() => {
      navigate('/'); // Navigate to LoginPage (path from App.tsx)
    }, 2000);
  };
  
  const handleLogout = () => {
    // In a real app, this would clear auth state
    console.log("Logout triggered from Header on PasswordRecoveryPage");
    navigate('/'); // Navigate to login
  };

  const renderStepOne = () => (
    <Form {...emailForm}>
      <form onSubmit={emailForm.handleSubmit(handleRequestResetSubmit)} className="space-y-6">
        <FormField
          control={emailForm.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="email">Email Address</FormLabel>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <FormControl>
                  <Input id="email" type="email" placeholder="you@example.com" {...field} className="pl-10" />
                </FormControl>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? 'Sending...' : 'Send Reset Link'}
        </Button>
      </form>
    </Form>
  );

  const renderStepTwo = () => (
    <Form {...passwordResetForm}>
      <form onSubmit={passwordResetForm.handleSubmit(handlePasswordResetSubmit)} className="space-y-6">
        <p className="text-sm text-muted-foreground text-center">
          Enter a new password for <span className="font-medium">{userEmail}</span>.
        </p>
        <FormField
          control={passwordResetForm.control}
          name="newPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="newPassword">New Password</FormLabel>
              <div className="relative">
                <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <FormControl>
                  <Input id="newPassword" type="password" placeholder="••••••••" {...field} className="pl-10" />
                </FormControl>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={passwordResetForm.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="confirmPassword">Confirm New Password</FormLabel>
               <div className="relative">
                <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <FormControl>
                  <Input id="confirmPassword" type="password" placeholder="••••••••" {...field} className="pl-10" />
                </FormControl>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? 'Resetting...' : 'Reset Password'}
        </Button>
      </form>
    </Form>
  );
  
  const pageTitle = currentStep === 1 ? "Forgot Your Password?" : "Create New Password";
  const pageDescription = currentStep === 1 
    ? "No worries! Enter your email below and we'll send you a link to reset it." 
    : "Please enter and confirm your new password.";

  return (
    <div className="flex flex-col min-h-screen">
      <Header isAuthenticated={false} onLogout={handleLogout} />
      <main className="flex-grow">
        <AuthFormContainer
          title={pageTitle}
          description={pageDescription}
          footerLinks={
            <>
              Remember your password?{' '}
              <Link to="/" className="font-medium text-primary hover:underline"> {/* Path from App.tsx */}
                Login
              </Link>
              <br />
              Don't have an account?{' '}
              <Link to="/registration" className="font-medium text-primary hover:underline"> {/* Path from App.tsx */}
                Register
              </Link>
            </>
          }
        >
          {alertMessage && (
            <Alert variant={alertMessage.type === 'error' ? 'destructive' : 'default'} className="mb-6">
              {alertMessage.type === 'success' ? <CheckCircle className="h-4 w-4" /> : <AlertTriangle className="h-4 w-4" />}
              <AlertTitle>{alertMessage.title}</AlertTitle>
              <AlertDescription>{alertMessage.message}</AlertDescription>
            </Alert>
          )}
          {currentStep === 1 ? renderStepOne() : renderStepTwo()}
        </AuthFormContainer>
      </main>
      <Footer />
    </div>
  );
};

export default PasswordRecoveryPage;