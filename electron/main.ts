import { app, BrowserWindow } from "electron";
// import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import path from "node:path";

// const require = createRequire(import.meta.url);
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// The built directory structure
//
// ├─┬─┬ dist
// │ │ └── index.html
// │ │
// │ ├─┬ dist-electron
// │ │ ├── main.js
// │ │ └── preload.mjs
// │
process.env.APP_ROOT = path.join(__dirname, "..");

// 🚧 Use ['ENV_NAME'] avoid vite:define plugin - Vite@2.x
export const VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"];
export const MAIN_DIST = path.join(process.env.APP_ROOT, "dist-electron");
export const RENDERER_DIST = path.join(process.env.APP_ROOT, "dist");

process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL
  ? path.join(process.env.APP_ROOT, "public")
  : RENDERER_DIST;

let win: BrowserWindow | null;

function createWindow() {
  // win = new BrowserWindow({
  //   // 최소화 기능 상단 버튼 X
  //   frame: true,
  //   icon: path.join(process.env.VITE_PUBLIC, "electron-vite.svg"),
  //   webPreferences: {
  //     preload: path.join(__dirname, "preload.mjs"),
  //   },
  // });
  win = new BrowserWindow({
    width: 1720, // 원하는 너비
    height: 630, // 원하는 높이
    frame: false, // 프레임 제거
    titleBarStyle: "hidden", // 타이틀 바 숨기기
    transparent: true, // 배경 투명하게 (선택사항)
    // fullscreenable: true,
    icon: path.join(process.env.VITE_PUBLIC, "electron-vite.svg"),
    webPreferences: {
      preload: path.join(__dirname, "preload.mjs"),
    },
  });

  // 화면 크기 정보 콘솔 출력 (초기)
  const initialSize = win.getSize();
  const initialPosition = win.getPosition();
  console.log("=== Electron Window Initial Info ===");
  console.log(`Width: ${initialSize[0]}px`);
  console.log(`Height: ${initialSize[1]}px`);
  console.log(`Position: (${initialPosition[0]}, ${initialPosition[1]})`);
  console.log("====================================");

  // 창 이동 시 실시간 정보 출력
  win.on("move", () => {
    if (!win) return;
    const position = win.getPosition();
    const size = win.getSize();
    const bounds = win.getBounds();
    console.log("\n=== Window Moved ===");
    console.log(`Position: (${position[0]}, ${position[1]})`);
    console.log(`Size: ${size[0]}x${size[1]}`);
    console.log(`Bounds: { x: ${bounds.x}, y: ${bounds.y}, width: ${bounds.width}, height: ${bounds.height} }`);
    console.log("===================");
  });

  // 창 크기 변경 시 실시간 정보 출력
  win.on("resize", () => {
    if (!win) return;
    const size = win.getSize();
    const bounds = win.getBounds();
    console.log("\n=== Window Resized ===");
    console.log(`New Size: ${size[0]}x${size[1]}`);
    console.log(`Bounds: { x: ${bounds.x}, y: ${bounds.y}, width: ${bounds.width}, height: ${bounds.height} }`);
    console.log("=====================");
  });

  // Test active push message to Renderer-process.
  win.webContents.on("did-finish-load", () => {
    win?.webContents.send("main-process-message", new Date().toLocaleString());
  });

  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL);
  } else {
    // win.loadFile('dist/index.html')
    win.loadFile(path.join(RENDERER_DIST, "index.html"));
  }
}

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
    win = null;
  }
});

app.on("activate", () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

app.whenReady().then(createWindow);
