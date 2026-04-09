import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface BookmarkState {
  bookmarks: string[]; // array of portfolio IDs
  toggleBookmark: (id: string) => void;
  isBookmarked: (id: string) => boolean;
}

export const useBookmarkStore = create<BookmarkState>()(
  persist(
    (set, get) => ({
      bookmarks: [],
      toggleBookmark: (id: string) => {
        const currentBookmarks = get().bookmarks;
        if (currentBookmarks.includes(id)) {
          set({ bookmarks: currentBookmarks.filter((bId) => bId !== id) });
        } else {
          set({ bookmarks: [...currentBookmarks, id] });
        }
      },
      isBookmarked: (id: string) => get().bookmarks.includes(id),
    }),
    {
      name: 'portfolio-bookmarks',
    }
  )
);
