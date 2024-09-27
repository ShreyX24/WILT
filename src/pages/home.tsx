import React from "react";

import { useTheme } from "../contexts/themeContext";
import { Sidebar } from "../ui/home/sidebar/sidebar";
import { TaskLayout } from "../ui/home/taskLayout/taskLayout";

export const Home = () => {
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
