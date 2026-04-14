// ── CoursesPage.jsx ────────────────────────────────────────────────────────────
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';

const ALL_COURSES = [
  { id: 1, emoji: '📐', title: 'Advanced Mathematics', instructor: 'Rajesh Sharma', rating: '4.9', reviews: '2,341', price: 'NPR 1,200', tag: 'Class 11-12', category: 'Mathematics', level: 'Advanced', gradient: 'from-blue-900 to-blue-600' },
  { id: 2, emoji: '💻', title: 'Computer Programming (Python)', instructor: 'Sumit Yadav', rating: '5.0', reviews: '987', price: 'NPR 900', tag: 'Python', category: 'Computer', level: 'Beginner', gradient: 'from-purple-900 to-purple-600' },
  { id: 3, emoji: '⚙️', title: 'Engineering Entrance Prep', instructor: 'Anup KC', rating: '4.9', reviews: '3,012', price: 'NPR 2,500', tag: 'IOE', category: 'Engineering', level: 'Advanced', gradient: 'from-orange-900 to-orange-600' },
  { id: 4, emoji: '🔬', title: 'Science Complete (+2 NEB)', instructor: 'Priya Maharjan', rating: '4.8', reviews: '1,876', price: 'NPR 1,500', tag: 'NEB', category: 'Science', level: 'Intermediate', gradient: 'from-green-900 to-green-600' },
  { id: 5, emoji: '📖', title: 'English & Communication', instructor: 'Sita Basnet', rating: '4.9', reviews: '1,234', price: 'NPR 800', tag: 'All Levels', category: 'English', level: 'Beginner', gradient: 'from-pink-900 to-pink-600' },
  { id: 6, emoji: '🧪', title: 'MBBS Entrance Preparation', instructor: 'Dr. Dinesh Parajuli', rating: '4.8', reviews: '2,567', price: 'NPR 3,000', tag: 'Medical', category: 'Medical', level: 'Advanced', gradient: 'from-teal-900 to-teal-600' },
  { id: 7, emoji: '🧮', title: 'Statistics & Probability', instructor: 'Rajesh Sharma', rating: '4.7', reviews: '654', price: 'NPR 800', tag: 'Class 12', category: 'Mathematics', level: 'Intermediate', gradient: 'from-indigo-900 to-indigo-600' },
  { id: 8, emoji: '⚡', title: 'Electrical Engineering Basics', instructor: 'Anup KC', rating: '4.8', reviews: '432', price: 'NPR 1,100', tag: 'Engineering', category: 'Engineering', level: 'Beginner', gradient: 'from-yellow-900 to-yellow-600' },
  { id: 9, emoji: '🌐', title: 'Web Development with JavaScript', instructor: 'Sumit Yadav', rating: '5.0', reviews: '765', price: 'NPR 1,500', tag: 'Web Dev', category: 'Computer', level: 'Intermediate', gradient: 'from-cyan-900 to-cyan-600' },
];

const CATEGORIES = ['All', 'Mathematics', 'Science', 'Computer', 'Engineering', 'Medical', 'English'];
const LEVELS = ['All', 'Beginner', 'Intermediate', 'Advanced'];

export default function CoursesPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [level, setLevel] = useState('All');
  const [sort, setSort] = useState('popular');

  const filtered = ALL_COURSES.filter(c => {
    if (category !== 'All' && c.category !== category) return false;
    if (level !== 'All' && c.level !== level) return false;
    if (search && !c.title.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="bg-[#0a0e1a] text-[#e8ecf5] min-h-screen font-nunito">
      <Navbar />
      <div className="pt-24 pb-20">
        {/* Header */}
        <div className="bg-[#0f1526] border-b border-white/[0.07] py-12">
          <div className="max-w-7xl mx-auto px-4">
            <h1 className="font-sora text-4xl font-bold mb-2">All <span className="bg-gradient-to-r from-[#4f8ef7] to-[#8b5cf6] bg-clip-text text-transparent">Courses</span></h1>
            <p className="text-[#64748b] mb-6">180+ courses designed for Nepal's students</p>
            <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="🔍  Search courses..."
              className="w-full max-w-md bg-[#141c30] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-[#475569] outline-none focus:border-[#4f8ef7] transition-all" />
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 mt-8">
          {/* Filters */}
          <div className="flex flex-wrap gap-3 mb-8">
            <div className="flex gap-2 flex-wrap">
              {CATEGORIES.map(c => (
                <button key={c} onClick={() => setCategory(c)}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${category === c ? 'bg-[#4f8ef7] text-white' : 'bg-[#141c30] border border-white/10 text-[#94a3b8] hover:border-[#4f8ef7]'}`}>
                  {c}
                </button>
              ))}
            </div>
            <select value={level} onChange={e => setLevel(e.target.value)} className="ml-auto bg-[#141c30] border border-white/10 rounded-xl px-3 py-1.5 text-xs text-[#94a3b8] outline-none">
              {LEVELS.map(l => <option key={l}>{l}</option>)}
            </select>
          </div>

          {/* Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((c, i) => (
              <motion.div key={c.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
                onClick={() => navigate(`/courses/${c.id}`)}
                className="bg-[#141c30] border border-white/[0.07] rounded-2xl overflow-hidden hover:border-blue-500/30 hover:-translate-y-1 hover:shadow-xl transition-all cursor-pointer group">
                <div className={`h-36 bg-gradient-to-br ${c.gradient} flex items-center justify-center text-4xl group-hover:scale-105 transition-transform`}>{c.emoji}</div>
                <div className="p-5">
                  <span className="bg-[#4f8ef7]/10 text-[#4f8ef7] text-xs font-semibold px-2.5 py-1 rounded-md">{c.tag}</span>
                  <h3 className="font-sora font-bold mt-2 mb-1.5 text-sm">{c.title}</h3>
                  <p className="text-[#64748b] text-xs mb-3">by {c.instructor}</p>
                  <div className="flex justify-between items-center pt-3 border-t border-white/[0.06]">
                    <div>
                      <div className="text-yellow-400 text-xs font-semibold">★ {c.rating}</div>
                      <div className="text-[#64748b] text-xs">({c.reviews})</div>
                    </div>
                    <div className="text-right">
                      <div className="text-green-400 font-bold text-sm">{c.price}</div>
                      <span className="inline-block mt-1 bg-gradient-to-r from-[#4f8ef7] to-[#8b5cf6] text-white text-xs font-semibold px-3 py-1.5 rounded-lg">Enroll →</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          {filtered.length === 0 && (
            <div className="text-center py-20 text-[#64748b]">
              <p className="text-4xl mb-3">🔍</p>
              <p className="font-sora font-bold text-lg mb-1">No courses found</p>
              <p className="text-sm">Try adjusting your filters</p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
