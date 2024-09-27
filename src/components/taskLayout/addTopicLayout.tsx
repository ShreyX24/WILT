import React, { useEffect, useRef, useState } from "react";
import { useTheme } from "../../contexts/themeContext";
// import { useNavigate } from "react-router-dom";
import { InputSlider } from "./inputSlider";
import { getUserData } from "../../contexts/userActions";
import { useGoogleAuth } from "../../contexts/googleAuthContext";
import { useAddNewTopic } from "../../contexts/addNewTopicContext";

type User = {
  sub: string | number;
  name: string;
  given_name?: string;
  family_name?: string;
  picture?: string;
  email: string;
  email_verified?: boolean;
  completed: Array<{
    sub: string | number;
    date: string;
    day: string;
    tasks: Array<{
      from: string;
      to: string;
      duration: string;
      topic: string;
      description: string;
    }>;
  }>;
};

interface AddTopicLayoutProps {
  isAddTopicInputEmpty: boolean;
  setIsAddTopicInputEmpty: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AddTopicLayout: React.FC<AddTopicLayoutProps> = ({
  isAddTopicInputEmpty,
  setIsAddTopicInputEmpty,
}) => {
  const { themeOptions, theme } = useTheme();
  const { GoogleUserInfo } = useGoogleAuth();
  const { getTopic } = useAddNewTopic();

  const addTopicInputRef = useRef<HTMLInputElement>(null);
  const dropDownRef = useRef<HTMLInputElement>(null);
  const [isAddInpFocused, setIsAddInpFocused] = useState(false);
  const [isAddTopicClicked, setIsAddTopicClicked] = useState(false);
  const [userTasks, setUserTasks] = useState<User | null>(null);

  // const navigate = useNavigate();

  useEffect(() => {
    const fetchUserTasks = async () => {
      if (GoogleUserInfo?.sub) {
        try {
          const userDataPromise = getUserData(GoogleUserInfo.sub);

          const userData = await userDataPromise;
          // console.log("Resolved user data:", userData); // This will log the resolved data

          setUserTasks(userData);
        } catch (err) {
          console.error("Error fetching user tasks:", err);
        }
      }
    };

    fetchUserTasks();
  }, [GoogleUserInfo]);

  useEffect(() => {
    const checkFocus = () => {
      setIsAddInpFocused(document.activeElement === addTopicInputRef.current);
    };

    // Check focus on mount
    checkFocus();

    // Add event listeners
    document.addEventListener("focus", checkFocus, true);
    // document.addEventListener("blur", checkFocus, true);

    // Clean up
    return () => {
      document.removeEventListener("focus", checkFocus, true);
      // document.removeEventListener("blur", checkFocus, true);
    };
  }, []);

  const handleClick = (item: string) => {
    if (addTopicInputRef.current)
      addTopicInputRef.current.value = item.toString();
    setIsAddInpFocused(false);
    setIsAddTopicInputEmpty(false);
  };

  const handleAddTopic = () => {
    addTopicInputRef.current?.focus();
    setIsAddTopicClicked(true);
    setIsAddInpFocused(false);
  };

  const handleNewTopicSubmit = () => {
    setIsAddInpFocused(true);

    //This is just for simulation purposes,
    //it shall be integrated with a db that relates to user and renders the data accordingly

    if (addTopicInputRef.current?.value) {
      console.log(addTopicInputRef.current?.value);

      addTopicInputRef.current.value = "";
      setIsAddTopicInputEmpty(true);
      setIsAddTopicClicked(false);
    }
  };

  const handleInputChange = () => {
    const inputValue = addTopicInputRef.current?.value;

    if (inputValue === "") {
      setIsAddTopicInputEmpty(true);
    } else {
      setIsAddTopicInputEmpty(false);
      if (typeof inputValue === "string") {
        getTopic(inputValue);
      }
    }

   
  };

  return (
    <div className="w-screen flex flex-col justify-center items-center font-bold gap-5 md:gap-[200px] md:w-auto">
      {/* Add Topic Section */}
      <div className="flex flex-col items-end justify-start gap-1 text-start md:flex-row md:gap-8 md:items-start">
        {/* Topic Input */}
        <div className="flex items-center justify-center gap-8">
          <div className="w-[60px] text-xl flex items-center gap-1">
            {theme ? (
              <img src="/assets/icons/topic_light.png" alt="" width="18" />
            ) : (
              <img src="/assets/icons/topic.png" alt="" width="18" />
            )}
            <span>Topic</span>
          </div>
          <div className="flex items-center justify-center">
            <input
              ref={addTopicInputRef}
              type="text"
              onChange={handleInputChange}
              placeholder={
                isAddTopicClicked ? `Add a Topic` : `Add or Search a Topic`
              }
              className="h-[35px] w-[230px] rounded-md outline-none px-2 "
              style={{
                backgroundColor: themeOptions.inputBackgroundColor,
                color: themeOptions.inputTextColor,
              }}
            />
            {isAddTopicClicked ? (
              <>
                {/* Submit Btn when Add Topic is clicked */}
                <button
                  className="absolute ml-[200px] md:mt-0 md:ml-[200px] w-[24px] h-[24px] rounded-md flex items-center justify-center cursor-pointer"
                  onClick={handleNewTopicSubmit}
                >
                  {isAddTopicInputEmpty ? (
                    <img
                      src="/assets/icons/check_disabled.png"
                      alt=""
                      width="26"
                    />
                  ) : theme ? (
                    <img src="/assets/icons/check.png" alt="" width="26" />
                  ) : (
                    <img
                      src="/assets/icons/check_light.png"
                      alt=""
                      width="26"
                    />
                  )}
                </button>
              </>
            ) : (
              <></>
            )}
          </div>
        </div>
        {/* Topic Dropdown */}
        {isAddInpFocused ? (
          <div
            ref={dropDownRef}
            className="w-[230px] h-[270px] absolute mt-[40px] md:ml-[92px] rounded-md z-10 flex flex-col items-start px-2 py-[2px] gap-1 overflow-auto"
            style={{
              backgroundColor: themeOptions.inputBackgroundColor,
              color: themeOptions.inputTextColor,
            }}
          >
            {/* Add topic btn */}
            <div
              className="w-full flex items-center py-1 border-t-[1px] gap-2 cursor-pointer hover:bg-[#0003] rounded-md px-4"
              style={{ borderColor: themeOptions.borderColor }}
              onClick={handleAddTopic}
            >
              {theme ? (
                <img
                  src="/assets/icons/add.png"
                  alt="/assets/icons/add.png"
                  width="24"
                />
              ) : (
                <img
                  src="/assets/icons/add_light.png"
                  alt="/assets/icons/add_light.png"
                  width="24"
                />
              )}
              <span>Add Topic</span>
            </div>

            {userTasks?.completed?.map((completedTask, completedIndex) => (
              <div
                key={completedIndex}
                className="w-[100%] flex flex-col items-start px-2 py-[2px] gap-1"
              >
                {completedTask.tasks.map((task, taskIndex) => (
                  <span
                    key={taskIndex}
                    className="w-[100%] overflow-clip text-ellipsis cursor-pointer hover:bg-[#0003] rounded-md p-[1px] px-2 flex"
                    onClick={() => handleClick(task.topic)}
                  >
                    {task.topic}
                  </span>
                ))}
              </div>
            ))}
          </div>
        ) : (
          <></>
        )}
      </div>

      {/* 'From what time' section */}
      <InputSlider />
    </div>
  );
};
