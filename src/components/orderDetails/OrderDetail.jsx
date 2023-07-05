import { useState } from "react";
import "./orderDetail.css";
import { useGetClientOrderDebtQuery } from "../../api/apiOrders";
import Loading from "../loading/Loading";
import { OrderMenu } from "./componets/orderMenu/OrderMenu";
import { OrderMain } from "./componets/orderMain/OrderMain";

export const OrderDetail = ({ order, id }) => {
  const [menu, setMenu] = useState(false);

  const { data: ordersDebt, isLoading: l2 } = useGetClientOrderDebtQuery(
    order.client
  );

  if (l2) {
    return <Loading />;
  }

  const unpaidOrders = ordersDebt?.data?.orders;

  return (
    <section className="pedido__container" style={{ marginBottom: "50px" }}>
      {menu && <OrderMenu order={order} id={id} setMenu={setMenu} />}
      {!menu && (
        <OrderMain
          order={order}
          unpaidOrders={unpaidOrders}
          setMenu={setMenu}
        />
      )}
    </section>
  );
};
