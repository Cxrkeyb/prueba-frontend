import React, { useEffect, useState } from "react";
import ProductComponent from "@/components/common/Product";
import { useRouter } from "next/router";
import axios from "axios";

const products = [
  {
    nombre: "Producto 1",
    empresa: "Empresa 1",
    codigo: "123456789",
    precios: {
      USD: 50,
      EUR: 100,
      GBP: 200,
    },
    caracteristicas: ["Caracteristica 1", "Caracteristica 2"],
  },
  {
    nombre: "Producto 2",
    empresa: "Empresa 2",
    codigo: "987654321",
    precios: {
      USD: 150,
      EUR: 200,
      GBP: 300,
    },
    caracteristicas: ["Caracteristica 1", "Caracteristica 2"],
  },
  {
    nombre: "Producto 3",
    empresa: "Empresa 3",
    codigo: "123123123",
    precios: {
      USD: 250,
      EUR: 300,
      GBP: 400,
    },
    caracteristicas: ["Caracteristica 1", "Caracteristica 2"],
  },
  {
    nombre: "Producto 4",
    empresa: "Empresa 4",
    codigo: "456456456",
    precios: {
      USD: 350,
      EUR: 400,
      GBP: 500,
    },
    caracteristicas: ["Caracteristica 1", "Caracteristica 2"],
  },
];

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
