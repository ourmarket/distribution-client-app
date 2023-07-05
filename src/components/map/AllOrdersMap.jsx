/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import React, { useMemo } from "react";
import { GoogleMap, InfoWindow, Marker, Polygon } from "@react-google-maps/api";
import { formatPrice } from "../../utils/formatPrice";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";
import { optionZones, zones } from "../../data/Zones";

function ClientMarker({ data }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(!open);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const divStyle = {
    background: `white`,
    border: `1px solid #ccc`,
    padding: 15,
    textAlign: "center",
  };
  return (
    <Marker
      position={{
        lat: data.shippingAddress.lat,
        lng: data.shippingAddress.lng,
      }}
      onClick={handleOpen}
      icon={
        data.status === "Entregado"
          ? "https://ik.imagekit.io/mrprwema7/geo-icon-16__2__FMgqGb84R.png?updatedAt=1686144731319"
          : null
      }
    >
      {open && (
        <InfoWindow
          position={{
            lat: data.shippingAddress.lat,
            lng: data.shippingAddress.lng,
          }}
          onCloseClick={handleClose}
        >
          <div style={divStyle}>
            <h2>
              {data.shippingAddress.name} {data.shippingAddress.lastName}
            </h2>
            <h3>{data.shippingAddress.address}</h3>
            <h3>Estado: {data.status}</h3>
            <h3>{formatPrice(data.total)}</h3>
            <h3 style={{ marginBottom: "5px" }}>{data.deliveryZone.name}</h3>
            <Link to={`/clientes/detalle/${data.client}`}>Ver Cliente</Link>
          </div>
        </InfoWindow>
      )}
    </Marker>
  );
}

export const AllOrdersMap = ({ data }) => {
  const local = useMemo(
    () => ({ lat: -34.570428718491605, lng: -58.743382510475065 }),
    []
  );
  const center = useMemo(() => ({ lat: data.lat, lng: data.lng }), [data]);
  const options = useMemo(
    () => ({
      clickableIcons: false,
      styles: [
        {
          featureType: "all",
          elementType: "labels.icon",
          stylers: [{ visibility: "off" }],
        },
      ],
    }),
    []
  );
  const ordersDirections = useSelector((store) => store.order.allOrders);

  return (
    <div>
      <GoogleMap
        zoom={14}
        center={center}
        mapContainerClassName="AllOrdersMap-container"
        options={options}
      >
        <Marker position={local} icon="https://i.ibb.co/nbm4b4x/pngegg.png" />

        <Marker
          position={center}
          icon="https://i.ibb.co/p0vpNJ6/6643396-1.png"
        />
        {ordersDirections.map((data) => (
          <ClientMarker data={data} />
        ))}

        <Polygon paths={zones.zona1} options={optionZones.zona1} />
        <Polygon paths={zones.zona2} options={optionZones.zona2} />
        <Polygon paths={zones.zona3} options={optionZones.zona3} />
        <Polygon paths={zones.zona4} options={optionZones.zona4} />
        <Polygon paths={zones.zona5} options={optionZones.zona5} />
        <Polygon paths={zones.zona6} options={optionZones.zona6} />
      </GoogleMap>
    </div>
  );
};
