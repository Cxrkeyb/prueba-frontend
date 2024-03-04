const languages = [
  { label: "constants:languages.english", value: "en" },
  { label: "constants:languages.french", value: "fr" },
  { label: "constants:languages.german", value: "de" },
  { label: "constants:languages.spanish", value: "es" },
  { label: "constants:languages.portuguese", value: "pt" },
  { label: "constants:languages.russian", value: "ru" },
  { label: "constants:languages.japanese", value: "ja" },
  { label: "constants:languages.korean", value: "ko" },
  { label: "constants:languages.chinese", value: "zh" },
] as const;

const servicesTypes = [
  {
    label: "constants:serviceTypes.digitalExperiencePlatform",
    value: "Digital Experience Plataform",
  },
  {
    label: "constants:serviceTypes.digitalCommerce",
    value: "Digital Commerce",
  },
  {
    label: "constants:serviceTypes.customSoftwareDevelopment",
    value: "Custom Software Development",
  },
  {
    label: "constants:serviceTypes.customAppDevelopment",
    value: "Custom App Development",
  },
  {
    label: "constants:serviceTypes.digitalMarketing",
    value: "Digital Marketing",
  },
  {
    label: "constants:serviceTypes.digitalProductConsulting",
    value: "Digital Product Consulting",
  },
  {
    label: "constants:serviceTypes.digitalTransformation",
    value: "Digital Transformation",
  },
  {
    label: "constants:serviceTypes.digitalEcosystem",
    value: "Digital Ecosystem",
  },
  {
    label: "constants:serviceTypes.other",
    value: "Other",
  },
] as const;

const companyTypes = [
  {
    label: "constants:companyTypes.enterprise",
    value: "Enterprise",
  },
  {
    label: "constants:companyTypes.midMarket",
    value: "Mid-Market",
  },
  {
    label: "constants:companyTypes.startup",
    value: "Startup",
  },
  {
    label: "constants:companyTypes.nonProfit",
    value: "Non-Profit",
  },
  {
    label: "constants:companyTypes.other",
    value: "Other",
  },
] as const;

const companySizes  = [
  {
    label: "1-10",
    value: "1-10",
  },
  {
    label: "11-50",
    value: "11-50",
  },
  {
    label: "51-200",
    value: "51-200",
  },
  {
    label: "201-500",
    value: "201-500",
  },
  {
    label: "501-1000",
    value: "501-1000",
  },
  {
    label: "1001-5000",
    value: "1001-5000",
  },
  {
    label: "5001-10000",
    value: "5001-10000",
  },
  {
    label: "10001+",
    value: "10001+",
  },
] as const;

const topicNeeds = [
  {
    label: "constants:topicNeeds.uxDesign",
    value: "UX Design",
  },
  {
    label: "constants:topicNeeds.uiDesign",
    value: "UI Design",
  },
  {
    label: "constants:topicNeeds.frontendDevelopment",
    value: "Frontend Development",
  },
  {
    label: "constants:topicNeeds.backendDevelopment",
    value: "Backend Development",
  },
  {
    label: "constants:topicNeeds.mobileDevelopment",
    value: "Mobile Development",
  },
  {
    label: "constants:topicNeeds.webDevelopment",
    value: "Web Development",
  },
  {
    label: "constants:topicNeeds.cloudServices",
    value: "Cloud Services",
  },
  {
    label: "constants:topicNeeds.devOps",
    value: "DevOps",
  },
  {
    label: "constants:topicNeeds.other",
    value: "Other",
  },
] as const;

export {
  languages,
  servicesTypes,
  companyTypes,
  companySizes,
  topicNeeds,
}