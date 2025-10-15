import { useEffect, useState } from "react";

import useSocket from "../../hooks/useSocket";
import { resetAllStores } from "../../stroe/useResetAllStore";

import TopStatusBar from "../../components/dashboard/TopStatusBar";
import LeftSection from "../../components/dashboard/LeftSection";
import CenterSection from "../../components/dashboard/CenterSection";
import RightSection from "../../components/dashboard/RightSection";
import MainTopSection from "./MainTopSection";
import MainCenterSection from "./MainCenterSection";

const Main = () => {
  const {
    navigationState,
    mobileActiveState,
    startFlagState,
    controlStateData,
    setControlStateData,
    setNavigationState,
    setAutoDrivingState,
    setMdaqButtonState,
    setCarSelectState,
    setStartFlagState,
    setFcaState,
    setHdaState,
    setDrivingModeState,
    setAutoParkState,
    setMobileActiveState,
  } = useSocket(
    // "http://192.168.1.12:4000"
    // "http://192.168.10.101:4000"
    "http://192.168.0.39:4000"
  );

  const [starting, setStarting] = useState(false);

  // startFlagState가 변경될 때만 starting 상태를 업데이트
  useEffect(() => {
    if (startFlagState.start) {
      setStarting(true);
    } else {
      setStarting(false);
    }
  }, [startFlagState.start]);

  // 초기화 작업은 별도의 useEffect로 분리
  useEffect(() => {
    // 시작 상태가 아닐 때만 초기화 로직 실행
    if (!startFlagState.start) {
      resetAllStates();
    }
  }, [startFlagState.start]);

  // 상태 초기화 함수
  const resetAllStates = () => {
    setAutoDrivingState({
      status: false,
    });

    setMdaqButtonState({
      trunLamp: "",
      warningButton: false,
      start: false,
      etc: "",
      customerId: 0,
    });

    setDrivingModeState({
      drivingMode: "SCANeR",
    });

    setNavigationState({
      velocityData: {
        velocity: 0,
        angle: 0,
        offsetX: 0,
        offsetY: 0,
        gear: "P",
        bActivate: false,
        remainingDistanceToDest: 0,
        bEnableSpline: false,
        splineName: "",
        remainingDistanceToNextSpline: 0,
        nextSplineName: "",
        bEnableNextSpline: false,
        nextSplineDistance: 0,
        torque: 0,
        rpm: 0,
        hor: 0,
        hORLevel: 0,
        bHighwayForHOR: false,
        eor: 0,
        eORLevel: 0,
        dca: 0,
        dCALevel: 0,
        // sound: 0,
        acceleator: 0,
        brake: 0,
        carName: 0,
        drivingDistance: 0,
        drivingTime: 0,
        idleTime: 0,
        currentLimitSpeed: 0,
        enableHDA: false,
        notifyDisableHDA: false,
        sCC: false,
        sCCTargetActorSpeed: 0,
        lFA: false,
        moveLeft: false,
        moveRight: false,
        remainingDistanceToLimitSpeed: 0,
        bNotifyLimitSpeed: false,
        bTargetLaneIndexActive: false,
        targetLaneIndex: 0,
        bTargetLaneActive: false,
        bReadyForChangeLane: false,
        bEnableChangeLaneToLeft: false,
        bEnableChangeLaneToRight: false,
        bEmergencyFlasher: false,
        steering: 0,
        bSteeringOverride: false,
        lka: false,
        lkaLeft: false,
        lkaRight: false,
      },
      playerLaneIndex: 2,
      detailPlayerLaneIndex: 0,
      lanes: [
        {
          laneIndex: 1,
          vehicleData: [],
        },
        {
          laneIndex: 2,
          vehicleData: [],
        },
        {
          laneIndex: 3,
          vehicleData: [],
        },
        {
          laneIndex: 4,
          vehicleData: [],
        },
        {
          laneIndex: 5,
          vehicleData: [],
        },
      ],
    });

    // Reset other states
    setAutoDrivingState({ status: false });
    setCarSelectState({
      weather: 1,
      time: 1,
      carSelection: 1,
      map: 1,
      start: false,
    });
    setStartFlagState({
      start: false,
      customerid: 0,
    });
    setMdaqButtonState({
      trunLamp: "",
      warningButton: false,
      start: false,
      etc: "",
      customerId: 0,
    });

    setControlStateData({
      state: "",
    });

    setAutoParkState({
      bParkingZone: false,
      parkingLocX: 0,
      parkingLocY: 0,
      parkingYaw: 0,
      parkingOriginToDistance: 0,
      autoParkingState: 0,
      steeringAngle: 0,
      parkingSensorDistance: 0,
      parkingTargetAngle: 0,
      parkingMaxTargetDistance: 0,
      parkingTotalProgress: 0,
      parkingPointToDistance: 0,
      finishedAutoParking: false,
      rightPointDistances: [],
      leftPointDistances: [],
    });

    setMobileActiveState({
      active: false,
      handsFree: false,
      hda4Front: false,
      handsOn: false,
      hda4FirstStep: "",
      hda4SecondStep: "",
      hda4ThirdStep: "",
      hda4Road: false,
      hda4NoSound: false,
    });

    setHdaState({
      bFaceupAtHda: false,
      bFirstLcEnable: false,
      firstLcStr: "",
      firstLcDistance: 0,
      bSecondLcEnable: false,
      secondLcStrLever: "",
      secondLcStrChange: "",
      secondLcDistance: 0,
      bSignalLampEnable: false,
      bLcEnd: false,
      lcDirection: 0,
      startPointIndex: 0,
      lcProgressBar: 1,
    });
    setFcaState({
      fcaStatus: "",
    });

    resetAllStores();
  };

  // console.log(startFlagState.start, "startFlagState.start?");

  // console.log(controlStateData, "controlStateData?????");

  return (
    <div className="relative w-full h-[630px] bg-[#303030]">
      {startFlagState.start ? (
        <>
          {/* <TopStatusBar
            navigationState={navigationState}
            // mobileActiveState={mobileActiveState}
          /> */}
          <div
            className={`${
              starting ? "opacity-1" : "opacity-0"
            } w-full mx-auto h-full  transition-all duration-500`}
          >
            {/* <LeftSection
              navigationState={navigationState}
              controlStateData={controlStateData}
              mobileActiveState={mobileActiveState}
            />
            <CenterSection
              navigationState={navigationState}
              mobileActiveState={mobileActiveState}
              controlStateData={controlStateData}
            />
            <RightSection
              navigationState={navigationState}
              mobileActiveState={mobileActiveState}
            /> */}

            <MainTopSection
              navigationState={navigationState}
              mobileActiveState={mobileActiveState}
              controlStateData={controlStateData}
            />
            <MainCenterSection
              navigationState={navigationState}
              mobileActiveState={mobileActiveState}
              controlStateData={controlStateData}
            />
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Main;
