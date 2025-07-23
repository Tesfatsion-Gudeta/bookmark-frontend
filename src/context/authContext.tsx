import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import type { User } from "../types/user";
import {
  getProfile,
  updateUser as updateUserApi,
  type UpdateUserDto,
} from "../api/authApi";

interface AuthContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  loading: boolean;
  logout: () => void;
  updateUser: (userData: UpdateUserDto) => Promise<User>;
}

const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const data = await getProfile();
        // Prevent unnecessary state update and rerender
        setUser((prevUser) => {
          if (!prevUser || prevUser.id !== data.id) {
            return data;
          }
          return prevUser; // No update → no rerender
        });
      } catch (err) {
        console.error("Failed to fetch profile", err);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []); // ✅ only on mount

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  const updateUser = async (userData: UpdateUserDto): Promise<User> => {
    try {
      const updatedUser = await updateUserApi(userData);
      setUser(updatedUser);
      return updatedUser;
    } catch (error) {
      console.error("Failed to update user:", error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, setUser, loading, logout, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
