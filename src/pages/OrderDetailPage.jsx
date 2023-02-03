import { useParams } from "react-router-dom";
import { useGetOrderQuery } from "../api/apiOrders";
import { Layout } from "../components/layout/Layout";
import Loading from "../components/loading/Loading";
import { OrderDetail} from "../components/pedido/OrderDetail";

export const OrderDetailPage = () => {
  const { id } = useParams();
  const {data, isLoading}= useGetOrderQuery(id)
  console.log(data)
  return (
    <Layout>
      {
        isLoading ? <Loading /> :  <OrderDetail  order = {data.data.order} id={id}/>
      } 
     
    </Layout>
  );
};
