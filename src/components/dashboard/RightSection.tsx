import React, { useEffect, useState, useRef, useCallback } from "react";
import useSocket, {
  ControlStateType,
  MobileStateData,
  NavigationData,
} from "../../hooks/useSocket";
import { hda4FrontActiveIconImg } from "../../types/public/warring/warring_img";

interface RightSectionProps {
  navigationState: NavigationData;
  mobileActiveState: MobileStateData;
}

interface GearChangeModalProps {
  isVisible: boolean;
  gear: string;
  duration?: number;
  onClose?: () => void;
  setShowGearModal: React.Dispatch<React.SetStateAction<boolean>>;
}

interface HandFreeModalProps {
  isVisible: boolean;
  duration?: number;
  setShowHandFreeModal: React.Dispatch<React.SetStateAction<boolean>>;
}

// HandUpModal Props 인터페이스
interface HandUpModalProps {
  isVisible: boolean;
  duration?: number;
  setShowHandUpModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function RightSection({
  navigationState,
  mobileActiveState,
}: RightSectionProps) {
  const [showGearModal, setShowGearModal] = useState<boolean>(false);
  const [currentGear, setCurrentGear] = useState<string>("");
  const prevGearRef = useRef<string>("");

  useEffect(() => {
    const newGear = navigationState.velocityData.gear;

    // console.log("Gear check:", {
    //   prevGear: prevGearRef.current,
    //   newGear: newGear,
    //   isDifferent: prevGearRef.current !== newGear,
    //   isEmpty: prevGearRef.current === "",
    // });

    // 이전 기어와 현재 기어가 다르면 모달 표시
    if (prevGearRef.current !== "" && prevGearRef.current !== newGear) {
      console.log("Gear changed! Showing modal");
      setCurrentGear(newGear);
      setShowGearModal(true);
    }

    // 현재 기어를 이전 기어로 저장
    prevGearRef.current = newGear;
  }, [navigationState.velocityData.gear]);

  useEffect(() => {
    console.log("🔍 상태 변화 감지 안드로이드:");
    // console.log("- enableHDA:", navigationState?.velocityData?.enableHDA);
    console.log("- mobileActiveState:", mobileActiveState);
  }, [navigationState, mobileActiveState]);

  const hideGearModal = useCallback(() => {
    console.log("hideGearModal called");
    setShowGearModal(false);
  }, []);

  return (
    <div className="w-[20%] flex relative">
      <div className="w-full relative bg-[#202124] rounded-[24px] p-[20px] pb-[20px] overflow-hidden flex justify-center items-center">
        <div className="flex items-center justify-start mb-1">
          <h3 className="text-white text-[50px] ml-2 font-semibold">6.3</h3>
          <span className="text-stone-500 mt-2 ml-1 text-[25px]">km/kWh</span>
        </div>
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

      <GearChangeModal
        isVisible={showGearModal}
        gear={currentGear}
        duration={2000} // 2초 후 자동 사라짐
        onClose={hideGearModal}
        setShowGearModal={setShowGearModal}
      />
      {/* 
      <HandFreeModal
        isVisible={showHandFreeModal}
        duration={5000}
        setShowHandFreeModal={setShowHandFreeModal}
      />

      <HandUpModal
        isVisible={showHandUpModal}
        duration={5000}
        setShowHandUpModal={setShowHandUpModal}
      /> */}
    </div>
  );
}

const GearChangeModal: React.FC<GearChangeModalProps> = ({
  isVisible,
  gear,
  duration = 2000,
  setShowGearModal,
}) => {
  // 자동 사라지기 타이머
  useEffect(() => {
    console.log("Timer effect triggered:", { isVisible, duration });

    if (isVisible && duration > 0) {
      console.log("Setting timer for", duration, "ms");
      const timer = setTimeout(() => {
        console.log("Timer fired, calling onClose");
        setShowGearModal(false); // 직접 상태 변경
      }, duration);

      return () => {
        console.log("Cleaning up timer");
        clearTimeout(timer);
      };
    }
  }, [isVisible, duration]); // onClose 제거

  return (
    <div
      className={`
        absolute top-0 left-0 z-50 w-full 
        transition-all duration-500 ease-out
        ${isVisible ? "opacity-100" : "opacity-0"}
      `}
    >
      <div className="relative rounded-[24px] p-[20px] overflow-hidden shadow-lg bg-[#1D1E21]">
        {/* 기어 표시 - 모든 기어 나란히 */}
        <div className="flex items-center justify-center gap-[20px] py-[10px] px-[10px]">
          {["P", "R", "N", "D"].map((gearType) => (
            <span
              key={gearType}
              className={`font-bold text-center text-white transition-all duration-300 ${
                gearType === gear ? "text-[32px]" : "text-[24px]"
              }`}
            >
              {gearType}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

const HandFreeModal: React.FC<HandFreeModalProps> = ({
  isVisible,
  duration = 5000,
  setShowHandFreeModal,
}) => {
  // 자동 사라지기 타이머
  useEffect(() => {
    console.log("HandFreeModal Timer effect triggered:", {
      isVisible,
      duration,
    });

    if (isVisible && duration > 0) {
      const timer = setTimeout(() => {
        console.log("HandFreeModal Timer fired");
        setShowHandFreeModal(false); // 직접 상태 변경
      }, duration);

      return () => {
        console.log("HandFreeModal Cleaning up timer");
        clearTimeout(timer);
      };
    }
  }, [isVisible, duration, setShowHandFreeModal]);

  return (
    <div
      className={`
        absolute top-0 left-0 z-50 w-full 
        transition-all duration-500 ease-out
 ${isVisible ? "opacity-100" : "opacity-0"}
      `}
    >
      <div className="relative rounded-[24px] p-[20px] overflow-hidden shadow-lg bg-[#1D1E21]">
        {/* 전방주시 내용 */}
        <div className="flex items-center justify-center gap-[20px] py-[10px] px-[10px]">
          <img src={hda4FrontActiveIconImg} alt="front-view-img" />
          <span className="font-bold text-center text-white text-[24px]">
            전방을 주시하십시오
          </span>
        </div>
      </div>
    </div>
  );
};

// HandUpModal 컴포넌트
const HandUpModal: React.FC<HandUpModalProps> = ({
  isVisible,
  duration = 5000,
  setShowHandUpModal,
}) => {
  // 자동 사라지기 타이머
  useEffect(() => {
    console.log("HandUpModal Timer effect triggered:", { isVisible, duration });

    if (isVisible && duration > 0) {
      const timer = setTimeout(() => {
        console.log("HandUpModal Timer fired");
        setShowHandUpModal(false); // 직접 상태 변경
      }, duration);

      return () => {
        console.log("HandUpModal Cleaning up timer");
        clearTimeout(timer);
      };
    }
  }, [isVisible, duration, setShowHandUpModal]);

  return (
    <div
      className={`
        absolute top-0 left-0 z-50 w-full 
        transition-all duration-500 ease-out
 ${isVisible ? "opacity-100" : "opacity-0"}
      `}
    >
      <div className="relative rounded-[24px] p-[20px] overflow-hidden shadow-lg bg-[#1D1E21]">
        {/* 핸즈온 내용 */}
        <div className="flex items-center justify-center gap-[20px] py-[10px] px-[10px]">
          <img src={hda4FrontActiveIconImg} alt="front-handle-img" />
          <span className="font-bold text-center text-white text-[24px]">
            핸들을 잡으십시오
          </span>
        </div>
      </div>
    </div>
  );
};
