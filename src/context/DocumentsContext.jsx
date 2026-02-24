import { createContext, useContext, useState, useEffect } from "react";

const DocumentsContext = createContext(null);

export function DocumentsProvider({ children }) {
  const [docs, setDocs] = useState(() => {
    try {
      const saved = localStorage.getItem("boletin_docs");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("boletin_docs", JSON.stringify(docs));
  }, [docs]);

  const addDoc = (item) => setDocs((prev) => [item, ...prev]);
  const removeDoc = (id) => setDocs((prev) => prev.filter((d) => d.id !== id));

  return (
    <DocumentsContext.Provider value={{ docs, addDoc, removeDoc }}>
      {children}
    </DocumentsContext.Provider>
  );
}

export function useDocs() {
  return useContext(DocumentsContext);
}
