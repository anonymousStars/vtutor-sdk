## 📚 VTutor Web SDK

**VTutor** is an open-source SDK that combines generative AI, text-to-speech (TTS), and Unity WebGL technology to bring animated pedagogical agents (APAs) to life in real-time within the browser. [Link to VTutor paper.](https://vtutor-aied25.vercel.app/vtutor/AIED_25_VTutor.pdf)

This demo shows how to:
- Embed a VTutor avatar into any website
- Trigger speech via JavaScript
- Demonstrate multilingual speaking capability

---

### 🧩 Architecture Overview

- 💬 **LLM output → TTS audio → VTuber avatar animation**
- 🌐 Embedded **Unity WebGL** via `<iframe>`
- 🧠 Frontend communicates with the avatar using `window.postMessage`

---

### 🚀 Quick Start

Embed VTutor on any webpage using:

```html
<iframe src="http://full.iframe.sdk.vtutor.tools" id="unity-iframe" class="unity-frame"></iframe>
```

To make the avatar speak:

```js
unityIframe.contentWindow.postMessage(
  { action: "unitySpeak", message: "Hello from VTutor!" },
  "*"
);
```

---

### 🖱️ Interactions

- `Speak`: User types a message → Avatar speaks it aloud
- `Stop Speaking`: Stops ongoing speech
- `Load again`: Reloads the last spoken message
- `Dropdown`: Choose from 20+ multilingual examples
- Auto UI reset when speech is completed via event listener

---

### 🧪 Technical Details

- WebGL build size: ~115MB (Unity)
- End-to-end response time: 2–5 seconds (LLM + TTS + rendering)
- Runs fully in-browser, no backend required for rendering
- Communication with the avatar handled via `postMessage`

---

### 📁 File Structure

| File | Description |
|------|-------------|
| `index.html` | Main demo interface |
| `style.css` | Styling, including iframe layout |
| `script.js` | Core logic for handling speech and UI |
| `examples` | Multilingual phrase library |

---

### ⚠️ Notes

- Ensure your site allows embedding from `vtutor.tools` domains
- You may replace the iframe `src` if using a custom VTutor server
- Ideal for LMS platforms, chatbots, tutoring tools, and education apps

---

### 🔗 Live Demo

👉 [https://vtutor-aied25.vercel.app/sdk](https://vtutor-aied25.vercel.app/sdk)

