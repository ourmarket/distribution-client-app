import React from "react";
import { DataClient } from "./DataClient";
import { DataOrder } from "./DataOrder";
import { DataPaid } from "./DataPaid";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { PdfViewOrder } from "../PdfViewOrder";
import { formatDateMonth } from "../../../utils/dateFormat";
import { useNavigate } from "react-router-dom";

export const OrderDetailMain = ({order, unpaidOrders, setMenu}) => {
    const navigate = useNavigate();
    return (
    <>
      <DataClient order={order} unpaidOrders={unpaidOrders} />
      <DataOrder order={order} unpaidOrders={unpaidOrders} />
      {(order.payment?.cash ||
        order.payment?.transfer ||
        order.payment?.debt) ? <DataPaid order={order} /> : null}

      <button className="btn__estado " onClick={() => setMenu(true)}>
        Cambiar estado
      </button>
      <PDFDownloadLink
        document={<PdfViewOrder order={order} />}
        fileName={`${order.shippingAddress.name}-${
          order.shippingAddress.lastName
        }-${formatDateMonth(order.createdAt)}.pdf`}
      >
        <button className="btn__volver">Descargar Factura</button>
      </PDFDownloadLink>

      <button className="btn__volver" onClick={() => navigate("/")}>
        Volver
      </button>
    </>
  );
};
