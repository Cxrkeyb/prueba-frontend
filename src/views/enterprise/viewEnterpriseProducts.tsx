import React, { useEffect, useState } from "react";
import ProductComponent from "@/components/common/Product";
import { useRouter } from "next/router";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { useTranslation } from "next-i18next";
import userStore from "@/store/userStore";

const ViewEnterpriseProducts = () => {
  const [products, setProducts] = useState([]);
  const { t } = useTranslation("form");

  const router = useRouter();
  const { user } = userStore();
  const { id } = router.query;

  const goToCreateProduct = () => {
    router.push(`/product/`);
  };

  useEffect(() => {
    axios
      .get(
        `https://immortal-longhorn-trusty.ngrok-free.app/products/v1/enterprise/${id}`,
        {
          headers: {
            "ngrok-skip-browser-warning": "69420",
          },
        }
      )
      .then((response) => {
        if (response.data) setProducts(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);

  return (
    <div className="container mx-auto mt-8 flex flex-col gap-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {products.length > 0 ? (
          products.map((product, index) => (
            <ProductComponent key={index} product={product} index={index} />
          ))
        ) : (
          <p className="mb-[500px] text-center">No hay productos disponibles en este momento.</p>
        )}
      </div>
      {user && user.role === "admin" && (
        <Button onClick={goToCreateProduct}>{t("createProduct")}</Button>
      )}
    </div>
  );
};

export default ViewEnterpriseProducts;
