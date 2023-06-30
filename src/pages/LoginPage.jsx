import { useEffect } from "react";
import { Login } from "../components/auth/Login";
import { useDispatch } from "react-redux";
import { clearUser } from "../redux/userSlice";

export const LoginPage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(clearUser());
  }, [dispatch]);

  return (
    <>
      <Login />
    </>
  );
};
