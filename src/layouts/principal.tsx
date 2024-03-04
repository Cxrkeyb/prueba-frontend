"use client";

import * as React from "react";

import Logo from "@/components/common/layout/principal/logo";
import ActionsButtons from "@/components/common/layout/principal/actions-buttons";
import { Box } from "@mui/material";

interface Props {
  children: JSX.Element;
  className?: string;
}

const MemoizedChildren = React.memo(function MemoizedChildren({
  children,
}: Props) {
  return (
    <Box sx={{ pb: "0px" }} position="relative">
      {children}
    </Box>
  );
});

const MainContent = ({ children }: Props) => {
  return (
    <Box
      sx={{
        mt: "0px",
        pb: "0px",
        minHeight: "80vh",
      }}
    >
      <MemoizedChildren>{children}</MemoizedChildren>
    </Box>
  );
};

function PrincipalLayout({ children, className }: Props) {
  return (
    <div className={`${className}`}>
      <div className="border-b items-center justify-center w-full flex md:top-[3rem] lg:mb-[50px]">
        <nav className="py-[12px] px-[2rem] flex justify-between items-center max-w-screen-xl w-full xl:space-x-60">
          <Logo />
          <ActionsButtons />
        </nav>
      </div>
      <div className="flex items-center justify-center flex-col gap-4">
        <MainContent>{children}</MainContent>
      </div>
    </div>
  );
}

export default PrincipalLayout;
