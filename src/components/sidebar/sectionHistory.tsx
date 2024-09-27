import { useTheme } from "../../contexts/themeContext";
import { HistoryTopic } from "./historyLayout/historyTopic";
import { useGoogleAuth } from "../../contexts/googleAuthContext";
import { SidebarSkeleton } from "../../ui/home/sidebar/sidebarSkeleton";



export const SectionHistory = () => {
  const { theme } = useTheme();
  const { isLoggedIn } = useGoogleAuth();

  return (
    <section className="h-[50vh] w-full flex-1 ">
      {/*Section Header */}
      <div className="w-full p-4 gap-2 flex justify-center items-center">
        {theme ? (
          <img
            src="/assets/icons/history_light.png"
            alt=""
            height="28"
            width="28"
          />
        ) : (
          <img src="/assets/icons/history.png" alt="" height="28" width="28" />
        )}
        <span className="text-3xl font-semibold">History</span>
      </div>

      {isLoggedIn ? <HistoryTopic /> : <SidebarSkeleton />}
    </section>
  );
};
