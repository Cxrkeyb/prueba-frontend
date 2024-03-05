import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/navigation";
import axios from "axios";
import userStore from "@/store/userStore";
import RandomImage from "@/components/common/randomImage";

interface Enterprise {
  nit: string; // NIT (Llave primaria)
  name: string; // name de la empresa
  address: string; // Dirección
  phoneNumber: string; // Teléfono
}

const EnterprisesView = () => {
  const { t } = useTranslation(["common", "form"]);
  const [enterprises, setEnterprises] = useState<Enterprise[]>([]);
  const router = useRouter();
  const { user } = userStore();

  const goToCreateEnterprise = () => {
    router.push("/enterprise/");
  };

  useEffect(() => {
    const fetchEnterprises = async () => {
      try {
        const response = await axios.get(
          "https://immortal-longhorn-trusty.ngrok-free.app/enterprises/v1/",
          {
            headers: {
              "ngrok-skip-browser-warning": "69420",
            },
          }
        );
        setEnterprises(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchEnterprises();
  }, []);

  return (
    <div className="container mx-auto mt-8 flex flex-col gap-4 mb-[200px]">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {enterprises.map((enterprise, index) => (
          <div
            key={index}
            className="m-4 p-4 bg-white rounded shadow-md w-full sm:w-80 flex flex-col gap-2 justify-center items-center"
          >
            <RandomImage search={enterprise.name} />
            <div className="text-2xl font-bold mb-2 text-blue-500">
              {enterprise.name}
            </div>
            <div className="text-lg text-center">
              <div className="font-bold mb-2">{enterprise.nit}</div>
              <div className="mb-2">{enterprise.address}</div>
              <div className="mb-4">{enterprise.phoneNumber}</div>
            </div>
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
      {user?.role === "admin" && (
        <Button onClick={goToCreateEnterprise}>
          {t("form:createCompany")}
        </Button>
      )}
    </div>
  );
};

export default EnterprisesView;
