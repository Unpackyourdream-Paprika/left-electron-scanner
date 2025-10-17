import { app, BrowserWindow } from "electron";
import { fileURLToPath } from "node:url";
import path from "node:path";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
process.env.APP_ROOT = path.join(__dirname, "..");
const VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"];
const MAIN_DIST = path.join(process.env.APP_ROOT, "dist-electron");
const RENDERER_DIST = path.join(process.env.APP_ROOT, "dist");
process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL ? path.join(process.env.APP_ROOT, "public") : RENDERER_DIST;
let win;
function createWindow() {
  win = new BrowserWindow({
    width: 1720,
    // 원하는 너비
    height: 630,
    // 원하는 높이
    frame: false,
    // 프레임 제거
    titleBarStyle: "hidden",
    // 타이틀 바 숨기기
    transparent: true,
    // 배경 투명하게 (선택사항)
    // fullscreenable: true,
    icon: path.join(process.env.VITE_PUBLIC, "electron-vite.svg"),
    webPreferences: {
      preload: path.join(__dirname, "preload.mjs")
    }
  });
  const initialSize = win.getSize();
  const initialPosition = win.getPosition();
  console.log("=== Electron Window Initial Info ===");
  console.log(`Width: ${initialSize[0]}px`);
  console.log(`Height: ${initialSize[1]}px`);
  console.log(`Position: (${initialPosition[0]}, ${initialPosition[1]})`);
  console.log("====================================");
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
  win.on("resize", () => {
    if (!win) return;
    const size = win.getSize();
    const bounds = win.getBounds();
    console.log("\n=== Window Resized ===");
    console.log(`New Size: ${size[0]}x${size[1]}`);
    console.log(`Bounds: { x: ${bounds.x}, y: ${bounds.y}, width: ${bounds.width}, height: ${bounds.height} }`);
    console.log("=====================");
  });
  win.webContents.on("did-finish-load", () => {
    win == null ? void 0 : win.webContents.send("main-process-message", (/* @__PURE__ */ new Date()).toLocaleString());
  });
  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL);
  } else {
    win.loadFile(path.join(RENDERER_DIST, "index.html"));
  }
}
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
    win = null;
  }
});
app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
app.whenReady().then(createWindow);
export {
  MAIN_DIST,
  RENDERER_DIST,
  VITE_DEV_SERVER_URL
};
