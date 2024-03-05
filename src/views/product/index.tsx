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

const ProductsView = () => {
  const { t } = useTranslation(["common", "form"]);

  const formSchema = z.object({
    code: z.string().min(1, { message: t("form:questions.code.codeError") }),
    productName: z
      .string()
      .min(1, { message: t("form:questions.productName.codeError") }),
    features: z.string().optional(),
    prices: z.object({
      USD: z.number().positive(),
      EUR: z.number().positive(),
      GBP: z.number().positive(),
    }),
    nit: z.string(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    axios
      .post("https://immortal-longhorn-trusty.ngrok-free.appproducts/v1", {
        code: data.code,
        name: data.productName,
        features: data.features,
        prices: data.prices,
        nit: data.nit,
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <div className="flex items-center justify-center border rounded-xl bg-gray-100 my-8 max-w-[800px] self-center">
      <div className="flex w-1/2 items-center justify-center p-2">
        <div className="space-y-4 md:min-w-[600px] w-full">
          <div className="flex flex-col gap-4 items-center">
            <span className="text-4xl font-bold">
              {t("form:createProduct")}
            </span>
            <span className="text-lg font-bold">
              {t("form:createProductPrompt")}
            </span>
          </div>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4 md:space-y-4 md:flex md:flex-wrap"
            >
              <div className="flex flex-col lg:flex-row w-full gap-2">
                <FormField
                  control={form.control}
                  name="code"
                  render={({ field }) => (
                    <FormItem className="w-full md:w-1/2">
                      <FormLabel className="">
                        {t("form:questions.code.title")}
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder={t("form:questions.code.placeholder")}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="productName"
                  render={({ field }) => (
                    <FormItem className="w-full md:w-1/2">
                      <FormLabel className="">
                        {t("form:questions.productName.title")}
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder={t(
                            "form:questions.productName.placeholder"
                          )}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="features"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel className="">
                      {t("form:questions.characteristics.title")}
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t(
                          "form:questions.characteristics.placeholder"
                        )}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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

              <div className="flex w-full flex-col gap-2">
                <FormField
                  control={form.control}
                  name="prices.USD"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel className="">
                        {t("form:questions.prices.titleUSD")}
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder={t(
                            "form:questions.prices.placeholderUSD"
                          )}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="prices.EUR"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel className="">
                        {t("form:questions.prices.titleEUR")}
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder={t(
                            "form:questions.prices.placeholderEUR"
                          )}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="prices.GBP"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel className="">
                        {t("form:questions.prices.titleGBP")}
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder={t(
                            "form:questions.prices.placeholderGBP"
                          )}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button className="bg-blue-500 w-full" type="submit">
                {t("common:submit")}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default ProductsView;
