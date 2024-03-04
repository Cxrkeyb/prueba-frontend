import { useTranslation } from "next-i18next";
import React from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/router";

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
  const {id} = router.query;

  return (
    <div key={index} className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-xl font-bold mb-4">{product.name}</h2>
      <p className="text-gray-600 mb-2">
        {t("form:questions.nit.title")}: {id ? id : product.nit}
      </p>
      <p className="text-gray-600 mb-2">
        {t("form:questions.code.title")}: {product.productCode}
      </p>
      <p className="text-gray-600 mb-2">
        {t("form:questions.prices.titleGBP")}: {product.currencies.GBP}
      </p>
      <p className="text-gray-600 mb-2">
        {t("form:questions.prices.titleUSD")}: {product.currencies.USD}
      </p>
      <p className="text-gray-600 mb-2">
        {t("form:questions.prices.titleEUR")}: {product.currencies.EUR}
      </p>
      <p className="text-gray-600 mb-2">
        {t("form:questions.characteristics.title")}: {product.productProperties}
      </p>
      <Button
        onClick={() => {
          router.push(`/product/${product.id}`);
        }}
        className="bg-blue-500"
      >
        {t("form:viewProduct")}
      </Button>
    </div>
  );
};

export default ProductComponent;
