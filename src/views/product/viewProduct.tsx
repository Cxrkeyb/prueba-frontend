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
import axios from "axios";
import { useRouter } from "next/router";
import userStore from "@/store/userStore";
import { motion } from "framer-motion";
import RandomImage from "@/components/common/randomImage";
import GoBackButton from "@/components/common/goBack";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Currency } from ".";

const ProductsView = () => {
  const { t } = useTranslation(["common", "form"]);
  const [isEditing, setIsEditing] = React.useState(false);
  const [product, setProduct] = React.useState({
    product_code: "123456789",
    name: "Producto 1",
    company: "Empresa 1",
    currencies: [],
    product_properties: "Caracteristica",
  });
  const [category, setCategory] = React.useState<number[]>([]);
  const [quantityPrices, setQuantityPrices] = React.useState(1);

  const formSchema = z.object({
    product_code: z.string().min(1, { message: t("form:questions.code.codeError") }),
    name: z
      .string()
      .min(1, { message: t("form:questions.productName.codeError") }),
    product_properties: z.string().optional(),
    currencies: z
      .array(
        z.object({
          value: z
            .number()
            .min(1, { message: t("form:questions.prices.codeError") }),
          code: z
            .string()
            .min(1, { message: t("form:questions.prices.codeError") }),
        })
      )
      .min(1, { message: t("form:questions.prices.codeError") }),
    categories: z
      .array(
        z.number().min(1, { message: t("form:questions.category.codeError") })
      )
      .min(1, { message: t("form:questions. category.codeError") }),
    enterprise: z.string(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log("onSubmit", data);
    axios
      .put(
        `https://flummy.dev/api/product/${id}/`,
        data,
        {
          headers: {
            "Authorization": "Token " + user?.token,
          },
        }
      )
      .then((response) => {
        router.push(`/product/${id}`);
      })
      .catch((error) => {
        console.error(error);
      });
    // @ts-ignore
    setProduct(data);
    toggleEditing();
  };

  const toggleEditing = () => {
    setIsEditing((prev) => !prev);
    if (!isEditing) {
      form.reset(product); // Resetear el formulario con los valores actuales del producto
    }
  };

  const router = useRouter();
  const { id } = router.query;

  const user = userStore((state) => state.user);
  const userRole = user?.type;

  const deleteProduct = () => {
    axios
      .delete(
        `https://flummy.dev/api/product/${id}/`,
        {
          headers: {
            "Authorization": "Token " + user?.token,
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

  const increaseQuantityPrices = () => {
    setQuantityPrices(quantityPrices + 1);
  };

  const decreaseQuantityPrices = () => {
    setQuantityPrices(quantityPrices - 1);
  };

  useEffect(() => {
    axios
      .get(
        `https://flummy.dev/api/product/search/?id=${id}`, {
          headers: {
            "Authorization": "Token " + user?.token,
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        setProduct(response.data[0]);
        setQuantityPrices(response.data[0].currencies.length);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);

  useEffect(() => {
    axios
    .get("https://flummy.dev/api/category/list_categories/")
    .then((response) => {
        console.log(response.data);
        const categoriesId = response.data.map((category: any) => category.id);
        setCategory(categoriesId);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  if (isEditing) {
    return (
      <div className="flex flex-col gap-4 bg-gray-100 p-4 shadow-xl rounded-xl border max-w-[800px]">
        <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4 md:space-y-4 md:flex md:flex-wrap"
            >
              <div className="flex flex-col lg:flex-row w-full gap-2">
                <FormField
                  control={form.control}
                  name="product_code"
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
                name="product_properties"
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
                name="enterprise"
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
                name="categories"
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
                              form.getValues("categories")?.length > 0
                                ? "text-gray-800"
                                : "text-gray-400"
                            )}
                          >
                            <div>
                              {(form.getValues("categories") || []).length > 0
                                ? (form.getValues("categories") || []).map(
                                    (item, index) => (
                                      <span key={index}>
                                        {t(
                                          `form:questions.category.options.${item}`
                                        )}
                                        {index !==
                                        (form.getValues("categories") || [])
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
                      {category.length >  0 && category.map((item, index) => (
                        <DropdownMenuCheckboxItem
                          key={index}
                          checked={
                            (form.getValues("categories") || []).includes(item) ||
                            false
                          }
                          className="flex items-center justify-between px-4 py-2 w-full bg-white rounded-xl border border-gray-200 text-gray-800"
                          onCheckedChange={(checked) => {
                            const categoryValues =
                              form.getValues("categories") || [];
                            if (checked) {
                              form.setValue("categories", [
                                ...categoryValues,
                                item,
                              ]);
                            } else {
                              form.setValue(
                                "categories",
                                categoryValues.filter((v) => v !== item)
                              );
                            }
                          }}
                        >
                          {t(`form:questions.category.options.${item}`)}{" "}
                          {(form.getValues("categories") || []).includes(
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
                name="currencies"
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
                            name={`currencies[${index}].code`}
                            onChange={(event) => {
                              form.setValue(
                                `currencies.${index}.code`,
                                event.target.value
                              );
                            }}
                            value={
                              form.getValues(`currencies.${index}.code`) || ""
                            }
                          />
                        </FormControl>
                        <FormControl>
                          <Input
                            placeholder={t("form:questions.prices.placeholder")}
                            {...field}
                            name={`currencies[${index}].value`}
                            onChange={(event) => {
                              form.setValue(
                                `currencies.${index}.value`,
                                Number(event.target.value)
                              );
                            }}
                            value={
                              form.getValues(`currencies.${index}.value`) || ""
                            }
                          />
                        </FormControl>
                        {index < quantityPrices - 1 && (
                          <Button
                            onClick={decreaseQuantityPrices}
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
        <Button className="bg-red-700 w-full" onClick={toggleEditing}>
          {t("form:cancel")}
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto mt-8 mb-8">
      <div className="bg-gray-100 border shadow-xl rounded-lg p-6 flex flex-col md:flex-row gap-4 items-center relative">
        <GoBackButton />
        <div className="md:w-1/2 flex flex-col gap-2 justify-center mt-[50px]">
          <h2 className="text-2xl text-black font-bold mb-4">
            {product?.name}
          </h2>
          <p className="text-yellow-500 font-bold mb-2">
            {t("form:questions.code.placeholder")}:{" "}
            <span className="text-black font-light">
              {product?.product_code}
            </span>
          </p>
          <p className="text-yellow-500 font-bold mb-2">
            {t("form:questions.characteristics.placeholder")}:{" "}
            <span className="text-black font-light">
              {product?.product_properties}
            </span>
          </p>
          {
            product?.currencies && product?.currencies.length > 0 && product?.currencies.map((currency: Currency, index) => (
              <div key={index} className="text-gray-800 flex gap-2">
                <p className="text-yellow-500 font-bold">{currency.code}: </p>
                <p>{currency.value}</p>
              </div>
            ))
          }
          {userRole === 1 && (
            <div className="flex flex-col md:flex-row gap-4 mt-4 w-full">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5 }}
                className="w-full"
              >
                <Button onClick={deleteProduct} className="bg-red-500 w-full">
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
                  className="bg-yellow-500 w-full"
                >
                  {t("form:questions.edit")}
                </Button>
              </motion.div>
            </div>
          )}
        </div>
        <div className="md:w-1/2">
          <RandomImage search={product.name} />
        </div>
      </div>
    </div>
  );
};

export default ProductsView;
