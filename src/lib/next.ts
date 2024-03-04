import acceptLanguage from "accept-language";
import { GetServerSidePropsContext } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import {
  allowedLanguages,
  allTranslations,
  defaultLanguage,
} from "@/constants";

export default async function getServerSideSharedProps(
  ctx: GetServerSidePropsContext
) {
  acceptLanguage.languages(allowedLanguages);
  const lang = ctx.req.headers["accept-language"]
    ? acceptLanguage.get(ctx.req.headers["accept-language"])
    : defaultLanguage;

  return {
    ...(await serverSideTranslations(lang as string, allTranslations)),
  };
}
