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
      .put(`https://ray-stirring-probably.ngrok-free.app/enterprises/v1/${id}`, data)
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
      .delete(`https://ray-stirring-probably.ngrok-free.app/enterprises/v1/${id}`)
      .then((response) => {
        router.push("/");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    axios
      .get(`https://ray-stirring-probably.ngrok-free.app/enterprises/v1/${id}`)
      .then((response) => {
        console.log(response);
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
      <div className="bg-white shadow-md rounded-lg p-6">
        <div>
          <h2 className="text-xl font-bold mb-4">{enterprise?.name}</h2>
          <p className="text-gray-600 mb-2">
            {t("form:questions.company.placeholder")}: {enterprise?.name}
          </p>
          <p className="text-gray-600 mb-2">
            {t("form:questions.nit.placeholder")}: {enterprise?.nit}
          </p>
          <p className="text-gray-600 mb-2">
            {t("form:questions.address.placeholder")}: {enterprise?.address}
          </p>
          <p className="text-gray-600 mb-2">
            {t("form:questions.phoneNumber.placeholder")}:{" "}
            {enterprise?.phoneNumber}
          </p>
          <div className="flex gap-8">
            {user?.role === "admin" && (
              <>
                <Button onClick={deleteEnterprise} className="bg-red-500">
                  {t("form:questions.delete")}
                </Button>
                <Button onClick={toggleEditing}>
                  {t("form:questions.edit")}
                </Button>
              </>
            )}
            <Button
              onClick={() => {
                router.push(`/enterprise/${enterprise?.nit}/products`);
              }}
              className="
            bg-blue-500
            "
            >
              {t("form:viewProducts")}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnterpriseIdView;
