gst-launch-1.0 -v \
  webmmux streamable=true name=mux ! \
  tcpserversink host=127.0.0.1 port=8081 \
  avfvideosrc device-index=0 ! \
    video/x-raw,width=640,height=480,framerate=30/1 ! \
    videoconvert ! \
    vp8enc deadline=1 cpu-used=8 target-bitrate=800000 keyframe-max-dist=6 lag-in-frames=0 ! \
    queue ! mux. \
  osxaudiosrc unique-id=BuiltInMicrophoneDevice ! \
    audio/x-raw,rate=48000,channels=1 ! \
    audioconvert ! audioresample ! \
    opusenc bitrate=64000 frame-size=10 ! \
    queue ! mux.
