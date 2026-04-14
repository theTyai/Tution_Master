import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { Calendar, Check, X, Clock, User as UserIcon, Loader2, Star } from 'lucide-react';

interface Booking {
  _id: string;
  student: { name: string; email: string };
  subject: string;
  dateTime: string;
  status: 'pending' | 'accepted' | 'rejected' | 'completed' | 'cancelled';
}

const TutorDashboard = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    fetchBookings();
  }, [user]);

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

  const updateStatus = async (id: string, status: string) => {
    try {
      await axios.put(`http://localhost:5000/api/bookings/${id}`, { status }, {
        headers: { Authorization: `Bearer ${user?.token}` }
      });
      fetchBookings(); // Refresh list
    } catch (error) {
      alert('Failed to update status');
    }
  };

  return (
    <div className="pt-32 pb-20 px-4 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
        <div>
          <h1 className="text-4xl font-display font-bold text-dark mb-2">Tutor Dashboard</h1>
          <p className="text-gray-500">Welcome back, <span className="text-secondary font-bold">{user?.name}</span>. Manage your sessions and student requests.</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-4 gap-8">
        {/* Left Sidebar - Profile Summary */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm text-center">
            <div className="w-24 h-24 bg-secondary/10 text-secondary rounded-full flex items-center justify-center mx-auto mb-4 text-3xl font-bold">
              {user?.name.charAt(0)}
            </div>
            <h3 className="font-bold text-dark text-lg">{user?.name}</h3>
            <p className="text-gray-400 text-sm mb-6 capitalize">{user?.role} Account</p>
            <div className="flex justify-center gap-1 text-yellow-500 mb-6">
              <Star className="w-4 h-4 fill-current" />
              <Star className="w-4 h-4 fill-current" />
              <Star className="w-4 h-4 fill-current" />
              <Star className="w-4 h-4 fill-current" />
              <Star className="w-4 h-4 fill-current" />
            </div>
            <button className="w-full py-3 bg-gray-50 text-dark rounded-xl font-bold text-sm hover:bg-gray-100 transition-all">
              Edit Profile
            </button>
          </div>
        </div>

        {/* Main Content - Requests */}
        <div className="lg:col-span-3">
          <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm min-h-[500px]">
            <h3 className="text-xl font-bold text-dark mb-8 flex items-center gap-2">
              <Calendar className="text-secondary" /> Booking Requests
            </h3>

            {loading ? (
              <div className="flex justify-center py-20"><Loader2 className="w-8 h-8 text-secondary animate-spin" /></div>
            ) : bookings.length === 0 ? (
              <div className="text-center py-20 text-gray-400">
                <p>No tutoring requests at the moment.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {bookings.map((booking) => (
                  <div key={booking._id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-6 rounded-2xl border border-gray-50 hover:border-secondary/20 transition-all gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-secondary font-bold">
                        <UserIcon className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="font-bold text-dark">{booking.student.name}</h4>
                        <p className="text-xs text-gray-400">Subject: <span className="text-dark font-medium">{booking.subject}</span></p>
                      </div>
                    </div>

                    <div className="flex items-center gap-6">
                      <div className="text-sm text-gray-400 flex items-center gap-1">
                        <Clock className="w-4 h-4" /> {new Date(booking.dateTime).toLocaleDateString()}
                      </div>
                      
                      {booking.status === 'pending' ? (
                        <div className="flex items-center gap-2">
                          <button 
                            onClick={() => updateStatus(booking._id, 'rejected')}
                            className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-all"
                            title="Reject"
                          >
                            <X className="w-6 h-6" />
                          </button>
                          <button 
                            onClick={() => updateStatus(booking._id, 'accepted')}
                            className="p-2 text-green-500 hover:bg-green-50 rounded-full transition-all"
                            title="Accept"
                          >
                            <Check className="w-6 h-6" />
                          </button>
                        </div>
                      ) : (
                        <span className={`px-4 py-1.5 rounded-full text-xs font-bold border ${booking.status === 'accepted' ? 'bg-green-100 text-green-700 border-green-200' : 'bg-red-100 text-red-700 border-red-200'} uppercase tracking-wide`}>
                          {booking.status}
                        </span>
                      )}
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

export default TutorDashboard;
