import React, { useEffect } from "react";
import ProductComponent from "@/components/common/Product";
import axios from "axios";

const ProductsView = () => {
  const [products, setProducts] = React.useState([]);

  useEffect(() => {
    axios
      .get("https://ray-stirring-probably.ngrok-free.app/products/v1/products")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div className="container mx-auto mt-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {products.map((product, index) => (
          <ProductComponent key={index} product={product} index={index} />
        ))}
      </div>
    </div>
  );
};

export default ProductsView;
