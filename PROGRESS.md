# Development Progress – Audio Recorder App

## [Day 1 – Initial Implementation]

### Technologies Used

- **Backend:** Express.js
- **Audio Processing / Transcription:** Deepgram API
- **Frontend:** HTML, CSS, JavaScript

### Features Implemented

- Start/Stop audio recording in the browser
- Stop and save recordings
- Play recordings in browser
- Two buttons on the screen for controlling recording (`Start`, `Stop`)

## Challenges & Solutions

**Issue 1:** Uncaught TypeError: Cannot read properties of null (reading 'appendChild')

**Detection:**
I added a console log to check the element:

```js
console.log("audioClipsContainer:", audioClipsContainer);
```

**Cause:** The HTML element was originally using a `class`, but the JavaScript code was using `getElementById`:

```html
<div class="audio-clips-container"></div>
```

**fix:**
To fix it, I changed the element to use an `id` and updated the JS selector:

```html
<div id="audio-clips-container"></div>
```

```js
// Correctly selects the element by ID
const audioClipsContainer = document.getElementById("audio-clips-container");
```

**Reflection:**
This was a simple oversight — confusing `class` and `id` caused the error.
I learned to always:

- Verify that the HTML element exists before manipulating it in JS
- Use `console.log` to debug DOM elements
- Double-check selector types (`id` vs `class`) to prevent similar issues in the future

## [Day 2 – Upload & Transcription Feature]

### Features Implemented

- Added feature to **send recorded audio to the backend** as a `Blob` using `axios.post` to `http://localhost:8888/upload`
- Backend saves the audio as an **MP3 file** in `./public/audio` using **Multer**
- Transcribes the audio with **Deepgram API** (`model: "nova-2"`)
- Sends the transcription result back to the frontend
- Displays the transcribed text directly in the browser

### Implementation Details

**Frontend (sending Blob):**

```js
const formData = new FormData();
formData.append("audio", blob);

await axios.post("http://localhost:8888/upload", formData);
```

### Backend Development – Day 2

**Feature:**
Implemented the backend logic to **receive audio recordings from the frontend**, save them as MP3 files, and transcribe them using Deepgram.

**Implementation Highlights:**

- Used **Multer** to handle file uploads, specifying the storage destination (`./public/audio`) and dynamically generating filenames with timestamps.
- After saving the audio, the server reads the file and sends it to **Deepgram’s transcription API** (`model: "nova-2"`) to generate text from the recording.
- The transcription result is sent back to the frontend, where it is displayed to the user in the browser.

## [Day 3 – Frontend Styling]

### Enhancements Implemented

- Added a clean, modern layout using CSS (cards for recorded clips, styled buttons, responsive container).
- Included Google Fonts and improved typography for readability.
- Updated HTML structure with heading and better element organization.
- Styled status text and added hover effects to buttons for better UX.
- Support for multiple clip cards; each recording creates its own card with audio and transcription.
- Extracted styles into `styles.css` file and added logging/fallback so transcription text is always appended and visible.
- Added verbose console logging around upload/response and guarded against null values to help diagnose missing transcription issues.

### Challenges & Solutions

**Issue:** After recording/upload, the clip card containing the audio player and transcript was not added to the DOM, so users never saw the transcription.

**Fix:** Inserted `audioClipsContainer.appendChild(clipCard)` after building the card, ensuring both audio and text appear.

**Reflection:** This highlighted the importance of verifying that dynamic elements are actually attached to the page when debugging invisible output.

### Notes

This step focused solely on user interface improvements to make the app visually appealing without changing core functionality. All logic remains the same; only structure and styling were enhanced.

### Future Feature Ideas

#### 1. Download & Share Recordings

- **Feature:** Allow users to download their recorded audio as an MP3 file and optionally share it via a link.
- **Why:** Demonstrates full-stack skills — handling file serving, generating URLs, and frontend integration.
- **Implementation Highlights:**
  - Backend endpoint to serve MP3 files securely.
  - Frontend “Download” button for each recording.
  - Optional: Generate shareable links with expiration for privacy.
- **Skills Highlighted:** File handling, Express.js routing, frontend-backend integration, UX design considerations.

#### 2. Real-Time Speech-to-Text & Live Display

- **Feature:** Display live transcription of audio as the user records (instead of only after stopping).
- **Why:** Shows advanced integration of streaming APIs and real-time updates, which is impressive for interviews.
- **Implementation Highlights:**
  - Use Deepgram’s real-time API or WebSocket streaming.
  - Frontend displays text dynamically while recording.
  - Handle latency and partial transcription updates gracefully.
- **Skills Highlighted:** Real-time data streaming, WebSocket communication, async JS handling, frontend performance optimization.
