"use client";
import Feeds from "@/components/Feeds/Feeds";
import "./page.module.css";
import UserInfo from "@/components/UserInfo/UserInfo";

export default function Home() {
  return (
    // <Provider store={store}>
    <div className="feeds_container">
      <div className="feedsList">
        <h1 className="_heading">WebFeeds</h1>
        <Feeds />
      </div>
      <UserInfo />
    </div>
    // </Provider>
  );
}
