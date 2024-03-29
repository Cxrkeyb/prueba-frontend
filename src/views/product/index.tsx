import * as z from "zod";
import { Check, ChevronsUpDown } from "lucide-react";

import React, { useEffect } from "react";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useTranslation } from "next-i18next";
import axios from "axios";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import userStore from "@/store/userStore";
import { useRouter } from "next/router";

const category = [1, 2, 3, 4];

export interface Currency {
  value: number;
  code: string;
}

const ProductsView = () => {
  const { t } = useTranslation(["common", "form"]);
  const [quantityPrices, setQuantityPrices] = React.useState(1);
  const [categories, setCategories] = React.useState(category);

  const formSchema = z.object({
    code: z.string().min(1, { message: t("form:questions.code.codeError") }),
    name: z
      .string()
      .min(1, { message: t("form:questions.productName.codeError") }),
    features: z.string().optional(),
    prices: z
      .array(
        z.object({
          value: z.number().min(1, {
            message: t("form:questions.prices.valueError"),
          }),
          code: z.string().min(1, { message: t("form:questions.currencyError") }),
        })
      )
      .min(1, { message: t("form:questions.prices.codeError") }),
    category: z
      .array(
        z.number().min(1, { message: t("form:questions.category.codeError") })
      )
      .min(1, { message: t("form:questions. category.codeError") }),
    id: z.string(),
  });

  const user = userStore((state) => state.user);

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    console.log(data);
    axios
      .post("https://flummy.dev/api/product/", {
        product_code: data.code,
        name: data.name,
        product_properties: data.features,
        currencies: data.prices,
        enterprise: data.id,
        categories: data.category
      }, {
        headers: {
          "Authorization": "Token " + user?.token,
        },
      })
      .then((response) => {
        console.log(response);
        router.push(`/enterprise/${response.data.enterprise}`);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  const increaseQuantityPrices = () => {
    setQuantityPrices(quantityPrices + 1);
  };

  const decreaseQuantityPrices = () => {
    setQuantityPrices(quantityPrices - 1);
  };

  useEffect(() => {
    axios
      .get("https://flummy.dev/api/category/list_categories/")
      .then((response) => {
        console.log(response);
        setCategories(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

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
                      <FormLabel className="text-yellow-500 font-bold">
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
                  name="name"
                  render={({ field }) => (
                    <FormItem className="w-full md:w-1/2">
                      <FormLabel className="text-yellow-500 font-bold">
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
                    <FormLabel className="text-yellow-500 font-bold">
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
                name="id"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel className="text-yellow-500 font-bold">
                      {t("form:questions.idEnterprise.title")}
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t("form:questions.idEnterprise.placeholder")}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <DropdownMenu>
                    <div className="flex flex-col gap-2 w-full">
                      <FormLabel className="text-yellow-500 font-bold">
                        {t("form:questions.category.title")}
                      </FormLabel>
                      <DropdownMenuTrigger asChild>
                        <div
                          className="bg-gray-200 rounded-xl
                          cursor-pointer
                        "
                        >
                          <span
                            className={cn(
                              "bg-white rounded-xl",
                              "border border-gray-200",
                              "text-gray-800",
                              "flex items-center justify-between",
                              "p-2",
                              form.getValues("category")?.length > 0
                                ? "text-gray-800"
                                : "text-gray-400"
                            )}
                          >
                            <div>
                              {(form.getValues("category") || []).length > 0
                                ? (form.getValues("category") || []).map(
                                    (item, index) => (
                                      <span key={index}>
                                        {t(
                                          `form:questions.category.options.${item}`
                                        )}
                                        {index !==
                                        (form.getValues("category") || [])
                                          .length -
                                          1
                                          ? ", "
                                          : ""}
                                      </span>
                                    )
                                  )
                                : t("form:questions.category.placeholder")}
                            </div>

                            <ChevronsUpDown className="w-4 h-4 text-yellow-500" />
                          </span>
                        </div>
                      </DropdownMenuTrigger>
                    </div>
                    <DropdownMenuContent className="bg-white border border-gray-200 shadow-lg rounded-lg p-4 space-y-4 w-full max-h-80">
                      <DropdownMenuLabel
                        className="
                        text-gray-800
                        font-semibold
                        border-b p-2
                      "
                      >
                        {t("form:questions.category.select")}
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      {category.map((item, index) => (
                        <DropdownMenuCheckboxItem
                          key={index}
                          checked={
                            (form.getValues("category") || []).includes(item) ||
                            false
                          }
                          className="flex items-center justify-between px-4 py-2 w-full bg-white rounded-xl border border-gray-200 text-gray-800"
                          onCheckedChange={(checked) => {
                            const categoryValues =
                              form.getValues("category") || [];
                            if (checked) {
                              form.setValue("category", [
                                ...categoryValues,
                                item,
                              ]);
                            } else {
                              form.setValue(
                                "category",
                                categoryValues.filter((v) => v !== item)
                              );
                            }
                          }}
                        >
                          {t(`form:questions.category.options.${item}`)}{" "}
                          {(form.getValues("category") || []).includes(
                            item
                          ) && <Check className="w-4 h-4" />}
                        </DropdownMenuCheckboxItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
              />

              <FormField
                control={form.control}
                name="prices"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel className="text-yellow-500 font-bold">
                      {t("form:questions.prices.title")}
                    </FormLabel>
                    {Array.from({ length: quantityPrices }).map((_, index) => (
                      <div key={index} className="flex gap-2 items-center">
                        <FormControl>
                          <Input
                            placeholder={t(
                              "form:questions.currency.placeholder"
                            )}
                            name={`prices[${index}].code`}
                            onChange={(event) => {
                              form.setValue(
                                `prices.${index}.code`,
                                event.target.value
                              );
                            }}
                          
                          />
                        </FormControl>
                        <FormControl>
                          {/* @ts-ignore */}
                          <Input
                            placeholder={t("form:questions.prices.placeholder")}
                            {...field}
                            name={`prices[${index}].value`}
                            onChange={(event) => {
                              form.setValue(
                                `prices.${index}.value`,
                                Number(event.target.value)
                              );
                            }}
                          />
                        </FormControl>
                        {index < quantityPrices - 1 && (
                          <Button
                            onClick={() => decreaseQuantityPrices()}
                            type="button"
                            className="bg-yellow-500 text-black w-8 h-8 flex items-center justify-center"
                          >
                            -
                          </Button>
                        )}
                        {index === quantityPrices - 1 && (
                          <Button
                            onClick={increaseQuantityPrices}
                            type="button"
                            className="bg-yellow-500 text-black w-8 h-8 flex items-center justify-center"
                          >
                            +
                          </Button>
                        )}
                      </div>
                    ))}
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button className="bg-yellow-500 text-black w-full" type="submit">
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
