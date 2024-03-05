import React, { useEffect, useState } from "react";
import ProductComponent from "@/components/common/Product";
import { useRouter } from "next/router";
import axios from "axios";

const ViewEnterpriseProducts = () => {
  const [products, setProducts] = useState([]);

  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    axios
      .get(`https://3c4f-181-78-80-164.ngrok-free.app/products/v1/enterprise/${id}`, {
        headers: { 
          "ngrok-skip-browser-warning": "69420",
        }
      })
      .then((response) => {
        console.log(response);
        if (response.data) setProducts(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);

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

export default ViewEnterpriseProducts;
