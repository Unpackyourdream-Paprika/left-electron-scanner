import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

export interface PopupData {
  handsOn: boolean;
  handsFree: boolean;
}

type ControlState =
  | ""
  | "start"
  | "stop"
  | "restart"
  | "section-restart"
  | "main-menu"
  | "left"
  | "right"
  | "racestart"
  | "eor-on"
  | "eor-off"
  | "hor-on"
  | "hor-off"
  | "eor-on-second"
  | "hor-on-second"
  | "dca-on"
  | "dca-off"
  | "dca-on-second"
  | "eor-hor-on"
  | "eor-hor-on-second"
  | "eor-hor-off";

// 인터페이스 정의
export interface ControlStateType {
  state: ControlState;
}

export interface StartFlagData {
  start: boolean;
  customerid: number;
}

export interface MobileStateData {
  active: boolean;
  hda4Front: boolean;
  handsOn: boolean;
  handsFree: boolean;
  hda4FirstStep: string;
  hda4SecondStep: string;
  hda4ThirdStep: string;
  hda4Road: boolean;
  hda4NoSound: boolean;
}

export interface CarSelectData {
  weather: number;
  time: number;
  carSelection: number;
  map: number;
  start: boolean;
}

export type FcaStatusType =
  | ""
  | "fcaLeft"
  | "fcaRight"
  | "fcaEmergencyBrakeFront"
  | "fcaEmergencyBrakeRight"
  | "fcaEmergencyBrakeLeft";

export interface FcaData {
  fcaStatus: FcaStatusType;
}

export interface NavigationData {
  velocityData: VelocityData;
  playerLaneIndex: number;
  detailPlayerLaneIndex: number;
  lanes: LaneData[];
}

export interface DrivingModeData {
  drivingMode: string;
}

export interface VelocityData {
  velocity: number;
  // 속도
  angle: number;
  // 게임 앵글

  offsetX: number;
  // 게임 좌표 X
  offsetY: number;
  // 게임 좌표 Y
  gear: string;
  // 기어

  bActivate: boolean;
  // 서울 진입시 내비게이션 Ture , false  Boolean

  remainingDistanceToDest: number;
  // 최종 목적지 까지 남은 거리

  remainingDistanceToNextSpline: number;
  // 다음 스플라인까지 남은 거리

  splineName: string;
  // 현재 스플라인 이름

  nextSplineName: string;
  // 다음 스플라인 이름

  bEnableSpline: boolean;
  // 500m 전 알림

  // 500m 전 알림2
  bEnableNextSpline: boolean;
  // 다음 500전 알림

  // 다음 500m 방향 string

  nextSplineDistance: number;

  // 다음 500m 거리 숫자

  torque: number;
  // 그래프용 토크

  rpm: number;
  // 그래프용 rpm

  hor: number;
  bHighwayForHOR: boolean;
  //  hor 핸들 잘 안잡고 있을때 알람  1,2,3,4 단계로 피그마 비상정지 체크
  hORLevel: number;

  eor: number;
  // eor
  eORLevel: number;

  dca: number; // 경고 AEB (DCA 레벨)
  dCALevel: number; // 경고 AEB (DCA 레벨)

  // sound: number; // -> 그래프 데이터

  acceleator: number; // -> 그래프 데이터

  brake: number; // 언리얼 구조체에는 없음

  carName: number; // -> 그래프 데이터

  drivingDistance: number; // -> 그래프 데이터

  drivingTime: number; // -> 그래프 데이터

  idleTime: number; // -> 그래프 데이터

  currentLimitSpeed: number; // 현재 제한속도

  enableHDA: boolean; // enableHDA Active

  notifyDisableHDA: boolean; // HDA 끝나는 지점에 도착하기 전에 알려줌

  sCC: boolean; // SCC 활성화 여부
  bTargetLaneActive: boolean; // bTargetLaneActive 차간거리 액티브
  sCCTargetActorSpeed: number; // SCC 상태일 때 제한 속도

  targetLaneIndex: number; // 차간 거리 단계 인덱스 0 ~ 4

  lFA: boolean; // LFA 활성화 여부

