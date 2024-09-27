import { SectionCalendar } from "../../../components/sidebar/sectionCalendar";
import { SectionHistory } from "../../../components/sidebar/sectionHistory";
import { useTheme } from "../../../contexts/themeContext";

export const Sidebar = () => {
  const { themeOptions } = useTheme();
  return (
    <div
      className="hidden md:block md:h-screen md:w-[600px] border-r-[1px] "
      style={{ borderColor: themeOptions.borderColor }}
    >
      {/* History Seciton */}
      <SectionHistory />

      {/* Calendar Section */}
      {/* <SectionCalendar /> */}
    </div>
  );
};
