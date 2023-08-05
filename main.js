const { app, BrowserWindow } = require("electron");
const path = require("path");
const player = require("node-wav-player");

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  mainWindow.loadFile(path.join(__dirname, "index.html"));

  mainWindow.on("closed", function () {
    mainWindow = null;
  });

  // Start the interval to play sound every 5 minutes
  setInterval(playSound, 1 * 60 * 1000); // 1 minutes in milliseconds
}

function playSound() {
  player
    .play({
      path: "sample-12s.wav",
    })
    .then(() => {
      console.log("The wav file started to be played successfully.");
    })
    .catch((error) => {
      console.error(error);
    });
}

app.on("ready", createWindow);

app.on("window-all-closed", function () {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", function () {
  if (mainWindow === null) {
    createWindow();
  }
});
