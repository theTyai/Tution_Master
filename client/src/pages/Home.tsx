import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle, Calculator, FlaskConical, Laptop, BookOpen, Briefcase, GraduationCap, Atom, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  return (
    <div className="overflow-x-hidden">
      {/* Hero Section */}
      <header className="pt-32 pb-20 lg:pt-48 lg:pb-32 bg-[radial-gradient(circle_at_top_right,rgba(79,70,229,0.1),transparent),radial-gradient(circle_at_bottom_left,rgba(37,99,235,0.05),transparent)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            <motion.div 
              className="flex-1 text-center lg:text-left"
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 text-primary text-sm font-semibold mb-6">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                Nepal's #1 Tutoring Platform
              </div>
              <h1 className="text-5xl lg:text-7xl font-display font-extrabold text-dark leading-tight mb-6">
                Master Your Learning with the <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">Right Tutor</span>
              </h1>
              <p className="text-lg lg:text-xl text-gray-600 mb-10 max-w-2xl mx-auto lg:mx-0">
                Bridging the gap between students and top-tier educators across Nepal. Personalized learning designed for your success.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link to="/tutors" className="btn-shine px-8 py-4 bg-primary text-white rounded-2xl font-bold shadow-xl hover:shadow-primary/30 transition-all flex items-center justify-center gap-2">
                  Find a Tutor <ArrowRight className="w-5 h-5" />
                </Link>
                <Link to="/register-tutor" className="px-8 py-4 bg-white text-dark border-2 border-gray-200 rounded-2xl font-bold hover:border-primary transition-all flex items-center justify-center gap-2">
                  Become a Tutor
                </Link>
              </div>
              
              <div className="mt-12 flex flex-wrap justify-center lg:justify-start gap-8 border-t border-gray-100 pt-8">
                <div>
                  <div className="text-3xl font-display font-bold text-dark">5k+</div>
                  <div className="text-sm text-gray-500">Active Students</div>
                </div>
                <div className="w-px h-10 bg-gray-200 hidden sm:block"></div>
                <div>
                  <div className="text-3xl font-display font-bold text-dark">500+</div>
                  <div className="text-sm text-gray-500">Expert Tutors</div>
                </div>
                <div className="w-px h-10 bg-gray-200 hidden sm:block"></div>
                <div>
                  <div className="text-3xl font-display font-bold text-dark">50+</div>
                  <div className="text-sm text-gray-500">Subjects</div>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              className="flex-1 relative"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-secondary/10 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-10 -right-10 w-60 h-60 bg-primary/10 rounded-full blur-3xl"></div>
              <img src="/assets/hero.png" alt="Learning" className="relative z-10 w-full animate-float drop-shadow-2xl" />
            </motion.div>
          </div>
        </div>
      </header>

      {/* About Section */}
      <section id="about" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div 
            className="max-w-3xl mx-auto mb-16"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-indigo-600 font-bold uppercase tracking-wider mb-2">Our Mission</h2>
            <h3 className="text-4xl lg:text-5xl font-display font-bold text-dark mb-6">Transforming Education in Nepal</h3>
            <p className="text-xl text-gray-600 italic">"We believe every student in Nepal deserves access to quality education, regardless of their location."</p>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-12 items-center text-left">
            <motion.div 
              initial={{ x: -30, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
            >
              <p className="text-lg text-gray-600 leading-relaxed mb-6">Tuition Master is an innovative EdTech platform dedicated to connecting students with expert tutors across Nepal. Founded with the vision of making learning accessible and effective, we provide a smart marketplace where education meets technology.</p>
              <p className="text-lg text-gray-600 leading-relaxed">Our platform is designed to cater to the unique needs of Nepal's education system, offering both online and offline learning solutions that fit every budget and schedule.</p>
            </motion.div>
            <motion.div 
              className="bg-indigo-50 p-8 rounded-3xl border border-indigo-100"
              initial={{ x: 30, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
            >
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center text-white shrink-0">
                  <CheckCircle className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-dark mb-2">Founded by a Visionary</h4>
                  <p className="text-gray-600">Founded by <strong>Sumit Yadav</strong>, a graduate of <strong>NIT Jamshedpur</strong>, who aims to revolutionize the local tutoring ecosystem.</p>
                </div>
              </div>
              <div className="flex items-center gap-4 py-4 px-6 bg-white rounded-2xl shadow-sm border border-indigo-50">
                <GraduationCap className="text-primary w-5 h-5" />
                <span className="text-dark font-medium uppercase text-sm tracking-wide">NITian-Led Innovation</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Subjects Section */}
      <section id="subjects" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16">
            <div className="max-w-xl">
              <h2 className="text-primary font-bold uppercase tracking-widest mb-4">Categories</h2>
              <h3 className="text-4xl font-display font-bold text-dark mb-4">Wide Range of Subjects</h3>
              <p className="text-gray-600">From elementary school to advanced entrance exam preparation, we cover everything.</p>
            </div>
          </div>
          
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              { icon: <Calculator />, name: "Mathematics" },
              { icon: <FlaskConical />, name: "Science" },
              { icon: <Laptop />, name: "Computer Science" },
              { icon: <BookOpen />, name: "English" },
              { icon: <Briefcase />, name: "Management" },
              { icon: <GraduationCap />, name: "IOE/IOM Prep" },
              { icon: <Atom />, name: "Physics" },
              { icon: <Globe />, name: "Language" }
            ].map((subject, idx) => (
              <motion.div 
                key={idx}
                variants={itemVariants}
                className="group p-6 bg-white rounded-2xl border border-transparent hover:border-primary/20 hover:bg-indigo-50 transition-all text-center cursor-pointer shadow-sm hover:shadow-xl"
              >
                <div className="text-primary mb-4 flex justify-center">
                  {React.cloneElement(subject.icon as React.ReactElement, { size: 40 })}
                </div>
                <h4 className="font-bold text-dark group-hover:text-primary transition-colors">{subject.name}</h4>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
