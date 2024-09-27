import { useTheme } from "../../contexts/themeContext";

export const SectionCalendar = () => {
  const { theme } = useTheme();

  return (
    <section className="h-[50vh] w-full">
      <div className="w-full p-4 gap-2 flex justify-center items-center">
        {theme ? (
          <img
            src="/assets/icons/calendar_light.png"
            alt=""
            height="28"
            width="28"
          />
        ) : (
          <img src="/assets/icons/calendar.png" alt="" height="28" width="28" />
        )}
        <span className="text-3xl font-semibold">Calendar</span>
      </div>
      {/* Data Wrapper */}
      <div className="w-full"></div>
    </section>
  );
};
