import { useTranslation } from "next-i18next";
import React, { useEffect, useState } from "react";

export default function Footer() {
  const { t } = useTranslation("common");

  return (
    <footer className={`bg-blue-500 text-white py-8 px-4 sm:px-6 lg:px-8 w-full block`}>
      <div className="w-full">
        <div className="max-w-screen-xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="text-center md:text-left">
              <p className="text-lg font-bold">{t("contactUs")}</p>
              <p>{t("email")}: example@example.com</p>
              <p>{t("phone")}: +1234567890</p>
            </div>
            <div className="text-center md:text-right">
              <p className="text-lg font-bold">{t("followUs")}</p>
              <div className="flex justify-center md:justify-end space-x-4">
                <a href="#" className="hover:text-primary/90">
                  {t("twitter")}
                </a>
                <a href="#" className="hover:text-primary/90">
                  {t("facebook")}
                </a>
                <a href="#" className="hover:text-primary/90">
                  {t("instagram")}
                </a>
              </div>
            </div>
          </div>
          <p className="text-center mt-4">
            &copy; {new Date().getFullYear()} {t("myWebsiteAllRightsReserved")}
          </p>
        </div>
      </div>
    </footer>
  );
}
