import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import apiService from "@/services/api.service";
import { IBrand } from "@/types/brand";

interface CollabsContextProps {
  brands: IBrand[];
  totalBrands: string;
  isLoading: boolean;
}

const CollabsContext = createContext<CollabsContextProps | undefined>(
  undefined,
);

export const CollabsProvider = ({ children }: { children: ReactNode }) => {
  const [brands, setBrands] = useState<IBrand[]>([]);
  const [totalBrands, setTotalBrands] = useState<string>("0");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCollabs = async () => {
      try {
        const data = await apiService.GET("collabs");
        console.log("Collabs data:", data);
        setBrands(data.brands);
        setTotalBrands(data.totalBrands);
        const root = document.documentElement;
        root.style.setProperty("--count-brands", data.brands.length.toString());
      } catch (error) {
        console.error("Error fetching collabs:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCollabs();
  }, []);

  return (
    <CollabsContext.Provider value={{ brands, totalBrands, isLoading }}>
      {children}
    </CollabsContext.Provider>
  );
};

export const useCollabs = () => {
  const context = useContext(CollabsContext);
  if (!context) {
    throw new Error("useCollabs must be used within a CollabsProvider");
  }
  return context;
};
