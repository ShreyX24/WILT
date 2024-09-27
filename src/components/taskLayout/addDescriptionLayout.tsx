import React, { useRef } from "react";
import { useTheme } from "../../contexts/themeContext";
import { useAddNewTopic } from "../../contexts/addNewTopicContext";

interface AddDescriptionLayoutProps {
  setDisableSaveBtn: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AddDescriptionLayout: React.FC<AddDescriptionLayoutProps> = ({
  setDisableSaveBtn,
}) => {
  const { themeOptions } = useTheme();
  const { getDescription } = useAddNewTopic();
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const handleTextAreaChange = (e: any) => {
    const inputValue = textAreaRef.current?.value;

    if (textAreaRef.current?.value === "") {
      setDisableSaveBtn(true);
    } else {
      setDisableSaveBtn(false);
      if (typeof inputValue === "string") {
        getDescription(inputValue);
      }
    }
  };

  return (
    <div className="w-screen  md:w-auto">
      <textarea
        ref={textAreaRef}
        name="topicDescription"
        id="topicDescription"
        className="h-[270px] w-[380px] text-clip p-2 rounded-md outline-none md:h-[450px] md:w-[800px] resize-none"
        placeholder="I learned ..."
        onChange={handleTextAreaChange}
        style={{
          backgroundColor: themeOptions.descriptionBgColor,
          color: themeOptions.descriptionTextColor,
        }}
      ></textarea>
    </div>
  );
};
