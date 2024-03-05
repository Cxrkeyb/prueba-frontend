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
import { ArrowBigLeftIcon } from "lucide-react";
import GoBackButton from "@/components/common/goBack";

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
    productCode: z
      .string()
      .min(1, { message: t("form:questions.code.codeError") }),
    name: z
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
    axios
      .put(
        `https://immortal-longhorn-trusty.ngrok-free.app/products/v1/${id}`,
        data,
        {
          headers: {
            "ngrok-skip-browser-warning": "69420",
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
  const userRole = user?.role;

  const deleteProduct = () => {
    axios
      .delete(
        `https://immortal-longhorn-trusty.ngrok-free.app/products/v1/${id}`,
        {
          headers: {
            "ngrok-skip-browser-warning": "69420",
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
        `https://immortal-longhorn-trusty.ngrok-free.app/products/v1/products/${id}`,
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
                name="productCode"
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
                name="name"
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
              name="productProperties"
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
              {t("form:edit")}
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
    <div className="container mx-auto mt-8 mb-8">
      <div className="bg-gray-100 border shadow-xl rounded-lg p-6 flex flex-col md:flex-row gap-4 items-center relative">
        <GoBackButton />
        <div className="md:w-1/2 flex flex-col gap-2 justify-center">
          <h2 className="text-2xl text-blue-700 font-bold mb-4">
            {product?.name}
          </h2>
          <p className="text-blue-500 font-bold mb-2">
            {t("form:questions.code.placeholder")}:{" "}
            <span className="text-gray-800 font-light">
              {product?.productCode}
            </span>
          </p>
          <p className="text-blue-500 font-bold mb-2">
            {t("form:questions.characteristics.placeholder")}:{" "}
            <span className="text-gray-800 font-light">
              {product?.productProperties}
            </span>
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-blue-500 font-bold">
              <p>{t("form:questions.prices.titleUSD")}:</p>
              <p className="text-gray-800 font-light">
                {product?.currencies.USD}
              </p>
            </div>
            <div className="text-blue-500 font-bold">
              <p>{t("form:questions.prices.titleEUR")}:</p>
              <p className="text-gray-800 font-light">
                {product?.currencies.EUR}
              </p>
            </div>
            <div className="text-blue-500 font-bold">
              <p>{t("form:questions.prices.titleGBP")}:</p>
              <p className="text-gray-800 font-light">
                {product?.currencies.GBP}
              </p>
            </div>
          </div>
          {userRole === "admin" && (
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
