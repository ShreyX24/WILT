import { useTheme } from "../contexts/themeContext";
import { TaskLayout } from "../ui/home/taskLayout/taskLayout";
import { Sidebar } from "../ui/home/sidebar/sidebar";

export const HomeSkeleton = () => {
  const { themeOptions } = useTheme();
  return (
    <div
      className="h-screen w-screen flex"
      style={{
        backgroundColor: themeOptions.backgroundColor,
        color: themeOptions.color,
      }}
    >
      {/* sidebar with two different sections 1. history and 2. Calender with status*/}
      <Sidebar />

      {/* Task editor layout */}
      <TaskLayout />
    </div>
  );
};
