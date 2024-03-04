import React from "react";
import Intro from "./intro";

export default function HomeView() {
  return (
    <>
      <div className="flex flex-col w-full items-center justify-center mt-[8rem] mb-[2rem] md:mb-[5rem]">
        <Intro />
      </div>
    </>
  );
}
