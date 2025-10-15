import {
  NavigationData,
  MobileStateData,
  ControlStateType,
} from "../../hooks/useSocket";

interface MainTopSectionProps {
  navigationState: NavigationData;
  mobileActiveState: MobileStateData;
  controlStateData: ControlStateType;
}

const MainTopSection = ({
  navigationState,
  mobileActiveState,
  controlStateData,
}: MainTopSectionProps) => {
  return (
    <div className="w-full h-[142px] bg-black flex justify-center items-end gap-[200px]">
      <img src="/assets/ind_lka_state.png" alt="ind_lka_state.png" />
      <p className="text-white text-[48px] font-semibold">{navigationState.velocityData.gear}</p>
      <img src="/assets/right-light-img.png" alt="right-light-img.png" />
    </div>
  );
};

export default MainTopSection;
