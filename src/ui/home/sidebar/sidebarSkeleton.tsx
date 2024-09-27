import React from "react";
import { useTheme } from "../../../contexts/themeContext";

export const SidebarSkeleton = () => {
  const { themeOptions } = useTheme();
  return (
    <div
      className="w-full h-full flex items-center justify-center"
      style={{ borderColor: themeOptions.borderColor }}
    >
      <div className="flex flex-col items-center text-xl">
        <span>Nothing Here...</span>
        <span>
          <strong>Sign in</strong> to populate data here
        </span>
      </div>
    </div>
  );
};
