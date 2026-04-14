/**
 * Tution Master — Auth Page (Login + Register)
 */

import { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import { useAuthStore } from '../store';

const INPUT = 'w-full bg-[#0a0e1a] border border-white/10 rounded-lg px-4 py-3 text-white text-sm placeholder-[#475569] focus:border-[#4f8ef7] focus:ring-2 focus:ring-[#4f8ef7]/10 outline-none transition-all font-nunito';
const SELECT = 'w-full bg-[#0a0e1a] border border-white/10 rounded-lg px-4 py-3 text-white text-sm focus:border-[#4f8ef7] outline-none transition-all font-nunito cursor-pointer';
const LABEL = 'block text-xs font-semibold text-[#64748b] uppercase tracking-widest mb-1.5';

export default function AuthPage() {
  const [searchParams] = useSearchParams();
  const [tab, setTab] = useState(searchParams.get('tab') === 'register' ? 'register' : 'login');
  const { login, register, isLoading, user } = useAuthStore();
  const navigate = useNavigate();

  // Login form state
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  // Register form state
  const [regData, setRegData] = useState({ name: '', email: '', password: '', confirmPassword: '', country: 'Nepal', level: 'Class 11-12' });

  useEffect(() => { if (user) navigate('/dashboard'); }, [user]);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!loginData.email || !loginData.password) return toast.error('Please fill in all fields');
    const result = await login(loginData.email, loginData.password);
    if (result.success) { toast.success('Welcome back! 🎉'); navigate('/dashboard'); }
    else toast.error(result.message);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!regData.name || !regData.email || !regData.password) return toast.error('Please fill all required fields');
    if (regData.password !== regData.confirmPassword) return toast.error('Passwords do not match');
    if (regData.password.length < 6) return toast.error('Password must be at least 6 characters');
    const result = await register(regData);
    if (result.success) { toast.success('Account created successfully! 🎉'); navigate('/dashboard'); }
    else toast.error(result.message);
  };

  return (
    <div className="min-h-screen bg-[#0a0e1a] flex items-center justify-center px-4 py-20 relative overflow-hidden font-nunito">
      {/* Background orbs */}
      <div className="absolute -top-20 -left-20 w-[500px] h-[500px] bg-[#4f8ef7] rounded-full blur-[140px] opacity-[0.07] pointer-events-none" />
      <div className="absolute -bottom-20 -right-20 w-[400px] h-[400px] bg-[#8b5cf6] rounded-full blur-[140px] opacity-[0.07] pointer-events-none" />

      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-[#141c30] border border-white/10 rounded-3xl p-9 shadow-2xl shadow-black/50 relative z-10">

        {/* Logo */}
        <div className="text-center mb-7">
          <Link to="/" className="font-sora font-extrabold text-2xl bg-gradient-to-r from-[#4f8ef7] to-[#8b5cf6] bg-clip-text text-transparent">
            Tution Master
          </Link>
          <p className="text-[#64748b] text-xs mt-1">Nepal's Premier Learning Platform</p>
        </div>

        {/* Tabs */}
        <div className="flex bg-[#0a0e1a] rounded-xl p-1 mb-7">
          {['login', 'register'].map((t) => (
            <button key={t} onClick={() => setTab(t)}
              className={`flex-1 py-2.5 rounded-lg text-sm font-semibold capitalize transition-all ${
                tab === t ? 'bg-[#1a2340] text-white shadow-md' : 'text-[#64748b] hover:text-[#94a3b8]'
              }`}>
              {t === 'login' ? 'Sign In' : 'Register'}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {/* ── LOGIN FORM ── */}
          {tab === 'login' && (
            <motion.form key="login" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} transition={{ duration: 0.25 }}
              onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className={LABEL}>Email Address</label>
                <input className={INPUT} type="email" placeholder="your@email.com" value={loginData.email}
                  onChange={e => setLoginData(p => ({ ...p, email: e.target.value }))} />
              </div>
              <div>
                <label className={LABEL}>Password</label>
                <input className={INPUT} type="password" placeholder="Enter your password" value={loginData.password}
                  onChange={e => setLoginData(p => ({ ...p, password: e.target.value }))} />
              </div>
              <div className="flex justify-end">
                <button type="button" className="text-xs text-[#4f8ef7] hover:underline">Forgot Password?</button>
              </div>
              <button type="submit" disabled={isLoading}
                className="w-full bg-gradient-to-r from-[#4f8ef7] to-[#8b5cf6] text-white font-bold py-3.5 rounded-xl shadow-lg shadow-blue-500/20 hover:shadow-blue-500/35 hover:-translate-y-0.5 transition-all disabled:opacity-60 disabled:cursor-not-allowed text-sm">
                {isLoading ? '⏳ Signing in...' : 'Sign In to Tution Master'}
              </button>

              {/* Demo credentials hint */}
              <div className="bg-blue-500/5 border border-blue-500/15 rounded-xl p-3 text-xs text-[#64748b]">
                <p className="font-semibold text-[#94a3b8] mb-1">Demo Credentials</p>
                <p>Student: student@gmail.com / Student@1234</p>
                <p>Admin: sumit@tutionmaster.com / Admin@1234</p>
              </div>

              <div className="relative py-1">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/[0.07]" /></div>
                <div className="relative text-center"><span className="bg-[#141c30] px-3 text-xs text-[#64748b]">or continue with</span></div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {['🇬 Google', '📘 Facebook'].map(s => (
                  <button key={s} type="button" className="bg-[#0a0e1a] border border-white/10 rounded-xl py-2.5 text-xs font-semibold text-[#94a3b8] hover:border-[#4f8ef7] hover:text-white transition-all">{s}</button>
                ))}
              </div>
              <p className="text-center text-xs text-[#64748b]">
                No account? <button type="button" onClick={() => setTab('register')} className="text-[#4f8ef7] font-semibold hover:underline">Sign up free →</button>
              </p>
            </motion.form>
          )}

          {/* ── REGISTER FORM ── */}
          {tab === 'register' && (
            <motion.form key="register" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.25 }}
              onSubmit={handleRegister} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={LABEL}>First Name</label>
                  <input className={INPUT} type="text" placeholder="Aarav" value={regData.name.split(' ')[0]}
                    onChange={e => setRegData(p => ({ ...p, name: e.target.value + (p.name.split(' ')[1] ? ' ' + p.name.split(' ')[1] : '') }))} />
                </div>
                <div>
                  <label className={LABEL}>Last Name</label>
                  <input className={INPUT} type="text" placeholder="Sharma"
                    onChange={e => setRegData(p => ({ ...p, name: (p.name.split(' ')[0] || '') + ' ' + e.target.value }))} />
                </div>
              </div>
              <div>
                <label className={LABEL}>Email Address</label>
                <input className={INPUT} type="email" placeholder="your@email.com" value={regData.email}
                  onChange={e => setRegData(p => ({ ...p, email: e.target.value }))} />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={LABEL}>Password</label>
                  <input className={INPUT} type="password" placeholder="Min 6 chars" value={regData.password}
                    onChange={e => setRegData(p => ({ ...p, password: e.target.value }))} />
                </div>
                <div>
                  <label className={LABEL}>Confirm</label>
                  <input className={INPUT} type="password" placeholder="Repeat" value={regData.confirmPassword}
                    onChange={e => setRegData(p => ({ ...p, confirmPassword: e.target.value }))} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={LABEL}>Country</label>
                  <select className={SELECT} value={regData.country} onChange={e => setRegData(p => ({ ...p, country: e.target.value }))}>
                    <option>Nepal</option><option>India</option><option>Bangladesh</option><option>Other</option>
                  </select>
                </div>
                <div>
                  <label className={LABEL}>Level</label>
                  <select className={SELECT} value={regData.level} onChange={e => setRegData(p => ({ ...p, level: e.target.value }))}>
                    <option>Class 9-10 (SEE)</option><option>Class 11-12 (+2)</option>
                    <option>Engineering Entrance</option><option>Medical Entrance</option><option>University</option>
                  </select>
                </div>
              </div>
              <button type="submit" disabled={isLoading}
                className="w-full bg-gradient-to-r from-[#4f8ef7] to-[#8b5cf6] text-white font-bold py-3.5 rounded-xl shadow-lg shadow-blue-500/20 hover:shadow-blue-500/35 hover:-translate-y-0.5 transition-all disabled:opacity-60 text-sm mt-1">
                {isLoading ? '⏳ Creating account...' : 'Create Free Account →'}
              </button>
              <p className="text-center text-xs text-[#64748b]">By signing up you agree to our <span className="text-[#4f8ef7]">Terms</span> & <span className="text-[#4f8ef7]">Privacy Policy</span></p>
              <p className="text-center text-xs text-[#64748b]">
                Already a member? <button type="button" onClick={() => setTab('login')} className="text-[#4f8ef7] font-semibold hover:underline">Sign in →</button>
              </p>
            </motion.form>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
