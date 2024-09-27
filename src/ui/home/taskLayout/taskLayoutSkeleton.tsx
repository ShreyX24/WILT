import React from "react";

export const TaskLayoutSkeleton = () => {
  return (
    <div className="w-full h-full flex items-center justify-center text-xl">
      <div>
        <span>
          Seems like you're not <strong>signed in</strong>...
        </span>
      </div>
    </div>
  );
};
