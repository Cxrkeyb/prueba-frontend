import { GetServerSideProps } from "next";
import React from "react";

import { Head } from "@/components";
import getServerSideSharedProps from "@/lib/next";
import LoginView from "@/views/login";

const LoginPage = () => {
  return (
    <>
      <Head title="Iniciar sesion"/>
      <LoginView />
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

export default LoginPage;
