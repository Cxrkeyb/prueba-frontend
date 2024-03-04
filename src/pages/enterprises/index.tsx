import { GetServerSideProps } from "next";
import React from "react";

import { Head } from "@/components";
import getServerSideSharedProps from "@/lib/next";
import EnterPrisesView from "@/views/enterprises";

const EnterprisesPage = () => {
  return (
    <>
      <Head title="Empresas"/>
      <EnterPrisesView />
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

export default EnterprisesPage;
