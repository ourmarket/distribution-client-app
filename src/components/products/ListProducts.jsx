import { useSelector } from "react-redux";
import "./listProducts.css";
import { formatQuantity } from "../../utils/quantityFormat";

export const ListProducts = () => {
  const { all } = useSelector((store) => store.products);

  return (
    <section className="listProducts__container">
      <h1>
        Total de productos <br />
        ordenados
      </h1>

      <div className="listProducts__products">
        {all.map((product) => (
          <div className="listProducts__products__card">
            <div className="listProducts__products__card-img">
              <img src={product.img} alt="" />
            </div>
            <div className="listProducts__products__card-info">
              <h4>{product.name}</h4>
              <span className="listProducts__products__card-quantity">
                {formatQuantity(product.totalQuantity)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
