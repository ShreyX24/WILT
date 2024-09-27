import { NavLink } from "react-router-dom";
import { useTheme } from "../../../contexts/themeContext";

type SettingsCompProp = {
  to: string;
  src_light: string;
  src: string;
  width: string;
  itemName: string;
};

export const SettingsItemComp = ({
  to,
  src_light,
  src,
  width,
  itemName,
}: SettingsCompProp) => {
  const { theme } = useTheme();
  return (
    <li className="hover:outline-dashed cursor-pointer px-2">
      <NavLink to={to} className="flex items-center gap-1">
        {theme ? (
          <img src={src_light} alt="" width="24" />
        ) : (
          <img src={src} alt="" width={width} />
        )}
        {itemName}
      </NavLink>
    </li>
  );
};
