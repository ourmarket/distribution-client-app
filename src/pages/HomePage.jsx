import Loading from "../components/loading/Loading";
import { Error } from "../components/error/Error";
import { useGetAllOrdersActiveQuery } from "../api/apiOrders";
import { Main } from "../components/orders/01-home/Main";

export const HomePage = () => {
  const { data, isLoading, isError } = useGetAllOrdersActiveQuery();
  if (isLoading) {
    return <Loading />;
  }
  if (isError) {
    return <Error />;
  }

  return <Main data={data} />;
};
