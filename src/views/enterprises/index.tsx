import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/navigation";
import axios from "axios";
import userStore from "@/store/userStore";
import RandomImage from "@/components/common/randomImage";
import EnterpriseComponent, {
  Enterprise,
} from "@/components/common/Enterprise";

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
          "https://dc3a-181-78-80-165.ngrok-free.app/api/enterprise/list_enterprises/",
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
          <EnterpriseComponent
            key={index}
            enterprise={enterprise}
            index={index}
          />
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
