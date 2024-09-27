import { useState, useMemo, useEffect } from "react";
import { useTheme } from "../../../contexts/themeContext";
import { HistorySorter } from "./historySorter";
import { useGoogleAuth } from "../../../contexts/googleAuthContext";
import { deleteTask, getUserData } from "../../../contexts/userActions";

interface Task {
  id: string;
  from: string;
  to: string;
  duration: string;
  topic: string;
  description: string;
}

interface CompletedDay {
  id: string;
  date: string;
  day: string;
  sub: string;
  taskIds: string[];
  tasks: Task[];
  createdAt: string;
}

interface User {
  sub: string;
  name: string;
  email: string;
  email_verified: boolean;
  picture: string;
  completed: CompletedDay[];
  createdAt: string;
  id: string;
}

type SortType = "date" | "duration";

const groupTasksByDate = (
  completed: CompletedDay[]
): Record<string, CompletedDay> => {
  return completed.reduce((acc, day) => {
    acc[day.date] = day;
    return acc;
  }, {} as Record<string, CompletedDay>);
};

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  const yy = String(date.getFullYear()).slice(-2);
  const hh = String(date.getHours()).padStart(2, "0");
  const min = String(date.getMinutes()).padStart(2, "0");

  return `${mm}-${dd}-${yy} (${hh}:${min})`;
};

export const HistoryTopic = () => {
  const { themeOptions, theme } = useTheme();
  const [sortType, setSortType] = useState<SortType>("date");
  const { GoogleUserInfo } = useGoogleAuth();
  const [userTasks, setUserTasks] = useState<User | null>(null);
  const [deleteTaskId, setDeleteTaskId] = useState<string | null>(null);
  const [refreshTrigger, setRefreshTrigger] = useState<number>(0);

  useEffect(() => {
    const fetchUserTasks = async () => {
      if (GoogleUserInfo?.sub) {
        try {
          const userData = await getUserData(GoogleUserInfo.sub);
          setUserTasks(userData);
        } catch (err) {
          console.error("Error fetching user tasks:", err);
        }
      }
    };

    fetchUserTasks();
  }, [GoogleUserInfo, refreshTrigger]);

  const sortedCompletedDays = useMemo(() => {
    if (!userTasks) return [];

    let sorted = [...userTasks.completed];

    switch (sortType) {
      case "date":
        sorted.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );
        break;
      case "duration":
        sorted.sort((a, b) => {
          const totalDurationA = a.tasks.reduce(
            (sum, task) => sum + parseInt(task.duration),
            0
          );
          const totalDurationB = b.tasks.reduce(
            (sum, task) => sum + parseInt(task.duration),
            0
          );
          return totalDurationB - totalDurationA;
        });
        break;
    }

    return sorted;
  }, [userTasks, sortType]);

  const groupedTasks = useMemo(
    () => groupTasksByDate(sortedCompletedDays),
    [sortedCompletedDays]
  );

  const handleDeleteClick = (taskId: string) => {
    setDeleteTaskId(taskId);
  };

  const handleConfirmDelete = async (taskId: string) => {
    try {
      await deleteTask(taskId);
      console.log(`Deleted task with id: ${taskId}`);

      // Update the local state to reflect the deletion
      setUserTasks((prevUserTasks) => {
        if (!prevUserTasks) return null;

        const updatedCompleted = prevUserTasks.completed
          .map((completedDay) => {
            const updatedTasks = completedDay.tasks.filter(
              (task) => task.id !== taskId
            );
            return {
              ...completedDay,
              tasks: updatedTasks,
              taskIds: completedDay.taskIds.filter((id) => id !== taskId),
            };
          })
          .filter((completedDay) => completedDay.tasks.length > 0);

        return {
          ...prevUserTasks,
          completed: updatedCompleted,
        };
      });

      setDeleteTaskId(null);
      setRefreshTrigger((prev) => prev + 1);
    } catch (err) {
      console.error("Error deleting task:", err);
    }
  };

  const handleCancelDelete = () => {
    setDeleteTaskId(null);
  };

  if (!userTasks) {
    return (
      <div className="flex items-center justify-center h-[40vh]">
        {theme ? (
          <img
            src="/assets/animated_icons/writer_loading_light.gif"
            alt=""
            width="62"
          />
        ) : (
          <img
            src="/assets/animated_icons/writer_loading.gif"
            alt=""
            width="62"
          />
        )}
      </div>
    );
  }

  return (
    <div className="flex">
      <HistorySorter setSortType={setSortType} />
      <div className="h-[calc(100vh-140px)] px-4 w-[400px]  flex flex-col gap-2 overflow-auto justify-start">
        {Object.entries(groupedTasks).map(([date, completedDay], index) => (
          <div
            key={index}
            className="flex flex-col gap-2 rounded-md px-2 py-1 text-sm"
            style={{
              backgroundColor: themeOptions.historyTopicBgColor,
              color: themeOptions.historyTopicTextColor,
            }}
          >
            <div className="flex gap-1">
              <span className="font-bold">{completedDay.day}</span>
              <span className="font-bold">{formatDate(date)}</span>
            </div>

            {completedDay.tasks.map((task, taskIndex) => (
              <div key={taskIndex} className="flex flex-col px-4">
                <div className="flex items-center justify-between">
                  <span className="font-semibold flex items-center gap-1">
                    {theme ? (
                      <img src="/assets/icons/topic.png" alt="" width="18" />
                    ) : (
                      <img
                        src="/assets/icons/topic_light.png"
                        alt=""
                        width="18"
                      />
                    )}
                    {task.topic}
                  </span>

                  <div className="flex items-center gap-2">
                    <div className="flex items-center">
                      {deleteTaskId !== task.id ? (
                        <button
                          className=""
                          onClick={() => handleDeleteClick(task.id)}
                        >
                          {theme ? (
                            <img
                              src="/assets/icons/delete.png"
                              alt=""
                              width="16"
                            />
                          ) : (
                            <img
                              src="/assets/icons/delete_light.png"
                              alt=""
                              width="16"
                            />
                          )}
                        </button>
                      ) : (
                        <div className="flex items-center gap-2">
                          <button onClick={() => handleConfirmDelete(task.id)}>
                            {theme ? (
                              <img
                                src="/assets/icons/tick.png"
                                alt=""
                                width="12"
                              />
                            ) : (
                              <img
                                src="/assets/icons/tick_light.png"
                                alt=""
                                width="12"
                              />
                            )}
                          </button>
                          <button onClick={handleCancelDelete}>
                            {theme ? (
                              <img
                                src="/assets/icons/close.png"
                                alt=""
                                width="12"
                              />
                            ) : (
                              <img
                                src="/assets/icons/close_light.png"
                                alt=""
                                width="12"
                              />
                            )}
                          </button>
                        </div>
                      )}
                    </div>

                    <span className="font-semibold flex items-center gap-1 w-[75px]">
                      {theme ? (
                        <img
                          src="/assets/icons/duration.png"
                          alt=""
                          width="18"
                        />
                      ) : (
                        <img
                          src="/assets/icons/duration_light.png"
                          alt=""
                          width="18"
                        />
                      )}{" "}
                      {task.duration}
                    </span>
                  </div>
                </div>

                <p className="line-clamp-2 rounded-md py-1">
                  {task.description}
                </p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
