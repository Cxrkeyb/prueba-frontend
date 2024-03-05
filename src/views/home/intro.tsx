import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/navigation";
import React from "react";
import userStore from "@/store/userStore";

export default function Intro() {
  const router = useRouter();
  const { t } = useTranslation("common");

  const { user } = userStore();

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-yellow-500 font-extralight text-center">
        {t("intro.p1")}
      </h1>
      <h1 className="text-lg sm:text-xl md:text-2xl lg:text-4xl font-semibold text-center text-black">
        {t("intro.p2")}
      </h1>
      <div className="flex flex-col items-center text-sm sm:text-base md:text-lg lg:text-xl pt-4 md:pt-8 lg:pt-10 space-y-2">
        <p className="text-black">{t("intro.p3")}</p>
      </div>
      <div className="my-12 sm:my-16 md:my-20 lg:my-24 flex justify-center">
        {!user && (
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Button
              onClick={() => {
                router.push("/login");
              }}
              className="bg-yellow-500 hover:bg-yellow-600 text-lg sm:text-xl p-4 sm:p-6 lg:p-8 flex space-x-1"
            >
              <span className="text-black">{t("login")}</span>
            </Button>
          </motion.div>
        )}
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <Button
            onClick={() => {
              router.push("/enterprises");
            }}
            className="bg-black hover:bg-gray-900 text-lg sm:text-xl p-4 sm:p-6 lg:p-8 flex space-x-1 ml-4"
          >
            <span className="text-white">{t("viewEnterprises")}</span>
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
