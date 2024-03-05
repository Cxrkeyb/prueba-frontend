import { useTranslation } from "next-i18next";
import React from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/router";
import RandomImage from "./randomImage";

export interface Enterprise {
  nit: string; // NIT (Llave primaria)
  name: string; // name de la empresa
  address: string; // Dirección
  phoneNumber: string; // Teléfono
}

interface EnterpriseProps{
  enterprise: Enterprise;
  index: number;
}

const EnterpriseComponent: React.FC<EnterpriseProps> = ({ enterprise, index }) => {
  const { t } = useTranslation("form");
  const router = useRouter();

  return (
    <div
  key={index}
  className="m-4 p-4 bg-gray-100 rounded-xl shadow-xl border w-full sm:w-80 flex flex-col gap-2 justify-center items-center"
>
  <RandomImage search={enterprise.name} />
  <div className="text-2xl font-bold mb-2 text-black">
    {enterprise.name}
  </div>
  <div className="text-lg text-center">
    <div className="font-bold mb-2 text-black">{enterprise.nit}</div>
    <div className="mb-2 text-black">{enterprise.address}</div>
    <div className="mb-4 text-black">{enterprise.phoneNumber}</div>
  </div>
  <Button
    onClick={() => {
      router.push(`/enterprise/${enterprise.nit}`);
    }}
    className="text-lg bg-yellow-400 hover:bg-yellow-500"
  >
    {t("common:viewEnterprise")}
  </Button>
</div>

  );
};

export default EnterpriseComponent;
