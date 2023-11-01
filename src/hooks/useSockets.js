/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useState } from "react";
import { useSelector } from "react-redux";
import io from "socket.io-client";

export const useSocket = (serverPath) => {
  const [socket, setSocket] = useState(null);
  const { token } = useSelector((store) => store.authDelivery);

  const connectSocket = useCallback(() => {
    console.log("---------Token connectSocket", token);
    const socketTemp = io.connect(serverPath, {
      transports: ["websocket"],
      autoConnect: true,
      forceNew: true,
      query: {
        "x-token": token,
      },
    });
    setSocket(socketTemp);
  }, [serverPath, token]);

  const disconnectSocket = useCallback(() => {
    socket?.disconnect();
  }, [socket]);

  return {
    socket,
    connectSocket,
    disconnectSocket,
  };
};
