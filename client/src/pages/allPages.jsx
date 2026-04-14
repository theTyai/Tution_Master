// ── AdminPage.jsx ─────────────────────────────────────────────────────────────
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/common/Navbar';

const ADMIN_TABS = ['Overview', 'Courses', 'Students', 'Tutors', 'Payments'];
const STATS = [
  { label: 'Total Students', val: '12,456', change: '+234 this month', color: 'from-blue-500 to-purple-500' },
  { label: 'Active Courses', val: '182', change: '+8 this week', color: 'from-green-500 to-teal-500' },
  { label: 'Total Revenue', val: 'NPR 8.4L', change: '+12% vs last month', color: 'from-amber-500 to-orange-500' },
  { label: 'Active Tutors', val: '47', change: '3 pending approval', color: 'from-pink-500 to-rose-500' },
];
const RECENT_STUDENTS = [
  { name: 'Bikash Thapa', email: 'bikash@gmail.com', level: 'Engineering Entrance', enrolled: 3, joined: '2 days ago' },
  { name: 'Sujata Poudel', email: 'sujata@gmail.com', level: 'Class 11-12', enrolled: 2, joined: '5 days ago' },
  { name: 'Rohan Magar', email: 'rohan@gmail.com', level: 'Class 9-10 (SEE)', enrolled: 1, joined: '1 week ago' },
  { name: 'Priya Thapa', email: 'priya.t@gmail.com', level: 'Medical Entrance', enrolled: 4, joined: '2 weeks ago' },
];

