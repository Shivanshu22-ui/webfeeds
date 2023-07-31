"use client"
import "./Nav.css";
import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faCircleHalfStroke } from "@fortawesome/free-solid-svg-icons";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import {  useDispatch, useSelector } from "react-redux";
import { currentNavActive } from "@/features/users.slice";
import { setTheme } from "@/features/allPosts.slice";
import { useEffect } from "react";

const Nav = ({light,setLight}) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { currentUserActive} = useSelector((state) => state.user);
  const { lightTheme} = useSelector((state) => state.allPosts);
  
  useEffect(()=>{
    setLight(lightTheme);
  },[lightTheme])
  
  return (
    <div className="nav_container">
      <ul className={`${lightTheme?"_nav_list_light":"_nav_list_dark"}`}>
        <li className={`${currentUserActive?"_nav_item":"_nav_item active"}`}  onClick={()=>{router.push("/"); dispatch(currentNavActive(false))}}> <FontAwesomeIcon icon={faHouse}/></li>
        <li className={` ${!currentUserActive?"_nav_item":"_nav_item active"}`} onClick={()=>{router.push(`/profile/vinilowraw`); dispatch(currentNavActive(true))}}> <FontAwesomeIcon icon={faUser}/></li>
        
        <li className={`_nav_item `} onClick={()=>{dispatch(setTheme(!lightTheme))}}> <FontAwesomeIcon icon={faCircleHalfStroke}/></li>
      </ul>
    </div>
  );
};

export default Nav;
