import { create } from 'zustand';
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Token handling interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

const useUserStore = create((set, get) => ({
  users: [],
  stats: { users: 0 },
  analytics: {
    totalUsers: 0,
    genderStats: [],
    countryStats: [],
    ageStats: [],
    
  },
  loading: false,
  error: null,
  lastFetch: null,
  cacheTimeout: 5 * 60 * 1000, // 5 minutes cache

  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),

  fetchAnalytics: async () => {
    try {
      const now = Date.now();
      const lastFetch = get().lastFetch;

      if (lastFetch && now - lastFetch < get().cacheTimeout) {
        console.log('Using cached analytics data');
        return;
      }

      set({ loading: true, error: null });

      const response = await api.get('/analytics/dashboard');
      if (!response.data) {
        throw new Error('No analytics data received from server');
      }

      const {
        totalUsers = 0,
        genderStats = [],
        countryStats = [],
        ageStats = [],
        
      } = response.data;

      set((state) => ({
        ...state,
        analytics: {
          totalUsers,
          genderStats,
          countryStats,
          ageStats,
         
        },
        loading: false,
        lastFetch: now,
        error: null,
      }));
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
      set({ error: errorMessage, loading: false });
      console.error('Analytics fetch error:', errorMessage);
    }
  },

  fetchUsers: async () => {
    try {
      set({ loading: true, error: null });
      const response = await api.get('/users');
      if (!response.data) {
        throw new Error('No data received from server');
      }

      set((state) => ({
        ...state,
        users: response.data,
        stats: { ...state.stats, users: response.data.length },
        loading: false,
        error: null,
      }));
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
      set({ error: errorMessage, loading: false });
      console.error('Users fetch error:', errorMessage);
    }
  },

  cleanup: () => {
    set({
      users: [],
      analytics: {
        totalUsers: 0,
        genderStats: [],
        countryStats: [],
        ageStats: [],
       
      },
      loading: false,
      error: null,
      lastFetch: null,
    });
  },
}));

export default useUserStore;
