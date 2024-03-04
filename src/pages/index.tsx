import getServerSideSharedProps from "@/lib/next";
import { GetServerSideProps } from "next";
import { Head } from "@/components";
// import { Poppins } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import HomeView from "@/views/home";

export default function Home() {
  return (
    <>
      <Head title="Inicio" />
      <HomeView />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  return {
    props: {
      ...(await getServerSideSharedProps(ctx)),
    },
  };
};
