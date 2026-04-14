/**
 * Tution Master — Student Dashboard
 */

import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AreaChart, Area, ResponsiveContainer, XAxis, YAxis, Tooltip, BarChart, Bar, CartesianGrid } from 'recharts';
import { useAuthStore, useDashboardStore } from '../store';
import Navbar from '../components/common/Navbar';

// Sidebar nav items
const NAV = [
  { icon: '📊', label: 'Overview',     badge: null },
  { icon: '📚', label: 'My Courses',   badge: 4    },
  { icon: '📈', label: 'Progress',     badge: null },
  { icon: '📡', label: 'Live Classes', badge: '●'  },
  { icon: '📝', label: 'Assignments',  badge: 2    },
  { icon: '🎯', label: 'Tests',        badge: null },
  { icon: '🏆', label: 'Certificates', badge: null },
  { icon: '❤️', label: 'Wishlist',     badge: null },
  { icon: '🔔', label: 'Notifications',badge: 3    },
];

// Sample data for charts
const weeklyData = [
  { day: 'Mon', lessons: 3, minutes: 45 },
  { day: 'Tue', lessons: 5, minutes: 90 },
  { day: 'Wed', lessons: 2, minutes: 30 },
  { day: 'Thu', lessons: 7, minutes: 120 },
  { day: 'Fri', lessons: 4, minutes: 60 },
  { day: 'Sat', lessons: 8, minutes: 150 },
  { day: 'Sun', lessons: 6, minutes: 90 },
];

const monthlyProgress = [
  { month: 'Aug', score: 62 }, { month: 'Sep', score: 70 }, { month: 'Oct', score: 75 },
  { month: 'Nov', score: 68 }, { month: 'Dec', score: 82 }, { month: 'Jan', score: 89 },
];

const ENROLLED_COURSES = [
  { emoji: '📐', title: 'Advanced Mathematics', instructor: 'Rajesh Sharma', progress: 68, completed: 34, total: 50, gradient: 'from-blue-900 to-blue-700', color: '#4f8ef7' },
  { emoji: '💻', title: 'Computer Programming', instructor: 'Sumit Yadav',   progress: 42, completed: 18, total: 43, gradient: 'from-purple-900 to-purple-700', color: '#8b5cf6' },
  { emoji: '⚙️', title: 'Engineering Entrance', instructor: 'Anup KC',       progress: 25, completed: 15, total: 60, gradient: 'from-orange-900 to-orange-700', color: '#f97316' },
  { emoji: '🔬', title: 'Science (+2)',          instructor: 'Priya Maharjan',progress: 85, completed: 51, total: 60, gradient: 'from-green-900 to-green-700', color: '#10b981' },
];

const UPCOMING = [
  { emoji: '📡', title: 'Physics — Wave Motion', time: 'Today, 4:00 PM',  status: 'live',  color: '#ef4444' },
  { emoji: '📐', title: 'Maths — Integration',    time: 'Tomorrow, 10 AM', status: 'soon',  color: '#f59e0b' },
  { emoji: '💻', title: 'Python — Functions',      time: 'Yesterday',       status: 'done',  color: '#10b981' },
  { emoji: '⚗️', title: 'Chemistry — Reactions',   time: 'Wed, 2:00 PM',   status: 'soon',  color: '#f59e0b' },
];

const RECOMMENDED = [
  { emoji: '🧮', title: 'Statistics & Probability', instructor: 'Rajesh Sharma', price: 'NPR 800',  rating: '4.9' },
  { emoji: '⚡', title: 'Electrical Engineering',    instructor: 'Anup KC',       price: 'NPR 1,100', rating: '4.8' },
  { emoji: '🌐', title: 'Web Development with JS',   instructor: 'Sumit Yadav',   price: 'NPR 1,500', rating: '5.0' },
];

const statusStyle = {
  live: 'bg-red-500/10 text-red-400 border border-red-500/20',
  soon: 'bg-amber-500/10 text-amber-400 border border-amber-500/20',
  done: 'bg-green-500/10 text-green-400 border border-green-500/20',
};

