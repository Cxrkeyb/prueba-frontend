"use client";

import * as z from "zod";

import React from "react";
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
import axios from "axios";
import { useRouter } from "next/router";

const formSchema = z.object({
  nit: z.string().min(6).max(100),
  name: z.string().min(6).max(100),
  address: z.string().min(6).max(100),
  phoneNumber: z.string().min(6).max(100),
});

const CreateEnterpriseView = () => {
  const { t } = useTranslation(["common", "form", "constants"]);

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    axios
      .post("http://18.234.124.123:8000/api/enterprise/", data, {
        headers: {
          "ngrok-skip-browser-warning": "69420",
        },
      })
      .then((response) => {
        router.push(`/enterprises/`);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <div className="flex items-center justify-center border rounded-xl bg-gray-100 my-8 max-w-[800px] self-center">
      <div className="flex w-1/2 items-center justify-center p-2">
        <div className="space-y-4 min-w-[600px]">
          <div className="flex flex-col gap-4 items-center">
            <span className="text-4xl font-bold">
              {t("form:createCompany")}
            </span>
            <span className="text-lg font-bold">
              {t("form:createCompanyPrompt")}
            </span>
          </div>

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
                    <FormLabel className="text-yellow-500 font-bold">
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
                    <FormLabel className="text-yellow-500 font-bold">
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
                    <FormLabel className="text-yellow-500 font-bold">
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
                    <FormLabel className="text-yellow-500 font-bold">
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

              <Button className="bg-black" type="submit">
                {t("common:submit")}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default CreateEnterpriseView;
