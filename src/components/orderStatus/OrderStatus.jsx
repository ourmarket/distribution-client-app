import "./orderStatus.css";
import {  useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { OrderStatusCard } from "./OrderStatusCard";


export const OrderStatus = () => {
  const {status}= useParams()
  const { allOrders, pending, delivered, refused  } = useSelector((state) => state.order);

  return (
    <section className="todos__container">
      <h2>Lista de pedidos</h2>
     {
      status === 'todos' && (
        <div>
          {
            allOrders.map(order => (
              <OrderStatusCard order = {order}/>
            ))
          }
        </div>
      ) 
     }
     {
      status === 'pendientes' && (
        <div>
          {
            pending.map(order => (
              <OrderStatusCard order = {order}/>
            ))
          }
        </div>
      ) 
     }
     {
      status === 'entregados' && (
        <div>
          {
            delivered.map(order => (
              <OrderStatusCard order = {order}/>
            ))
          }
        </div>
      ) 
     }
     {
      status === 'rechazados' && (
        <div>
          {
            refused.map(order => (
              <OrderStatusCard order = {order}/>
            ))
          }
        </div>
      ) 
     }
     
    </section>
  );
};
