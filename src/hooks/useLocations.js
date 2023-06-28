/* eslint-disable react-hooks/exhaustive-deps */
import { useContext } from "react";
import { useEffect, useState } from "react";
import { SocketContext } from "../context/SocketContext";
import { useSelector } from "react-redux";

export const useLocations = () => {
  const { socket } = useContext(SocketContext);

  const { deliveryTruck } = useSelector((store) => store.user);

  const [data, setData] = useState({
    truckId: deliveryTruck?.truckId,
    deliveryName: `${deliveryTruck?.user.name}  ${deliveryTruck?.user.lastName}`,
    lat: -34.570428718491605,
    lng: -58.743382510475065,
    update: new Date(),
  });

  useEffect(() => {
    function success(position) {
      setData({
        ...data,
        lat: position?.coords?.latitude || -34.570428718491605,
        lng: position?.coords?.longitude || -58.743382510475065,
        update: new Date(),
      });
    }
    function error(error) {
      console.log(`ERROR(${error.code}): ${error.message}`);
    }

    const options = {
      enableHighAccuracy: true,
      maximumAge: 30000,
      timeout: 27000,
    };

    navigator.geolocation.watchPosition(success, error, options);
  }, []);

  useEffect(() => {
    socket.emit("position", data);
  }, [data]);

  return {
    data,
  };
};
