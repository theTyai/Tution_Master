import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Search, Filter, Star, Clock, MapPin, Loader2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Tutor {
  _id: string;
  name: string;
  expertise: string[];
  bio: string;
  hourlyRate: number;
  rating: number;
}

const Tutors = () => {
  const [tutors, setTutors] = useState<Tutor[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchTutors = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/api/tutors');
        setTutors(data);
      } catch (error) {
        console.error('Error fetching tutors:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchTutors();
  }, []);

  const filteredTutors = tutors.filter(t => 
    t.name.toLowerCase().includes(search.toLowerCase()) || 
    t.expertise.some(e => e.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="pt-32 pb-20 px-4 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6 text-center md:text-left">
        <div>
          <h1 className="text-4xl font-display font-bold text-dark mb-2">Find Your Expert Tutor</h1>
          <p className="text-gray-500">Discover and book the best educators in Nepal</p>
        </div>
        
        <div className="relative w-full md:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input 
            type="text" 
            placeholder="Search by name or subject..."
            className="w-full pl-12 pr-4 py-4 bg-white border border-gray-200 rounded-2xl focus:border-primary outline-none shadow-sm transition-all"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="w-10 h-10 text-primary animate-spin" />
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTutors.map((tutor) => (
            <div key={tutor._id} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm card-hover">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center text-2xl font-bold text-primary">
                  {tutor.name.charAt(0)}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-dark">{tutor.name}</h3>
                  <div className="flex items-center gap-1 text-yellow-500 text-sm">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="font-bold">{tutor.rating || 'New'}</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                {tutor.expertise.map((skill, index) => (
                  <span key={index} className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-lg text-xs font-bold">
                    {skill}
                  </span>
                ))}
              </div>

              <p className="text-gray-600 text-sm line-clamp-2 mb-6">{tutor.bio || 'Professional tutor dedicated to student success.'}</p>

              <div className="flex items-center justify-between border-t border-gray-50 pt-6">
                <div>
                  <div className="text-sm text-gray-400">Hourly Rate</div>
                  <div className="text-xl font-display font-bold text-dark">Rs. {tutor.hourlyRate || '500'}</div>
                </div>
                <Link to={`/tutors/${tutor._id}`} className="px-6 py-3 bg-primary text-white rounded-xl font-bold flex items-center gap-2 hover:bg-opacity-90 transition-all">
                  Book Now <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {!loading && filteredTutors.length === 0 && (
        <div className="text-center py-20 bg-gray-50 rounded-[3rem] border border-dashed border-gray-200">
          <div className="text-5xl mb-4">🔍</div>
          <h3 className="text-2xl font-bold text-dark mb-2">No tutors found</h3>
          <p className="text-gray-500">Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  );
};

export default Tutors;
