import { useSelector } from "react-redux";
import "./listProducts.css";

export const ListProducts = () => {
  const { all } = useSelector((store) => store.products);
  return (
    <section className="listProducts__container">
      <h1>Lista de productos</h1>
      <h3>(A repartir hoy)</h3>
      <div className="listProducts__products">
        {all.map((product) => (
          <div className="listProducts__products__card">
            <div className="listProducts__products__card-img">
              <img src={product.img} alt="" />
            </div>
            <div className="listProducts__products__card-info">
              <h4>{product.description}</h4>
              <div>
                <h4>
                  <span>Cantidad: {product.totalQuantity} unid.</span>
                </h4>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
