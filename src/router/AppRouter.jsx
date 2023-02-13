import { HashRouter, Routes, Route } from "react-router-dom";
import { HomePage } from "../pages/HomePage";
import { ListProductsPage } from "../pages/ListProductsPage";
import { LoginPage } from "../pages/LoginPage";
import { OrderDetailPage } from "../pages/OrderDetailPage";
import { OrderStatusPage } from "../pages/OrderStatusPage";
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
            <Route path="/ordenes/:status" element={<OrderStatusPage />} />
            <Route path="/order/:id" element={<OrderDetailPage />} />
            <Route path="/productos" element={<ListProductsPage />} />

            <Route path="/user" element={<UserPage />} />
          </Route>
        </Route>
      </Routes>
    </HashRouter>
  );
};
