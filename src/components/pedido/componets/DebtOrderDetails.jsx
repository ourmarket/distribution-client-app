import { useNavigate } from "react-router-dom";
import { DataOrder } from "./DataOrder";
import { DataPaid } from "./DataPaid";

export const DebtOrderDetails = ({ order }) => {
  const navigate = useNavigate();
  return (
    <section className="pedido__container" style={{ marginBottom: "50px" }}>
      <DataOrder order={order} />
      {(order.payment?.cash ||
        order.payment?.transfer ||
        order.payment?.debt) && <DataPaid order={order} />}
      <button className="btn__volver" onClick={() => navigate(-1)}>
        Volver
      </button>
    </section>
  );
};
