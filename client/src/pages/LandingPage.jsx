/**
 * Tution Master — Landing Page
 */

import { useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import { useCourseStore } from '../store';

// Animation helpers
const fadeUp = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.6 } } };
const stagger = { show: { transition: { staggerChildren: 0.12 } } };

const FEATURES = [
  { icon: '👨‍🏫', title: 'Expert Tutors', desc: 'Learn from NIT, IIT, and TU graduates with years of teaching experience.' },
  { icon: '📚', title: 'Interactive Courses', desc: 'Curricula aligned with Nepal\'s SEE, +2, and entrance exam syllabi.' },
  { icon: '📡', title: 'Live Classes', desc: 'Real-time sessions with doubt clearing, polls, and interactive whiteboards.' },
  { icon: '🎬', title: 'Recorded Lectures', desc: 'HD video lectures accessible offline — great during load-shedding.' },
  { icon: '📝', title: 'Practice Tests', desc: '1000+ MCQs modeled after IOE, TU entrance exams with explanations.' },
  { icon: '📊', title: 'Progress Tracking', desc: 'Visual dashboards showing learning streak, weak areas, and improvement.' },
];

const COURSES = [
  { emoji: '📐', title: 'Advanced Mathematics', instructor: 'Rajesh Sharma', rating: '4.9', reviews: '2,341', price: 'NPR 1,200', tag: 'Class 11-12', gradient: 'from-blue-900 to-blue-600' },
  { emoji: '💻', title: 'Computer Programming', instructor: 'Sumit Yadav', rating: '5.0', reviews: '987', price: 'NPR 900', tag: 'Python', gradient: 'from-purple-900 to-purple-600' },
  { emoji: '⚙️', title: 'Engineering Entrance', instructor: 'Anup KC', rating: '4.9', reviews: '3,012', price: 'NPR 2,500', tag: 'IOE Prep', gradient: 'from-orange-900 to-orange-600' },
  { emoji: '🔬', title: 'Science Complete (+2)', instructor: 'Priya Maharjan', rating: '4.8', reviews: '1,876', price: 'NPR 1,500', tag: 'NEB', gradient: 'from-green-900 to-green-600' },
  { emoji: '📖', title: 'English & Communication', instructor: 'Sita Basnet', rating: '4.9', reviews: '1,234', price: 'NPR 800', tag: 'All Levels', gradient: 'from-pink-900 to-pink-600' },
  { emoji: '🧪', title: 'MBBS Entrance Prep', instructor: 'Dr. Dinesh Parajuli', rating: '4.8', reviews: '2,567', price: 'NPR 3,000', tag: 'Medical', gradient: 'from-teal-900 to-teal-600' },
];

const TUTORS = [
  { initials: 'SY', name: 'Sumit Yadav', subject: '💻 Computer Science', rating: '5.0', students: '2,400+', courses: 12, note: 'NIT Jamshedpur · Founder', gradient: 'from-blue-600 to-purple-600' },
  { initials: 'RS', name: 'Rajesh Sharma', subject: '📐 Mathematics', rating: '4.9', students: '3,100+', courses: 8, note: '8 years experience', gradient: 'from-green-600 to-teal-600' },
  { initials: 'PM', name: 'Priya Maharjan', subject: '⚗️ Chemistry & Physics', rating: '4.8', students: '1,800+', courses: 6, note: 'TU Gold Medalist', gradient: 'from-pink-600 to-purple-600' },
  { initials: 'AK', name: 'Anup KC', subject: '⚙️ Engineering Entrance', rating: '4.9', students: '4,200+', courses: 10, note: 'IOE Top Ranker 2019', gradient: 'from-orange-600 to-red-600' },
];

