import { NavigationData } from "../../hooks/useSocket";
// import { topGreenIconImg } from "../../types/public/assets/assets_img";
import {
  blueLineImg,
  greenLineImg,
  redLineImg,
} from "../../types/public/warring/warring_img";

interface TopStatusBarProps {
  navigationState: NavigationData;
  // mobileActiveState: MobileStateData;
}

export default function TopStatusBar({
  navigationState,
}: // mobileActiveState,
TopStatusBarProps) {
  // const isAnyStepOn =
  //   mobileActiveState.hda4FirstStep === "ON" ||
  //   mobileActiveState.hda4SecondStep === "ON" ||
  //   mobileActiveState.hda4ThirdStep === "ON";

  const getBackgroundImage = () => {
    const { velocityData } = navigationState;

    if (velocityData.dCALevel >= 1) {
      return `url(${redLineImg})`;
    }

    if (velocityData.enableHDA && velocityData.eORLevel == 1) {
      return `url(${blueLineImg})`;
    }

    if (velocityData.enableHDA && velocityData.eORLevel == 2) {
      return `url(${redLineImg})`;
    }

    if (velocityData.enableHDA && velocityData.hORLevel == 1) {
      return `url(${blueLineImg})`;
    }

    if (velocityData.enableHDA && velocityData.hORLevel == 2) {
      return `url(${redLineImg})`;
    }

    if (velocityData.sCC && !velocityData.enableHDA) {
      return `url(${greenLineImg})`;
    }

    if (
      velocityData.sCC &&
      velocityData.enableHDA &&
      velocityData.hORLevel == 0 &&
      velocityData.eORLevel == 0 &&
      velocityData.dCALevel == 0
    ) {
      return `url(${blueLineImg})`;
    }

    return "transparent";
  };

  return (
    <div
      style={{
        position: "absolute",
        zIndex: 3,
        height: "150px",
        width: "100%",
        background: getBackgroundImage(),
        backgroundSize: "100% 100%",
        backgroundRepeat: "no-repeat",
        color: "white",
        display: "flex",
        alignItems: "center",
        top: "120px",
      }}
    />
  );
}
