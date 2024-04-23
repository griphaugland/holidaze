import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useVenues = create(
  persist(
    (set) => ({
      error: false,
      setError: (value, message) => set({ error: value, message: message }),
      loading: true,
      setLoading: (value) => set({ loading: value }),
      transparentHeader: false,
      setTransparentHeader: (value) => set({ transparentHeader: value }),
      venues: [],
      getVenues: async (url) => {
        try {
          set({ loading: true });
          const res = await fetch(url);
          const data = await res.json();
          if (!res.ok) {
            console.log(res);
            set({
              error: { statusCode: res.statusText, status: res.status },
            });
          }
          set({ loading: false });
          set({ venues: data });
        } catch (e) {
          console.log(e);
          set({ error: { statusCode: e.statusCode, status: e.status } });
        }
      },
      favorites: [],
      addToFavorites: (venue) =>
        set((state) => ({ favorites: [...state.favorites, venue] })),
      removeFromFavorites: (venue) =>
        set((state) => ({
          favorites: state.favorites.filter((v) => v.id !== venue.id),
        })),
      clearFavorites: () => set({ favorites: [] }),
    }),
    {
      name: "favorites-storage",
      partialize: (state) => ({ favorites: state.favorites }),
    }
  )
);
