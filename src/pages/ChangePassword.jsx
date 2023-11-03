import { useParams } from "react-router-dom";
import { ChangePassword } from "../components/user/ChangePassword";

export const ChangePasswordPage = () => {
  const { id } = useParams();
  return (
    <div>
      <ChangePassword id={id} />
    </div>
  );
};
