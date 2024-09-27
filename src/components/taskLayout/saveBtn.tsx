import { useAddNewTopic } from "../../contexts/addNewTopicContext";
import { useGoogleAuth } from "../../contexts/googleAuthContext";
import { useTheme } from "../../contexts/themeContext";

interface SaveBtnProps {
  disableSaveBtn: boolean;
  isAddTopicInputEmpty: boolean;
}
export {};
export const SaveBtn: React.FC<SaveBtnProps> = ({
  disableSaveBtn,
  isAddTopicInputEmpty,
}) => {
  const { themeOptions, theme } = useTheme();
  const { GoogleUserInfo } = useGoogleAuth();
  const { getSendBtnStatus } = useAddNewTopic();

  const handleBtnSend = () => {
    if (typeof GoogleUserInfo?.sub === "string")
      getSendBtnStatus(true, GoogleUserInfo?.sub);
  };

  return (
    <div>
      <button
        className="flex items-center justify-center gap-1 text-xl font-semibold rounded-md p-2"
        onClick={handleBtnSend}
        style={
          disableSaveBtn
            ? {
                cursor: "not-allowed",
                backgroundColor: themeOptions.sliderDurationBgColor,
              }
            : { backgroundColor: themeOptions.sliderDurationBgColor }
        }
        disabled={disableSaveBtn}
      >
        {isAddTopicInputEmpty ? (
          <>
            <span>Topic Not Chosen!</span>
            <img src="/assets/icons/send_disabled.png" alt="" width="20" />
          </>
        ) : (
          <>
            {disableSaveBtn ? (
              <>
                <span>Description Empty!</span>
                <img src="/assets/icons/send_disabled.png" alt="" width="20" />
              </>
            ) : (
              <>
                <span>Send</span>
                {theme ? (
                  <img src="/assets/icons/send_light.png" alt="" width="20" />
                ) : (
                  <img src="/assets/icons/send.png" alt="" width="20" />
                )}
              </>
            )}
          </>
        )}
      </button>
    </div>
  );
};
