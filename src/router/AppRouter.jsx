import { HashRouter, Routes, Route } from "react-router-dom";
import { HomePage } from "../pages/HomePage";
import { LoginPage } from "../pages/LoginPage";
import { PedidoPage } from "../pages/PedidoPage";
import { RegisterPage } from "../pages/RegisterPage";
import { TodosLosPedidos } from "../pages/TodosLosPedidos";
import { PublicRoute } from "./PublicRoute";

export const AppRouter = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/all" element={<TodosLosPedidos />} />
        <Route path="/order/:id" element={<PedidoPage />} />

        <Route
          path="/login"
          element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          }
        />

        <Route
          path="/register"
          element={
            <PublicRoute>
              <RegisterPage />
            </PublicRoute>
          }
        />
      </Routes>
    </HashRouter>
  );
};
