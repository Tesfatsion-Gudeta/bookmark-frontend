import {
  addBookmark,
  deleteBookmark,
  getBookmarks,
  updateBookmark,
  type CreateBookmarkPayload,
} from "@/api/bookmarkApi";
import type { Bookmark } from "@/types/bookmark";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useBookmarks = () => {
  return useQuery({ queryKey: ["bookmarks"], queryFn: getBookmarks });
};

// Add bookmark Mutation with otimistic update for the ux
export const useAddBookmark = () => {
  const queryClient = useQueryClient();

  return useMutation<
    Bookmark,
    Error,
    CreateBookmarkPayload,
    { previousBookmarks?: Bookmark[] }
  >({
    mutationFn: addBookmark,
    onMutate: async (newBookmark) => {
      await queryClient.cancelQueries({ queryKey: ["bookmarks"] });

      const previousBookmarks = queryClient.getQueryData<Bookmark[]>([
        "bookmarks",
      ]);

      const optimisticBookmark: Bookmark = {
        id: Date.now(), // temporary ID for UI
        ...newBookmark,
        description: newBookmark.description ?? "",
        createdAt: new Date(),
      };

      queryClient.setQueryData<Bookmark[]>(["bookmarks"], (old = []) => [
        ...old,
        optimisticBookmark,
      ]);

      return { previousBookmarks };
    },
    onError: (error, _newBookmark, context) => {
      if (context?.previousBookmarks) {
        queryClient.setQueryData(["bookmarks"], context.previousBookmarks);
      }
      console.error("Error adding bookmark:", error);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["bookmarks"] });
    },
  });
};

// Update bookmark mutation
export const useUpdateBookmark = () => {
  const queryClient = useQueryClient();

  return useMutation<
    Bookmark,
    Error,
    { id: string; data: CreateBookmarkPayload }
  >({
    mutationFn: ({ id, data }) => updateBookmark(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookmarks"] });
    },
    onError: (error) => {
      console.error("Error updating bookmark:", error);
    },
  });
};

// Delete bookmark mutation
export const useDeleteBookmark = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, string, { previousBookmarks?: Bookmark[] }>({
    mutationFn: deleteBookmark,
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ["bookmarks"] });

      const previousBookmarks = queryClient.getQueryData<Bookmark[]>([
        "bookmarks",
      ]);

      queryClient.setQueryData<Bookmark[]>(["bookmarks"], (old = []) =>
        old.filter((bookmark) => bookmark.id !== Number(id))
      );

      return { previousBookmarks };
    },
    onError: (error, _id, context) => {
      if (context?.previousBookmarks) {
        queryClient.setQueryData(["bookmarks"], context.previousBookmarks);
      }
      console.error("Error deleting bookmark:", error);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["bookmarks"] });
    },
  });
};
