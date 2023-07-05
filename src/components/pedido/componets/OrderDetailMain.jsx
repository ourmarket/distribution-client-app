import React from "react";
import { DataClient } from "./DataClient";
import { DataOrder } from "./DataOrder";
import { DataPaid } from "./DataPaid";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { PdfViewOrder } from "../PdfViewOrder";
import { formatDateMonth } from "../../../utils/dateFormat";
import { useNavigate, useParams } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";

export const OrderDetailMain = ({ order, unpaidOrders, setMenu }) => {
  const navigate = useNavigate();
  const { id } = useParams();

  return (
    <>
      <h2 className="detail__title">
        <span onClick={() => navigate(-1)}>
          <IoMdArrowRoundBack />
        </span>
        Datos orden
      </h2>
      <DataClient order={order} unpaidOrders={unpaidOrders} />
      <DataOrder order={order} unpaidOrders={unpaidOrders} />
      {order.payment?.cash || order.payment?.transfer || order.payment?.debt ? (
        <DataPaid order={order} />
      ) : null}

      <button className="btn__estado " onClick={() => setMenu(true)}>
        Cambiar estado
      </button>
      <button
        className="btn__volver "
        onClick={() => navigate(`/home/ubicacion/${id}`)}
      >
        Ver Ruta
      </button>
      <PDFDownloadLink
        document={<PdfViewOrder order={order} unpaidOrders={unpaidOrders} />}
        fileName={`${order.shippingAddress.name}-${
          order.shippingAddress.lastName
        }-${formatDateMonth(order.createdAt)}.pdf`}
      >
        <button className="btn__volver">Descargar Factura</button>
      </PDFDownloadLink>
    </>
  );
};
