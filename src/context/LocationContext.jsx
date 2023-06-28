import { createContext } from "react";

import { useLocations } from "../hooks/useLocations";

export const LocationContext = createContext();

export const LocationProvider = ({ children }) => {
  const { data } = useLocations();

  return (
    <LocationContext.Provider value={{ data }}>
      {children}
    </LocationContext.Provider>
  );
};
