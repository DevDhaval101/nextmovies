import * as fs from "fs";
import { headers } from 'next/headers'

export function GET(Request) {
  const videoPath = "files/dhaval.mp4";
  const stat = fs.statSync(videoPath);
  const fileSize = stat.size;

  const readHeaders = new headers()

  const range = readHeaders.get('Range')
//   console.log("req", range);

  if (range) {
    const parts = range.replace(/bytes=/, "").split("-");

    const start = parseInt(parts[0], 10);

    const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
    // console.log('END', end)
    const chunkSize = end - start + 1;

    const file = fs.createReadStream(videoPath, { start, end });

    const httpHeaders = {
      "Content-Range": `bytes ${start}-${end}/${fileSize}`,
      "Accept-Ranges": "bytes",
      "Content-Length": chunkSize,
      "Content-Type": "video/mp4",
    };

    const myHeaders = new Headers(httpHeaders);

    return new Response(file, { headers: myHeaders, status: 206 });

  } else {
    const httpHeaders = {
      "Content-Length": fileSize,
      "Content-Type": "video/mp4",
    };
    const newHeaders = new Headers(httpHeaders);

    const file = fs.createReadStream(videoPath);

    return new Response(file, { headers: newHeaders, status: 200 });
  }
}