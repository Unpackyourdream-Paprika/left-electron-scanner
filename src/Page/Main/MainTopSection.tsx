import {
  NavigationData,
  MobileStateData,
  ControlStateType,
  DynamicDataType,
} from "../../hooks/useSocket";

interface MainTopSectionProps {
  navigationState: NavigationData;
  mobileActiveState: MobileStateData;
  controlStateData: ControlStateType;
  dynamicData: DynamicDataType;
}

const MainTopSection = ({
  navigationState,
  mobileActiveState,
  controlStateData,
  dynamicData,


}: MainTopSectionProps) => {


  return (
    <div className="w-full h-[142px] bg-black flex justify-center items-end gap-[280px] relative">
      {dynamicData.EnableHDA4 && (
        <img
          src="/handle/adas_summary.png"
          alt="left-light-img.png"
          className="absolute -translate-x-[80px] z-50 w-[100px]"
        />
      )}
      {dynamicData.EnableHDA2 && (
        <img
          src="/handle/handle_green.png"
          alt="left-light-img.png"
          className="absolute -translate-x-[200px] z-50 w-[100px]"
        />
      )}
      <p
        className={`absolute z-50 font-bold text-[42px] -translate-x-[100px] -translate-y-3 ${
          dynamicData.EnableHDA2
            ? "text-[#06BA15]"
            : dynamicData.EnableHDA4
            ? "text-[#0064FF]"
            : "text-white"
        }`}
      >
        {dynamicData.SCCTargetActorSpeed}
      </p>
      {/* <img src="/handle/adas_left.png" alt="ind_door_state.png" /> */}
      {/* <img src="/handle/adas_right.png" alt="ind_belt_state.png" /> */}
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
      {/* <img src="/top/bar_red.png" className="absolute z-1" /> */}
      {dynamicData.EnableHDA4 && (
        <img src="/top/HDA4-bar-two.png" className="absolute z-1" />
      )}
      {/* <img src="/top/hda-bar.png" className="absolute z-1" /> */}
    </div>
  );
};

export default MainTopSection;
