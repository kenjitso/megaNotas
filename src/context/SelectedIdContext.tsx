import { createContext, useContext, useState } from "react";

interface SelectedIdContextData {
  selectedId: string | null;
  setSelectedId: (id: string | null) => void;
}

const SelectedIdContext = createContext<SelectedIdContextData | undefined>(undefined);

export const useSelectedId = () => {
  const context = useContext(SelectedIdContext);
  if (!context) {
    throw new Error("useSelectedId sem contexto");
  }
  return context;
};

export const SelectedIdProvider = ({ children }: { children?: React.ReactNode }) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  return (
    <SelectedIdContext.Provider value={{ selectedId, setSelectedId }}>
      {children}
    </SelectedIdContext.Provider>
  );
};
