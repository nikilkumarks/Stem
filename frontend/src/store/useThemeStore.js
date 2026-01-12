import { create } from 'zustand';

export const useThemeStore = create((set) => ({
    theme: localStorage.getItem('stem-theme') || 'forest', // default theme
    setTheme: (theme) => {
        localStorage.setItem('stem-theme', theme);
        set({ theme });
    },
}));