# Audio-to-Text Generator (WIP)

This is a very small browser-based prototype that records audio from your
microphone and attempts to convert it to text in real time.
The project is still a work-in-progress – right now it mainly sets up the
UI and basic recording logic.

## 📁 Project structure

```
/.
├── index.js          # entry point for the client logic
├── package.json
└── public/
    └── index.html    # simple frontend
```

> **Note:** there is no server component; everything runs in the browser.

## 🚀 Getting started

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Start the development server**

   ```bash
   npm run dev
   ```

3. **Open the app**

   Point your browser to `http://localhost:3000` (or whatever port the dev
   server shows).
   Allow microphone access when prompted.

4. **Use**

   Click the “record” button and speak. The recorded audio will be processed
   client-side and text should appear (once the feature is implemented).

## 🛠️ Features (planned)

- 🎙️ Start/stop audio recording in the browser
- 🧠 Send audio to a transcription service or use a client-side model
- 📝 Display live transcription text
- 🔁 Support for multiple languages
- 👀 Visual feedback (waveform, status)

## 🧩 Development notes

- This is an early prototype – most of the logic lives in `index.js`.
- You’re welcome to experiment, add tests, or plug in a real speech-to-text
  API.
- No packaging/build tool other than the simple `npm run dev` script.

## Development Notes

For a detailed breakdown of challenges I faced and how I solved them, see [PROGRESS.md](./PROGRESS.md)

## 📄 License

This code is open-source and available under the [MIT License](LICENSE).

---

> **⚠️ Work in progress:** functionality is incomplete and APIs may change.
