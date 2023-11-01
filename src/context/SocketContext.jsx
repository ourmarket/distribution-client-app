import { createContext, useEffect } from "react";
import { useSocket } from "../hooks/useSockets";
import { useSelector } from "react-redux";

export const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const { socket, connectSocket, disconnectSocket } = useSocket(
    `${process.env.REACT_APP_SOCKET_URL}/orders/delivery`
  );
  const { token } = useSelector((store) => store.authDelivery);

  useEffect(() => {
    if (token) {
      connectSocket();
    }
  }, [token, connectSocket]);

  useEffect(() => {
    if (!token) {
      disconnectSocket();
    }
  }, [token, disconnectSocket]);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};
