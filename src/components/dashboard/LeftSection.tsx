import React, { useEffect, useRef, useState } from "react";
import useSocket, {
  ControlStateType,
  MobileStateData,
  NavigationData,
} from "../../hooks/useSocket";
import { shapeIconImg } from "../../types/public/assets/assets_img";
import {
  blueEyeIconImg,
  // blueEyeIconImg,
  dcaWarringIconImg,
  whiteEyeHandleIconImg,
  whiteEyeIconImg,
  yellowEyeHandleIconImg,
  yellowEyeIconImg,
} from "../../types/public/warring/warring_img";
import {
  andoridControllNoHandleImg,
  modalActiveHda4ViewIconImg,
} from "../../types/public/left-electron/left-electron_img";

interface LeftSectionProps {
  navigationState: NavigationData;
  controlStateData: ControlStateType;
  mobileActiveState: MobileStateData;
}

interface NotificationModalProps {
  isVisible: boolean;
  title: string;
  icon?: string;
  iconAlt?: string;
  backgroundColor?: string;
  textColor?: string;
  duration?: number; // 자동 사라지는 시간 (ms)
  onClose?: () => void;
  dcaLevel: number;
  description: string;
  WarringText: string;
}

export default function LeftSection({
  navigationState,
  controlStateData,
  mobileActiveState,
}: LeftSectionProps) {
  const timerSec = 5000;
  const [showNotification, setShowNotification] = useState(false);
  const [notificationConfig, setNotificationConfig] = useState({
    title: "",
    description: "",
    icon: "",
    backgroundColor: "#202124",
    textColor: "#FFFFFF",
  });

  // const [showHandFreeModal, setShowHandFreeModal] = useState<boolean>(false);
  // const [showHandUpModal, setShowHandUpModal] = useState<boolean>(false);

  const mobileTest = mobileActiveState.hda4FirstStep || "";
  const mobileTestTwo = mobileActiveState.hda4SecondStep || "";
  const mobileTestThree = mobileActiveState.hda4ThirdStep || "";

  const hda4FirstTimerRef = useRef<NodeJS.Timeout | null>(null);

  // 5초 타이머를 위한 useRef
  const hideTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  // 알림 조건 체크
  useEffect(() => {
    checkNotificationConditions();
  }, [navigationState, controlStateData, mobileActiveState]);

  // 5초 후 모달 숨김 함수
  const hideNotificationAfterDelay = () => {
    // 기존 타이머가 있다면 클리어
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
    }

    // 5초 후 모달 숨김
    hideTimeoutRef.current = setTimeout(() => {
      setShowNotification(false);
    }, timerSec); // 5초
  };

  //안드로이드 1단계
  useEffect(() => {
    // 기존 타이머 정리
    if (hda4FirstTimerRef.current) {
      clearTimeout(hda4FirstTimerRef.current);
      hda4FirstTimerRef.current = null;
    }

    if (
      mobileTest === "ON" ||
      mobileTestTwo === "ON" ||
      mobileTestThree === "ON"
    ) {
      hda4FirstTimerRef.current = setTimeout(() => {
        hda4FirstTimerRef.current = null;
      }, 5000);
    } else if (
      mobileTest === "OFF" ||
      mobileTestTwo === "OFF" ||
      mobileTestThree === "OFF"
    ) {
      hda4FirstTimerRef.current = setTimeout(() => {
        hda4FirstTimerRef.current = null;
      }, 5000);
    } else {
      // 초기 상태 ("")
    }

    return () => {
      if (hda4FirstTimerRef.current) {
        clearTimeout(hda4FirstTimerRef.current);
        hda4FirstTimerRef.current = null;
      }
    };
  }, [navigationState?.velocityData?.enableHDA, mobileTest]);

  // 컴포넌트 언마운트 시 타이머 클리어
  useEffect(() => {
    return () => {
      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current);
      }
    };
  }, []);

  const checkNotificationConditions = () => {
    const { velocityData } = navigationState;

    if (velocityData.eORLevel == 1 || controlStateData.state === "eor-on") {
      showNotificationWithConfig({
        title: "전방을 주시하십시오.",
        icon: blueEyeIconImg,
        backgroundColor: "#1D1E21",
        textColor: "#FFFFFF",
        description: "",
      });
      return;
    }

    if (
      velocityData.eORLevel == 2 ||
      controlStateData.state === "eor-on-second"
    ) {
      showNotificationWithConfig({
        title: "전방을 주시하십시오.",
        icon: whiteEyeIconImg,
        backgroundColor: "#AD2621",
        textColor: "#FFFFFF",
        description: "",
      });
      return;
    }

    if (velocityData.hORLevel == 1 || controlStateData.state === "hor-on") {
      showNotificationWithConfig({
        title: "핸들을 잡으십시오.",
        icon: yellowEyeHandleIconImg,
        backgroundColor: "#1D1E21",
        textColor: "#FFFFFF",
        description: "",
      });
      return;
    }

    if (
      velocityData.hORLevel == 2 ||
      controlStateData.state === "hor-on-second"
    ) {
      showNotificationWithConfig({
        title: "핸들을 잡으십시오.",
        icon: whiteEyeHandleIconImg,
        backgroundColor: "#AD2621",
        textColor: "#FFFFFF",
        description: "",
      });
      return;
    }

    if (velocityData.dCALevel == 1 || controlStateData.state === "dca-on") {
      showNotificationWithConfig({
        title: "직접 운전하십시오",
        icon: dcaWarringIconImg,
        backgroundColor: "#AD2621",
        textColor: "#FFFFFF",
        description: "",
      });
      return;
    }

    if (
      velocityData.dCALevel == 2 ||
      controlStateData.state === "dca-on-second"
    ) {
      showNotificationWithConfig({
        title: `직접 운전하십시오`,
        icon: dcaWarringIconImg,
        backgroundColor: "#AD2621",
        textColor: "#FFFFFF",
        description: "비상 정차 중입니다.",
      });
      return;
    }

    if (controlStateData.state === "eor-hor-on") {
      showNotificationWithConfig({
        title: `전방을 주시하며, 
     핸들을 잡으십시오.`,
        icon: blueEyeIconImg,
        backgroundColor: "#1D1E21",
        textColor: "#FFFFFF",
        description: "",
      });
      return;
    }

    if (controlStateData.state === "eor-hor-on-second") {
      showNotificationWithConfig({
        title: `전방을 주시하며, 
  핸들을 잡으십시오.`,
        icon: whiteEyeHandleIconImg,
        backgroundColor: "#AD2621",
        textColor: "#FFFFFF",
        description: "",
      });
      return;
    }

    if (mobileActiveState.hda4FirstStep === "OFF") {
      showNotificationWithConfig({
        title: `전방을 주시하십시오.`,
        icon: blueEyeIconImg,
        backgroundColor: "#1D1E21",
        textColor: "#FFFFFF",
        description: "",
      });
      return;
    } else if (mobileActiveState.hda4FirstStep === "ON") {
      showNotificationWithConfig({
        title: `핸들을 잡으십시오  
  폭우가 감지되었습니다.`,
        icon: andoridControllNoHandleImg,
        backgroundColor: "#1D1E21",
        textColor: "#FFFFFF",
        description: "",
      });
      return;
    }

    if (mobileActiveState.hda4FirstStep === "OFF") {
      showNotificationWithConfig({
        title: `전방을 주시하십시오.`,
        icon: blueEyeIconImg,
        backgroundColor: "#1D1E21",
        textColor: "#FFFFFF",
        description: "",
      });
      return;
    } else if (mobileActiveState.hda4FirstStep === "ON") {
      showNotificationWithConfig({
        title: `핸들을 잡으십시오  
        폭우가 감지되었습니다.`,
        icon: andoridControllNoHandleImg,
        backgroundColor: "#1D1E21",
        textColor: "#FFFFFF",
        description: "",
      });
      return;
    }

    if (mobileActiveState.hda4SecondStep === "OFF") {
      showNotificationWithConfig({
        title: `전방을 주시하십시오.`,
        icon: blueEyeIconImg,
        backgroundColor: "#1D1E21",
        textColor: "#FFFFFF",
        description: "",
      });
      return;
    } else if (mobileActiveState.hda4SecondStep === "ON") {
      showNotificationWithConfig({
        title: `핸들을 잡으십시오  
  폭우가 감지되었습니다.`,
        icon: andoridControllNoHandleImg,
        backgroundColor: "#1D1E21",
        textColor: "#FFFFFF",
        description: "",
      });
      return;
    }

    if (mobileActiveState.hda4ThirdStep === "OFF") {
      showNotificationWithConfig({
        title: `전방을 주시하십시오.`,
        icon: blueEyeIconImg,
        backgroundColor: "#1D1E21",
        textColor: "#FFFFFF",
        description: "",
      });
      return;
    } else if (mobileActiveState.hda4ThirdStep === "ON") {
      showNotificationWithConfig({
        title: `핸들을 잡으십시오  
  폭우가 감지되었습니다.`,
        icon: andoridControllNoHandleImg,
        backgroundColor: "#1D1E21",
        textColor: "#FFFFFF",
        description: "",
      });
      return;
    }

    if (mobileActiveState.handsOn) {
      showNotificationWithConfig({
        title: `핸들을 잡으십시오  
  폭우가 감지되었습니다.`,
        icon: andoridControllNoHandleImg,
        backgroundColor: "#1D1E21",
        textColor: "#FFFFFF",
        description: "",
      });
      return;
    }

    if (mobileActiveState.handsFree) {
      showNotificationWithConfig({
        title: `전방을 주시하십시오.`,
        icon: modalActiveHda4ViewIconImg,
        backgroundColor: "#1D1E21",
        textColor: "#FFFFFF",
        description: "",
      });
      return;
    }

    // 모든 조건이 false면 알림 즉시 숨기기 + 타이머 클리어
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
    }
    setShowNotification(false);
  };

  const showNotificationWithConfig = (config: typeof notificationConfig) => {
    setNotificationConfig(config);
    setShowNotification(true);

    // 모달이 표시되면 5초 후 자동 숨김 타이머 시작
    hideNotificationAfterDelay();
  };

  const dcaLevel = navigationState?.velocityData.dCALevel;

  const WarringText = controlStateData.state;

  return (
    <>
      <div className={`${dcaLevel >= 1 ? "w-[20%] " : "w-[20%]"} relative`}>
        <div className="relative bg-[#202124] rounded-[24px] p-[20px] pb-[20px] overflow-hidden">
          {/* 배터리 정보 표시 */}
          <div className="flex items-center justify-start gap-[8px] py-[5px] px-[5px]">
            {/* 번개 아이콘 */}
            <img
              className="w-[22px] h-[22px]"
              src={shapeIconImg}
              alt="전력 아이콘"
            />

            {/* 주행 가능 거리 */}
            <span className="text-white text-[45px] font-semibold tracking-wide">
              342
            </span>
            <span className="text-[#696969] text-[25px] self-end pb-[5px]">
              km
            </span>

            {/* 배터리 퍼센트 */}
            <span className="text-white text-[45px] font-semibold tracking-wide ml-[15px]">
              42
            </span>
            <span className="text-[#696969] text-[25px] self-end pb-[5px]">
              %
            </span>
          </div>

          {/* 배터리 게이지 - 박스 내부 하단에 위치 */}
          <div className="absolute bottom-0 left-0 w-full h-[8px]">
            {/* 배터리 배경 */}
            <div className="absolute top-0 left-0 w-full h-full bg-[#3A3A3A]"></div>
            {/* 배터리 잔량 - 42%에 맞춤 */}
            <div
              className="absolute top-0 left-0 h-full bg-[#8D8D8D]"
              style={{ width: "42%" }}
            ></div>
          </div>
        </div>

        <NotificationModal
          isVisible={showNotification}
          title={notificationConfig.title}
          icon={notificationConfig.icon}
          backgroundColor={notificationConfig.backgroundColor}
          textColor={notificationConfig.textColor}
          description={notificationConfig.description}
          dcaLevel={dcaLevel}
          WarringText={WarringText}
        />
      </div>
    </>
  );
}

