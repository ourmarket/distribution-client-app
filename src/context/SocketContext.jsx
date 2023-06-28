import { createContext } from "react";
import { useSocket } from "../hooks/useSockets";

export const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const { socket, online } = useSocket(
    `${process.env.REACT_APP_SOCKET_URL}/orders/delivery`
  );

  return (
    <SocketContext.Provider value={{ socket, online }}>
      {children}
    </SocketContext.Provider>
  );
};
