import React from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, Facebook, Instagram, Twitter, Linkedin, MapPin, Phone, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-dark pt-24 pb-12 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div>
            <Link to="/" className="flex items-center gap-2 mb-8">
              <div className="w-8 h-8 bg-gradient-to-tr from-primary to-secondary rounded flex items-center justify-center text-white">
                <GraduationCap className="w-5 h-5" />
              </div>
              <span className="text-xl font-display font-bold text-white">Tuition Master</span>
            </Link>
            <p className="mb-8 text-gray-400">Nepal's leading EdTech platform connecting students with professional tutors for personalized education.</p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-white transition-colors"><Facebook className="w-6 h-6" /></a>
              <a href="#" className="hover:text-white transition-colors"><Instagram className="w-6 h-6" /></a>
              <a href="#" className="hover:text-white transition-colors"><Twitter className="w-6 h-6" /></a>
              <a href="#" className="hover:text-white transition-colors"><Linkedin className="w-6 h-6" /></a>
            </div>
          </div>
          
          <div>
            <h5 className="text-white font-bold mb-8 text-lg">Quick Links</h5>
            <ul className="space-y-4 font-medium">
              <li><a href="#about" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#features" className="hover:text-white transition-colors">Our Features</a></li>
              <li><a href="#subjects" className="hover:text-white transition-colors">Subjects</a></li>
              <li><Link to="/register-tutor" className="hover:text-white transition-colors">Become a Tutor</Link></li>
            </ul>
          </div>
          
          <div>
            <h5 className="text-white font-bold mb-8 text-lg">Support</h5>
            <ul className="space-y-4 font-medium">
              <li><Link to="/tutors" className="hover:text-white transition-colors">Find a Tutor</Link></li>
              <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
            </ul>
          </div>
          
          <div>
            <h5 className="text-white font-bold mb-8 text-lg">Contact Us</h5>
            <ul className="space-y-4">
              <li className="flex items-start gap-4">
                <MapPin className="w-5 h-5 mt-1 text-primary" />
                <span>Kathmandu, Nepal</span>
              </li>
              <li className="flex items-start gap-4">
                <Phone className="w-5 h-5 mt-1 text-primary" />
                <span>+977-1234567890</span>
              </li>
              <li className="flex items-start gap-4">
                <Mail className="w-5 h-5 mt-1 text-primary" />
                <span>contact@tuitionmaster.com.np</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-12 text-center text-sm text-gray-500">
          <p>&copy; 2026 Tuition Master by Sumit Yadav. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
