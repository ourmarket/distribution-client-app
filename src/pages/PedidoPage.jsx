import { Menu } from "../components/manu/Menu";
import { Navbar } from "../components/navbar/Navbar";
import { Pedido } from "../components/pedido/Pedido";

export const PedidoPage = () => {
  return (
    <div>
      <Navbar />
      <Pedido />
      <Menu />
    </div>
  );
};
