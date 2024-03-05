import React, { useEffect, useState } from "react";
import ProductComponent from "@/components/common/Product";
import axios from "axios";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import userStore from "@/store/userStore";
import { Button } from "@/components/ui/button";
import GoBackButton from "@/components/common/goBack";

const ProductsView = () => {
  const [products, setProducts] = useState([]);
  const { t } = useTranslation("form");

  const router = useRouter();
  const { user } = userStore();

  const goToCreateProduct = () => {
    router.push(`/product/`);
  };

  useEffect(() => {
    axios
      .get("https://flummy.dev/api/product/", {
        headers: { 
          "ngrok-skip-browser-warning": "69420",
        }
      })
      .then((response) => {
        console.log(response);
        // if (response.data) setProducts(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div className="container mx-auto mt-8 mb-[200px] relative">
      <GoBackButton />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {products.map((product, index) => (
          <ProductComponent key={index} product={product} index={index} />
        ))}
      </div>
      {user && user.role === "admin" && (
        <Button onClick={goToCreateProduct}>{t("createProduct")}</Button>
      )}
    </div>
  );
};

export default ProductsView;
