import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useVenues = create(
  persist(
    (set, get) => ({
      error: null,
      setError: (error) => set({ error }),
      loading: false,
      setLoading: (value) => set({ loading: value }),
      transparentHeader: false,
      setTransparentHeader: (value) => set({ transparentHeader: value }),
      data: [],
      setData: (value) => set({ data: value }),
      url: "https://v2.api.noroff.dev/holidaze/venues/?limit=12&page=1",
      setUrl: (value) => set({ url: value }),
      venues: [],
      loggedIn: false,
      user: null,
      setUser: (value) => set({ user: value }),
      setLoggedIn: (value) => set({ loggedIn: value }),
      resetVenues: () => {
        set({
          venues: [],
          url: "https://v2.api.noroff.dev/holidaze/venues/?limit=12&page=1",
        });
      },
      getVenues: async (url) => {
        try {
          set({ loading: true });
          const res = await fetch(url);
          const data = await res.json();

          if (!res.ok) {
            set({
              error: {
                statusCode: res.statusText,
                status: res.status,
                message: data.errors ? data.errors[0].message : "Unknown error",
              },
            });
            console.log(get().error);
            set({ loading: false });
            return;
          }

          const currentVenues = get().venues;
          const newVenues = data.data.filter(
            (venue) => !currentVenues.some((v) => v.id === venue.id)
          );
          const updatedVenues = [...currentVenues, ...newVenues];

          set({
            url: data.meta.nextPage
              ? `https://v2.api.noroff.dev/holidaze/venues/?limit=12&page=${data.meta.nextPage}`
              : null,
            venues: updatedVenues,
            loading: false,
            error: null,
          });
        } catch (e) {
          set({
            error: {
              statusCode: e.message,
              status: e.status,
              message: e.message,
            },
            loading: false,
          });
        }
      },
      getMoreVenues: async () => {
        const { url } = get();
        if (url) {
          await get().getVenues(url);
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
