import Link from 'next/link';
import { Layers } from 'lucide-react';
import { ThemeToggle } from '@/components/theme-toggle';
import { Button } from '@/components/ui/button';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center px-4 md:px-8 mx-auto">
        <div className="flex items-center gap-2 mr-4">
          <Link href="/" className="flex items-center gap-2.5 font-bold transition-colors hover:text-primary">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm">
              <Layers className="h-4 w-4" />
            </div>
            <span className="text-xl tracking-tight">SpendPilot</span>
          </Link>
        </div>
        
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-2">
            <Link href="/audit">
              <Button variant="ghost" className="hidden md:flex text-sm font-medium transition-colors hover:text-primary">
                Start Audit
              </Button>
            </Link>
            <Link href="/pricing">
              <Button variant="ghost" className="hidden md:flex text-sm font-medium transition-colors hover:text-primary">
                Pricing
              </Button>
            </Link>
            <ThemeToggle />
            <Link href="/audit">
              <Button className="h-9 px-4 rounded-full shadow-sm">Get Started</Button>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
