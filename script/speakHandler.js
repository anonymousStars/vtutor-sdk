// unitySpeakHandler.js

var unitySpeaking = false;
var isSpeaking = false;
var isStoping = false;

function unitySpeak(message, voice) {
  unityInstance.SendMessage("ChatAgent", "ReceiveDataFromBrowser", message);
  unityInstance.SendMessage("Azure", "setVoice", voice);
}

function unityAnimate(animation) {
  unityInstance.SendMessage("VTutor", "ExecuteAnimation", `state,${animation}`);
  unityInstance.SendMessage("ChatAgent", "SetPlaybackSpeed", "1.05");
}

window.addEventListener("VTuber_Message_Delivery_Complete", function () {
  isSpeaking = false;
});

window.addEventListener("message", async (event) => {
  if (event.data?.action === "unitySpeak" && event.data?.message) {
    const message = event.data.message;
    while (unitySpeaking) {
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
    unitySpeaking = true;
    try {
      setTimeout(() => {
        unityAnimate(1);
      }, 1);

      const sentences = message
        .split(/(?<=[.!?]|\n)/)
        .map((s) => s.trim())
        .filter((s) => s.length > 0);

      for (let i = 0; i < sentences.length; i++) {
        if (isStoping) {
          break;
        }
        try {
          // unitySpeak(sentences[i], event.data.voice || "en-US-AshleyNeural");
          unitySpeak(sentences[i]);
        } catch (e) {
          console.log("ERRR", e);
        }
        isSpeaking = true;
        while (isSpeaking) {
          if (isStoping) {
            break;
          }
          await new Promise((resolve) => setTimeout(resolve, 100));
        }
      }
    } catch (e) {
      console.log(e);
    } finally {
      unityAnimate(3);
      unitySpeaking = false;
      isStoping = false;
      if (window.parent !== window) {
        window.parent.postMessage(
          {
            type: "VTuber_Message_Delivery_Complete",
            message: message,
          },
          "*"
        );
      }
    }
  } else if (event.data?.action === "stopSpeaking") {
    isStoping = true;
  }
});

document.body.addEventListener("click", (event) => {
  window.parent.postMessage(
    {
      type: "IFRAME_CLICK",
      x: event.clientX,
      y: event.clientY,
    },
    "*"
  );
});
