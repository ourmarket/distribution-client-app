import { Main } from "../components/home/main/Main";
import Loading from "../components/loading/Loading";
import { Error } from "../components/error/Error";
import { useGetAllOrdersActiveQuery } from "../api/apiOrders";

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
