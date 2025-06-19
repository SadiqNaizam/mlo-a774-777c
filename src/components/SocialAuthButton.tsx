import React from 'react';
import { Button } from "@/components/ui/button";
import { Github, Chrome, Loader2 } from 'lucide-react'; // Using Chrome as a proxy for Google icon

interface SocialAuthButtonProps {
  provider: 'google' | 'github'; // Extend with more providers as needed
  onClick: () => void;
  isLoading?: boolean;
  className?: string;
}

const SocialAuthButton: React.FC<SocialAuthButtonProps> = ({
  provider,
  onClick,
  isLoading = false,
  className = '',
}) => {
  console.log(`SocialAuthButton loaded for provider: ${provider}, isLoading: ${isLoading}`);

  const providerConfig = {
    google: {
      Icon: Chrome,
      text: 'Continue with Google',
      // Tailwind classes for Google-like button: white background, dark text, subtle border
      buttonClasses: 'bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700 dark:border-gray-600',
    },
    github: {
      Icon: Github,
      text: 'Continue with GitHub',
      // Tailwind classes for GitHub-like button: dark background, white text
      buttonClasses: 'bg-gray-900 hover:bg-gray-800 text-white dark:bg-gray-200 dark:text-gray-900 dark:hover:bg-gray-300',
    },
  };

  const { Icon, text, buttonClasses } = providerConfig[provider];

  return (
    <Button
      variant="outline" // Base variant, specific styles will override/complement
      className={`w-full flex items-center justify-center gap-3 py-2.5 px-4 rounded-md transition-colors duration-150 ${buttonClasses} ${className}`}
      onClick={onClick}
      disabled={isLoading}
    >
      {isLoading ? (
        <Loader2 className="h-5 w-5 animate-spin" />
      ) : (
        <Icon className="h-5 w-5" />
      )}
      <span className="font-medium">{text}</span>
    </Button>
  );
};

export default SocialAuthButton;