import type { Bookmark } from "@/types/bookmark";
import axiosInstance from "@/utils/axiosInstance";

const API_URL = "/bookmarks";

export type CreateBookmarkPayload = {
  title: string;
  link: string;
  description?: string;
};

// Get all bookmarks
export const getBookmarks = async () => {
  try {
    const { data } = await axiosInstance.get<Bookmark[]>(API_URL);
    return data;
  } catch (error) {
    console.error("Error fetching bookmarks", error);
    throw new Error("Error fetching bookmarks");
  }
};

// Add a new bookmark
export const addBookmark = async (bookmarkData: CreateBookmarkPayload) => {
  try {
    const { data } = await axiosInstance.post<Bookmark>(API_URL, bookmarkData);
    return data;
  } catch (error) {
    console.error("Error adding a bookmark", error);
    throw new Error("Error adding a bookmark");
  }
};

// Update a bookmark
export const updateBookmark = async (
  id: string,
  updatedData: Partial<CreateBookmarkPayload>
) => {
  try {
    const { data } = await axiosInstance.patch<Bookmark>(
      `${API_URL}/${id}`,
      updatedData
    );
    return data;
  } catch (error) {
    console.error("Error updating bookmark", error);
    throw new Error("Error updating bookmark");
  }
};

// Delete a bookmark
export const deleteBookmark = async (id: string) => {
  try {
    await axiosInstance.delete(`${API_URL}/${id}`);
  } catch (error) {
    console.error("Error deleting bookmark", error);
    throw new Error("Error deleting bookmark");
  }
};

// // Update a Todo
// export const updateTodo = async ({
//   id,
//   title,
//   isCompleted,
// }: {
//   id: string;
//   title: string;
//   isCompleted: boolean;
// }) => {
//   try {
//     const { data } = await axiosInstance.put<Todo>(`${API_URL}/${id}`, {
//       title,
//       isCompleted,
//     });
//     return data;
//   } catch (error) {
//     console.error("Error updating todo", error);
//     throw new Error("Error updating todo");
//   }
// };

// // Delete a Todo
// export const deleteTodo = async ({ id }: { id: string }) => {
//   try {
//     const { data } = await axiosInstance.delete(`${API_URL}/${id}`);
//     return data;
//   } catch (error) {
//     console.error("Error deleting todo", error);
//     throw new Error("Error deleting todo");
//   }
// };
