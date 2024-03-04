import { GetServerSideProps } from "next";
import React from "react";

import { Head } from "@/components";
import getServerSideSharedProps from "@/lib/next";
import ProductView from "@/views/product";

const ProductsPage = () => {
  return (
    <>
      <Head title="Crear producto"/>
      <ProductView />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  return {
    props: {
      ...(await getServerSideSharedProps(ctx)),
    },
  };
};

export default ProductsPage;
