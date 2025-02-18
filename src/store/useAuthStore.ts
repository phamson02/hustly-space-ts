import { create } from 'zustand';
import { AuthState } from '@/constants/interfaces';

interface AuthStoreState {
  redirectFrom: AuthState | null;
  setRedirectFrom: (state: AuthState | null) => void;
  clearRedirectFrom: () => void;
}

const useAuthStore = create<AuthStoreState>((set) => ({
  redirectFrom: null,
  setRedirectFrom: (state) => set({ redirectFrom: state }),
  clearRedirectFrom: () => set({ redirectFrom: null }),
}));

export default useAuthStore;
