import { create } from "zustand";
import { persist } from "zustand/middleware";

const getItemFromLocalStorage = (key) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch (error) {
    console.error(`Error parsing JSON from localStorage key "${key}":`, error);
    return null;
  }
};
export const useGeneral = create(
  persist(
    (set, get) => ({
      error: null,
      setError: (error) => set({ error }),
      loading: false,
      setLoading: (value) => set({ loading: value }),
      transparentHeader: false,
      setTransparentHeader: (value) => set({ transparentHeader: value }),
      isLoggedIn: !!getItemFromLocalStorage("storage")?.user,
      login: () => set({ isLoggedIn: true }),
      logout: () => {
        set({ isLoggedIn: false, user: null, apiKey: null });
        localStorage.removeItem("storage");
      },
      user: getItemFromLocalStorage("storage")?.user || null,
      setUser: (value) => set({ user: value }),
      apiKey: getItemFromLocalStorage("storage")?.apiKey || null,
      setApiKey: (value) => set({ apiKey: value }),
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
      name: "storage",
      partialize: (state) => ({
        favorites: state.favorites,
        user: state.user,
        apiKey: state.apiKey,
        isLoggedIn: state.isLoggedIn,
      }),
    }
  )
);

export const useVenues = create(
  persist(
    (set, get) => ({
      error: null,
      setError: (error) => set({ error }),
      loading: false,
      setLoading: (value) => set({ loading: value }),
      data: [],
      setData: (value) => set({ data: value }),
      url: "https://v2.api.noroff.dev/holidaze/venues/?limit=12&page=1",
      setUrl: (value) => set({ url: value }),
      venues: [],
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
          console.error("Error fetching venues:", e);
        }
      },
      getMoreVenues: async () => {
        const { url } = get();
        if (url) {
          await get().getVenues(url);
        }
      },
    }),
    {
      name: "venue-storage",
      partialize: (state) => ({
        venues: state.venues,
        error: state.error,
        loading: state.loading,
      }),
    }
  )
);

export const useProfiles = create(
  persist(
    (set) => ({
      error: null,
      setError: (error) => set({ error }),
      loading: false,
      setLoading: (value) => set({ loading: value }),
      profile: null,
      setProfile: (profile) => set({ profile }),
      fetchProfile: async (username, accessToken, apiKey) => {
        set({ loading: true });
        try {
          const res = await fetch(
            `https://v2.api.noroff.dev/holidaze/profiles/${username}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
                "X-Noroff-API-Key": apiKey.data.key,
              },
            }
          );
          const data = await res.json();
          if (!res.ok) {
            set({
              error: {
                statusCode: res.statusText,
                status: res.status,
                message: data.errors ? data.errors[0].message : "Unknown error",
              },
            });
          } else {
            set({ profile: data.data, error: null });
          }
        } catch (e) {
          set({
            error: {
              statusCode: e.message,
              status: e.status,
              message: e.message,
            },
          });
        } finally {
          set({ loading: false });
        }
      },
    }),
    {
      name: "profile-storage",
      partialize: (state) => ({
        profile: state.profile,
        error: state.error,
        loading: state.loading,
      }),
    }
  )
);

export const useErrors = create(
  persist(
    (set) => ({
      error: null,
      setError: (error) => set({ error }),
    }),
    {
      name: "error-storage",
      partialize: (state) => ({
        error: state.error,
        loading: state.loading,
      }),
    }
  )
);
