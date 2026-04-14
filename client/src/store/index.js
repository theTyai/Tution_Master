/**
 * Tution Master — Auth Store (Zustand)
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import axios from 'axios';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({ baseURL: API });

// Attach token to every request
api.interceptors.request.use(cfg => {
  const token = useAuthStore.getState().token;
  if (token) cfg.headers.Authorization = `Bearer ${token}`;
  return cfg;
});

export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isLoading: false,
      error: null,

      login: async (email, password) => {
        set({ isLoading: true, error: null });
        try {
          const { data } = await api.post('/auth/login', { email, password });
          set({ user: data.data, token: data.data.token, isLoading: false });
          return { success: true };
        } catch (err) {
          const msg = err.response?.data?.message || 'Login failed';
          set({ error: msg, isLoading: false });
          return { success: false, message: msg };
        }
      },

      register: async (formData) => {
        set({ isLoading: true, error: null });
        try {
          const { data } = await api.post('/auth/register', formData);
          set({ user: data.data, token: data.data.token, isLoading: false });
          return { success: true };
        } catch (err) {
          const msg = err.response?.data?.message || 'Registration failed';
          set({ error: msg, isLoading: false });
          return { success: false, message: msg };
        }
      },

      logout: () => set({ user: null, token: null }),

      fetchMe: async () => {
        try {
          const { data } = await api.get('/auth/me');
          set({ user: data.data });
        } catch {
          set({ user: null, token: null });
        }
      },

      updateProfile: async (updates) => {
        const { data } = await api.put('/auth/me', updates);
        set({ user: data.data });
        return data;
      },
    }),
    { name: 'tution-master-auth', partialize: (s) => ({ user: s.user, token: s.token }) }
  )
);

// ─── Course Store ──────────────────────────────────────────────────────────────
export const useCourseStore = create((set) => ({
  courses: [],
  featured: [],
  currentCourse: null,
  isLoading: false,

  fetchCourses: async (params = {}) => {
    set({ isLoading: true });
    const q = new URLSearchParams(params).toString();
    const { data } = await api.get(`/courses?${q}`);
    set({ courses: data.data, isLoading: false });
  },

  fetchFeatured: async () => {
    const { data } = await api.get('/courses/featured');
    set({ featured: data.data });
  },

  fetchCourse: async (id) => {
    set({ isLoading: true });
    const { data } = await api.get(`/courses/${id}`);
    set({ currentCourse: data.data, isLoading: false });
    return data.data;
  },

  enrollCourse: async (courseId) => {
    const { data } = await api.post('/enrollments', { courseId });
    return data;
  },
}));

// ─── Dashboard Store ───────────────────────────────────────────────────────────
export const useDashboardStore = create((set) => ({
  enrollments: [],
  upcomingClasses: [],
  isLoading: false,

  fetchDashboard: async () => {
    set({ isLoading: true });
    const [dashRes, liveRes] = await Promise.all([
      api.get('/users/dashboard'),
      api.get('/live'),
    ]);
    set({ enrollments: dashRes.data.data.enrollments, upcomingClasses: liveRes.data.data, isLoading: false });
  },

  markLessonComplete: async (enrollmentId, lessonId) => {
    const { data } = await api.put(`/enrollments/${enrollmentId}/lesson/${lessonId}`);
    return data;
  },
}));
