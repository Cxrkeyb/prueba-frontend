import NothingFooter from "./NothingFooter";
import PrincipalFooter from "./principal";

const footersMap: {
  [key: string]: React.FC<{ children: JSX.Element }>;
} = {
  "/": PrincipalFooter,
  "/login": PrincipalFooter,
  "/enterprise": PrincipalFooter,
  "/products": PrincipalFooter,
};

export default footersMap;
