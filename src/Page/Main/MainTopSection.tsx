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
    <div className="w-full h-[142px] bg-black flex justify-center items-end gap-[220px] relative">
      <img
        src="/handle/adas_summary.png"
        alt="left-light-img.png"
        className="absolute -translate-x-[180px] z-50"
      />
      <p className="absolute z-50 text-[#0064FF] font-bold text-[32px] -translate-x-[90px] -translate-y-3">
        100
      </p>
      {/* <img src="/handle/adas_left.png" alt="ind_door_state.png" /> */}
      {/* <img src="/handle/adas_right.png" alt="ind_belt_state.png" /> */}
      <img
        src="/assets/ind_lka_state.png"
        alt="ind_lka_state.png"
        className="z-50"
      />
      <p className="text-white text-[54px] font-semibold z-50">
        {navigationState.velocityData.gear}
      </p>
      <img
        src="/assets/right-light-img.png"
        alt="right-light-img.png"
        className="z-50"
      />
      {/* <img src="/top/bar_red.png" className="absolute z-1" /> */}
      {/* <img src="/top/HDA4-bar-two.png" className="absolute z-1" /> */}
      {/* <img src="/top/hda-bar.png" className="absolute z-1" /> */}
    </div>
  );
};

export default MainTopSection;
