import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/navigation";
import axios from "axios";

interface Empresa {
  nit: string; // NIT (Llave primaria)
  name: string; // name de la empresa
  address: string; // Dirección
  phoneNumber: string; // Teléfono
}

const EnterprisesView = () => {
  const { t } = useTranslation(["common", "form", "constants"]);

  const [enterprises, setEnterprises] = React.useState<Empresa[]>([]);

  useEffect(() => {
    axios
      .get("https://ray-stirring-probably.ngrok-free.app//enterprises/v1/")
      .then((response) => {
        console.log(response);
        if (response.data) setEnterprises(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const router = useRouter();

  return (
    <div className="flex flex-wrap justify-center">
      {enterprises.map((enterprise, index) => (
        <div key={index} className="m-4 p-4 bg-white rounded shadow-md w-80">
          <div className="text-2xl font-bold mb-2">{enterprise.name}</div>
          <div className="text-2xl font-bold mb-2">{enterprise.nit}</div>
          <div className="text-lg mb-2">{enterprise.address}</div>
          <div className="text-lg mb-4">{enterprise.phoneNumber}</div>
          <Button
            onClick={() => {
              router.push(`/enterprise/${enterprise.nit}`);
            }}
            className="text-lg bg-blue-500 hover:bg-blue-600"
          >
            {t("common:viewEnterprise")}
          </Button>
        </div>
      ))}
    </div>
  );
};

export default EnterprisesView;
