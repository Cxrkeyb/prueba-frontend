import { default as HeadComponent } from "next/head";

interface Props {
  title?: string;
  url?: string;
  image?: string;
  description?: string;
  user?: string;
}

const Head = ({
  title = "Startup",
  url,
  image,
  description,
  user = "Startup",
}: Props) => {
  const titleDefault = `${title}`;
  const imageDefault = image ?? "";

  return (
    <HeadComponent>
      <title key="custom-title">{titleDefault}</title>
      <link rel="icon" href="/favicon.ico" />
      <meta
        name="description"
        content={
          description ||
          "Descubre soluciones innovadoras para potenciar tu empresa con nuestra plataforma. En nuestra startup SAS, nos especializamos en resolver los desafíos empresariales mediante el desarrollo de software que mejora la conexión entre empresas y empleados. Optimiza tus procesos, impulsa la eficiencia y fortalece la colaboración interna. Únete a nosotros para transformar tu negocio, aprovechar nuevas oportunidades y alcanzar el éxito conjunto. Regístrate para conocer cómo podemos resolver tus problemas empresariales y llevar tu organización al siguiente nivel."
        }
      />

      {/* FACEBOOK & OTHER SITES */}
      <meta property="og:title" content={titleDefault} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={imageDefault} />
      <meta property="og:url" content={url} />
      {/* TWITTER CARD */}
      <meta name="twitter:title" content={titleDefault} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageDefault} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={`@${user}`} />
      <meta name="twitter:creator" content={`@${user}`} />
    </HeadComponent>
  );
};

export default Head;
