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
import Swal from "sweetalert2";
import userStore from "@/store/userStore";
import { useRouter } from "next/navigation";

const LoginView = () => {
  const { t } = useTranslation(["common", "form", "constants"]);

  const { user, setUser } = userStore((state) => state);

  const router = useRouter();

  const formSchema = z.object({
    email: z.string().email(t("form:questions.email.codeError")),
    password: z.string().min(4, t("form:questions.password.codeError")),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    axios
      .post(
        "https://immortal-longhorn-trusty.ngrok-free.app/users/v1/login",
        {
          email: data.email,
          password: data.password,
        },
        {
          headers: { 
            "ngrok-skip-browser-warning": "69420",
          }
        }
      )
      .then((response) => {
        Swal.fire("Inicio de sesión exitoso", "Bienvenido", "success");
        setUser({
          email: response.data.data.user.email,
          token: response.data.data.jwt,
          name: response.data.data.user.name,
          role: response.data.data.user.role,
        });
      })
      .catch((error) => {
        console.log(error);
        Swal.fire("Error", "Error al iniciar sesión", "error");
      });
  }

  if (user) {
    return (
      <div className="bg-gray-100 rounded-md shadow-md p-6 max-w-md mx-auto mt-8 mb-[300px] justify-center items-center flex flex-col gap-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          ¡Bienvenido, {user.name}!
        </h1>
        <h2 className="text-lg text-gray-600">Email: {user.email}</h2>
        <Button
          className="
        bg-blue-500
        "
          onClick={() => {
            router.push("/enterprises");
          }}
        >
          {t("viewEnterprises")}
        </Button>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center border rounded-xl bg-gray-100 my-8 max-w-[800px] self-center">
      <div className="flex flex-col items-center justify-center w-full max-w-screen-md px-4 py-8">
        <div className="flex flex-col space-y-4 text-center">
          <span className="text-4xl font-bold">{t("form:login")}</span>
          <span className="text-lg font-bold">{t("form:loginPrompt")}</span>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 w-full p-8"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>{t("form:questions.email.title")}</FormLabel>
                  <FormControl className="w-full">
                    <Input
                      className="w-full"
                      placeholder={t("form:questions.email.placeholder")}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("form:questions.password.title")}</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder={t("form:questions.password.placeholder")}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button className="w-full bg-blue-500" type="submit">
              {t("common:submit")}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default LoginView;
