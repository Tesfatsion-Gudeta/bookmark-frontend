import { addBookmark, getBookmarks } from "@/api/bookmarkApi";
import type { Bookmark } from "@/types/bookmark";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useBookmarks = () => {
  return useQuery({ queryKey: ["bookmarks"], queryFn: getBookmarks });
};

// Add bookmark Mutation
export const useAddBookmark = () => {
  const queryClient = useQueryClient();

  return useMutation<
    Bookmark[],
    Error,
    { title: string; link: string; description: string }
  >({
    mutationFn: addBookmark,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookmarks"] });
    },
    onError: (error) => {
      console.error("Error adding bookmarks:", error);
    },
  });
};
