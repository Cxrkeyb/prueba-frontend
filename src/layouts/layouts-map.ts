import NothingLayout from "./nothing";
import PrincipalLayout from "./principal";

const layoutsMap: {
  [key: string]: React.FC<{ children: JSX.Element }>;
} = {
  "/": PrincipalLayout,
  "/login": PrincipalLayout,
  "/enterprise": PrincipalLayout,
  "/products": PrincipalLayout,
};

export default layoutsMap;