export default function DashboardPage() {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const [activeNav, setActiveNav] = useState('Overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => { logout(); navigate('/'); };

  return (
    <div className="bg-[#0a0e1a] text-[#e8ecf5] min-h-screen font-nunito flex">

      {/* ── SIDEBAR ─────────────────────────────────────────────────────── */}
      <aside className={`fixed left-0 top-0 bottom-0 w-64 bg-[#0f1526] border-r border-white/[0.07] z-50 flex flex-col transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
        {/* Logo */}
        <div className="h-16 flex items-center px-5 border-b border-white/[0.07]">
          <Link to="/" className="font-sora font-extrabold text-base bg-gradient-to-r from-[#4f8ef7] to-[#8b5cf6] bg-clip-text text-transparent">
            Tution Master
          </Link>
        </div>

        {/* User Card */}
        <div className="p-4 border-b border-white/[0.07]">
          <div className="flex items-center gap-3 bg-[#141c30] rounded-xl p-3">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#4f8ef7] to-[#8b5cf6] flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
              {user?.name?.charAt(0).toUpperCase()}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold truncate">{user?.name}</p>
              <p className="text-xs text-[#64748b] truncate">{user?.level}</p>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto p-3 space-y-0.5">
          <p className="text-[10px] font-bold uppercase tracking-widest text-[#475569] px-3 py-2">Main Menu</p>
          {NAV.map(({ icon, label, badge }) => (
            <button key={label} onClick={() => { setActiveNav(label); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                activeNav === label ? 'bg-[#4f8ef7]/12 text-[#4f8ef7]' : 'text-[#94a3b8] hover:bg-white/[0.04] hover:text-white'
              }`}>
              <span>{icon}</span>
              <span className="flex-1 text-left">{label}</span>
              {badge && (
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                  badge === '●' ? 'w-2 h-2 bg-red-500 rounded-full p-0 animate-pulse' : 'bg-[#4f8ef7] text-white'
                }`}>
                  {badge !== '●' ? badge : ''}
                </span>
              )}
            </button>
          ))}
          <div className="border-t border-white/[0.07] my-2" />
          <p className="text-[10px] font-bold uppercase tracking-widest text-[#475569] px-3 py-2">Account</p>
          <Link to="/profile" className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-[#94a3b8] hover:bg-white/[0.04] hover:text-white transition-all">
            <span>👤</span><span>Profile</span>
          </Link>
          <Link to="/admin" className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-[#94a3b8] hover:bg-white/[0.04] hover:text-white transition-all ${user?.role !== 'admin' ? 'hidden' : ''}`}>
            <span>⚙️</span><span>Admin Panel</span>
          </Link>
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-400 hover:bg-red-500/[0.07] transition-all">
            <span>🚪</span><span>Logout</span>
          </button>
        </nav>

        {/* Streak Card */}
        <div className="p-4 border-t border-white/[0.07]">
          <div className="bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/20 rounded-xl p-3 text-center">
            <p className="text-2xl font-extrabold font-sora text-orange-400">🔥 14</p>
            <p className="text-xs text-[#64748b] mt-0.5">Day Learning Streak</p>
          </div>
        </div>
      </aside>

      {/* Mobile sidebar backdrop */}
      {sidebarOpen && <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />}

      {/* ── MAIN CONTENT ─────────────────────────────────────────────────── */}
      <div className="lg:ml-64 flex-1 flex flex-col min-h-screen">
        {/* Top bar */}
        <header className="sticky top-0 z-30 h-16 bg-[#0a0e1a]/90 backdrop-blur-xl border-b border-white/[0.07] flex items-center justify-between px-5 gap-4">
          <div className="flex items-center gap-3">
            <button className="lg:hidden text-[#94a3b8] text-xl" onClick={() => setSidebarOpen(true)}>☰</button>
            <div className="flex items-center gap-2 bg-[#0f1526] border border-white/[0.07] rounded-lg px-3 h-9 w-60 hidden sm:flex">
              <span className="text-[#64748b] text-sm">🔍</span>
              <input type="text" placeholder="Search courses..." className="flex-1 bg-transparent text-sm text-white placeholder-[#475569] outline-none font-nunito" />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/courses" className="hidden sm:inline-flex bg-gradient-to-r from-[#4f8ef7] to-[#8b5cf6] text-white text-xs font-bold px-4 py-2 rounded-lg">
              + Enroll New
            </Link>
            <button className="relative w-9 h-9 bg-[#141c30] border border-white/[0.07] rounded-lg flex items-center justify-center text-sm hover:border-[#4f8ef7] transition-all">
              🔔
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-red-500 rounded-full" />
            </button>
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#4f8ef7] to-[#8b5cf6] flex items-center justify-center text-white text-sm font-bold">
              {user?.name?.charAt(0).toUpperCase()}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-5 lg:p-8 overflow-y-auto">
          {/* Welcome */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="mb-7">
            <h1 className="font-sora text-2xl font-bold">Welcome back, {user?.name?.split(' ')[0]} 👋</h1>
            <p className="text-[#64748b] text-sm mt-1">You have 2 live classes today · Keep up the streak! 🔥 14 days</p>
          </motion.div>

          {/* ── STAT CARDS ── */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {[
              { label: 'Enrolled Courses', val: '4',  change: '↑ 2 this month', color: 'from-[#4f8ef7] to-[#8b5cf6]', icon: '📚' },
              { label: 'Lessons Done',     val: '47', change: '↑ 8 this week',  color: 'from-[#10b981] to-[#06b6d4]', icon: '✅' },
              { label: 'Tests Taken',      val: '12', change: 'Avg score 78%',  color: 'from-[#f59e0b] to-[#f97316]', icon: '📝' },
              { label: 'Day Streak',       val: '14', change: '🔥 Keep it up!', color: 'from-[#f97316] to-[#ef4444]', icon: '🔥' },
            ].map(({ label, val, change, color, icon }) => (
              <motion.div key={label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                className="bg-[#141c30] border border-white/[0.07] rounded-2xl p-5 relative overflow-hidden">
                <span className="absolute right-4 top-4 text-2xl opacity-10">{icon}</span>
                <p className="text-xs text-[#475569] uppercase tracking-widest font-semibold mb-2">{label}</p>
                <p className={`font-sora text-3xl font-extrabold bg-gradient-to-r ${color} bg-clip-text text-transparent mb-1`}>{val}</p>
                <p className="text-xs text-green-400 font-semibold">{change}</p>
              </motion.div>
            ))}
          </div>

          {/* ── TWO-COLUMN GRID ── */}
          <div className="grid lg:grid-cols-3 gap-5 mb-5">

            {/* My Courses (2 cols) */}
            <div className="lg:col-span-2 bg-[#141c30] border border-white/[0.07] rounded-2xl p-5">
              <div className="flex justify-between items-center mb-5">
                <h2 className="font-sora font-bold">My Courses</h2>
                <Link to="/courses" className="text-xs text-[#4f8ef7] font-medium hover:underline">View all →</Link>
              </div>
              <div className="space-y-4">
                {ENROLLED_COURSES.map((c) => (
                  <div key={c.title} className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${c.gradient} flex items-center justify-center text-xl flex-shrink-0`}>{c.emoji}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-1.5">
                        <div>
                          <p className="font-sora font-semibold text-sm truncate">{c.title}</p>
                          <p className="text-xs text-[#64748b]">{c.instructor}</p>
                        </div>
                        <span className="text-xs font-bold ml-2 flex-shrink-0" style={{ color: c.color }}>{c.progress}%</span>
                      </div>
                      <div className="bg-white/[0.06] rounded-full h-1.5 overflow-hidden">
                        <motion.div initial={{ width: 0 }} animate={{ width: `${c.progress}%` }} transition={{ duration: 1.2, ease: 'easeOut', delay: 0.3 }}
                          className="h-full rounded-full" style={{ background: `linear-gradient(90deg, ${c.color}, ${c.color}88)` }} />
                      </div>
                      <p className="text-xs text-[#475569] mt-1">{c.completed}/{c.total} lessons</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right column */}
            <div className="flex flex-col gap-5">
              {/* Upcoming Classes */}
              <div className="bg-[#141c30] border border-white/[0.07] rounded-2xl p-5">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="font-sora font-bold text-sm">Upcoming Classes</h2>
                  <span className="text-xs text-[#4f8ef7] font-medium cursor-pointer">All →</span>
                </div>
                <div className="space-y-3">
                  {UPCOMING.map((u) => (
                    <div key={u.title} className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-white/[0.04] flex items-center justify-center text-sm flex-shrink-0">{u.emoji}</div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold truncate">{u.title}</p>
                        <p className="text-xs text-[#64748b]">{u.time}</p>
                      </div>
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-full flex-shrink-0 ${statusStyle[u.status]}`}>
                        {u.status === 'live' ? 'LIVE' : u.status === 'soon' ? 'Soon' : 'Done'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Weekly mini chart */}
              <div className="bg-[#141c30] border border-white/[0.07] rounded-2xl p-5">
                <div className="flex justify-between items-center mb-3">
                  <h2 className="font-sora font-bold text-sm">This Week</h2>
                  <span className="text-xs text-[#64748b]">7 days</span>
                </div>
                <ResponsiveContainer width="100%" height={80}>
                  <BarChart data={weeklyData} barSize={8}>
                    <Bar dataKey="lessons" fill="#4f8ef7" radius={[3,3,0,0]} />
                    <XAxis dataKey="day" tick={{ fill: '#475569', fontSize: 10 }} axisLine={false} tickLine={false} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* ── PROGRESS CHART ── */}
          <div className="grid lg:grid-cols-2 gap-5 mb-5">
            <div className="bg-[#141c30] border border-white/[0.07] rounded-2xl p-5">
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-sora font-bold">Score Progress</h2>
                <span className="text-xs bg-green-500/10 text-green-400 border border-green-500/20 px-2.5 py-1 rounded-full font-semibold">↑ +43% vs Aug</span>
              </div>
              <ResponsiveContainer width="100%" height={150}>
                <AreaChart data={monthlyProgress}>
                  <defs>
                    <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#4f8ef7" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#4f8ef7" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="month" tick={{ fill: '#475569', fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: '#475569', fontSize: 11 }} axisLine={false} tickLine={false} domain={[50,100]} />
                  <Tooltip contentStyle={{ background: '#1a2340', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, color: '#e8ecf5', fontSize: 12 }} />
                  <Area type="monotone" dataKey="score" stroke="#4f8ef7" strokeWidth={2} fill="url(#colorScore)" dot={{ fill: '#4f8ef7', r: 3 }} />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Quick Actions */}
            <div className="bg-[#141c30] border border-white/[0.07] rounded-2xl p-5">
              <h2 className="font-sora font-bold mb-4">Quick Actions</h2>
              <div className="grid grid-cols-2 gap-3">
                {[
                  ['📡', 'Join Live Class', 'bg-red-500/10 border-red-500/20 text-red-400'],
                  ['📝', 'Take a Test', 'bg-amber-500/10 border-amber-500/20 text-amber-400'],
                  ['📥', 'Download Notes', 'bg-blue-500/10 border-blue-500/20 text-blue-400'],
                  ['📊', 'View Reports', 'bg-green-500/10 border-green-500/20 text-green-400'],
                  ['🏆', 'Certificates', 'bg-purple-500/10 border-purple-500/20 text-purple-400'],
                  ['❓', 'Ask a Tutor', 'bg-teal-500/10 border-teal-500/20 text-teal-400'],
                ].map(([icon, label, cls]) => (
                  <button key={label} className={`flex items-center gap-2.5 border rounded-xl px-4 py-3 text-sm font-semibold hover:opacity-80 transition-opacity ${cls}`}>
                    <span>{icon}</span><span className="text-xs">{label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* ── RECOMMENDED ── */}
          <div className="bg-[#141c30] border border-white/[0.07] rounded-2xl p-5">
            <div className="flex justify-between items-center mb-5">
              <h2 className="font-sora font-bold">Recommended for You</h2>
              <Link to="/courses" className="text-xs text-[#4f8ef7] font-medium hover:underline">Browse all →</Link>
            </div>
            <div className="grid sm:grid-cols-3 gap-4">
              {RECOMMENDED.map((r) => (
                <div key={r.title} className="bg-[#1a2340] border border-white/[0.05] rounded-xl p-4 hover:border-blue-500/20 cursor-pointer transition-all hover:-translate-y-0.5">
                  <div className="text-2xl mb-3">{r.emoji}</div>
                  <p className="font-sora font-bold text-sm mb-1">{r.title}</p>
                  <p className="text-[#64748b] text-xs mb-3">{r.instructor}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-green-400 text-sm font-bold">{r.price}</span>
                    <span className="text-yellow-400 text-xs">★ {r.rating}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
