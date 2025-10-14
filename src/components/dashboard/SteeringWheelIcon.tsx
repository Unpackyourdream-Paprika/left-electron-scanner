import { ControlStateType, NavigationData } from "../../hooks/useSocket";
import { greenIconImg } from "../../types/public/assets/assets_img";
import {
  andoridControllNoHandleImg,
  handleBlueIconImg,
  handleRedIconImg,
  handleYelloIconImg,
} from "../../types/public/left-electron/left-electron_img";

interface SteeringWheelIconProps {
  navigationState: NavigationData;
  isAnyStepOn: boolean;
  controlStateData: ControlStateType;
}

interface IconData {
  src: string;
  alt: string;
}

export default function SteeringWheelIcon({
  navigationState,
  isAnyStepOn,
  controlStateData,
}: SteeringWheelIconProps) {
  const horActiveLevelOne = controlStateData.state === "hor-on";
  const horActiveLevelTwo = controlStateData.state === "hor-on-second";
  const eorActiveLevelOne = controlStateData.state === "eor-on";
  const eorActiveLevelTwo = controlStateData.state === "eor-on-second";

  // velocityData의 level과 통일성을 위한 조건 추가
  const isHorLevel1 =
    navigationState.velocityData.hORLevel === 1 || horActiveLevelOne;
  const isHorLevel2 =
    navigationState.velocityData.hORLevel === 2 || horActiveLevelTwo;
  const isEorLevel1 =
    navigationState.velocityData.eORLevel === 1 || eorActiveLevelOne;
  const isEorLevel2 =
    navigationState.velocityData.eORLevel === 2 || eorActiveLevelTwo;

  const getSteeringIcon = (): IconData | null => {
    const { velocityData } = navigationState;

    // HDA가 비활성화된 경우 먼저 처리
    if (!velocityData.enableHDA) {
      if (velocityData.sCC || velocityData.lFA) {
        return { src: greenIconImg, alt: "sCC , lFa" };
      }
      return null;
    }

    // HDA 활성화 상태에서의 조건들
    // 우선순위 1: DCA 레벨이 0보다 클 때
    if (velocityData.dCALevel > 0) {
      return { src: handleRedIconImg, alt: "dca" };
    }

    // 우선순위 2: EOR과 HOR이 모두 2레벨일 때
    if (isEorLevel2 && isHorLevel2) {
      return { src: handleRedIconImg, alt: "both level 2" };
    }

    // 우선순위 3: EOR과 HOR이 모두 1레벨일 때
    if (isEorLevel1 && isHorLevel1) {
      return { src: handleYelloIconImg, alt: "both level 1" };
    }

    // 우선순위 4: EOR만 활성화 (HOR과 DCA가 0일 때)
    if (velocityData.dCALevel === 0 && !isHorLevel1 && !isHorLevel2) {
      if (isEorLevel1) {
        return { src: handleBlueIconImg, alt: "eor-1 hda4" };
      }
      if (isEorLevel2) {
        return { src: handleRedIconImg, alt: "eor-2 hda4" };
      }
    }

    // 우선순위 5: HOR만 2레벨 활성화 (EOR과 DCA가 0일 때)
    if (velocityData.dCALevel === 0 && !isEorLevel1 && !isEorLevel2) {
      if (isHorLevel2) {
        return { src: handleRedIconImg, alt: "hor level 2" };
      }
      if (isHorLevel1) {
        return { src: handleYelloIconImg, alt: "hor level 1" };
      }
    }

    // 우선순위 6: 스텝 활성화 상태
    if (isAnyStepOn) {
      return { src: andoridControllNoHandleImg, alt: "no handle please" };
    }

    // 우선순위 7: SCC와 LFA가 모두 활성화된 경우 (다른 레벨들이 0일 때)
    if (
      velocityData.sCC &&
      velocityData.lFA &&
      !isHorLevel1 &&
      !isHorLevel2 &&
      !isEorLevel1 &&
      !isEorLevel2 &&
      velocityData.dCALevel <= 0
    ) {
      return { src: handleBlueIconImg, alt: "hda4 scc lfa" };
    }

    return null;
  };

  const iconData = getSteeringIcon();

  return (
    <div className="w-[80px] flex justify-center items-center">
      {iconData && (
        <img src={iconData.src} alt={iconData.alt} className="w-[102px]" />
      )}
    </div>
  );
}
