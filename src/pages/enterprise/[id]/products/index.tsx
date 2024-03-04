import { GetServerSideProps } from "next";
import React from "react";

import { Head } from "@/components";
import getServerSideSharedProps from "@/lib/next";
import ViewEnterpriseProducts from "@/views/enterprise/viewEnterpriseProducts";

const EnterpriseProductsPages = () => {
  return (
    <>
      <Head title="Ver producto" />
      <ViewEnterpriseProducts />
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

export default EnterpriseProductsPages;
