import { createContext, useContext, useState, useEffect } from "react";

const OrdenanzasContext = createContext(null);

export function OrdenanzasProvider({ children }) {
  const [ordenanzas, setOrdenanzas] = useState(() => {
    try {
      const saved = localStorage.getItem("ordenanzas");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("ordenanzas", JSON.stringify(ordenanzas));
  }, [ordenanzas]);

  const addOrdenanza = (item) => {
    setOrdenanzas((prev) => [item, ...prev]);
  };

  const removeOrdenanza = (id) => {
    setOrdenanzas((prev) => prev.filter((o) => o.id !== id));
  };

  return (
    <OrdenanzasContext.Provider value={{ ordenanzas, addOrdenanza, removeOrdenanza }}>
      {children}
    </OrdenanzasContext.Provider>
  );
}

export function useOrdenanzas() {
  return useContext(OrdenanzasContext);
}
