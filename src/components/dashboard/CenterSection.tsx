import { useEffect, useRef, useState } from "react";
import {
  ControlStateType,
  MobileStateData,
  NavigationData,
} from "../../hooks/useSocket";
import CruiseInfo from "./CruiseInfo";
import SteeringWheelIcon from "./SteeringWheelIcon";

interface CenterSectionProps {
  navigationState: NavigationData;
  mobileActiveState: MobileStateData;
  controlStateData: ControlStateType;
}

export default function CenterSection({
  navigationState,
  mobileActiveState,
  controlStateData,
}: CenterSectionProps) {
  const calculateGaugeWidth = (velocity: number) => {
    const maxSpeed = 180;
    const currentSpeed = Math.abs(velocity);
    const percentage = Math.min((currentSpeed / maxSpeed) * 100, 100);
    return `${percentage}%`;
  };

  console.log(controlStateData, "controlStateData?");

  const mobileTest = mobileActiveState.hda4FirstStep || "";
  const mobileTestTwo = mobileActiveState.hda4SecondStep || "";
  const mobileTestThree = mobileActiveState.hda4ThirdStep || "";

  const isAnyStepOn =
    mobileTest === "ON" || mobileTestTwo === "ON" || mobileTestThree === "ON";

  useEffect(() => {
    console.log("🔍 상태 변화 감지 안드로이드:");
    // console.log("- enableHDA:", navigationState?.velocityData?.enableHDA);
    // console.log("- mobileActiveState:", mobileActiveState);
  }, [navigationState, mobileActiveState]);

  return (
    <div className="relative bg-[#202124] rounded-[24px] p-[24px] pb-[30px] overflow-hidden w-[50%] flex items-center justify-between">
      {/* 왼쪽 섹션 */}
      <div className="w-[0px] flex items-center justify-start">
        <div className="flex items-center gap-1 pl-4">
          <SteeringWheelIcon
            navigationState={navigationState}
            isAnyStepOn={isAnyStepOn}
            controlStateData={controlStateData}
          />
          <CruiseInfo navigationState={navigationState} />
        </div>
      </div>

      {/* 중앙/오른쪽: 속도 정보 */}
      <div className="flex justify-center flex-1">
        <div className="flex flex-col items-center">
          <h3 className="text-white font-semibold text-[90px] text-center leading-none">
            {Math.abs(navigationState?.velocityData.velocity)}
          </h3>
          <p className="text-[#888888] text-[20px] text-center mt-[-5px]">
            km/h
          </p>
        </div>
      </div>

      {/* 배터리 게이지 - 박스 내부 하단에 위치 */}
      <div className="absolute bottom-0 left-0 w-full h-[8px]">
        <div className="absolute top-0 left-0 w-full h-full bg-[#3A3A3A]"></div>
        <div
          className="absolute top-0 left-0 h-full bg-[#8D8D8D] transition-all duration-300 ease-out"
          style={{
            width: calculateGaugeWidth(navigationState?.velocityData.velocity),
          }}
        ></div>
      </div>
    </div>
  );
}
