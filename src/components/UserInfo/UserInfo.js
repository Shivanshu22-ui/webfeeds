"use client"
import "./UserInfo.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";
import { api } from "@/apis/api";
import { useDispatch, useSelector } from "react-redux";
import { currentNavActive, setUser } from "@/features/users.slice";
import { useRouter } from "next/navigation";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faPaypal } from "@fortawesome/free-brands-svg-icons";
import { faGlobe, faP } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";


const UserInfo = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { currentUser } = useSelector((state) => state.user);
  const { lightTheme} = useSelector((state) => state.allPosts);

  useEffect(() => {
    api.getCurrentUser().then((res) => {
      dispatch(setUser(res.data));
    });
  }, []);
  
  return (
    <div className={`${lightTheme?"_userInfo_wrapper_light":"_userInfo_wrapper_dark"}`}>
      <div className="_userDetails" onClick={()=>{router.push(`/profile/${currentUser?.username}`); dispatch(currentNavActive(true))}}>
        <div className="_user_logo">
        {currentUser?.profile_image?.medium?
                (<img src={currentUser?.profile_image?.medium}/>)
                :
                <FontAwesomeIcon icon={faUser} height={"24px"} width={"24px"} />}
        </div>
        <div className="user_details">
          <p className="user_username">{currentUser?.instagram_username}</p>
          <p className="user_location">{currentUser?.location}</p>
        </div>
      </div>
      <div className="_user_bio">
        {currentUser?.bio}
      </div>
      <div className="_user_posts">
        <div>{currentUser?.total_photos} Photos</div>
        <div>{currentUser?.followers_count} Followers</div>
        <div>{currentUser?.following_count} Following</div>
      </div>
      {/* <div className="_user_posts">
      {currentUser?.social?.instagram_username ? (
          <li className="_card_items">
            <FontAwesomeIcon
              className="_cards_icon"
              icon={faInstagram}
              height={"20px"}
              width={"20px"}
            />
            <span> {currentUser?.social?.instagram_username}</span>
          </li>
        ) : (
          ""
        )}
        {currentUser?.social?.portfolio_url ? (
          <li className="_card_items">
            <Link href={currentUser?.social?.portfolio_url} target="_blank">
              <FontAwesomeIcon
                className="_cards_icon"
                icon={faGlobe}
                height={"20px"}
                width={"20px"}
              />
              <span>Portfolio</span>
            </Link>
          </li>
        ) : (
          ""
        )}
        {currentUser?.social?.twitter_username ? (
          <li className="_card_items">
            <FontAwesomeIcon
              className="_cards_icon"
              icon={faTwitter}
              height={"20px"}
              width={"20px"}
            />{" "}
            <span>{currentUser?.social?.twitter_username} </span>
          </li>
        ) : (
          ""
        )}
        {currentUser?.social?.paypal_email ? (
          <li className="_card_items">
            <FontAwesomeIcon
              className="_cards_icon"
              icon={faPaypal}
              height={"20px"}
              width={"20px"}
            />
            <span>{currentUser?.social?.paypal_email}</span>
          </li>
        ) : (
          ""
        )}
      </div> */}
    </div>
  );
};

export default UserInfo;