  moveLeft: boolean; // 좌회전 깜빡이, HDA4 에서 함께 켜지면 Active 발동
  moveRight: boolean; // 우회전 깜빡이, HDA4 에서 함께 켜지면 Active 발동

  bTargetLaneIndexActive: boolean; // 차간거리 모달 전용 Active
  remainingDistanceToLimitSpeed: number; // 제한속도 남은거리
  bNotifyLimitSpeed: boolean; // 단속카메라 단속 카메라 (현재 위치가 단속 카메라 구간인지)
  bReadyForChangeLane: boolean;
  bEnableChangeLaneToLeft: boolean;
  bEnableChangeLaneToRight: boolean;
  steering: number;
  bEmergencyFlasher: boolean;
  bSteeringOverride: boolean;

  lka: boolean;

  lkaLeft: boolean;

  lkaRight: boolean;
}

export interface HdaData {
  bFaceupAtHda: boolean; // 전방 주시 관련 모달 active
  bFirstLcEnable: boolean; // 첫번째 시나리오 , 모달 액티브
  firstLcStr: string; // 첫번째 시나리오 목적지
  firstLcDistance: number;
  bSecondLcEnable: boolean; //두번째 모달 액티브
  secondLcStrLever: string; // 더 빠른 차로로 변경합니다
  secondLcStrChange: string;
  secondLcDistance: number;
  bSignalLampEnable: boolean;
  bLcEnd: boolean;
  lcDirection: number; // 0, 1 좌측, 2 우측
  startPointIndex: number;
  lcProgressBar: number;
}

export interface AutoParkData {
  bParkingZone: boolean; // 주차구역 Active 뷰  주차장 진입 여부
  parkingLocX: number; // x 값
  parkingLocY: number; // y값
  parkingYaw: number; // 회전값
  parkingOriginToDistance: number; // 주차장 직선 거리
  autoParkingState: number;
  steeringAngle: number;
  parkingSensorDistance: number;
  parkingTargetAngle: number;
  parkingMaxTargetDistance: number;
  parkingTotalProgress: number;
  parkingPointToDistance: number;
  finishedAutoParking: boolean;
  rightPointDistances: number[];
  leftPointDistances: number[];
}

export interface LaneData {
  laneIndex: number; // 차선의 맵에서의 Index인데 당장은 사용 X
  vehicleData: VehicleData[]; // 현재 차선에서 달리고 있는 차량의 데이터들 (플레이어 제외)
}

export interface VehicleData {
  playerToDistance: number; // 플레이어와의 거리값, 차선은 상위에서 나뉘기 Axis 값 하나의 길이
  trafficVehicleTypeIndex: number;
}

export interface MDAQButtonData {
  trunLamp: string;
  warningButton: boolean;
  start: boolean;
  etc: string;
  customerId: number;
}

export interface AutoDriveData {
  status: boolean;
}

export interface StartingSettingData {
  weather: number;
  carSelection: number;
  time: number;
}

export interface ParkingButtonEvent {
  activeButtonParking: number;
}

