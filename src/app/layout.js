"use client";
import Nav from "@/components/Nav/Nav";
import "./globals.css";
import { Inter } from "next/font/google";
import { useEffect, useState } from "react";
import { Provider, useSelector } from "react-redux";
import { store } from "@/features/store";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Web Feeds",
  description: "Customized user feeds for the employees of groww.",
};

export default function RootLayout({ children }) {
  const [light,setLight] = useState(false);
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider store={store}>
          <div className={`${light?"main_container_light":"main_container_dark"}`}>
            <div className="nav_wrapper">
              <Nav light={light} setLight = {setLight}/>
            </div>
            <div className="content_wrapper">{children}</div>
          </div>
        </Provider>
      </body>
    </html>
  );
}
