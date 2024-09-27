import React, { useState } from "react";
import { Navbar } from "../../../components/taskLayout/navbar";
import { AddTopicLayout } from "../../../components/taskLayout/addTopicLayout";
import { AddDescriptionLayout } from "../../../components/taskLayout/addDescriptionLayout";
import { SaveBtn } from "../../../components/taskLayout/saveBtn";
import { useGoogleAuth } from "../../../contexts/googleAuthContext";
import { TaskLayoutSkeleton } from "./taskLayoutSkeleton";

export const TaskLayout = () => {
  const [disableSaveBtn, setDisableSaveBtn] = useState<boolean>(true);
  const [isAddTopicInputEmpty, setIsAddTopicInputEmpty] =
    useState<boolean>(true);

  const { isLoggedIn } = useGoogleAuth();

  return (
    <div className="w-full h-full flex flex-col gap-2 items-center text-center p-2 md:gap-16 md:justify-start md:items-center">
      {/* Logo */}
      <span
        id="appName"
        className="w-[400px] h-[120px] text-[50px] md:w-[500px] md:text-[70px] fontSuse"
      >
        What I Learned{" "}
        <span className="text-[70px] md:text-[90px] fontSuse">Today</span>
      </span>

      <Navbar />

      {isLoggedIn ? (
        <>
          <AddTopicLayout
            setIsAddTopicInputEmpty={setIsAddTopicInputEmpty}
            isAddTopicInputEmpty={isAddTopicInputEmpty}
          />

          <AddDescriptionLayout setDisableSaveBtn={setDisableSaveBtn} />

          <SaveBtn
            disableSaveBtn={disableSaveBtn}
            isAddTopicInputEmpty={isAddTopicInputEmpty}
          />
        </>
      ) : (
        <TaskLayoutSkeleton />
      )}
    </div>
  );
};
