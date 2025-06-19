import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck } from 'lucide-react';

const Footer: React.FC = () => {
  console.log('Footer loaded');
  const currentYear = new Date().getFullYear();
  const siteName = "AuthSecure";

  // Placeholder routes for informational pages as they are not in App.tsx
  const footerLinks = [
    { name: 'Terms of Service', path: '/terms' },
    { name: 'Privacy Policy', path: '/privacy' },
    { name: 'Contact Us', path: '/contact' },
  ];

  return (
    <footer className="bg-muted/50 border-t">
      <div className="container py-8 flex flex-col md:flex-row items-center justify-between text-sm text-muted-foreground">
        <div className="flex items-center gap-2 mb-4 md:mb-0">
          <ShieldCheck className="h-5 w-5 text-primary" />
          <span className="font-semibold">{siteName}</span>
        </div>
        <nav className="flex flex-wrap justify-center gap-4 sm:gap-6 mb-4 md:mb-0">
          {footerLinks.map((link) => (
            <Link key={link.name} to={link.path} className="hover:text-primary transition-colors">
              {link.name}
            </Link>
          ))}
        </nav>
        <div className="text-center md:text-right">
          <p>&copy; {currentYear} {siteName}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;