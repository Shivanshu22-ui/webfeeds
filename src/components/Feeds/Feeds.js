"use client";
import "./Feeds.css";
import Cards from "../Cards/cards";
import { useCallback, useEffect, useRef, useState } from "react";
import { api } from "@/apis/api";
import { useDispatch, useSelector } from "react-redux";
import { setAllPosts } from "@/features/allPosts.slice";
import useInfiniteScroll from "@/hooks/infiniteScroll";
import GridCards from "../Cards/gridCard";
import Loader from "../loader/loader";

export default function Feeds() {
  const dispatch = useDispatch();
  const { allPosts } = useSelector((state) => state.allPosts);
  const [pageNumber, setPageNumber] = useState(1);
  const observe = useRef();
  const { loading, error, hasMore, posts } = useInfiniteScroll(pageNumber);

  const lastPostRef = useCallback(
    (node) => {
      if (loading) return;
      if (observe.current) observe.current.disconnect();
      observe.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPageNumber((prev) => prev + 1);
        }
      });
      if (node) observe.current.observe(node);
    },
    [loading, hasMore]
  );

  return (
    
    <div className="_feeds_wrapper">
      {allPosts.map((feed) => (
        <div key={feed.id} ref={lastPostRef} className="cards_wrapper">
          <Cards key={feed.id} feed={feed} />
          {/* <GridCards key={feed.id} feed={feed} /> */}
        </div>
      ))}
      <div className="_loader">{loading && !error && <Loader/>}</div>
      <div>{error && "Error"}</div>
    </div>
  );
}
