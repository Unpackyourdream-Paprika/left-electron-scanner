import {
  NavigationData,
  MobileStateData,
  ControlStateType,
  DynamicDataType,
} from "../../hooks/useSocket";

interface MainCenterSectionProps {
  navigationState: NavigationData;
  mobileActiveState: MobileStateData;
  controlStateData: ControlStateType;
  dynamicData: DynamicDataType;
}

const MainCenterSection = ({
  navigationState,
  mobileActiveState,
  controlStateData,
  dynamicData,
}: MainCenterSectionProps) => {
  // 속도 값 (0~200 범위)
  const speed = Math.floor(dynamicData.Velocity); // TODO: navigationState에서 실제 속도 가져오기

  // const speed = 100; // TODO: navigationState에서 실제 속도 가져오기

  // 속도를 회전 각도로 변환 (-135deg ~ +135deg = 270도 회전)
  const speedToRotation = (speed: number) => {
    const maxSpeed = 200;
    const minAngle = -135; // 시작 각도
    const maxAngle = 135; // 끝 각도
    const clampedSpeed = Math.max(0, Math.min(speed, maxSpeed));
    return minAngle + (clampedSpeed / maxSpeed) * (maxAngle - minAngle);
  };

  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="w-full max-w-[1440px] h-full flex items-center justify-between">
        <div className="relative flex items-center justify-center w-[370px] h-[370px]">
          <img
            className="absolute inset-0 object-contain w-full h-full brightness-[0.5]"
            src={"/assets/gauge_img.png"}
            alt="왼쪽 게이지"
          />
          <div className="absolute top-[36px] left-[144px] flex items-baseline gap-2">
            <div className="flex items-baseline gap-[6px]">
              <span className="text-white text-[32px] font-semibold leading-none">
                329
              </span>
              <span className="text-[#89898B] text-[18px] leading-none">
                km
              </span>
            </div>
          </div>
          <div className="absolute top-[20px] left-[0px]">
            <div className="relative">
              <img
                className="block"
                src={"/assets/first-black.png"}
                alt="black-line"
              />
              <img
                className="absolute inset-0"
                src={"/assets/first-white.png"}
                alt="white-line"
              />
            </div>
          </div>
          <span className="absolute top-[68px] left-[78px] text-[20px] tracking-[0.18em] text-[#89898B] origin-left -rotate-[42deg] font-semibold">
            F
          </span>
          <img
            className="absolute top-[40px] left-[92px] w-[42px] h-[42px] object-contain"
            src={"/assets/oil-gas.png"}
            alt="연료 아이콘"
          />
          <span className="absolute bottom-[28px] left-[78px] text-[20px] tracking-[0.18em] text-[#89898B] origin-left rotate-[42deg] font-semibold">
            E
          </span>
          <div className="relative z-10 w-full h-full">
            <div className="absolute top-1/2 left-[34px] w-[104px] h-[104px] -translate-y-1/2">
              {/* <div className="relative w-full h-full">
                <img
                  className="absolute inset-0 w-full h-full"
                  src={"/assets/isla_preset_speed.png"}
                  alt="제한 속도 표지"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-[32px] font-semibold text-white drop-shadow-[0_0_10px_rgba(0,0,0,0.55)]">
                    100
                  </span>
                </div>
              </div> */}
            </div>
            <div className="absolute top-1/2 left-1/2 w-[100px] h-[100px] -translate-x-1/2 -translate-y-1/2">
              <div className="relative w-full h-full">
                <img
                  className="absolute inset-0 w-full h-full"
                  src={"/assets/ind_speed_info_02.png"}
                  alt="현재 제한속도 표지"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-[32px] font-semibold text-[#ff3939] drop-shadow-[0_0_12px_rgba(255,57,57,0.45)]">
                    50
                  </span>
                </div>
              </div>
            </div>
          </div>
          <span className="absolute bottom-[32px] text-[16px] text-[#7A7A7C] ">
            15,999,999km
          </span>
        </div>
        <div className="relative flex items-center justify-center w-[370px] h-[370px]">
          <img
            className="absolute inset-0 object-contain w-full h-full brightness-[0.5]"
            src={"/assets/w_3circle_speedometer_ice.png"}
            alt="중앙 게이지"
          />
          <img
            className="absolute object-contain w-full h-full top-[20px]"
            src={"/assets/gauge_center_outline.png"}
            alt="중앙 게이지"
          />
          {/* 바늘 */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className="absolute w-1 h-[178px] bg-white origin-bottom rounded-full"
              style={{
                bottom: "calc(50% - 18px)",
                transform: `rotate(${speedToRotation(speed)}deg)`,
                transition: "transform 500ms ease-out",
                zIndex: 50,
                background:
                  "linear-gradient(to top, rgba(255,255,255,0) 0%, rgba(255,255,255,0.05) 40%, rgba(255,255,255,0.6) 70%, rgba(255,255,255,1) 100%)",
              }}
            />
          </div>
          <div className="relative z-10 flex flex-col items-center justify-center  translate-y-[12px]">
            <span className="text-[72px] font-semibold text-white leading-none z-[100]">
              {speed}
            </span>
            <span className="text-[28px] text-[#8B8B8B]">km/h</span>
          </div>
          <div className="absolute flex items-center justify-center top-1 ">
            <div className="relative w-[370px] h-[370px]">
              <img
                src={"/assets/gauge_center_bar.png"}
                alt="중앙 속도 정보"
                className="absolute inset-0 object-contain w-[350px] h-[350px] mx-auto"
              />
            </div>
          </div>
        </div>
        <div className="relative flex items-center justify-center w-[370px] h-[370px]">
          <img
            className="absolute inset-0 object-contain w-full h-full brightness-[0.5]"
            src={"/assets/gauge_img.png"}
            alt="오른쪽 게이지"
          />
          <div className="absolute top-[24px] right-[4px]">
            <div className="relative">
              <img
                className="block"
                src={"/assets/third-black.png"}
                alt="right gauge dark rim"
              />
              <img
                className="absolute inset-0"
                src={"/assets/third-color.png"}
                alt="right gauge active rim"
              />
            </div>
          </div>
          <div className="relative z-10 flex items-center justify-center w-full h-full">
            <span className="absolute top-[40px] text-lg  text-[#2ACAD6]">
              ECO
            </span>
            <div className="flex flex-col items-center gap-2 mt-[60px]">
              <span className="text-white text-[48px] font-semibold">
                {/* {dynamicData.RPM} */}2.5
              </span>
              <span className="text-[18px]  text-[#8B8B8B]">x1000rpm</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainCenterSection;
