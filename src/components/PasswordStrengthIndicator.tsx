import React from 'react';
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils"; // Assumed to be available from shadcn/ui setup

interface PasswordStrengthIndicatorProps {
  /**
   * The password string to evaluate.
   * If undefined or empty, a default "Strength" or "Start typing" state will be shown.
   */
  password?: string;
}

const PasswordStrengthIndicator: React.FC<PasswordStrengthIndicatorProps> = ({ password = "" }) => {
  console.log('PasswordStrengthIndicator loaded');

  const calculateStrength = (pass: string): { label: string; progressValue: number; barColor: string; textColor: string } => {
    if (!pass) {
      // Default state when no password is provided or it's empty
      return { label: "Strength", progressValue: 0, barColor: "bg-gray-200", textColor: "text-gray-500" };
    }

    let score = 0;
    const len = pass.length;

    // Score based on length
    if (len >= 8) score += 1;
    if (len >= 12) score += 1; // Bonus for longer passwords (max 2 points for length)

    // Score based on character types
    let types = 0;
    if (/[a-z]/.test(pass)) types++; // Lowercase
    if (/[A-Z]/.test(pass)) types++; // Uppercase
    if (/[0-9]/.test(pass)) types++; // Numbers
    if (/[^a-zA-Z0-9]/.test(pass)) types++; // Symbols (non-alphanumeric)

    score += types; // Add points for character types (max 4 points for types)
    // Total score ranges from 0 (empty) to 6 (long + all types)

    // Determine strength based on score and length
    if (len < 8) {
      // Passwords shorter than 8 characters are always weak
      return { label: "Weak", progressValue: 25, barColor: "bg-red-500", textColor: "text-red-600" };
    }

    // For passwords with length >= 8
    if (score >= 5) { 
      // Strong: score 5 or 6 (e.g., length >= 12 with 3+ types, or length >= 8 with 4 types)
      return { label: "Strong", progressValue: 100, barColor: "bg-green-500", textColor: "text-green-600" };
    }
    if (score >= 3) { 
      // Medium: score 3 or 4 (e.g., length >= 8 with 2 types, or length >= 8 with 3 types but not long enough for "Strong")
      return { label: "Medium", progressValue: 66, barColor: "bg-yellow-500", textColor: "text-yellow-600" };
    }
    // Weak: score < 3 for len >= 8 (e.g., "aaaaaaaaa" -> length score 1, types score 1 => total score 2)
    return { label: "Weak", progressValue: 33, barColor: "bg-red-500", textColor: "text-red-600" };
  };

  const { label, progressValue, barColor, textColor } = calculateStrength(password);

  return (
    <div className="w-full space-y-1.5" aria-live="polite">
      <div className="flex justify-between items-center">
        <p className="text-xs font-medium text-muted-foreground">Password Strength</p>
        <p className={cn("text-xs font-semibold", textColor)}>
          {label}
        </p>
      </div>
      <Progress 
        value={progressValue} 
        className="h-2 [&>div]:transition-all [&>div]:duration-300" // Smooth transition for the indicator bar
        indicatorClassName={barColor} 
        aria-label={`Password strength: ${label}`}
      />
    </div>
  );
};

export default PasswordStrengthIndicator;