import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Search } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext.jsx';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  const { isAuthenticated, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Articles', path: '/articles' },
    { name: 'Browse by Concern', path: '/browse-by-concern' },
    { name: 'Research Simplified', path: '/research-simplified' },
    { name: 'About', path: '/about' },
  ];

  const isActive = (path) => {
    if (path === '/' && location.pathname !== '/') return false;
    return location.pathname.startsWith(path);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  return (
    <>
      <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-background/95 backdrop-blur-md border-b border-border shadow-sm' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" className="flex flex-col group z-50">
              <span className="font-serif text-2xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors">
                EvidenceWell
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    isActive(link.path) ? 'text-primary' : 'text-foreground/80'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* Actions */}
            <div className="hidden lg:flex items-center gap-6">
              <button 
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="text-foreground/80 hover:text-primary transition-colors p-2"
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </button>
              
              <Link 
                to="/#newsletter" 
                className="inline-flex h-10 items-center justify-center rounded-md bg-foreground px-6 text-sm font-medium text-background hover:bg-foreground/90 transition-all"
              >
                Newsletter
              </Link>
            </div>

            {/* Mobile menu button */}
            <button
              className="lg:hidden p-2 text-foreground z-50 relative"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Search Overlay */}
        {isSearchOpen && (
          <div className="absolute top-full left-0 w-full bg-background border-b border-border p-4 shadow-lg animate-in slide-in-from-top-4">
            <div className="max-w-3xl mx-auto">
              <form onSubmit={handleSearch} className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="search"
                  placeholder="Search articles, topics, or authors..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-muted/50 border-transparent focus:border-primary/50 focus:bg-background rounded-xl text-lg transition-all outline-none ring-2 ring-transparent focus:ring-primary/20"
                  autoFocus
                />
              </form>
            </div>
          </div>
        )}
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-background lg:hidden pt-24 px-4 flex flex-col animate-in fade-in zoom-in-95 duration-200">
          <form onSubmit={(e) => { handleSearch(e); setIsMobileMenuOpen(false); }} className="relative mb-8">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="search"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-muted/50 rounded-xl text-lg outline-none"
            />
          </form>
          
          <nav className="flex flex-col space-y-6">
            <Link to="/" className="text-2xl font-serif font-medium text-foreground" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-2xl font-serif font-medium ${
                  isActive(link.path) ? 'text-primary' : 'text-foreground'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </nav>
          
          <div className="mt-auto pb-12 pt-8 border-t border-border flex flex-col gap-4">
            <Link 
              to="/#newsletter" 
              className="w-full py-4 text-center rounded-xl bg-foreground text-background font-medium text-lg"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Subscribe to Newsletter
            </Link>
            
            {!isAuthenticated ? (
              <Link to="/login" className="text-center text-muted-foreground py-2" onClick={() => setIsMobileMenuOpen(false)}>
                Staff Login
              </Link>
            ) : (
              <div className="flex flex-col gap-2 text-center">
                <Link to="/admin" className="text-primary font-medium" onClick={() => setIsMobileMenuOpen(false)}>Admin Dashboard</Link>
                <button onClick={() => { logout(); setIsMobileMenuOpen(false); }} className="text-muted-foreground">Logout</button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}