const NotificationModal: React.FC<NotificationModalProps> = ({
  isVisible,
  title,
  icon,
  iconAlt = "알림 아이콘",
  backgroundColor = "#202124",
  textColor = "#FFFFFF",
  dcaLevel,
  description,
  WarringText,
}) => {
  return (
    <div
      className={`
          absolute top-0 left-0 z-50 w-full 
          transition-all duration-700 ease-out
 ${isVisible ? "opacity-100" : "opacity-0"}
        `}
    >
      <div
        className={`${
          dcaLevel >= 1 ? "h-auto" : "h-auto"
        }relative rounded-[24px] p-[20px] overflow-hidden shadow-lg`}
        style={{ backgroundColor }}
      >
        {/* 알림 내용 */}
        <div className="flex items-center justify-center gap-[12px] py-[8px] px-[8px]">
          {/* 아이콘 (선택적) */}
          {icon && (
            <img
              className={`${
                dcaLevel >= 1 ? "w-[90px] h-[70px]" : "w-auto"
              } flex-shrink-0`}
              src={icon}
              alt={iconAlt}
            />
          )}

          {/* 알림 텍스트 */}
          <div className="flex flex-col">
            <p
              className={`${
                WarringText === "eor-hor-on" ? "text-[22px]" : "text-[22px]"
              } font-semibold text-center flex-1 whitespace-pre`}
              style={{ color: textColor }}
            >
              {title}
            </p>
            {dcaLevel >= 2 && (
              <p
                className="text-[18px] font-medium text-center flex-1 whitespace-pre"
                style={{ color: textColor }}
              >
                {description}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
