"use client";
import "./cards.modules.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeart as heartSolid } from "@fortawesome/free-solid-svg-icons";
import { faComment } from "@fortawesome/free-regular-svg-icons";
import { faPaperPlane } from "@fortawesome/free-regular-svg-icons";
import { faBookmark } from "@fortawesome/free-regular-svg-icons";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { likeSinglePost } from "@/features/allPosts.slice";
import moment from "moment/moment";
import { useRouter } from "next/navigation";

import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faPaypal } from "@fortawesome/free-brands-svg-icons";
import { faGlobe, faP } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

const Cards = ({ feed }) => {
  const [like, setLike] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const { lightTheme} = useSelector((state) => state.allPosts);

  function toggleLike(id) {
    setLike(!like);
    dispatch(likeSinglePost(id));
  }
  return (
    <div className={`${lightTheme?"_cards_wrapper_light":"_cards_wrapper_dark"}`}>
      <div className="_card_info">
        <div className="_card_image">
          <img src={feed?.urls?.regular} alt="" />
        </div>
        <div className="_card_details">
          <div>
            <div
              className="_post_owner"
              onClick={() => {
                router.push(`/profile/${feed?.user?.username}`);
              }}
            >
              <div className="owner_logo">
                {feed?.user?.profile_image?.medium?
                (<img src={feed?.user?.profile_image?.medium}/>)
                :
                <FontAwesomeIcon icon={faUser} height={"24px"} width={"24px"} />}
              </div>
              <div className="owner_details">
                <p className="owner_username">
                  {feed?.user?.instagram_username}
                </p>
                <p className="owner_location">
                  {feed?.user?.location ?? feed?.user?.username}
                </p>
              </div>
            </div>
            <div className="_owner_bio">
              {feed?.description ?? feed?.user?.bio}
            </div>
          </div>
          <div className="_post_likes">
            <div className="_likes">
              {feed?.liked_by_user ? (
                <FontAwesomeIcon
                  className="_cards_icon"
                  icon={heartSolid}
                  height={"20px"}
                  width={"20px"}
                  color="red"
                  onClick={()=>{toggleLike(feed?.id)}}
                />
              ) : (
                <FontAwesomeIcon
                  className="_cards_icon"
                  icon={faHeart}
                  height={"20px"}
                  width={"20px"}
                  color={lightTheme?"#1e1e1e":"#fff"}
                  onClick={()=>{toggleLike(feed?.id)}}
                />
              )}
              <span style={{ margin: "0 5px" }}>{feed?.likes} Likes</span>
            </div>
            <div className="_date">{moment(feed?.created_at).format("L")}</div>
          </div>
        </div>
      </div>
      <div className={`${lightTheme?"light ":"dark "}_card_list`}>
        {feed?.user?.social?.instagram_username ? ( 
          <li className="_card_items">
            <FontAwesomeIcon
              className="_cards_icon"
              icon={faInstagram}
              height={"20px"}
              width={"20px"}
            />
            <span> {feed?.user?.social?.instagram_username}</span>
          </li>
        ) : (
          ""
        )}
        {feed?.user?.social?.portfolio_url ? (
          <li className="_card_items">
            <Link href={feed?.user?.social?.portfolio_url} target="_blank">
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
        {feed?.user?.social?.twitter_username ? (
          <li className="_card_items">
            <FontAwesomeIcon
              className="_cards_icon"
              icon={faTwitter}
              height={"20px"}
              width={"20px"}
            />{" "}
            <span>{feed?.user?.social?.twitter_username} </span>
          </li>
        ) : (
          ""
        )}
        {feed?.user?.social?.paypal_email ? (
          <li className="_card_items">
            <FontAwesomeIcon
              className="_cards_icon"
              icon={faPaypal}
              height={"20px"}
              width={"20px"}
            />
            <span>{feed?.user?.social?.paypal_email}</span>
          </li>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Cards;

const imgUrl =
  "https://images.unsplash.com/photo-1682695794816-7b9da18ed470?crop=entropy&cs=srgb&fm=jpg&ixid=M3w0ODE0MDN8MXwxfGFsbHwxfHx8fHx8Mnx8MTY5MDU2OTY5NHw&ixlib=rb-4.0.3&q=85";
