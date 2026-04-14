import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { Calendar, Clock, CheckCircle2, XCircle, AlertCircle, Loader2 } from 'lucide-react';

interface Booking {
  _id: string;
  tutor: { name: string; expertise: string[] };
  subject: string;
  dateTime: string;
  status: 'pending' | 'accepted' | 'rejected' | 'completed' | 'cancelled';
}

const StudentDashboard = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/api/bookings/mybookings', {
          headers: { Authorization: `Bearer ${user?.token}` }
        });
        setBookings(data);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, [user]);

  const getStatusStyle = (status: Booking['status']) => {
    switch (status) {
      case 'accepted': return 'bg-green-100 text-green-700 border-green-200';
      case 'rejected': return 'bg-red-100 text-red-700 border-red-200';
      case 'pending': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="pt-32 pb-20 px-4 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
        <div>
          <h1 className="text-4xl font-display font-bold text-dark mb-2">Student Dashboard</h1>
          <p className="text-gray-500">Welcome back, <span className="text-primary font-bold">{user?.name}</span>. Track your learning sessions.</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Stats */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm">
            <h3 className="text-xl font-bold text-dark mb-6">Learning Overview</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-indigo-50 rounded-2xl">
                <div className="text-2xl font-bold text-primary">{bookings.filter(b => b.status === 'accepted').length}</div>
                <div className="text-xs font-bold text-indigo-400 uppercase tracking-wider">Active Classes</div>
              </div>
              <div className="p-4 bg-slate-50 rounded-2xl">
                <div className="text-2xl font-bold text-slate-600">{bookings.length}</div>
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Bookings</div>
              </div>
            </div>
          </div>
        </div>

        {/* Sessions List */}
        <div className="lg:col-span-2">
          <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm min-h-[400px]">
            <h3 className="text-xl font-bold text-dark mb-8 flex items-center gap-2">
              <Calendar className="text-primary" /> Your Sessions
            </h3>

            {loading ? (
              <div className="flex justify-center py-20"><Loader2 className="w-8 h-8 text-primary animate-spin" /></div>
            ) : bookings.length === 0 ? (
              <div className="text-center py-20 text-gray-400">
                <AlertCircle className="w-12 h-12 mx-auto mb-4 opacity-20" />
                <p>No tutoring sessions booked yet.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {bookings.map((booking) => (
                  <div key={booking._id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-6 rounded-2xl border border-gray-50 hover:border-indigo-100 transition-all gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center text-primary font-bold">
                        {booking.tutor.name.charAt(0)}
                      </div>
                      <div>
                        <h4 className="font-bold text-dark">{booking.tutor.name}</h4>
                        <p className="text-xs text-gray-400">{booking.subject}</p>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-4">
                      <div className="text-sm text-gray-500 flex items-center gap-1">
                        <Clock className="w-4 h-4" /> {new Date(booking.dateTime).toLocaleDateString()}
                      </div>
                      <span className={`px-4 py-1.5 rounded-full text-xs font-bold border ${getStatusStyle(booking.status)} uppercase tracking-wide`}>
                        {booking.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
