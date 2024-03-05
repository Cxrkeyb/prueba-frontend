"use client"
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowBigLeftIcon } from "lucide-react";
import { useRouter } from "next/navigation";

function GoBackButton() {
  const router = useRouter();

  return (
    <Button
      className="absolute 
        top-5 left-5"
      onClick={() => router.back()}
    >
      <ArrowBigLeftIcon className="text-white" />
    </Button>
  );
}

export default GoBackButton;
