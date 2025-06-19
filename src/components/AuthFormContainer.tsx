import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils"; // Assuming utils.ts exists for cn function

interface AuthFormContainerProps {
  title: string;
  description?: string;
  children: React.ReactNode; // Main form content (inputs, submit button)
  footerLinks?: React.ReactNode; // e.g., "Forgot password?" or "Need an account?" links
  socialAuthSection?: React.ReactNode; // e.g., Social login buttons
  className?: string; // Additional class names for the Card component
}

const AuthFormContainer: React.FC<AuthFormContainerProps> = ({
  title,
  description,
  children,
  footerLinks,
  socialAuthSection,
  className,
}) => {
  console.log('AuthFormContainer loaded with title:', title);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-950 p-4">
      <Card className={cn("w-full max-w-md shadow-lg", className)}>
        <CardHeader className="space-y-2 text-center">
          {/* A logo could be passed as a prop and rendered here if needed */}
          <CardTitle className="text-3xl font-bold tracking-tight">{title}</CardTitle>
          {description && (
            <CardDescription>{description}</CardDescription>
          )}
        </CardHeader>
        <CardContent className="space-y-6 px-6 pb-6 pt-0">
          {children} {/* This is where the actual form elements (Input fields, Submit button) will go */}
        </CardContent>
        {(socialAuthSection || footerLinks) && (
          <CardFooter className="flex flex-col gap-4 px-6 pb-6 pt-4 border-t">
            {socialAuthSection && (
              <div className="w-full space-y-4">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-card px-2 text-muted-foreground">
                      Or continue with
                    </span>
                  </div>
                </div>
                <div className="w-full">
                  {socialAuthSection} {/* Slot for SocialAuthButton components */}
                </div>
              </div>
            )}
            {footerLinks && (
              <div className="mt-4 text-center text-sm w-full">
                {footerLinks} {/* Slot for navigation links like "Forgot password?" */}
              </div>
            )}
          </CardFooter>
        )}
      </Card>
    </div>
  );
};

export default AuthFormContainer;