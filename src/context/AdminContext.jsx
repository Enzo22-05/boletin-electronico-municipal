import { createContext, useContext, useState } from "react";
import { ADMIN_PASSWORD } from "../data";

const AdminContext = createContext(null);

export function AdminProvider({ children }) {
  const [isAdmin, setIsAdmin] = useState(false);

  const login = (password) => {
    if (password === ADMIN_PASSWORD) {
      setIsAdmin(true);
      return true;
    }
    return false;
  };

  const logout = () => setIsAdmin(false);

  return (
    <AdminContext.Provider value={{ isAdmin, login, logout }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  return useContext(AdminContext);
}
