import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import { Menu, ShieldCheck, LogIn, UserPlus, LogOut, LayoutDashboard } from 'lucide-react';

interface HeaderProps {
  isAuthenticated: boolean;
  userName?: string;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ isAuthenticated, userName, onLogout }) => {
  console.log('Header loaded');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinkClasses = ({ isActive }: { isActive: boolean }) =>
    `text-sm font-medium transition-colors hover:text-primary ${
      isActive ? 'text-primary font-semibold' : 'text-muted-foreground'
    }`;

  const mobileNavLinkClasses = ({ isActive }: { isActive: boolean }) =>
    `block px-3 py-2 rounded-md text-base font-medium hover:bg-accent hover:text-accent-foreground ${
      isActive ? 'bg-accent text-accent-foreground font-semibold' : 'text-foreground'
    }`;
    
  const siteName = "AuthSecure";
  const homeLink = isAuthenticated ? "/protected-home" : "/";

  const commonNavLinks = (isMobile: boolean) => (
    <>
      {isAuthenticated ? (
        <>
          <NavLink
            to="/protected-home"
            className={isMobile ? mobileNavLinkClasses : navLinkClasses}
            onClick={() => isMobile && setIsMobileMenuOpen(false)}
          >
            <LayoutDashboard className={`mr-2 h-4 w-4 ${isMobile ? 'inline-block' : 'hidden md:inline-block'}`} />
            Dashboard
          </NavLink>
          {userName && <span className="text-sm text-muted-foreground hidden md:block">Welcome, {userName}</span>}
          <Button variant="ghost" onClick={() => { onLogout(); if (isMobile) setIsMobileMenuOpen(false); }} className={isMobile ? "w-full justify-start px-3 py-2 text-base font-medium" : "text-sm"}>
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </>
      ) : (
        <>
          <NavLink
            to="/"
            className={isMobile ? mobileNavLinkClasses : navLinkClasses}
            onClick={() => isMobile && setIsMobileMenuOpen(false)}
          >
            <LogIn className={`mr-2 h-4 w-4 ${isMobile ? 'inline-block' : 'hidden md:inline-block'}`} />
            Login
          </NavLink>
          <NavLink
            to="/registration"
            className={isMobile ? mobileNavLinkClasses : navLinkClasses}
            onClick={() => isMobile && setIsMobileMenuOpen(false)}
          >
            <UserPlus className={`mr-2 h-4 w-4 ${isMobile ? 'inline-block' : 'hidden md:inline-block'}`} />
            Register
          </NavLink>
        </>
      )}
    </>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to={homeLink} className="flex items-center gap-2" onClick={() => isMobileMenuOpen && setIsMobileMenuOpen(false)}>
          <ShieldCheck className="h-6 w-6 text-primary" />
          <span className="font-bold text-lg">{siteName}</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {commonNavLinks(false)}
        </nav>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="flex flex-col gap-4 py-6">
                <Link to={homeLink} className="flex items-center gap-2 px-3 mb-4" onClick={() => setIsMobileMenuOpen(false)}>
                  <ShieldCheck className="h-6 w-6 text-primary" />
                  <span className="font-bold text-lg">{siteName}</span>
                </Link>
                {commonNavLinks(true)}
                 {isAuthenticated && userName && (
                    <SheetClose asChild>
                        <span className="block px-3 py-2 text-sm text-muted-foreground">Welcome, {userName}</span>
                    </SheetClose>
                 )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;