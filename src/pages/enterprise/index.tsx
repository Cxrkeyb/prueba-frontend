import { GetServerSideProps } from "next";
import React from "react";

import { Head } from "@/components";
import getServerSideSharedProps from "@/lib/next";
import EnterPriseView from "@/views/enterprise";

const EnterprisePage = () => {
  return (
    <>
      <Head title="Crear empresa"/>
      <EnterPriseView />
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

export default EnterprisePage;
