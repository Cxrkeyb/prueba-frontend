import { GetServerSideProps } from "next";
import React from "react";

import { Head } from "@/components";
import getServerSideSharedProps from "@/lib/next";
import NotFoundView from "@/views/error/not-found";

const NotFoundPage = () => {
  return (
    <>
      <Head title="Error 404" />
      <NotFoundView />
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

export default NotFoundPage;
