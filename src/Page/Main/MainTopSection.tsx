import {
  NavigationData,
  MobileStateData,
  ControlStateType,
  DynamicDataType,
} from "../../hooks/useSocket";
import { useState, useEffect } from "react";

interface MainTopSectionProps {
  navigationState: NavigationData;
  mobileActiveState: MobileStateData;
  controlStateData: ControlStateType;
  dynamicData: DynamicDataType;
}

const MainTopSection = ({
  dynamicData,
}: MainTopSectionProps) => {

  // horLevel 애니메이션을 위한 상태
  const [horAnimationToggle, setHorAnimationToggle] = useState(false);

  // 500ms마다 토글
  useEffect(() => {
    const interval = setInterval(() => {
      setHorAnimationToggle((prev) => !prev);
    }, 500);

    return () => clearInterval(interval);
  }, []);

  // etc_signal 값에 따른 이미지 경로 결정
  const getSignalImage = () => {
    const signalValue = dynamicData.etc_signal;
    if (signalValue === 21 || signalValue === 31 || signalValue === 42 || signalValue === 61) {
      return "/handle/signal-2.png";
    }
    return null;
  };

  // horLevel 값에 따른 이미지 경로 결정 (애니메이션 적용)
  const getHorLevelImage = () => {
    const horLevel = dynamicData.horLevel;
    if (horLevel === 1) {
      return horAnimationToggle ? "/handle/hor-1.png" : "/handle/hor-2.png";
    } else if (horLevel === 2) {
      return horAnimationToggle ? "/handle/hor2-1.png" : "/handle/hor2-2.png";
    }
    return null;
  };

  const signalImage = getSignalImage();
  const horLevelImage = getHorLevelImage();

  return (
    <div className="w-full h-[142px] bg-black flex justify-center items-end gap-[280px] relative">
      {/* horLevel 우선순위가 가장 높음 */}
      {horLevelImage && dynamicData.rmfLevel < 1 && (
        <img
          src={horLevelImage}
          alt="hor-level-img"
          className="absolute -translate-x-[200px] z-50 w-[100px] -translate-y-[22px]"
        />
      )}

      {/* etc_signal 값에 따른 신호 이미지 (horLevel이 없을 때) */}
      {!horLevelImage && signalImage && (
        <img
          src={signalImage}
          alt="signal-img"
          className="absolute -translate-x-[200px] z-50 w-[100px] -translate-y-[22px]"
        />
      )}

      {/* HDA4가 활성화되고 horLevel, etc_signal, rmfLevel 조건이 아닐 때만 표시 */}
      {dynamicData.EnableHDA4 && !horLevelImage && !signalImage && dynamicData.rmfLevel < 1 && (
        <img
          src="/handle/adas_summary.png"
          alt="left-light-img.png"
          className="absolute -translate-x-[200px] z-50 w-[100px]"
        />
      )}

      {/* HDA2가 활성화되고 horLevel, etc_signal, rmfLevel 조건이 아닐 때만 표시 */}
      {dynamicData.EnableHDA2 && !horLevelImage && !signalImage && dynamicData.rmfLevel < 1 && (
        <img
          src="/handle/handle_green.png"
          alt="left-light-img.png"
          className="absolute -translate-x-[200px] z-50 w-[100px]"
        />
      )}

      {/* 100 텍스트는 rmfLevel이 1 미만일 때만 표시 */}
      {dynamicData.rmfLevel < 1 && (
        <p
          className={`absolute z-50 font-bold text-[42px] -translate-x-[100px] -translate-y-3 ${dynamicData.EnableHDA2
            ? "text-[#06BA15]"
            : dynamicData.EnableHDA4
              ? "text-[#0064FF]"
              : "text-white"
            }`}
        >
          100
        </p>
      )}

      {/* 왼쪽 깜빡이 */}
      {dynamicData.LeftLamp && (
        <img
          src="/arrow/left-sign.svg"
          alt="left-turn-signal"
          className="absolute left-[360px] z-50 w-[60px] bottom-[16px] blink-animation"
        />
      )}

      <img
        src="/assets/ind_lka_state.png"
        alt="ind_lka_state.png"
        className="z-50 w-[80px]"
      />
      <p className="text-white text-[64px] font-semibold z-50">
        {dynamicData.Gear}
      </p>
      <img
        src="/assets/right-light-img.png"
        alt="right-light-img.png"
        className="z-50 w-[80px]"
      />

      {/* 오른쪽 깜빡이 */}
      {dynamicData.RightLamp && (
        <img
          src="/arrow/right-sign.svg"
          alt="right-turn-signal"
          className="absolute right-[360px] z-50 w-[60px] bottom-[16px] blink-animation"
        />
      )}

      {/* DCA 또는 RMF 레벨이 1 이상이면 bar_red 표시 */}
      {(dynamicData.dcaLevel >= 1 || dynamicData.rmfLevel >= 1) && (
        <img src="/top/bar_red.png" className="absolute z-1" />
      )}

      {/* HDA4가 활성화되고 DCA, RMF 레벨이 1 미만일 때만 표시 */}
      {dynamicData.EnableHDA4 && dynamicData.dcaLevel < 1 && dynamicData.rmfLevel < 1 && (
        <img src="/top/HDA4-bar-two.png" className="absolute z-1" />
      )}
      {/* <img src="/top/hda-bar.png" className="absolute z-1" /> */}
    </div>
  );
};

export default MainTopSection;
