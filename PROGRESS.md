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

## Next Plan / Features

- Add recording download functionality
- Handle microphone permission errors gracefully
- Integrate Deepgram transcription for recorded audio
