/**
 * Tution Master — Navbar Component
 */

import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuthStore } from '../store';

export default function Navbar() {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropOpen, setDropOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
    setDropOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-[#0a0e1a]/95 backdrop-blur-xl shadow-lg shadow-black/20' : 'bg-transparent'
      } border-b border-white/[0.07]`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <span className="font-sora font-extrabold text-xl bg-gradient-to-r from-[#4f8ef7] to-[#8b5cf6] bg-clip-text text-transparent">
            Tution Master
          </span>
          <span className="text-[10px] bg-[#4f8ef7] text-white px-2 py-0.5 rounded-full font-semibold tracking-wide">
            NEPAL
          </span>
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-8">
          {[['/', 'Home'], ['/courses', 'Courses'], ['/tutors', 'Tutors'], ['/#about', 'About']].map(([href, label]) => (
            <Link
              key={href}
              to={href}
              className={`text-sm font-medium transition-colors ${
                location.pathname === href ? 'text-[#4f8ef7]' : 'text-[#94a3b8] hover:text-white'
              }`}
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-3">
          {!user ? (
            <>
              <Link to="/auth" className="hidden sm:inline-flex btn-ghost text-sm font-semibold px-4 py-2 rounded-lg border border-white/10 text-[#94a3b8] hover:text-white hover:border-[#4f8ef7] transition-all">
                Sign In
              </Link>
              <Link to="/auth?tab=register" className="btn-primary text-sm font-semibold px-4 py-2 rounded-lg bg-gradient-to-r from-[#4f8ef7] to-[#8b5cf6] text-white shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 hover:-translate-y-0.5 transition-all">
                Get Started
              </Link>
            </>
          ) : (
            <div className="flex items-center gap-3">
              {/* Notification Bell */}
              <Link to="/dashboard" className="relative w-9 h-9 flex items-center justify-center rounded-lg bg-[#141c30] border border-white/[0.07] text-[#94a3b8] hover:border-[#4f8ef7] hover:text-[#4f8ef7] transition-all">
                🔔
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-[#0a0e1a]" />
              </Link>

              {/* User Avatar Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setDropOpen(!dropOpen)}
                  className="w-9 h-9 rounded-full bg-gradient-to-br from-[#4f8ef7] to-[#8b5cf6] flex items-center justify-center text-white text-sm font-bold"
                >
                  {user.name?.charAt(0).toUpperCase()}
                </button>
                <AnimatePresence>
                  {dropOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.95 }}
                      className="absolute right-0 top-12 w-52 bg-[#141c30] border border-white/10 rounded-xl shadow-2xl overflow-hidden"
                    >
                      <div className="px-4 py-3 border-b border-white/[0.07]">
                        <p className="text-sm font-semibold text-white">{user.name}</p>
                        <p className="text-xs text-[#64748b] mt-0.5">{user.email}</p>
                      </div>
                      {[
                        ['/dashboard', '📊', 'Dashboard'],
                        ['/profile',   '👤', 'Profile'],
                        ...(user.role === 'admin' ? [['/admin', '⚙️', 'Admin Panel']] : []),
                      ].map(([href, icon, label]) => (
                        <Link
                          key={href}
                          to={href}
                          onClick={() => setDropOpen(false)}
                          className="flex items-center gap-3 px-4 py-2.5 text-sm text-[#94a3b8] hover:text-white hover:bg-white/[0.04] transition-colors"
                        >
                          <span>{icon}</span>{label}
                        </Link>
                      ))}
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-400 hover:bg-white/[0.04] transition-colors border-t border-white/[0.07]"
                      >
                        <span>🚪</span>Logout
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          )}

          {/* Mobile Menu Button */}
          <button className="md:hidden text-[#94a3b8]" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#0f1526] border-t border-white/[0.07] px-4 py-4 flex flex-col gap-3"
          >
            {[['/', 'Home'], ['/courses', 'Courses'], ['/tutors', 'Tutors']].map(([href, label]) => (
              <Link key={href} to={href} onClick={() => setMenuOpen(false)} className="text-[#94a3b8] text-sm font-medium py-2">
                {label}
              </Link>
            ))}
            {!user && (
              <Link to="/auth" onClick={() => setMenuOpen(false)} className="btn-primary text-center text-sm font-semibold px-4 py-2 rounded-lg bg-gradient-to-r from-[#4f8ef7] to-[#8b5cf6] text-white mt-2">
                Get Started Free
              </Link>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
