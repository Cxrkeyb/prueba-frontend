import * as z from "zod";
import React, { useEffect } from "react";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useTranslation } from "next-i18next";
import { FormLabel } from "@mui/material";
import { useRouter } from "next/router";
import axios from "axios";
import userStore from "@/store/userStore";
import RandomImage from "@/components/common/randomImage";
import { motion } from "framer-motion";
import GoBackButton from "@/components/common/goBack";

const EnterpriseIdView = () => {
  const { t } = useTranslation(["common", "form"]);
  const { user } = userStore((state) => state);

  // get the id from the url
  const router = useRouter();
  const { id } = router.query;

  const [isEditing, setIsEditing] = React.useState(false);
  const [enterprise, setEnterprise] = React.useState({
    nit: "123456789",
    name: "Empresa 1",
    address: "Calle 123",
    phoneNumber: "1234567",
  });

  const formSchema = z.object({
    nit: z.string().min(6).max(100),
    name: z.string().min(6).max(100),
    address: z.string().min(6).max(100),
    phoneNumber: z.string().min(6).max(100),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    axios
      .put(
        `https://flummy.dev/api/enterprise/${id}/`,
        data,
        {
          headers: {
            "ngrok-skip-browser-warning": "69420",
          },
        }
      )
      .then((response) => {
        router.push(`/enterprise/${data.nit}`);
      })
      .catch((error) => {
        console.error(error);
      });
    setEnterprise(data);
    toggleEditing();
  }

  const toggleEditing = () => {
    setIsEditing((prev) => !prev);
    if (!isEditing) {
      form.reset(enterprise); // Resetear el formulario con los valores actuales
    }
  };

  const deleteEnterprise = () => {
    axios
      .delete(
        `https://flummy.dev/api/enterprise/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      )
      .then((response) => {
        router.push("/");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    axios
      .get(
        `https://flummy.dev/api/enterprise/search/?nit=${id}`,
        {
          headers: {
            "ngrok-skip-browser-warning": "69420",
          },
        }
      )
      .then((response) => {
        if (response.data) setEnterprise(response.data);
        if (!response.data) router.push("/");
      })
      .catch((error) => {
        router.push("/"); // Redirect to home if the enterprise is not found
      });
  }, [id]);

  if (isEditing) {
    return (
      <div className="flex flex-col gap-4">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 flex flex-col"
          >
            <FormField
              control={form.control}
              name="nit"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="">
                    {t("form:questions.nit.title")}
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t("form:questions.nit.placeholder")}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="">
                    {t("form:questions.name.title")}
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t("form:questions.name.placeholder")}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="">
                    {t("form:questions.address.title")}
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t("form:questions.address.placeholder")}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="">
                    {t("form:questions.phoneNumber.title")}
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t("form:questions.phoneNumber.placeholder")}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button className="bg-blue-500" type="submit">
              {t("common:submit")}
            </Button>
          </form>
        </Form>
        <Button className="bg-red-500 w-full" onClick={toggleEditing}>
          {t("form:cancel")}
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto mt-8">
      <div className="bg-gray-100 shadow-xl border rounded-lg p-6 flex flex-col md:flex-row md:gap-6 items-center relative">
        <GoBackButton />
        <div className="flex flex-col mb-4 md:mb-0 md:w-1/2 mt-[50px]">
          <h2 className="text-xl font-bold mb-2 text-black">
            {enterprise?.name}
          </h2>
          <div className="flex flex-col md:gap-6">
            <div className="mb-4 md:w-1/2">
              <p className="text-yellow-500 font-bold">
                {t("form:questions.company.placeholder")}:
              </p>
              <p className="text-black font-light">{enterprise?.name}</p>
            </div>
            <div className="mb-4 md:w-1/2">
              <p className="text-yellow-500 font-bold">
                {t("form:questions.nit.placeholder")}:
              </p>
              <p className="text-black font-light">{enterprise?.nit}</p>
            </div>
            <div className="mb-4 md:w-1/2">
              <p className="text-yellow-500 font-bold">
                {t("form:questions.address.placeholder")}:
              </p>
              <p className="text-black font-light">{enterprise?.address}</p>
            </div>
            <div className="mb-4 md:w-1/2">
              <p className="text-yellow-500 font-bold">
                {t("form:questions.phoneNumber.placeholder")}:
              </p>
              <p className="text-black font-light">{enterprise?.phoneNumber}</p>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            {user?.type === 2 && (
              <>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="w-full"
                >
                  <Button
                    onClick={deleteEnterprise}
                    className="mt-4 md:mt-0 bg-red-500 w-full"
                  >
                    {t("form:questions.delete")}
                  </Button>
                </motion.div>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="w-full"
                >
                  <Button
                    onClick={toggleEditing}
                    className="mt-4 md:mt-0 bg-yellow-500 w-full"
                  >
                    {t("form:questions.edit")}
                  </Button>
                </motion.div>
              </>
            )}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              className="w-full"
            >
              <Button
                onClick={() => {
                  router.push(`/enterprise/${enterprise?.nit}/products`);
                }}
                className="mt-4 md:mt-0 bg-black text-white w-full"
              >
                {t("form:viewProducts")}
              </Button>
            </motion.div>
          </div>
        </div>
        <div className="w-full md:w-1/2">
          <RandomImage search={enterprise?.name} />
        </div>
      </div>
    </div>
  );
};

export default EnterpriseIdView;
