import React, { useState, useCallback, useEffect } from "react";
import { useTheme } from "../../contexts/themeContext";
import { useAddNewTopic } from "../../contexts/addNewTopicContext";

interface TimeInputProps {
  isStart: boolean;
}

interface CustomDropdownProps {
  options: string[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({
  options,
  value,
  onChange,
  className,
}) => {
  const { themeOptions } = useTheme();
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`px-2 py-1 rounded-md ${className} outline-none`}
      style={{
        backgroundColor: themeOptions.sliderInputColor,
        color: themeOptions.sliderInputOptionTextColor,
      }}
    >
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};

export const InputSlider: React.FC = () => {
  const { getDuration } = useAddNewTopic();
  const { theme, themeOptions } = useTheme();

  const [startTime, setStartTime] = useState({
    hours: "08",
    minutes: "00",
    period: "AM",
  });
  const [endTime, setEndTime] = useState({
    hours: "09",
    minutes: "00",
    period: "AM",
  });
  const [prevDuration, setPrevDuration] = useState({
    from: "",
    to: "",
    duration: "",
  });

  const convertToMinutes = useCallback(
    (time: { hours: string; minutes: string; period: string }) => {
      const hours = parseInt(time.hours);
      const minutes = parseInt(time.minutes);
      const totalHours =
        time.period === "PM" && hours !== 12
          ? hours + 12
          : hours === 12 && time.period === "AM"
          ? 0
          : hours;
      return totalHours * 60 + minutes;
    },
    []
  );

  const calculateDuration = useCallback(() => {
    const startInMinutes = convertToMinutes(startTime);
    const endInMinutes = convertToMinutes(endTime);

    const durationInMinutes = endInMinutes - startInMinutes;

    const hours = Math.floor(durationInMinutes / 60);
    const minutes = durationInMinutes % 60;

    return { hours, minutes };
  }, [startTime, endTime, convertToMinutes]);

  const handleStartTimeChange = (
    type: "hours" | "minutes" | "period",
    value: string
  ) => {
    setStartTime((prev) => ({ ...prev, [type]: value }));
  };

  const handleEndTimeChange = (
    type: "hours" | "minutes" | "period",
    value: string
  ) => {
    setEndTime((prev) => ({ ...prev, [type]: value }));
  };

  useEffect(() => {
    const duration = calculateDuration();
    const from = `${startTime.hours}:${startTime.minutes} ${startTime.period}`;
    const to = `${endTime.hours}:${endTime.minutes} ${endTime.period}`;
    const durationString = `${duration.hours}h ${duration.minutes}m`;

    if (
      from !== prevDuration.from ||
      to !== prevDuration.to ||
      durationString !== prevDuration.duration
    ) {
      getDuration(from, to, durationString);
      setPrevDuration({ from, to, duration: durationString });
    }
  }, [startTime, endTime, calculateDuration, getDuration, prevDuration]);
  

  const TimeInput: React.FC<TimeInputProps> = ({ isStart }) => {
    const time = isStart ? startTime : endTime;
    const handleTimeChange = isStart
      ? handleStartTimeChange
      : handleEndTimeChange;

    const hours = Array.from({ length: 12 }, (_, i) =>
      (i + 1).toString().padStart(2, "0")
    );
    const minutes = Array.from({ length: 60 }, (_, i) =>
      i.toString().padStart(2, "0")
    );
    const periods = ["AM", "PM"];

    return (
      <div className="flex items-center space-x-2">
        <CustomDropdown
          options={hours}
          value={time.hours}
          onChange={(value) => handleTimeChange("hours", value)}
          className="w-16"
        />
        <span>:</span>
        <CustomDropdown
          options={minutes}
          value={time.minutes}
          onChange={(value) => handleTimeChange("minutes", value)}
          className="w-16"
        />
        <CustomDropdown
          options={periods}
          value={time.period}
          onChange={(value) => handleTimeChange("period", value)}
          className="w-16"
        />
      </div>
    );
  };

  return (
    <div className="w-full md:w-auto flex flex-col items-center justify-center select-none">
      <div className="mt-4 text-center">
        <div className="flex flex-col items-center justify-center gap-5 md:flex-row md:space-x-4 md:gap-[50px]">
          <div className="flex justify-center items-center gap-6 md:flex-col md:gap-4">
            <div>
              {theme ? (
                <img src="/assets/icons/start_light.png" alt="" width="54" />
              ) : (
                <img src="/assets/icons/start.png" alt="" width="54" />
              )}
            </div>

            <TimeInput isStart={true} />
          </div>

          <div
            className="md:w-[190px] flex items-center gap-1 rounded-md p-1 px-2"
            style={{ backgroundColor: themeOptions.sliderDurationBgColor }}
          >
            <div>
              {theme ? (
                <img src="/assets/icons/duration_light.png" alt="" width="24" />
              ) : (
                <img src="/assets/icons/duration.png" alt="" width="24" />
              )}
            </div>
            <div className="flex gap-1">
              <span className="hidden md:block">Duration:</span>
              <span>
                {calculateDuration().hours}h {calculateDuration().minutes}m
              </span>
            </div>
          </div>

          <div className="flex justify-center items-center gap-6 md:flex-col md:gap-4">
            <div>
              {theme ? (
                <img src="/assets/icons/end_light.png" alt="" width="44" />
              ) : (
                <img src="/assets/icons/end.png" alt="" width="44" />
              )}
            </div>

            <TimeInput isStart={false} />
          </div>
        </div>
      </div>
    </div>
  );
};
