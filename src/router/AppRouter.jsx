import { HashRouter, Routes, Route } from "react-router-dom";
import { HomePage } from "../pages/HomePage";
import { ListProductsPage } from "../pages/ListProductsPage";
import { LoginPage } from "../pages/LoginPage";
import { OrderDetailPage } from "../pages/OrderDetailPage";
import { OrderStatusPage } from "../pages/OrderStatusPage";
import { UserPage } from "../pages/UserPage";
import PersistLogin from "./PersitRouter";
import RequireAuth from "./RequiereAuth";
import { OrderDetailUnpaidPage } from "../pages/OrderDetailUnpaidPage";
import { MapPage } from "../pages/MapPage";
import { LocalizationPage } from "../pages/LocalizationPage";
import { HistoryPage } from "../pages/HistoryPage";

export const AppRouter = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/home/ordenes/:status" element={<OrderStatusPage />} />
            <Route path="/home/order/:id" element={<OrderDetailPage />} />
            <Route
              path="/home/orderUnpaid/:id"
              element={<OrderDetailUnpaidPage />}
            />
            <Route path="/productos" element={<ListProductsPage />} />

            <Route path="/user" element={<UserPage />} />
            <Route path="/mapa" element={<MapPage />} />
            <Route path="/historial" element={<HistoryPage />} />
            <Route path="/home/ubicacion/:id" element={<LocalizationPage />} />
          </Route>
        </Route>
      </Routes>
    </HashRouter>
  );
};
