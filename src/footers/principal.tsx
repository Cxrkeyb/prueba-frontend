"use client";

import * as React from "react";

import FooterPrincipal from "@/components/common/footer/index";

interface Props {
  children: JSX.Element;
}

function PrincipalFooter({ children }: Props) {
  return (
    <>
      <div className="w-screen flex flex-col justify-center items-center mb-[10rem]">{children}</div>
      <FooterPrincipal />
    </>
  );
}

export default PrincipalFooter;
