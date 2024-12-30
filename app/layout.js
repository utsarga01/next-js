import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { QueryClient } from "@tanstack/react-query";
import ReactQueryClientProvider from "@/providers/ReactQueryClientProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

// const queryClient = new QueryClient();

export default function RootLayout({ children }) {
  return (
    <html lang="en">
     <ReactQueryClientProvider>
     <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
     </ReactQueryClientProvider>
    </html>
  );
}
