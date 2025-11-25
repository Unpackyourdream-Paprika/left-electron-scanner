import { DynamicDataType } from "../hooks/useSocket";

export const initialDynamicData: DynamicDataType = {
  // ===== HDA/ADAS 제어 =====
  EnableHDA2: false,
  EnableHDA4: false,
  LFA: false,
  SCC: false,
  SCCTargetActorSpeed: 100,
  SCCDistanceStep: 0,

  // ===== 신호 제어 =====
  hor: 0,
  dca: 0,
  rmf: 0,
  etc_signal: 0,

  // ===== 자율주행 제어 =====
  AutonomousLateral: 0,
  AutonomousLongitudinal: 0,
  SteeringTargetAngle: 0,

  // ===== 스플라인/이벤트 =====
  SplineName: 0,
  evenTime: 0,

  // ===== 주행 데이터 =====
  CurrentUnlimitSpeed: 0,
  RemainingDistanceToDest: 0,
  NextSplineDistance: 0,
  RemainingDistanceToCamera: 0,

  // ===== 차선 변경 =====
  Relase_Camera_Section: false,
  bEnableChangeLaneToLeft: false,
  bEnableChangeLaneToRight: false,
  bReadyForChangeLane: false,
  lcDirection: 0,
  lcProgressBar: 0,

  // ===== 차선 정보 =====
  laneWidth: 0,
  roadCenterStandard: 0,
  roadCenterPosition: 0,
  laneDeparture: 0,

  // ===== 속도 편차 =====
  speedDeviationStandard: 0,
  speedDeviationStandardMax: 0,
  speedDeviationStandardMin: 0,

  // ===== 차량 제어 입력 =====
  Accelerator: 0,
  Brake: 0,
  Handle: 0,
  bSideBrake: false,

  // ===== 기어 =====
  Gear: "P",

  // ===== 점화/램프 =====
  ignitionKey: false,
  LeftLamp: false,
  RightLamp: false,
  bEmergencyFlasher: false,
  bBEAM_Low: false,
  bBEAM_High: false,
  BrakeLamp: false,
  ReverseLamp: false,

  // ===== 와이퍼/경적 =====
  Wiper_Slow: false,
  Wiper_Fast: false,
  bHorn: false,

  // ===== 차량 상태 =====
  Velocity: 0,
  RPM: 0,

  // ===== 차선/시나리오 =====
  LaneIndex: 0,
  fullScenarioTime: 0,
  scenarioStart: false,

  // ===== 스티어링 오버라이드 =====
  SteeringOverrideActive: false,

  // ===== 신규 필드 (v3.0+) =====
  TotalLaneNum: 0,
  AutonomousAccelPush: false,
  AutonomousBrakePush: false,
  NDRT: false,
  speedDeviationEnable: false,
  IgnitionStatus: true,

  // ===== 이벤트 레벨 =====
  eorLevel: 0,
  horLevel: 0,
  dcaLevel: 0,
  rmfLevel: 0,

  // ===== 차선별 차량 정보 =====
  lanes: [],
};