export default function useSocket(url: string) {
  const [socket, setSocket] = useState<Socket | null>(null);
  // const [speed, setSpeed] = useState<number>(0);

  const [carSelectState, setCarSelectState] = useState<CarSelectData>({
    weather: 1,
    time: 1,
    carSelection: 2,
    map: 1,
    start: false,
  });

  const [fcaState, setFcaState] = useState<FcaData>({
    fcaStatus: "",
  });

  // 1: 맑음
  // 2: 비
  // 3: 눈

  // 1: 낮
  // 2: 밤
  // 3: 저녁

  //  Car 1 = IONINC5
  //  Car 2 = Avante
  //  Car 3 = GV80

  const [navigationState, setNavigationState] = useState<NavigationData>({
    velocityData: {
      velocity: 0,
      angle: 320,
      offsetX: 0,
      offsetY: 0,
      gear: "P",
      bActivate: false,
      remainingDistanceToDest: 0,
      bEnableSpline: false, // 처음
      splineName: "", // 첫번째 네이밍
      remainingDistanceToNextSpline: 0, // 처음
      nextSplineName: "", // 두번째 네이밍
      bEnableNextSpline: false, // 두번째
      nextSplineDistance: 0, // 두번째
      torque: 0,
      rpm: 0,
      hor: 0,
      hORLevel: 0,
      steering: 0,
      // 손 놓고 있을때가 true ,
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
      sCCTargetActorSpeed: 110,
      lFA: false,
      moveLeft: false,
      moveRight: false,
      remainingDistanceToLimitSpeed: 100,
      bNotifyLimitSpeed: false,
      targetLaneIndex: 0,
      bTargetLaneActive: false,
      bTargetLaneIndexActive: false,
      bReadyForChangeLane: false,
      bEnableChangeLaneToLeft: false,
      bEnableChangeLaneToRight: false,
      bEmergencyFlasher: false,
      bSteeringOverride: false,
      lka: false,
      lkaLeft: false,
      lkaRight: false,
    },

    playerLaneIndex: 2,
    detailPlayerLaneIndex: 0, // -9 ~ 9
    // lanes: [],
    // max distance 60 < 이상 이면 차 안보임 지금
    lanes: [
      {
        laneIndex: 1,
        vehicleData: [],
      },
      {
        laneIndex: 2,
        vehicleData: [
          // { playerToDistance: -3.5 },
          // { playerToDistance: 10, trafficVehicleTypeIndex: 1 },
          // { playerToDistance: 30, trafficVehicleTypeIndex: 1 },
          // { playerToDistance: 6.2 },
        ],
      },
      {
        laneIndex: 3,
        vehicleData: [
          { playerToDistance: 20, trafficVehicleTypeIndex: 1 },
          // { playerToDistance: -10.9 },
          // { playerToDistance: -15.4 },
          // { playerToDistance: -12.3 },
        ],
      },
      // {
      //   laneIndex: 4,
      //   vehicleData: [
      //     // { playerToDistance: 6.2 }
      //   ],
      // },
      // {
      //   laneIndex: 5,
      //   vehicleData: [
      //     // { playerToDistance: 6.9 }, { playerToDistance: 8.5 }
      //   ],
      // },
      // {
      //   laneIndex: 6,
      //   vehicleData: [
      //     // { playerToDistance: 6.9 }, { playerToDistance: 8.5 }
      //   ],
      // },
      // {
      //   laneIndex: 7,
      //   vehicleData: [
      //     // { playerToDistance: 6.9 }, { playerToDistance: 8.5 }
      //   ],
      // },
    ],
  });

  const [autoDrivingState, setAutoDrivingState] = useState<AutoDriveData>({
    status: false,
  });

  // const [iviAutoParkingState, setIviAutoParkingState] = useState({});

  const [mdaqButtonState, setMdaqButtonState] = useState<MDAQButtonData>({
    trunLamp: "",
    warningButton: false,
    start: false,
    etc: "",
    customerId: 0,
  });

  const [startFlagState, setStartFlagState] = useState<StartFlagData>({
    start: true,
    customerid: 0,
  });

  const [controlStateData, setControlStateData] = useState<ControlStateType>({
    state: "",
  });

  // SCANNER = 'SCANeR',
  // N_WORLD = 'N World',
  // TWIN_WORLD = 'Twin World',
  // SIM_WORLD = 'Sim World',
  // REPLAY = 'Replay',
  const [drivingModeState, setDrivingModeState] = useState<DrivingModeData>({
    drivingMode: "SCANeR",
  });

  const [mobileActiveState, setMobileActiveState] = useState<MobileStateData>({
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

  const [autoParkState, setAutoParkState] = useState<AutoParkData>({
    // bParkingZone: true,
    // parkingLocX: -1.3188281059265137,
    // parkingLocY: 8.431550025939941,
    // parkingYaw: 14.279858589172363,
    // parkingOriginToDistance: 4,
    // autoParkingState: 2,
    // steeringAngle: 0,
    // parkingSensorDistance: 7,
    // parkingTargetAngle: 2,
    // parkingMaxTargetDistance: 7,
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

  const [hdaState, setHdaState] = useState<HdaData>({
    bFaceupAtHda: false,
    bFirstLcEnable: false,
    firstLcStr: "",
    firstLcDistance: 0,
    bSecondLcEnable: false,
    secondLcStrLever: "", // 방향 지시등 레버를 작동하십시오.
    secondLcStrChange: "", // 경로를 따라 차로 변경합니다.
    secondLcDistance: 0,
    bSignalLampEnable: false,
    bLcEnd: false,
    lcDirection: 0,
    startPointIndex: 0,
    lcProgressBar: 0,
  });

  // activeButtonParking : boolean;
  const sendActiveParkingData = <T>(eventName: string, data: T) => {
    if (socket) {
      socket.emit(eventName, data);
      console.log(`Sending ${eventName}:`, data);
    } else {
      console.warn("Socket not connected. Cannot send data.");
    }
  };

  const sendPopupData = (data: PopupData) => {
    if (socket) {
      socket.emit("PopupData", data);
      console.log(`Sending PopupData:`, data);
    } else {
      console.warn("Socket not connected. Cannot send PopupData.");
    }
  };

  // const sendActiveNaviData = <T>(eventName: string, data: T) => {
  //   if (socket) {
  //     socket.emit(eventName, data);
  //     console.log(`Sending ${eventName}:`, data);
  //   } else {
  //     console.warn("Socket not connected. Cannot send data.");
  //   }
  // };

  useEffect(() => {
    const socketInstance = io(url);
    setSocket(socketInstance);

    socketInstance.on("connect", () => {
      console.log("Connected to server in useSocket");
      socketInstance.emit("register", { clientType: "electron" });
    });

    socketInstance.on("NavigationData", (state: NavigationData) => {
      // console.log("NavigationData state received:", state);
      setNavigationState(state);
    });

    socketInstance.on("ControlState", (state: ControlStateType) => {
      // console.log("ControlStateData received:dsadadasdsa", state);

      const parsedState = typeof state === "string" ? JSON.parse(state) : state;

      setControlStateData(parsedState);
    });

    socketInstance.on("AutoDriveData", (state: AutoDriveData) => {
      // console.log("AutoDriveData state received:", state);
      setAutoDrivingState(state);
    });

    socketInstance.on("MDAQButtonData", (state: MDAQButtonData) => {
      // console.log("MDAQButtonData state received:", state);
      setMdaqButtonState(state);
    });

    socketInstance.on("StartFlag", (state: StartFlagData) => {
      console.log("StartFlag state received:", state);
      setStartFlagState(state);
    });

    socketInstance.on("VehicleData", (state: VehicleData) => {
      console.log("VehicleData state received:", state);
    });

    socketInstance.on("CarSelectData", (state: CarSelectData) => {
      // console.log("CarSelectData state received:", state);
      // console.log(state, "state?");
      setCarSelectState(state);
    });

    socketInstance.on("AutoParkData", (state: AutoParkData) => {
      // console.log("AutoParkData state received:", state);
      // console.log(state, "state?");
      setAutoParkState(state);
    });

    socketInstance.on("DrivingMode", (state: DrivingModeData) => {
      // console.log("DrivingMode state received:", state);
      setDrivingModeState(state);
    });

    socketInstance.on("HdaData", (state: HdaData) => {
      // console.log("DrivingMode state received:", state);
      setHdaState(state);
    });

    socketInstance.on("ControlStateMobile", (state: MobileStateData) => {
      // console.log("ControlStateMobile state received:", state);

      const parsedState = typeof state === "string" ? JSON.parse(state) : state;

      setMobileActiveState(parsedState);
    });

    socketInstance.on("fcaData", (state: FcaData) => {
      // console.log("DrivingMode state received:", state);
      setFcaState(state);
    });

    // 연결 종료 처리
    return () => {
      socketInstance.disconnect();
    };
  }, [url]);

  return {
    socket,
    navigationState,
    autoDrivingState,
    mdaqButtonState,
    startFlagState,
    carSelectState,
    drivingModeState,
    autoParkState,
    hdaState,
    fcaState,
    mobileActiveState,
    setNavigationState,
    setMobileActiveState,
    setAutoDrivingState,
    setMdaqButtonState,
    setStartFlagState,
    setCarSelectState,
    setDrivingModeState,
    sendActiveParkingData,
    setAutoParkState,
    setHdaState,
    setFcaState,
    controlStateData,
    setControlStateData,
    sendPopupData,
  };
}
