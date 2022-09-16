import { HashRouter, Routes, Route } from "react-router-dom";
import { HomePage } from "../pages/HomePage";
import { LoginPage } from "../pages/LoginPage";
import { PedidoPage } from "../pages/PedidoPage";
import { RegisterPage } from "../pages/RegisterPage";
import { TodosLosPedidos } from "../pages/TodosLosPedidos";

export const AppRouter = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/all" element={<TodosLosPedidos />} />
        <Route path="/order/:id" element={<PedidoPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </HashRouter>
  );
};
