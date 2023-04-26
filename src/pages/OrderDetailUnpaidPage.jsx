import { useParams } from "react-router-dom";
import { useGetOrderQuery } from "../api/apiOrders";
import { Layout } from "../components/layout/Layout";
import Loading from "../components/loading/Loading";
import { DebtOrderDetails } from "../components/pedido/componets/DebtOrderDetails";

export const OrderDetailUnpaidPage = () => {
  const { id } = useParams();
  const { data: orderData, isLoading: l1 } = useGetOrderQuery(id);

  return (
    <Layout>
      {l1 ? <Loading /> : <DebtOrderDetails order={orderData.data.order} />}
    </Layout>
  );
};
