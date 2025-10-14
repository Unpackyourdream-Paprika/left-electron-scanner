import { NavigationData } from "../../hooks/useSocket";

interface CruiseInfoProps {
  navigationState: NavigationData;
}

export default function CruiseInfo({ navigationState }: CruiseInfoProps) {
  const { velocityData } = navigationState;

  const shouldShowCruiseInfo = () => {
    return (
      velocityData.sCC ||
      velocityData.enableHDA ||
      velocityData.eORLevel >= 1 ||
      velocityData.hORLevel >= 1 ||
      velocityData.dCALevel >= 1
    );
  };

  const getCruiseTextColor = () => {
    if (
      velocityData.enableHDA &&
      velocityData.sCC &&
      velocityData.dCALevel == 0
    ) {
      return "text-[#178BF5]";
    }

    if (!velocityData.enableHDA && (velocityData.sCC || velocityData.lFA)) {
      return "text-[#00BA13]";
    }

    if (velocityData.enableHDA && velocityData.dCALevel >= 1) {
      return "text-[#AD251F]";
    }

    return "text-[#A8A8A8]";
  };

  return (
    <div className="w-[100px]">
      {shouldShowCruiseInfo() ? (
        <>
          <p
            className={`${getCruiseTextColor()} font-semibold text-[42px] text-center leading-none`}
          >
            {velocityData.sCCTargetActorSpeed}
          </p>
        </>
      ) : (
        <div className="h-[60px]"></div>
      )}
    </div>
  );
}
