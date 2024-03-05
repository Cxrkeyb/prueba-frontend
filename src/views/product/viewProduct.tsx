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

const ProductsView = () => {
  const { t } = useTranslation(["common", "form"]);
  const [isEditing, setIsEditing] = React.useState(false);
  const [product, setProduct] = React.useState({
    productCode: "123456789",
    name: "Producto 1",
    company: "Empresa 1",
    currencies: {
      USD: 50,
      EUR: 100,
      GBP: 200,
    },
    productProperties: "Caracteristica",
  });

  const formSchema = z.object({
    code: z.string().min(1, { message: t("form:questions.code.codeError") }),
    productName: z
      .string()
      .min(1, { message: t("form:questions.productName.codeError") }),
    characteristics: z.string().optional(),
    currencies: z.object({
      USD: z.number().positive(),
      EUR: z.number().positive(),
      GBP: z.number().positive(),
    }),
    productProperties: z.string(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log("onSubmit", data);
    // axios
    //   .put(`https://3c4f-181-78-80-164.ngrok-free.app/products/v1/products/${product.id}`, data)
    //   .then((response) => {
    //     console.log(response);
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //   });
    // ignore
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

  useEffect(() => {
    axios
      .get(
        `https://3c4f-181-78-80-164.ngrok-free.app/products/v1/products/${id}`,
        {
          headers: {
            "ngrok-skip-browser-warning": "69420",
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        setProduct(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);

  if (isEditing) {
    return (
      <div className="flex flex-col gap-4">
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
              name="characteristics"
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
            <div className="flex w-full flex-col gap-2">
              <FormField
                control={form.control}
                name="currencies.USD"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel className="">
                      {t("form:questions.prices.titleUSD")}
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t("form:questions.prices.placeholderUSD")}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="currencies.EUR"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel className="">
                      {t("form:questions.prices.titleEUR")}
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t("form:questions.prices.placeholderEUR")}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="currencies.GBP"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel className="">
                      {t("form:questions.prices.titleGBP")}
                    </FormLabel>

                    <FormControl>
                      <Input
                        placeholder={t("form:questions.prices.placeholderGBP")}
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
          <h2 className="text-xl font-bold mb-4">{product?.name}</h2>
          <p className="text-gray-600 mb-2">
            {t("form:questions.code.placeholder")}: {product?.productCode}
          </p>
          <p className="text-gray-600 mb-2">
            {t("form:questions.characteristics.placeholder")}:{" "}
            {product?.productProperties}
          </p>
          <p className="text-gray-600 mb-2">
            {t("form:questions.prices.titleUSD")}: {product?.currencies.USD}
          </p>
          <p className="text-gray-600 mb-2">
            {t("form:questions.prices.titleEUR")}: {product?.currencies.EUR}
          </p>
          <p className="text-gray-600 mb-2">
            {t("form:questions.prices.titleGBP")}: {product?.currencies.GBP}
          </p>
          <div className="flex gap-8">
            {user?.role === "admin" && (
              <>
                <Button
                  onClick={() => {
                    console.log("Deleted");
                  }}
                  className="bg-red-500"
                >
                  {t("form:questions.delete")}
                </Button>
                <Button onClick={toggleEditing}>
                  {t("form:questions.edit")}
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsView;
