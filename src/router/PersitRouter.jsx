/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import Loading from "../components/loading/Loading";
import useRefreshToken from "../hooks/useRefreshToken";


function PersistLogin() {
  const [isLoading, setIsLoading] = useState(true);
  const { token } = useSelector((state) => state.authDelivery);
  const refresh = useRefreshToken();

  useEffect(() => {
    let isMounted = true;

    const verifyRefreshToken = async () => {
      try {
        await refresh();
        console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>Refresh");
      } catch (err) {
        console.log(err);
      } finally {
        isMounted && setIsLoading(false);
      }
    };

    // persist added here AFTER tutorial video
    // Avoids unwanted call to verifyRefreshToken
    !token ? verifyRefreshToken() : setIsLoading(false);

    return () => (isMounted = false);
  }, []);

  useEffect(() => {
    console.log(`isLoading: ${isLoading}`);
    console.log(`aT: ${token}`);
  }, [isLoading]);

  return isLoading ? <Loading /> : <Outlet />;
}

export default PersistLogin;
