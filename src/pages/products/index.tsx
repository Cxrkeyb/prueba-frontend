import { GetServerSideProps } from "next";
import React from "react";

import { Head } from "@/components";
import getServerSideSharedProps from "@/lib/next";
import ProductsView from "@/views/products";

const ProductsPage = () => {
  return (
    <>
      <Head title="Productos"/>
      <ProductsView />
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
