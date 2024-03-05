import { useTranslation } from "next-i18next";
import React from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/router";
import RandomImage from "./randomImage";

interface Product {
  name: string;
  nit: string;
  productCode: string;
  currencies: {
    USD: number;
    EUR: number;
    GBP: number;
  };
  productProperties: string;
  id: string;
}

interface ProductProps {
  product: Product;
  index: number;
}

const ProductComponent: React.FC<ProductProps> = ({ product, index }) => {
  const { t } = useTranslation("form");
  const router = useRouter();
  const { id } = router.query;

  return (
    <div key={index} className="bg-white shadow-md rounded-lg p-6 border">
      <h2 className="text-2xl font-semibold mb-4">{product.name}</h2>
      <div className="grid grid-cols-2 gap-4">
        <div className="text-gray-800">
          <p className="text-yellow-500 font-bold">
            {t("form:questions.nit.title")}:
          </p>
          <p>{id ? id : product.nit}</p>
        </div>
        <div className="text-gray-800">
          <p className="text-yellow-500 font-bold">
            {t("form:questions.code.title")}:
          </p>
          <p>{product.productCode}</p>
        </div>
        <div className="text-gray-800">
          <p className="text-yellow-500 font-bold">
            {t("form:questions.prices.titleUSD")}:
          </p>
          <p>{product?.currencies.USD}</p>
        </div>
        <div className="text-gray-800">
          <p className="text-yellow-500 font-bold">
            {t("form:questions.prices.titleEUR")}:
          </p>
          <p>{product?.currencies.EUR}</p>
        </div>
        <div className="text-gray-800">
          <p className="text-yellow-500 font-bold">
            {t("form:questions.prices.titleGBP")}:
          </p>
          <p>{product?.currencies.GBP}</p>
        </div>
        <div className="text-gray-800">
          <p className="text-yellow-500 font-bold">
            {t("form:questions.characteristics.title")}:
          </p>
          <p>{product.productProperties}</p>
        </div>
      </div>
      <RandomImage search={product.name} />
      <Button
        onClick={() => {
          router.push(`/product/${product.id}`);
        }}
        className="mt-4 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded inline-block w-full"
      >
        {t("form:viewProduct")}
      </Button>
    </div>
  );
};

export default ProductComponent;