export function AdminPage() {
  const [activeTab, setActiveTab] = useState('Overview');
  return (
    <div className="bg-[#0a0e1a] text-[#e8ecf5] min-h-screen font-nunito">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 pt-24 pb-16">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-xs text-green-400 font-semibold">Admin Panel Active</span>
          </div>
          <h1 className="font-sora text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-[#64748b] text-sm">Tution Master Platform Management</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 flex-wrap mb-8">
          {ADMIN_TABS.map(t => (
            <button key={t} onClick={() => setActiveTab(t)}
              className={`px-5 py-2 rounded-xl text-sm font-semibold transition-all ${activeTab === t ? 'bg-gradient-to-r from-[#4f8ef7] to-[#8b5cf6] text-white' : 'bg-[#141c30] border border-white/[0.07] text-[#94a3b8] hover:text-white'}`}>
              {t}
            </button>
          ))}
        </div>

        {/* Stat cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {STATS.map(s => (
            <div key={s.label} className="bg-[#141c30] border border-white/[0.07] rounded-2xl p-5">
              <p className="text-xs text-[#475569] uppercase tracking-widest font-semibold mb-2">{s.label}</p>
              <p className={`font-sora text-2xl font-extrabold bg-gradient-to-r ${s.color} bg-clip-text text-transparent mb-1`}>{s.val}</p>
              <p className="text-xs text-green-400 font-semibold">{s.change}</p>
            </div>
          ))}
        </div>

        {/* Recent students table */}
        <div className="bg-[#141c30] border border-white/[0.07] rounded-2xl p-6">
          <div className="flex justify-between items-center mb-5">
            <h2 className="font-sora font-bold">Recent Students</h2>
            <button className="text-xs text-[#4f8ef7] font-medium">Export CSV</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/[0.07]">
                  {['Student', 'Email', 'Level', 'Courses', 'Joined'].map(h => (
                    <th key={h} className="text-left text-xs text-[#475569] uppercase tracking-widest font-semibold pb-3 pr-4">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {RECENT_STUDENTS.map((s, i) => (
                  <tr key={i} className="border-b border-white/[0.04] hover:bg-white/[0.02]">
                    <td className="py-3 pr-4 font-semibold text-sm">{s.name}</td>
                    <td className="py-3 pr-4 text-[#64748b] text-xs">{s.email}</td>
                    <td className="py-3 pr-4 text-xs"><span className="bg-blue-500/10 text-[#4f8ef7] px-2 py-0.5 rounded-md font-medium">{s.level}</span></td>
                    <td className="py-3 pr-4 text-center"><span className="font-bold">{s.enrolled}</span></td>
                    <td className="py-3 text-[#64748b] text-xs">{s.joined}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── TutorsPage.jsx ─────────────────────────────────────────────────────────────
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';

const TUTORS_LIST = [
  { initials: 'SY', name: 'Sumit Yadav', subject: 'Computer Science', experience: 5, rating: 5.0, students: 2400, courses: 12, note: 'NIT Jamshedpur · Founder', gradient: 'from-blue-600 to-purple-600', expertise: ['Python', 'Web Dev', 'Data Structures'] },
  { initials: 'RS', name: 'Rajesh Sharma', subject: 'Mathematics', experience: 8, rating: 4.9, students: 3100, courses: 8, note: '8 years experience', gradient: 'from-green-600 to-teal-600', expertise: ['Calculus', 'Algebra', 'Statistics'] },
  { initials: 'PM', name: 'Priya Maharjan', subject: 'Chemistry & Physics', experience: 6, rating: 4.8, students: 1800, courses: 6, note: 'TU Gold Medalist', gradient: 'from-pink-600 to-purple-600', expertise: ['Organic Chemistry', 'Optics', 'Thermodynamics'] },
  { initials: 'AK', name: 'Anup KC', subject: 'Engineering Entrance', experience: 7, rating: 4.9, students: 4200, courses: 10, note: 'IOE Top Ranker 2019', gradient: 'from-orange-600 to-red-600', expertise: ['IOE Prep', 'Electrical', 'Mechanics'] },
  { initials: 'SB', name: 'Sita Basnet', subject: 'English', experience: 4, rating: 4.9, students: 1200, courses: 5, note: 'Cambridge Certified', gradient: 'from-teal-600 to-cyan-600', expertise: ['Grammar', 'Writing', 'IELTS Prep'] },
  { initials: 'DP', name: 'Dr. Dinesh Parajuli', subject: 'Biology & Medical Entrance', experience: 10, rating: 4.8, students: 2567, courses: 7, note: 'BPKIHS Graduate', gradient: 'from-emerald-600 to-green-600', expertise: ['Anatomy', 'Physiology', 'MBBS Prep'] },
];

export function TutorsPage() {
  return (
    <div className="bg-[#0a0e1a] text-[#e8ecf5] min-h-screen font-nunito">
      <Navbar />
      <div className="pt-24 pb-20">
        <div className="bg-[#0f1526] border-b border-white/[0.07] py-12 mb-10">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <span className="inline-block bg-blue-500/10 border border-blue-500/20 text-[#4f8ef7] text-xs font-semibold px-4 py-1.5 rounded-full mb-4">👩‍🏫 Expert Tutors</span>
            <h1 className="font-sora text-4xl font-bold mb-3">Meet Nepal's <span className="bg-gradient-to-r from-[#4f8ef7] to-[#8b5cf6] bg-clip-text text-transparent">Best Educators</span></h1>
            <p className="text-[#64748b]">All tutors are verified professionals with proven track records</p>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {TUTORS_LIST.map((t, i) => (
              <div key={i} className="bg-[#141c30] border border-white/[0.07] rounded-2xl p-6 hover:border-purple-500/30 hover:-translate-y-1 hover:shadow-lg transition-all">
                <div className="flex items-center gap-4 mb-4">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${t.gradient} flex items-center justify-center text-white font-bold text-lg flex-shrink-0`}>{t.initials}</div>
                  <div>
                    <h3 className="font-sora font-bold">{t.name}</h3>
                    <p className="text-[#4f8ef7] text-xs font-semibold">{t.subject}</p>
                    <p className="text-[#64748b] text-xs">{t.note}</p>
                  </div>
                </div>
                <div className="flex gap-4 text-xs text-[#64748b] mb-4 border-y border-white/[0.06] py-3">
                  <span>⭐ {t.rating}</span>
                  <span>👥 {t.students.toLocaleString()}</span>
                  <span>📚 {t.courses} courses</span>
                  <span>📅 {t.experience}y exp</span>
                </div>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {t.expertise.map(e => (
                    <span key={e} className="bg-white/[0.04] border border-white/[0.07] text-[#94a3b8] text-xs px-2.5 py-1 rounded-lg">{e}</span>
                  ))}
                </div>
                <button className="w-full border border-[#4f8ef7] text-[#4f8ef7] text-sm font-semibold py-2.5 rounded-xl hover:bg-[#4f8ef7] hover:text-white transition-all">
                  Book a Session →
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

// ── CourseDetail.jsx ──────────────────────────────────────────────────────────
import { useParams } from 'react-router-dom';

export function CourseDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const course = {
    emoji: '📐', title: 'Advanced Mathematics', instructor: 'Rajesh Sharma', rating: '4.9', reviews: '2,341',
    price: 'NPR 1,200', description: 'Complete mathematics course covering calculus, algebra, coordinate geometry, and statistics aligned with Nepal\'s +2 syllabus. Join 2000+ students who improved their scores.',
    gradient: 'from-blue-900 to-blue-600', totalLessons: 50, totalDuration: '40 hours', level: 'Advanced',
    whatYouLearn: ['Differentiation & Integration', 'Matrices & Determinants', 'Coordinate Geometry', 'Statistics & Probability', 'Trigonometry', 'Vectors'],
    curriculum: [
      { title: 'Introduction & Course Overview', duration: '15 min', free: true },
      { title: 'Limits & Continuity', duration: '45 min', free: false },
      { title: 'Differentiation Basics', duration: '60 min', free: false },
      { title: 'Applications of Derivatives', duration: '55 min', free: false },
      { title: 'Integration Techniques', duration: '70 min', free: false },
    ]
  };

  return (
    <div className="bg-[#0a0e1a] text-[#e8ecf5] min-h-screen font-nunito">
      <Navbar />
      <div className="pt-20">
        <div className="bg-[#0f1526] border-b border-white/[0.07] py-12">
          <div className="max-w-5xl mx-auto px-4 grid md:grid-cols-3 gap-8 items-start">
            <div className="md:col-span-2">
              <span className="bg-blue-500/10 text-[#4f8ef7] text-xs font-semibold px-3 py-1.5 rounded-full border border-blue-500/20 mb-4 inline-block">Mathematics · Advanced</span>
              <h1 className="font-sora text-3xl font-bold mb-3">{course.title}</h1>
              <p className="text-[#94a3b8] mb-4">{course.description}</p>
              <div className="flex items-center gap-4 text-sm text-[#64748b]">
                <span className="text-yellow-400 font-semibold">★ {course.rating}</span>
                <span>({course.reviews} reviews)</span>
                <span>📚 {course.totalLessons} lessons</span>
                <span>⏱ {course.totalDuration}</span>
              </div>
            </div>
            <div className="bg-[#141c30] border border-white/10 rounded-2xl p-5 sticky top-24">
              <div className={`h-28 bg-gradient-to-br ${course.gradient} rounded-xl flex items-center justify-center text-5xl mb-4`}>{course.emoji}</div>
              <p className="font-sora font-extrabold text-2xl text-green-400 mb-4">{course.price}</p>
              <button onClick={() => navigate('/auth')} className="w-full bg-gradient-to-r from-[#4f8ef7] to-[#8b5cf6] text-white font-bold py-3 rounded-xl mb-3">Enroll Now →</button>
              <p className="text-xs text-[#64748b] text-center">7-day money-back guarantee</p>
            </div>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 py-10 grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <h2 className="font-sora font-bold text-xl mb-4">What You'll Learn</h2>
            <div className="grid sm:grid-cols-2 gap-2 mb-8">
              {course.whatYouLearn.map(item => (
                <div key={item} className="flex items-center gap-2 text-sm text-[#94a3b8]">
                  <span className="text-green-400">✓</span>{item}
                </div>
              ))}
            </div>
            <h2 className="font-sora font-bold text-xl mb-4">Curriculum</h2>
            <div className="space-y-2">
              {course.curriculum.map((l, i) => (
                <div key={i} className="flex items-center justify-between bg-[#141c30] border border-white/[0.07] rounded-xl px-4 py-3">
                  <div className="flex items-center gap-3">
                    <span className="text-[#64748b] text-sm">▶</span>
                    <span className="text-sm font-medium">{l.title}</span>
                    {l.free && <span className="text-xs bg-green-500/10 text-green-400 px-2 py-0.5 rounded-full border border-green-500/20 font-medium">Free</span>}
                  </div>
                  <span className="text-xs text-[#64748b]">{l.duration}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── LearnPage.jsx ──────────────────────────────────────────────────────────────
export function LearnPage() {
  const { courseId } = useParams();
  return (
    <div className="bg-[#0a0e1a] text-[#e8ecf5] min-h-screen font-nunito flex flex-col">
      <div className="h-14 bg-[#0f1526] border-b border-white/[0.07] flex items-center px-5 gap-4">
        <Link to="/dashboard" className="text-[#64748b] hover:text-white text-sm">← Dashboard</Link>
        <span className="text-[#475569]">·</span>
        <span className="text-sm font-semibold">Advanced Mathematics — Lesson 2</span>
      </div>
      <div className="flex flex-1">
        <div className="flex-1 flex flex-col">
          <div className="bg-black aspect-video flex items-center justify-center text-4xl">📹</div>
          <div className="p-6">
            <h1 className="font-sora font-bold text-xl mb-2">Limits & Continuity</h1>
            <p className="text-[#64748b] text-sm">Understanding the foundational concepts of calculus through limits and continuity.</p>
            <div className="flex gap-3 mt-4">
              <button className="bg-gradient-to-r from-[#4f8ef7] to-[#8b5cf6] text-white text-sm font-bold px-5 py-2 rounded-xl">✓ Mark Complete</button>
              <button className="border border-white/10 text-[#94a3b8] text-sm px-5 py-2 rounded-xl hover:border-[#4f8ef7] hover:text-white transition-all">Next Lesson →</button>
            </div>
          </div>
        </div>
        <div className="w-72 border-l border-white/[0.07] hidden lg:block overflow-y-auto">
          <div className="p-4 border-b border-white/[0.07]">
            <h2 className="font-sora font-bold text-sm">Course Content</h2>
            <div className="text-xs text-[#64748b] mt-0.5">34/50 lessons · 68% complete</div>
          </div>
          {['Intro & Overview ✓', 'Limits & Continuity ▶', 'Differentiation Basics', 'Applications of Derivatives', 'Integration Techniques'].map((l, i) => (
            <div key={i} className={`px-4 py-3 border-b border-white/[0.04] text-xs flex items-center gap-2 ${i === 1 ? 'bg-blue-500/[0.08] text-[#4f8ef7]' : 'text-[#64748b] hover:bg-white/[0.02]'} cursor-pointer`}>
              <span>{i < 1 ? '✅' : i === 1 ? '▶' : '○'}</span>{l}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── ProfilePage.jsx ────────────────────────────────────────────────────────────
import { useAuthStore } from '../store';

export function ProfilePage() {
  const { user } = useAuthStore();
  return (
    <div className="bg-[#0a0e1a] text-[#e8ecf5] min-h-screen font-nunito">
      <Navbar />
      <div className="max-w-3xl mx-auto px-4 pt-28 pb-16">
        <h1 className="font-sora font-bold text-2xl mb-8">My Profile</h1>
        <div className="bg-[#141c30] border border-white/10 rounded-2xl p-8">
          <div className="flex items-center gap-5 mb-8">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#4f8ef7] to-[#8b5cf6] flex items-center justify-center text-white text-2xl font-bold">
              {user?.name?.charAt(0).toUpperCase()}
            </div>
            <div>
              <h2 className="font-sora font-bold text-xl">{user?.name}</h2>
              <p className="text-[#64748b] text-sm">{user?.email}</p>
              <span className="inline-block mt-1 bg-blue-500/10 text-[#4f8ef7] text-xs font-semibold px-2.5 py-1 rounded-full border border-blue-500/20 capitalize">{user?.role}</span>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {[['Name', user?.name], ['Email', user?.email], ['Country', user?.country], ['Level', user?.level]].map(([l, v]) => (
              <div key={l}>
                <label className="text-xs text-[#475569] uppercase tracking-widest font-semibold mb-1.5 block">{l}</label>
                <div className="bg-[#0a0e1a] border border-white/10 rounded-lg px-4 py-3 text-sm text-white">{v || '—'}</div>
              </div>
            ))}
          </div>
          <button className="mt-6 bg-gradient-to-r from-[#4f8ef7] to-[#8b5cf6] text-white font-bold px-6 py-2.5 rounded-xl text-sm hover:-translate-y-0.5 transition-all">
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
}

// ── NotFoundPage.jsx ───────────────────────────────────────────────────────────
export function NotFoundPage() {
  return (
    <div className="bg-[#0a0e1a] text-[#e8ecf5] min-h-screen flex items-center justify-center font-nunito">
      <div className="text-center">
        <p className="text-8xl mb-4">404</p>
        <h1 className="font-sora font-bold text-3xl mb-3">Page Not Found</h1>
        <p className="text-[#64748b] mb-8">The page you're looking for doesn't exist.</p>
        <Link to="/" className="bg-gradient-to-r from-[#4f8ef7] to-[#8b5cf6] text-white font-bold px-8 py-3 rounded-xl inline-block">← Back to Home</Link>
      </div>
    </div>
  );
}
