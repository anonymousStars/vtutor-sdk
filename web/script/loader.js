var container = document.querySelector("#unity-container");
var canvas = document.querySelector("#unity-canvas");
var loadingBar = document.querySelector("#unity-loading-bar");
var progressBarFull = document.querySelector("#unity-progress-bar-full");
var fullscreenButton = document.querySelector("#unity-fullscreen-button");
var warningBanner = document.querySelector("#unity-warning");
var unityInstance = null;

function unityShowBanner(msg, type) {
  function updateBannerVisibility() {
    warningBanner.style.display = warningBanner.children.length
      ? "block"
      : "none";
  }
  var div = document.createElement("div");
  div.innerHTML = msg;
  warningBanner.appendChild(div);
  if (type == "error") div.style = "background: red; padding: 10px;";
  else {
    if (type == "warning") div.style = "background: yellow; padding: 10px;";
    setTimeout(function () {
      warningBanner.removeChild(div);
      updateBannerVisibility();
    }, 5000);
  }
  updateBannerVisibility();
}

var buildUrl = "Build";
var loaderUrl = buildUrl + "/Vtuber-uLipSync-SimpleA.loader.js";
var config = {
  dataUrl: buildUrl + "/Vtuber-uLipSync-SimpleA.data.unityweb",
  frameworkUrl: buildUrl + "/Vtuber-uLipSync-SimpleA.framework.js.unityweb",
  codeUrl: buildUrl + "/Vtuber-uLipSync-SimpleA.wasm.unityweb",
  streamingAssetsUrl: "StreamingAssets",
  companyName: "DefaultCompany",
  productName: "Vtuber-uLipSync-SimpleA",
  productVersion: "0.1",
  showBanner: unityShowBanner,
};

// if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
//   canvas.style.width = "300px";
//   canvas.style.height = "300px";
// } else {
// canvas.style.width = "300px";
// canvas.style.height = "300px";
// }

var script = document.createElement("script");
script.src = loaderUrl;
script.onload = () => {
  createUnityInstance(canvas, config, (progress) => {
    progressBarFull.style.width = 100 * progress + "%";
  })
    .then((instance) => {
      unityInstance = instance;
      fullscreenButton.onclick = () => {
        unityInstance.SetFullscreen(1);
      };
      canvas.style.pointerEvents = "none";
      setTimeout(() => {
        canvas.style.display = "block";
        window.dispatchEvent(new Event("vtutor-ready"));
        setTimeout(() => {}, 100);
      }, 601);
    })
    .catch((message) => {
      alert(message);
    });
};

document.body.appendChild(script);
