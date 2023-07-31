"use client";

import { useEffect, useState } from "react";
import { api } from "../apis/api";
import { useDispatch } from "react-redux";
import { setAllPosts } from "@/features/allPosts.slice";
import { setUserPosts } from "@/features/users.slice";

export default function useInfiniteScroll(pageNumber,user) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [posts, setPosts] = useState([]);
  const [hasMore, setHasMore] = useState(false);
  const dispatch = useDispatch();

  //   useEffect(() => {
  //     setPosts([]);
  //   }, []);

  useEffect(() => {
    setLoading(true);
    setError(false);
    let cancel;
    if(user){
      api
      .getCurrentUsersPost(pageNumber,user)
      .then((res) => {
        setPosts((prev) => {
          return [...new Set([...prev, ...res.data])];
        });
        dispatch(setUserPosts(res.data));
        setHasMore(res.data.length > 0);
        setLoading(false);
      })
      .catch((err) => {
        setError(true);
      });
    }else{
      api
      .getAllPosts(pageNumber)
      .then((res) => {
        setPosts((prev) => {
          return [...new Set([...prev, ...res.data])];
        });
        dispatch(setAllPosts(res.data));
        setHasMore(res.data.length > 0);
        setLoading(false);
      })
      .catch((err) => {
        setError(true);
      });

    }

    // return () => {
    // //   cancel();
    // };
  }, [pageNumber]);

  return { loading, error, hasMore, posts };
}
