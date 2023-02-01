import { HashRouter, Routes, Route } from "react-router-dom";
import { HomePage } from "../pages/HomePage";
import { LoginPage } from "../pages/LoginPage";
import { PedidoPage } from "../pages/PedidoPage";

import { TodosLosPedidos } from "../pages/TodosLosPedidos";
import { UserPage } from "../pages/UserPage";
import PersistLogin from "./PersitRouter";
import RequireAuth from "./RequiereAuth";

export const AppRouter = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/all" element={<TodosLosPedidos />} />
            <Route path="/order/:id" element={<PedidoPage />} />

            <Route path="/user" element={<UserPage />} />
          </Route>
        </Route>
      </Routes>
    </HashRouter>
  );
};
