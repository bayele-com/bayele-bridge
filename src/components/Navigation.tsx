import { useState } from "react";
import { Menu, X, Globe, Search, Bell } from "lucide-react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed w-full bg-background/80 backdrop-blur-lg border-b z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <img 
              src="/lovable-uploads/50ae9dee-3234-4fe4-93ec-4030fe4b508b.png" 
              alt="Bayele" 
              className="h-8 w-auto" 
            />
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-foreground/80 hover:text-foreground transition-colors">Find a House</a>
            <a href="#" className="text-foreground/80 hover:text-foreground transition-colors">Classifieds</a>
            <a href="#" className="text-foreground/80 hover:text-foreground transition-colors">Marketplace</a>
            <a href="#" className="text-foreground/80 hover:text-foreground transition-colors">How It Works</a>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Globe className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>English</DropdownMenuItem>
                <DropdownMenuItem>Français</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button variant="outline">Log In</Button>
            <Button>Sign Up</Button>
          </div>

          <div className="md:hidden flex items-center space-x-4">
            <Button variant="ghost" size="icon">
              <Search className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden border-t bg-background">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <a href="#" className="block px-3 py-2 text-foreground/80 hover:text-foreground transition-colors">
              Find a House
            </a>
            <a href="#" className="block px-3 py-2 text-foreground/80 hover:text-foreground transition-colors">
              Classifieds
            </a>
            <a href="#" className="block px-3 py-2 text-foreground/80 hover:text-foreground transition-colors">
              Marketplace
            </a>
            <a href="#" className="block px-3 py-2 text-foreground/80 hover:text-foreground transition-colors">
              How It Works
            </a>
            <div className="px-3 py-2">
              <Button className="w-full mb-2" variant="outline">Log In</Button>
              <Button className="w-full">Sign Up</Button>
            </div>
            <div className="px-3 py-2 border-t">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Language</span>
                <Button variant="ghost" size="sm">
                  <Globe className="h-4 w-4 mr-2" />
                  English
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};