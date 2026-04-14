import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Menu, X, GraduationCap } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'glass-nav shadow-lg' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-tr from-primary to-secondary rounded-xl flex items-center justify-center text-white shadow-lg">
                <GraduationCap className="w-6 h-6" />
              </div>
              <span className="text-2xl font-display font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                Tuition Master
              </span>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <a href="#about" className="text-gray-600 hover:text-primary font-medium transition-colors">About</a>
            <a href="#features" className="text-gray-600 hover:text-primary font-medium transition-colors">Features</a>
            <a href="#subjects" class="text-gray-600 hover:text-primary font-medium transition-colors">Subjects</a>
            
            {user ? (
              <div className="flex items-center gap-4">
                <Link to="/dashboard" className="font-semibold text-primary">Dashboard</Link>
                <button onClick={logout} className="px-6 py-2.5 bg-gray-100 text-dark rounded-full font-semibold hover:bg-gray-200 transition-all">Logout</button>
              </div>
            ) : (
              <Link to="/login" className="px-6 py-2.5 bg-primary text-white rounded-full font-semibold shadow-md hover:bg-opacity-90 transition-all active:scale-95">
                Login
              </Link>
            )}
          </div>

          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-600 focus:outline-none">
              {isOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden bg-white border-t border-gray-100 px-4 py-6 space-y-4 shadow-xl transition-all duration-300 ${isOpen ? 'block' : 'hidden'}`}>
        <a href="#about" className="block text-gray-600 hover:text-primary font-medium" onClick={() => setIsOpen(false)}>About</a>
        <a href="#features" className="block text-gray-600 hover:text-primary font-medium" onClick={() => setIsOpen(false)}>Features</a>
        <a href="#subjects" className="block text-gray-600 hover:text-primary font-medium" onClick={() => setIsOpen(false)}>Subjects</a>
        {user ? (
          <>
            <Link to="/dashboard" className="block text-primary font-bold" onClick={() => setIsOpen(false)}>Dashboard</Link>
            <button onClick={logout} className="w-full px-6 py-3 bg-gray-100 text-dark rounded-xl font-semibold">Logout</button>
          </>
        ) : (
          <Link to="/login" className="block px-6 py-3 bg-primary text-white rounded-xl text-center font-semibold" onClick={() => setIsOpen(false)}>Login</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
