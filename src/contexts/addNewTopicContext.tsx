import { createContext, ReactNode, useContext, useState } from "react";
import { createNewTask } from "./userActions";

interface Completed {
  sub: string | number;
  date: string;
  day: string;
  tasks: Task[];
}

interface Task {
  from: string;
  to: string;
  duration: string;
  topic: string;
  description: string;
}

type AddNewTopicContextType = {
  getTopic: (topic: string) => void;
  getDuration: (from: string, to: string, duration: string) => void;
  getDescription: (desc: string) => void;
  getSendBtnStatus: (status: boolean, sub: string) => void;
};

interface AddNewTopicProviderProps {
  children: ReactNode;
}

const AddNewTopicContext = createContext<AddNewTopicContextType | null>(null);

export const AddNewTopicProvider = ({ children }: AddNewTopicProviderProps) => {
  const [taskData, setTaskData] = useState<Task>({
    from: "",
    to: "",
    duration: "",
    topic: "",
    description: "",
  });

  const getTopic = (topic: string) => {
    if (topic) {
      setTaskData((prevData) => ({ ...prevData, topic }));
    }
  };

  const getDuration = (from: string, to: string, duration: string) => {
    setTaskData((prevData) => ({ ...prevData, from, to, duration }));
  };

  const getDescription = (description: string) => {
    setTaskData((prevData) => ({ ...prevData, description }));
  };

  const getSendBtnStatus = async (status: boolean, sub: string) => {
    if (status) {
      const currentDate = new Date();
      const completed: Completed = {
        sub: sub,
        date: currentDate.toISOString().split("T")[0], // Format: YYYY-MM-DD
        day: currentDate.toLocaleString("en-US", { weekday: "long" }),
        tasks: [taskData],
      };

      console.log(completed);

      try {
        const result = await createNewTask(completed);
        console.log("Task created successfully:", result);

        // Reset the form or perform any other necessary actions
        setTaskData({
          from: "",
          to: "",
          duration: "",
          topic: "",
          description: "",
        });

        // Refresh the page
        window.location.reload();
      } catch (error) {
        console.error("Failed to create task:", error);
      }
    }
  };

  const values: AddNewTopicContextType = {
    getTopic,
    getDuration,
    getDescription,
    getSendBtnStatus,
  };

  return (
    <AddNewTopicContext.Provider value={values}>
      {children}
    </AddNewTopicContext.Provider>
  );
};

export const useAddNewTopic = () => {
  const context = useContext(AddNewTopicContext);
  if (context === null) {
    throw new Error("useAddNewTopic must be used within a AddNewTopicProvider");
  }
  return context;
};
