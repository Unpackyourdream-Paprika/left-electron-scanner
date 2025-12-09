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

  // hda-bar 5초 지연 표시를 위한 상태
  const [showHdaBar, setShowHdaBar] = useState(false);

  // HDA4-bar-two 표시 상태 (showHdaBar가 true가 되기 전까지 유지)
  const [showHda4BarTwo, setShowHda4BarTwo] = useState(true);

  // lcProgressBar 이전 값 추적
  const [prevLcProgressBar, setPrevLcProgressBar] = useState(0);

  // lcProgressBar가 100 -> 0으로 완료되었는지 추적 (adas_summary.png 표시용)
  const [lcCompleted, setLcCompleted] = useState(false);

  // 깜빡이 사운드 재생을 위한 ref
  const indicatorAudioRef = useState<HTMLAudioElement | null>(() => {
    if (typeof window !== 'undefined') {
      const audio = new Audio('/audio/tictok.wav');
      audio.loop = true;
      return audio;
    }
    return null;
  })[0];

  // 모든 레벨이 0인지 확인
  const allLevelsZero = dynamicData.rmfLevel === 0 &&
    dynamicData.dcaLevel === 0 &&
    dynamicData.horLevel === 0 &&
    dynamicData.eorLevel === 0;

  // left-auto 조건
  const showLeftAuto = dynamicData.EnableHDA4 &&
    allLevelsZero &&
    dynamicData.lcDirection === 1;

  // right-auto 조건
  const showRightAuto = dynamicData.EnableHDA4 &&
    allLevelsZero &&
    dynamicData.lcDirection === 2;

  // etc_signal이 특정 값이면 5초 후에 hda-bar 표시, HDA4-bar-two 숨김
  useEffect(() => {
    if (dynamicData.EnableHDA4 && [21, 31, 41, 42, 51, 61, 81].includes(dynamicData.etc_signal)) {
      const timer = setTimeout(() => {
        setShowHdaBar(true);
        setShowHda4BarTwo(false);
      }, 5000);

      return () => clearTimeout(timer);
    } else {
      setShowHdaBar(false);
      setShowHda4BarTwo(true);
    }
  }, [dynamicData.EnableHDA4, dynamicData.etc_signal]);

  // lcProgressBar가 0에서 100이상으로, 100이상에서 0으로 변경되는 시점 감지
  useEffect(() => {
    const currentProgress = dynamicData.lcProgressBar;

    // 이전 값이 0이고 현재 값이 100 이상이면 lcCompleted를 false로 설정
    if (prevLcProgressBar === 0 && currentProgress >= 100) {
      setLcCompleted(false);
    } else if (prevLcProgressBar >= 100 && currentProgress === 0) {
      // 100 이상에서 0으로 돌아가면 HDA4-bar-two 다시 표시, lcCompleted를 true로 설정
      setLcCompleted(true);
      setShowHda4BarTwo(true);
      setShowHdaBar(false);
    }

    setPrevLcProgressBar(currentProgress);
  }, [dynamicData.lcProgressBar, prevLcProgressBar]);

  // lcDirection이 0이 아니거나 bEmergencyFlasher가 true일 때 깜빡이 사운드 재생
  useEffect(() => {
    if (indicatorAudioRef && (dynamicData.lcDirection !== 0 || dynamicData.bEmergencyFlasher)) {
      indicatorAudioRef.play().catch(error => {
        console.log('Audio play failed:', error);
      });
    } else if (indicatorAudioRef && dynamicData.lcDirection === 0 && !dynamicData.bEmergencyFlasher) {
      indicatorAudioRef.pause();
      indicatorAudioRef.currentTime = 0;
    }
  }, [dynamicData.lcDirection, dynamicData.bEmergencyFlasher, indicatorAudioRef]);

  // etc_signal 값에 따른 이미지 경로 결정
  const getSignalImage = () => {
    const signalValue = dynamicData.etc_signal;

    // showHdaBar가 true일 때만 signal-2.png 반환 (5초 딜레이 후 - 최우선)
    if (showHdaBar && (signalValue === 21 || signalValue === 31 || signalValue === 42 || signalValue === 61)) {
      return "/handle/signal-2.png";
    }

    // lcDirection이 1 또는 2일 때는 signalImage 반환하지 않음 (left-auto, right-auto가 표시되도록)
    if (dynamicData.lcDirection === 1 || dynamicData.lcDirection === 2) {
      return null;
    }

    // SteeringOverrideActive가 true면 overide.png 반환
    if (dynamicData.SteeringOverrideActive) {
      return "/handle/overide.png";
    }

    // lcProgressBar가 100 -> 0으로 완료된 경우 adas_summary.png 반환 (EnableHDA4일 때만)
    if (dynamicData.EnableHDA4 && lcCompleted && (signalValue === 21 || signalValue === 31 || signalValue === 42 || signalValue === 61)) {
      return "/handle/adas_summary.png";
    }

    return null;
  };

  // horLevel 값에 따른 이미지 경로 결정
  const getHorLevelImage = () => {
    const horLevel = dynamicData.horLevel;
    if (horLevel === 1) {
      return "/handle/hor-2.png";
    } else if (horLevel === 2) {
      return "/handle/hor2-2.png";
    }
    return null;
  };

  // eorLevel 값에 따른 이미지 경로 결정 (EnableHDA4일 때만)
  const getEorLevelImage = () => {
    if (!dynamicData.EnableHDA4) return null;

    const eorLevel = dynamicData.eorLevel;
    if (eorLevel === 1) {
      return "/handle/adas_summary.png";
    } else if (eorLevel === 2) {
      return "/handle/signal-2.png";
    }
    return null;
  };

  const signalImage = getSignalImage();
  const horLevelImage = getHorLevelImage();
  const eorLevelImage = getEorLevelImage();

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

      {/* rmfLevel 또는 dcaLevel이 1 이상일 때 hor2-2.png 표시 (rmfLevel일 경우 Velocity가 0이 아닐 때만) */}
      {((dynamicData.rmfLevel >= 1 && dynamicData.Velocity !== 0) || dynamicData.dcaLevel >= 1) && (
        <img
          src="/handle/hor2-2.png"
          alt="hor-level-img"
          className="absolute -translate-x-[200px] z-50 w-[100px] -translate-y-[22px]"
        />
      )}

      {/* eorLevel 값에 따른 이미지 (horLevel이 없고, dcaLevel/rmfLevel이 0일 때) */}
      {!horLevelImage && eorLevelImage && dynamicData.dcaLevel === 0 && dynamicData.rmfLevel === 0 && (
        <img
          src={eorLevelImage}
          alt="eor-level-img"
          className={`absolute -translate-x-[200px] z-50 w-[100px] ${eorLevelImage === "/handle/adas_summary.png" ? "-translate-y-0" : "-translate-y-[22px]"}`}
        />
      )}

      {/* etc_signal 값에 따른 신호 이미지 (horLevel, eorLevel이 없을 때) */}
      {!horLevelImage && !eorLevelImage && signalImage && (
        <img
          src={signalImage}
          alt="signal-img"
          className={`absolute -translate-x-[200px] z-50 w-[100px] ${(signalImage === "/handle/adas_summary.png" || signalImage === "/handle/overide.png") ? "-translate-y-0" : "-translate-y-[22px]"}`}
        />
      )}

      {/* left-auto: EnableHDA4 && 모든 레벨 0 && 차선변경 조건 충족 */}
      {showLeftAuto && !horLevelImage && !signalImage && (
        <img
          src="/handle/left-auto.png"
          alt="left-auto"
          className="absolute -translate-x-[200px] z-50 w-[100px] -translate-y-5"
        />
      )}

      {/* right-auto: EnableHDA4 && 모든 레벨 0 && 차선변경 조건 충족 */}
      {showRightAuto && !horLevelImage && !signalImage && (
        <img
          src="/handle/right-auto.png"
          alt="right-auto"
          className="absolute -translate-x-[200px] z-50 w-[100px] -translate-y-5"
        />
      )}

      {/* HDA4가 활성화되고 horLevel, eorLevel, etc_signal, rmfLevel, dcaLevel 조건이 아니고, left/right auto 아닐 때만 표시 */}
      {dynamicData.EnableHDA4 && !horLevelImage && !eorLevelImage && !signalImage && dynamicData.rmfLevel < 1 && dynamicData.dcaLevel < 1 && !showLeftAuto && !showRightAuto && (
        <img
          src="/handle/adas_summary.png"
          alt="left-light-img.png"
          className="absolute -translate-x-[200px] z-50 w-[100px]"
        />
      )}

      {/* HDA2가 활성화되고 horLevel, eorLevel, etc_signal, rmfLevel, dcaLevel 조건이 아닐 때만 표시 */}
      {dynamicData.EnableHDA2 && !horLevelImage && !eorLevelImage && !signalImage && dynamicData.rmfLevel < 1 && dynamicData.dcaLevel < 1 && (
        <img
          src="/handle/handle_green.png"
          alt="left-light-img.png"
          className="absolute -translate-x-[200px] z-50 w-[100px]"
        />
      )}

      {/* 100 텍스트 표시 (rmfLevel >= 1 && Velocity === 0 일 때는 숨김) */}
      {!(dynamicData.rmfLevel >= 1 && dynamicData.Velocity === 0) && (
        <p
          className={`absolute z-50 font-bold text-[42px] -translate-x-[100px] -translate-y-3 ${dynamicData.AutonomousAccelPush
              ? "text-[#9b9b9b] blink-animation"
              : dynamicData.EnableHDA2
                ? "text-[#06BA15]"
                : dynamicData.EnableHDA4
                  ? "text-[#0064FF]"
                  : "text-black"
            }`}
        >
          100
        </p>
      )}

      {/* 왼쪽 깜빡이 - lcDirection이 1이거나 bEmergencyFlasher가 true일 때 */}
      {(dynamicData.lcDirection === 1 || dynamicData.bEmergencyFlasher) && (
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

      {/* 오른쪽 깜빡이 - lcDirection이 2이거나 bEmergencyFlasher가 true일 때 */}
      {(dynamicData.lcDirection === 2 || dynamicData.bEmergencyFlasher) && (
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

      {/* HDA4가 활성화되고 DCA, RMF 레벨이 1 미만이고, eorLevel이 2가 아니고, showHda4BarTwo가 true일 때 표시 */}
      {dynamicData.EnableHDA4 && dynamicData.dcaLevel < 1 && dynamicData.rmfLevel < 1 && dynamicData.eorLevel !== 2 && showHda4BarTwo && (
        <img src="/top/HDA4-bar-two.png" className="absolute z-1" />
      )}
      {/* EnableHDA4이고 etc_signal이 21, 31, 41, 51, 81일 때 5초 후 표시 또는 eorLevel이 2일 때 표시 */}
      {(showHdaBar || dynamicData.eorLevel === 2) && (
        <img src="/top/hda-bar.png" className="absolute z-1 w-full" />
      )}
    </div>
  );
};

export default MainTopSection;
