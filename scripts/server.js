const http = require("http");
const net = require("net");

const GST_HOST = "127.0.0.1";
const GST_PORT = 8081;
const HTTP_PORT = 8090;

http.createServer((req, res) => {
  if (req.url === "/favicon.ico") {
    res.writeHead(404);
    return res.end();
  }

  console.log("browser connected");

  res.writeHead(200, {
    "Content-Type": "video/webm",
    "Cache-Control": "no-store, no-cache, must-revalidate, max-age=0",
    "Pragma": "no-cache",
    "Connection": "close",
    "X-Content-Type-Options": "nosniff"
  });
  res.flushHeaders();

  const gst = net.connect(GST_PORT, GST_HOST);

  gst.on("data", chunk => {
    res.write(chunk);
  });

  gst.on("close", () => {
    res.end();
  });

  gst.on("error", err => {
    console.error("GStreamer TCP error:", err.message);
    res.end();
  });

  req.on("close", () => {
    gst.destroy();
  });
}).listen(HTTP_PORT, () => {
  console.log(`Open stream at http://127.0.0.1:${HTTP_PORT}`);
});
