import { HashRouter, Routes, Route } from "react-router-dom";
import { HomePage } from "../pages/HomePage";
import { PedidoPage } from "../pages/PedidoPage";
import { TodosLosPedidos } from "../pages/TodosLosPedidos";

export const AppRouter = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/all" element={<TodosLosPedidos />} />
        <Route path="/order/:id" element={<PedidoPage />} />
      </Routes>
    </HashRouter>
  );
};