const TESTIMONIALS = [
  { initials: 'BT', name: 'Bikash Thapa', role: 'IOE student, Lalitpur', text: 'Tution Master helped me crack the IOE entrance exam on my first attempt. The practice tests were exactly like the real paper. Forever grateful to Sumit Sir!', gradient: 'from-blue-600 to-purple-600' },
  { initials: 'SP', name: 'Sujata Poudel', role: '+2 Science, Pokhara', text: 'The live classes feel like sitting in a real classroom. Teachers are very supportive and clear every doubt patiently. Best platform for Nepal students.', gradient: 'from-green-600 to-teal-600' },
  { initials: 'RM', name: 'Rohan Magar', role: 'SEE Topper, Chitwan', text: 'Offline video download is a lifesaver during load-shedding! I scored 90% in board exams after following Tution Master\'s study plan for just 3 months.', gradient: 'from-pink-600 to-rose-600' },
];

function SectionBadge({ children }) {
  return (
    <span className="inline-flex items-center gap-1.5 bg-blue-500/10 border border-blue-500/25 text-[#4f8ef7] px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide mb-4">
      {children}
    </span>
  );
}

function AnimatedSection({ children, className = '' }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.div ref={ref} variants={stagger} initial="hidden" animate={inView ? 'show' : 'hidden'} className={className}>
      {children}
    </motion.div>
  );
}

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="bg-[#0a0e1a] text-[#e8ecf5] min-h-screen font-nunito">
      <Navbar />

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-24 overflow-hidden">
        {/* Orbs */}
        <div className="absolute -top-40 -left-20 w-[600px] h-[600px] bg-[#4f8ef7] rounded-full blur-[120px] opacity-[0.10] pointer-events-none" />
        <div className="absolute -bottom-20 -right-20 w-[500px] h-[500px] bg-[#8b5cf6] rounded-full blur-[120px] opacity-[0.10] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div variants={stagger} initial="hidden" animate="show">
              <motion.div variants={fadeUp}>
                <span className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 text-[#4f8ef7] px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide mb-6">
                  🇳🇵 Nepal's #1 Learning Platform
                </span>
              </motion.div>
              <motion.h1 variants={fadeUp} className="font-sora text-5xl lg:text-6xl font-extrabold leading-[1.12] mb-5">
                Empowering Nepal's Students with{' '}
                <span className="bg-gradient-to-r from-[#4f8ef7] to-[#8b5cf6] bg-clip-text text-transparent">
                  World-Class Education
                </span>
              </motion.h1>
              <motion.p variants={fadeUp} className="text-[#94a3b8] text-lg leading-relaxed mb-8 max-w-lg">
                Tution Master connects students with expert tutors and structured courses designed to help them succeed in school, +2, and entrance exams.
              </motion.p>
              <motion.div variants={fadeUp} className="flex flex-wrap gap-3">
                <Link to="/auth?tab=register" className="inline-flex items-center gap-2 bg-gradient-to-r from-[#4f8ef7] to-[#8b5cf6] text-white font-semibold px-7 py-3.5 rounded-xl shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:-translate-y-0.5 transition-all text-sm">
                  🚀 Start Learning Free
                </Link>
                <Link to="/tutors" className="inline-flex items-center gap-2 border border-[#4f8ef7] text-[#4f8ef7] font-semibold px-7 py-3.5 rounded-xl hover:bg-[#4f8ef7] hover:text-white transition-all text-sm">
                  Become a Tutor →
                </Link>
              </motion.div>

              {/* Stats */}
              <motion.div variants={fadeUp} className="grid grid-cols-4 gap-6 mt-12 pt-8 border-t border-white/[0.07]">
                {[['12K+', 'Students'], ['350+', 'Tutors'], ['180+', 'Courses'], ['4.9★', 'Rating']].map(([num, label]) => (
                  <div key={label}>
                    <div className="font-sora font-extrabold text-2xl bg-gradient-to-r from-[#4f8ef7] to-[#8b5cf6] bg-clip-text text-transparent">{num}</div>
                    <div className="text-[#64748b] text-xs mt-0.5">{label}</div>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            {/* Hero Visual */}
            <div className="relative h-[420px] hidden lg:block">
              {/* Floating Card 1 */}
              <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute top-8 right-4 w-64 bg-[#141c30] border border-white/10 rounded-2xl p-5 shadow-2xl">
                <div className="h-20 bg-gradient-to-br from-blue-900 to-blue-600 rounded-xl flex items-center justify-center text-3xl mb-3">📐</div>
                <p className="font-sora font-bold text-sm mb-1">Advanced Mathematics</p>
                <p className="text-[#64748b] text-xs mb-2">by Rajesh Sharma</p>
                <div className="flex justify-between text-xs">
                  <span className="text-yellow-400 font-semibold">★ 4.9</span>
                  <span className="text-green-400 font-bold">NPR 1,200</span>
                </div>
                <div className="bg-white/[0.06] rounded h-1 mt-2.5"><div className="bg-gradient-to-r from-[#4f8ef7] to-[#8b5cf6] h-full rounded" style={{width:'68%'}} /></div>
                <p className="text-[#64748b] text-xs mt-1">68% complete</p>
              </motion.div>

              {/* Floating Card 2 */}
              <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
                className="absolute bottom-12 left-4 w-60 bg-[#141c30] border border-white/10 rounded-2xl p-4 shadow-2xl">
                <div className="flex items-center justify-between mb-2">
                  <span className="flex items-center gap-1.5 bg-red-500/15 border border-red-500/25 text-red-400 px-2.5 py-1 rounded-full text-xs font-bold">
                    <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />LIVE NOW
                  </span>
                  <span className="text-[#64748b] text-xs">24 students</span>
                </div>
                <p className="font-sora font-bold text-sm mb-1">Physics Class 12</p>
                <p className="text-[#64748b] text-xs">Optics & Wave Motion</p>
                <div className="mt-3 bg-[#4f8ef7]/10 rounded-lg py-2 px-3 text-[#4f8ef7] text-xs font-semibold">▶ Join Session →</div>
              </motion.div>

              {/* Floating Card 3 */}
              <motion.div animate={{ y: [0, -12, 0] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
                className="absolute top-48 right-44 w-40 bg-[#141c30] border border-white/10 rounded-xl p-3 shadow-xl">
                <p className="text-[#64748b] text-xs font-semibold mb-1">Today's Goal</p>
                <p className="text-white text-xs mb-2">Complete 2 lessons</p>
                <div className="bg-white/[0.06] rounded h-1"><div className="bg-gradient-to-r from-[#4f8ef7] to-[#8b5cf6] h-full rounded w-1/2" /></div>
                <p className="text-[#64748b] text-xs mt-1">1 / 2 done 🔥</p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURES ──────────────────────────────────────────────────────── */}
      <section className="py-24 bg-[#0f1526]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <motion.div variants={fadeUp} className="text-center mb-14">
              <SectionBadge>✦ Why Choose Us</SectionBadge>
              <h2 className="font-sora text-4xl font-bold mb-4">Everything You Need to <span className="bg-gradient-to-r from-[#4f8ef7] to-[#8b5cf6] bg-clip-text text-transparent">Excel</span></h2>
              <p className="text-[#94a3b8] max-w-xl mx-auto">A complete ecosystem designed to make learning effective and accessible for every Nepali student.</p>
            </motion.div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {FEATURES.map((f) => (
                <motion.div key={f.title} variants={fadeUp}
                  className="bg-[#141c30] border border-white/[0.07] rounded-2xl p-7 hover:border-[#4f8ef7]/40 hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-500/10 transition-all cursor-default group">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/15 to-purple-500/15 border border-blue-500/20 flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">{f.icon}</div>
                  <h3 className="font-sora font-bold text-base mb-2">{f.title}</h3>
                  <p className="text-[#94a3b8] text-sm leading-relaxed">{f.desc}</p>
                </motion.div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ── POPULAR COURSES ───────────────────────────────────────────────── */}
      <section className="py-24 bg-[#0a0e1a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <motion.div variants={fadeUp} className="flex justify-between items-end mb-12">
              <div>
                <SectionBadge>📖 Popular Courses</SectionBadge>
                <h2 className="font-sora text-4xl font-bold">Learn from the <span className="bg-gradient-to-r from-[#4f8ef7] to-[#8b5cf6] bg-clip-text text-transparent">Best</span></h2>
              </div>
              <Link to="/courses" className="hidden sm:inline-flex border border-white/10 text-[#94a3b8] text-sm font-medium px-5 py-2.5 rounded-xl hover:border-[#4f8ef7] hover:text-white transition-all">
                View All Courses →
              </Link>
            </motion.div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {COURSES.map((c) => (
                <motion.div key={c.title} variants={fadeUp}
                  onClick={() => navigate('/courses')}
                  className="bg-[#141c30] border border-white/[0.07] rounded-2xl overflow-hidden hover:border-blue-500/30 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/30 transition-all cursor-pointer group">
                  <div className={`h-36 bg-gradient-to-br ${c.gradient} flex items-center justify-center text-4xl group-hover:scale-105 transition-transform`}>{c.emoji}</div>
                  <div className="p-5">
                    <span className="bg-[#4f8ef7]/10 text-[#4f8ef7] text-xs font-semibold px-2.5 py-1 rounded-md">{c.tag}</span>
                    <h3 className="font-sora font-bold mt-2 mb-1.5">{c.title}</h3>
                    <p className="text-[#64748b] text-xs mb-3">by {c.instructor}</p>
                    <div className="flex justify-between items-center pt-3 border-t border-white/[0.06]">
                      <div>
                        <div className="text-yellow-400 text-xs font-semibold">★ {c.rating}</div>
                        <div className="text-[#64748b] text-xs">({c.reviews})</div>
                      </div>
                      <div className="text-right">
                        <div className="text-green-400 font-bold text-sm">{c.price}</div>
                        <button className="mt-1 bg-gradient-to-r from-[#4f8ef7] to-[#8b5cf6] text-white text-xs font-semibold px-3 py-1.5 rounded-lg">Enroll →</button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ── HOW IT WORKS ──────────────────────────────────────────────────── */}
      <section className="py-24 bg-[#0f1526]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <motion.div variants={fadeUp} className="text-center mb-14">
              <SectionBadge>🔄 Process</SectionBadge>
              <h2 className="font-sora text-4xl font-bold">How It <span className="bg-gradient-to-r from-[#4f8ef7] to-[#8b5cf6] bg-clip-text text-transparent">Works</span></h2>
            </motion.div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 relative">
              <div className="absolute top-9 left-[12%] right-[12%] h-px bg-gradient-to-r from-[#4f8ef7] to-[#8b5cf6] opacity-20 hidden lg:block" />
              {[['01','Create Account','Sign up in 2 minutes with email or Google'],['02','Choose Course','Browse 180+ courses across all subjects'],['03','Learn with Experts','Watch videos, attend live classes, clear doubts'],['04','Track Progress','Monitor growth and earn certificates']].map(([n,t,d]) => (
                <motion.div key={n} variants={fadeUp} className="bg-[#141c30] border border-white/[0.07] rounded-2xl p-6 text-center relative z-10">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#4f8ef7] to-[#8b5cf6] flex items-center justify-center font-sora font-extrabold text-sm text-white mx-auto mb-4 shadow-lg shadow-blue-500/30">{n}</div>
                  <h3 className="font-sora font-bold mb-2">{t}</h3>
                  <p className="text-[#94a3b8] text-sm">{d}</p>
                </motion.div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ── TUTORS ────────────────────────────────────────────────────────── */}
      <section className="py-24 bg-[#0a0e1a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <motion.div variants={fadeUp} className="flex justify-between items-end mb-12">
              <div><SectionBadge>👩‍🏫 Meet the Team</SectionBadge><h2 className="font-sora text-4xl font-bold">Expert <span className="bg-gradient-to-r from-[#4f8ef7] to-[#8b5cf6] bg-clip-text text-transparent">Tutors</span></h2></div>
              <Link to="/tutors" className="hidden sm:inline-flex border border-white/10 text-[#94a3b8] text-sm font-medium px-5 py-2.5 rounded-xl hover:border-[#4f8ef7] hover:text-white transition-all">All Tutors →</Link>
            </motion.div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {TUTORS.map((t) => (
                <motion.div key={t.name} variants={fadeUp}
                  className="bg-[#141c30] border border-white/[0.07] rounded-2xl p-6 text-center hover:border-purple-500/40 hover:-translate-y-1 hover:shadow-lg hover:shadow-purple-500/10 transition-all">
                  <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${t.gradient} flex items-center justify-center text-white font-bold text-lg mx-auto mb-3`}>{t.initials}</div>
                  <h3 className="font-sora font-bold mb-0.5">{t.name}</h3>
                  <p className="text-[#4f8ef7] text-xs font-semibold mb-2">{t.subject}</p>
                  <div className="flex justify-center gap-3 text-xs text-[#94a3b8] mb-1">
                    <span>⭐ {t.rating}</span><span>👥 {t.students}</span>
                  </div>
                  <p className="text-[#64748b] text-xs mb-3">{t.note}</p>
                  <button className="w-full border border-[#4f8ef7] text-[#4f8ef7] text-xs font-semibold py-2 rounded-lg hover:bg-[#4f8ef7] hover:text-white transition-all">Book Session</button>
                </motion.div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ── TESTIMONIALS ──────────────────────────────────────────────────── */}
      <section className="py-24 bg-[#0f1526]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <motion.div variants={fadeUp} className="text-center mb-12">
              <SectionBadge>💬 Student Voices</SectionBadge>
              <h2 className="font-sora text-4xl font-bold">What Our <span className="bg-gradient-to-r from-[#4f8ef7] to-[#8b5cf6] bg-clip-text text-transparent">Students Say</span></h2>
            </motion.div>
            <div className="grid md:grid-cols-3 gap-5">
              {TESTIMONIALS.map((t) => (
                <motion.div key={t.name} variants={fadeUp} className="bg-[#141c30] border border-white/[0.07] rounded-2xl p-6">
                  <div className="text-4xl text-[#4f8ef7] opacity-40 font-sora mb-3">"</div>
                  <p className="text-[#94a3b8] text-sm leading-relaxed italic mb-5">{t.text}</p>
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${t.gradient} flex items-center justify-center text-white text-xs font-bold flex-shrink-0`}>{t.initials}</div>
                    <div className="flex-1">
                      <p className="font-sora font-bold text-sm">{t.name}</p>
                      <p className="text-[#64748b] text-xs">{t.role}</p>
                    </div>
                    <span className="text-yellow-400 text-xs">★★★★★</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────────── */}
      <section className="py-24 bg-[#0a0e1a]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, scale: 0.96 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
            className="relative bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-3xl p-16">
            <SectionBadge>🎯 Start Today</SectionBadge>
            <h2 className="font-sora text-5xl font-extrabold mb-4">Start Your Learning Journey <span className="bg-gradient-to-r from-[#4f8ef7] to-[#8b5cf6] bg-clip-text text-transparent">Today</span></h2>
            <p className="text-[#94a3b8] text-lg mb-8">Join 12,000+ students learning smarter with Nepal's best tutors.</p>
            <div className="flex justify-center gap-4 flex-wrap">
              <Link to="/auth?tab=register" className="inline-flex items-center gap-2 bg-gradient-to-r from-[#4f8ef7] to-[#8b5cf6] text-white font-bold px-8 py-4 rounded-xl shadow-xl shadow-blue-500/25 hover:shadow-blue-500/40 hover:-translate-y-1 transition-all">
                🚀 Join Now — It's Free
              </Link>
              <Link to="/courses" className="inline-flex items-center gap-2 border border-white/15 text-[#94a3b8] font-semibold px-8 py-4 rounded-xl hover:border-white/30 hover:text-white transition-all">
                Explore Courses
              </Link>
            </div>
            <p className="text-[#64748b] text-xs mt-5">No credit card required · 7-day free trial on all courses</p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
