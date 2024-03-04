import LayoutWrapper from "@/layouts";
import FooterWrapper from "@/footers";
import "@/styles/globals.css";
import { appWithTranslation } from "next-i18next";
import type { AppProps } from "next/app";

const App = ({ Component, pageProps }: AppProps) => (
  <LayoutWrapper>
    <FooterWrapper>
      <Component {...{ ...pageProps }} />
    </FooterWrapper>
  </LayoutWrapper>
);

export default appWithTranslation(App);
