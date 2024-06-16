import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Next Movies",
  description: "Free Movies and TV series",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta property="og:url" content="https://nextmovies.webaddict.in/" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Next Movies" />
        <meta property="og:description" content="Free Movies and TV series" />
        <meta property="og:image" content="/images/home.png" />
      </head>
      <body>{children}</body>
    </html>
  );
}
