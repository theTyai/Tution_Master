import { Link } from 'react-router-dom';
export default function Footer() {
  return (
    <footer className="bg-[#0f1526] border-t border-white/[0.07] py-14 font-nunito">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-10 mb-10">
          <div>
            <div className="font-sora font-extrabold text-lg bg-gradient-to-r from-[#4f8ef7] to-[#8b5cf6] bg-clip-text text-transparent mb-3">Tution Master</div>
            <p className="text-[#64748b] text-sm leading-relaxed">Nepal's premier EdTech platform. Founded by Sumit Yadav, NIT Jamshedpur.</p>
            <div className="flex gap-2 mt-4">
              {['f','in','yt','tw'].map(s => (
                <button key={s} className="w-8 h-8 bg-[#141c30] border border-white/[0.07] rounded-lg flex items-center justify-center text-xs text-[#64748b] hover:border-[#4f8ef7] hover:text-[#4f8ef7] transition-all">{s}</button>
              ))}
            </div>
          </div>
          {[
            ['Platform', ['About Us','Courses','Tutors','Pricing','Blog']],
            ['For Tutors', ['Become a Tutor','Tutor Dashboard','Resources','Community']],
            ['Support', ['Help Center','Contact Us','Privacy Policy','Terms of Use']],
          ].map(([title, links]) => (
            <div key={title}>
              <h4 className="text-xs font-bold uppercase tracking-widest text-[#e8ecf5] mb-4">{title}</h4>
              {links.map(l => <Link key={l} to="#" className="block text-sm text-[#64748b] mb-2 hover:text-[#4f8ef7] transition-colors">{l}</Link>)}
            </div>
          ))}
        </div>
        <div className="border-t border-white/[0.07] pt-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-[#475569]">
          <span>© 2024 Tution Master · Founded by Sumit Yadav (NIT Jamshedpur) · Made with ❤️ for Nepal</span>
          <span>🇳🇵 Kathmandu, Nepal</span>
        </div>
      </div>
    </footer>
  );
}
