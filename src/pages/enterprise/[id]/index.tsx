import { GetServerSideProps } from "next";
import React from "react";

import { Head } from "@/components";
import getServerSideSharedProps from "@/lib/next";
import EnterpriseIdView from "@/views/enterprise/viewEnterprise";

const EnterpriseIdPage = () => {
  return (
    <>
      <Head title="Ver producto"/>
      <EnterpriseIdView />
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

export default EnterpriseIdPage;
