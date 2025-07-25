import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Film, User, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Navigation() {
  const location = useLocation();
  
  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <Film className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold">Homegrown</span>
        </Link>
        
        <div className="flex items-center space-x-6">
          <Link 
            to="/" 
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              location.pathname === "/" ? "text-primary" : "text-muted-foreground"
            )}
          >
            Browse Campaigns
          </Link>
          
          <Link 
            to="/profile" 
            className={cn(
              "flex items-center space-x-1 text-sm font-medium transition-colors hover:text-primary",
              location.pathname === "/profile" ? "text-primary" : "text-muted-foreground"
            )}
          >
            <User className="h-4 w-4" />
            <span>Profile</span>
          </Link>
          
          <Link 
            to="/admin" 
            className={cn(
              "flex items-center space-x-1 text-sm font-medium transition-colors hover:text-primary",
              location.pathname === "/admin" ? "text-primary" : "text-muted-foreground"
            )}
          >
            <Settings className="h-4 w-4" />
            <span>Admin</span>
          </Link>
          
          <Button asChild>
            <Link to="/profile">Get Started</Link>
          </Button>
        </div>
      </div>
    </nav>
  );
}