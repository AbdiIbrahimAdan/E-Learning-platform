import { create } from 'zustand';
import axios from 'axios';

const useStore = create((set) => ({
  user: null,
  users: [],
  admins: [],
  instructors: [],
  loading: false,
  error: null,
  analytics: null,

  // Fetch all users
  fetchUsers: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get('/api/users');
      set({ users: response.data, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  fetchStats: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get('/api/analytics');
      set({ analytics: response.data, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
  
  // Fetch all Admins
  fetchAdmins: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get('/api/admins');
      set({ admins: response.data, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  // Fetch all Instructors
  fetchInstructors: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get('/api/instructors');
      set({ instructors: response.data, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  // Login user
  login: async (credentials) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.post('/api/auth/login', credentials);
      set({ user: response.data, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  // Logout user
  logout: () => {
    set({ user: null });
  },

  // Promote user to Admin
  promoteToAdmin: async (userId) => {
    set({ loading: true, error: null });
    try {
      await axios.put(`/api/users/${userId}/promote`);
      set((state) => ({
        users: state.users.map((user) =>
          user.id === userId ? { ...user, role: 'admin' } : user
        ),
        admins: [...state.admins, state.users.find((user) => user.id === userId)],
        loading: false,
      }));
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  // Assign Instructor Role
  assignInstructorRole: async (userId) => {
    set({ loading: true, error: null });
    try {
      await axios.put(`/api/users/${userId}/assign-instructor`);
      set((state) => ({
        users: state.users.map((user) =>
          user.id === userId ? { ...user, role: 'instructor' } : user
        ),
        instructors: [...state.instructors, state.users.find((user) => user.id === userId)],
        loading: false,
      }));
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  // Delete Admin (SuperAdmin only)
  deleteAdmin: async (adminId) => {
    set({ loading: true, error: null });
    try {
      await axios.delete(`/api/admins/${adminId}`);
      set((state) => ({
        admins: state.admins.filter((admin) => admin.id !== adminId),
        users: state.users.map((user) =>
          user.id === adminId ? { ...user, role: 'student' } : user
        ),
        loading: false,
      }));
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  // Fetch Dashboard Analytics (SuperAdmin only)
  fetchAnalytics: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get('/api/analytics');
      set({ analytics: response.data, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
}));

export default useStore;
