import "./debtOrderDetails.css";
import { useNavigate } from "react-router-dom";
import { DataOrder } from "../orderDetails/componets/orderMain/DataOrder";
import { DataPaid } from "../orderDetails/componets/orderMain/DataPaid";
import { IoMdArrowRoundBack } from "react-icons/io";

export const DebtOrderDetails = ({ order }) => {
  const navigate = useNavigate();
  return (
    <section className="debtOrderDetails__container">
      <h2>
        <span onClick={() => navigate(-1)}>
          <IoMdArrowRoundBack />
        </span>
        Orden impaga
      </h2>
      <DataOrder order={order} />
      {(order.payment?.cash ||
        order.payment?.transfer ||
        order.payment?.debt) && <DataPaid order={order} />}
    </section>
  );
};
