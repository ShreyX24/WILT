import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

type ThemeContextType = {
  theme: boolean;
  toggleTheme: () => void;
  themeOptions: {
    //master
    backgroundColor: string;
    borderColor: string;
    color: string;

    //btn
    btnBackgroundColor: string;

    //theme btn
    themeBtnBackgroundColor: string;

    //add layout btn
    inputBackgroundColor: string;
    inputTextColor: string;
    addTopicSbmtBtnDisabled: string;

    //add description
    descriptionBgColor: string;
    descriptionTextColor: string;

    //Slider btn
    sliderBgColor: string;
    sliderRangeBgColor: string;
    sliderBarBgColor: string;
    sliderTextColor: string;
    sliderInputColor: string;
    sliderInputBorderColor: string;
    sliderInputOptionTextColor: string;
    sliderDurationBgColor: string;

    //new Learning
    nLearningBgColor: string;
    nLearningTilesHoverBgColor: string;
    nLearningTilesBgColor: string;
    nLearningTextColor: string;

    //history Topic
    historyTopicBgColor: string;
    historyTopicTextColor: string;
    historySorterBgColor: string;
    historySorterBtnBgColor: string;
    historySorterActiveBtnSliderBgColor: string;

    //login form
    formBgColor: string;
    formTextColor: string;
    formInputBgColor: string;
    formInputTextColor: string;
    formSendBgColor: string;
    formTextBgColor: string;
    formSendTextColor: string;
  };
};

interface ThemeProviderPropsType {
  children: ReactNode;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

export const ThemeProvider = ({ children }: ThemeProviderPropsType) => {
  //Theme is dark if true and white if false
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme ? JSON.parse(savedTheme) : false;
  });

  useEffect(() => {
    localStorage.setItem("theme", JSON.stringify(theme));
  }, [theme]);

  const toggleTheme = () => {
    setTheme(!theme);
  };

  const colors = {
    yellow: "#ffd25a",
    light_yellow: "#f5b32f",
    black: "#222831",
    light_black1: "#919191",
    light_black2: "#373f49f6",
    grey: "#949494",
    light_grey: "#2c2f3383",
    white: "#ffffff",
    white_cream: "#F9F9F9",
    transparent_black: "#4747475b",
    transparent_gray: "#94949481",
  };

  const themeOptions = {
    // master colors
    backgroundColor: theme ? colors.black : colors.yellow,
    color: theme ? colors.yellow : colors.black,
    borderColor: theme ? colors.transparent_gray : colors.transparent_black,

    //btn hover colors
    btnBackgroundColor: theme
      ? colors.transparent_gray
      : colors.transparent_black,

    //theme btn colors
    themeBtnBackgroundColor: theme ? colors.yellow : colors.black,

    //addTopic input color
    inputBackgroundColor: theme ? colors.yellow : colors.black,
    inputTextColor: theme ? colors.black : colors.yellow,

    //addTopic submit btn
    addTopicSbmtBtnDisabled: colors.transparent_black,

    //addTopic Slider
    sliderBgColor: theme ? colors.yellow : colors.black,
    sliderRangeBgColor: theme ? colors.light_black2 : colors.light_yellow,
    sliderBarBgColor: theme ? colors.white_cream : colors.grey,
    sliderTextColor: theme ? colors.yellow : colors.black,
    sliderInputBorderColor: theme
      ? colors.white_cream
      : colors.transparent_black,
    sliderInputColor: theme ? colors.yellow : colors.black,
    sliderInputOptionTextColor: theme ? colors.black : colors.yellow,
    sliderDurationBgColor: theme
      ? colors.transparent_gray
      : colors.transparent_black,

    //addDescription
    descriptionBgColor: theme ? colors.yellow : colors.black,
    descriptionTextColor: theme ? colors.black : colors.yellow,

    //newLearning color
    nLearningBgColor: theme ? colors.black : colors.yellow,
    nLearningTilesBgColor: theme ? colors.yellow : colors.black,
    nLearningTilesHoverBgColor: theme
      ? colors.light_yellow
      : colors.light_black1,
    nLearningTextColor: theme ? colors.black : colors.yellow,

    historyTopicBgColor: theme ? colors.yellow : colors.black,
    historyTopicTextColor: theme ? colors.black : colors.yellow,
    historySorterBgColor: theme ? colors.yellow : colors.black,
    historySorterBtnBgColor: theme
      ? colors.transparent_black
      : colors.transparent_gray,
    historySorterActiveBtnSliderBgColor: theme ? colors.black : colors.yellow,

    //login form
    formBgColor: theme ? colors.yellow : colors.black,
    formTextColor: theme ? colors.black : colors.yellow,
    formInputBgColor: theme ? colors.black : colors.yellow,
    formInputTextColor: theme ? colors.yellow : colors.black,
    formSendBgColor: theme ? colors.transparent_gray : colors.transparent_black,
    formTextBgColor: theme ? colors.black : colors.yellow,
    formSendTextColor: theme ? colors.yellow : colors.black,
  };

  const values = {
    theme,
    toggleTheme,
    themeOptions,
  };

  return (
    <ThemeContext.Provider value={values}>{children}</ThemeContext.Provider>
  );
};
