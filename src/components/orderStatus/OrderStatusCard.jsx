import './orderStatus.css'
import { Link } from 'react-router-dom'

export const OrderStatusCard = ({order}) => {
  return (
    <Link to={`/order/${order._id}`}>
          <div className="order__card__container">
            <div className="row">
              <h4>Zona</h4>
              <p>{order.deliveryZone.name}</p>
            </div>
            <div className="row">
              <h4>Nombre</h4>
              <p>{order.shippingAddress.name + ' ' + order.shippingAddress.lastName}</p>
            </div>
            <div className="row">
              <h4>Dirección</h4>
              <p>{order.shippingAddress.address}</p>
            </div>
            <div className="row">
              <h4>Estado</h4>
              <p><span className="order__status-circle"></span> {order.status}</p>
            </div>
          </div>
        </Link>
  )
}
