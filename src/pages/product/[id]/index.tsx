import { GetServerSideProps } from "next";
import React from "react";

import { Head } from "@/components";
import getServerSideSharedProps from "@/lib/next";
import ProductIdView from "@/views/product/viewProduct";

const ProductPage = () => {
  return (
    <>
      <Head title="Ver producto"/>
      <ProductIdView />
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

export default ProductPage;
