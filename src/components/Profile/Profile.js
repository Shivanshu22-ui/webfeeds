"use client"

import "./Profile.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from 'next/router'
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faTableCells } from "@fortawesome/free-solid-svg-icons";
import { faList } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useRef, useState } from "react";
import { api } from "@/apis/api";
import { setUser, setUserPosts, emptyUser, currentNavActive } from "@/features/users.slice";
import Cards from "../Cards/cards";
import GridCards from "../Cards/gridCard";
import useInfiniteScroll from "@/hooks/infiniteScroll";
import Loader from "../loader/Loader";

export default function Profile({ user }) {
  const { currentUser, currentUsersPosts } = useSelector((state) => state.user);
  const { allPosts } = useSelector((state) => state.allPosts);
  const [view, setView] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const observe = useRef();
  console.log("profile page step 2")
  const { loading, error, hasMore, posts } = useInfiniteScroll(
    pageNumber,
    user?.user
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(currentNavActive(true))
    api.getCurrentUser(user?.user).then((res) => {
      dispatch(setUser(res.data));
    });
  }, []);

  useEffect(() => {
    dispatch(emptyUser());
  }, [user?.user]);

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

  if(!currentUser){
    return <Loader/>;
  }

  return (
    <div className="_profile_container">
      <div className="_profile_details">
        <div className="_profile_logo">
          {currentUser?.profile_image?.large ? (
            <img src={currentUser?.profile_image?.large} />
          ) : (
            <FontAwesomeIcon icon={faUser} height={"24px"} width={"24px"} />
          )}
        </div>
        <div className="_profile_info">
          <p className="user_username">{currentUser?.instagram_username}</p>
          <p className="user_location">{currentUser?.location}</p>
          <p className="_profile_bio">{currentUser?.bio}</p>
          <div className="_profile_posts">
            <div>{currentUser?.total_photos} Photos</div>
            <div>{currentUser?.followers_count} Followers</div>
            <div>{currentUser?.following_count} Following</div>
          </div>
        </div>
      </div>
      <hr color="#6b6c6f" style={{ width: "90%", marginTop: "48px" }} />
      <div className="_profile_photos">
        <div className="_photo_view">
          Posts
          <div>
            {view ? (
              <FontAwesomeIcon
                icon={faList}
                className="_view_type"
                onClick={() => setView(!view)}
              />
            ) : (
              <FontAwesomeIcon
                icon={faTableCells}
                onClick={() => setView(!view)}
                className="_view_type"
              />
            )}
          </div>
        </div>
        <div className="photo_gallery">
          {view
            ? currentUsersPosts.map((feed) => (
                <div className="_grid_feed" key={feed.id} ref={lastPostRef}>
                  <Cards feed={feed} />
                </div>
              ))
            : currentUsersPosts.map((feed) => (
                <div className="_post" key={feed.id} ref={lastPostRef}>
                  <GridCards feed={feed} />
                </div>
              ))}
          <div>{loading && !error && <Loader/>}</div>
          <div>{error && "Error"}</div>
        </div>
      </div>
    </div>
  );
}
