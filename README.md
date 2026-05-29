# WebM Live Browser

A small experiment that streams a webcam from GStreamer into a browser with low latency.

## Architecture

```text
Camera
  ↓
GStreamer
  ↓
WebM over TCP
  ↓
Node.js HTTP proxy
  ↓
Chrome
```

## Requirements

- macOS
- GStreamer
- Node.js

## Start Stream

```bash
./scripts/start-stream.sh
```

## Start HTTP Proxy

```bash
npm install
node server.js
```

Open:

```text
http://127.0.0.1:8090
```

## Notes

- Works best in Chrome.
- Safari prefers HLS/H.264.
- Typical latency: ~1 second.


