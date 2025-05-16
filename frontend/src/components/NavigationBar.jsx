import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineHome, AiFillHome } from "react-icons/ai";
import { BsCameraReelsFill, BsCameraReels } from "react-icons/bs";
import { IoSearchCircleOutline, IoSearchCircle } from "react-icons/io5";
import { IoChatbubbleEllipses, IoChatbubbleEllipsesOutline } from "react-icons/io5";
import {
  RiAccountCircleFill,
  RiAccountCircleLine,
  RiSettings2Fill,
  RiSettings2Line,
} from "react-icons/ri";

const NavigationBar = () => {
  const [tab, setTab] = useState(window.location.pathname);
  return (
    <div className="fixed bottom-0 w-full bg-white">
      <div className="flex justify-around">
        <Link
          to={"/"}
          onClick={() => setTab("/")}
          className={`${
            tab === "/" ? "bg-gray-200" : ""
          } py-3 w-full flex flex-col items-center text-2xl`}
        >
          <span>{tab === "/" ? <AiFillHome /> : <AiOutlineHome />}</span>
        </Link>
        <Link
          to={"/reels"}
          onClick={() => setTab("/reels")}
          className={`${
            tab === "/reels" ? "bg-gray-200" : ""
          } py-3 w-full flex flex-col items-center text-2xl`}
        >
          <span>{tab === "/reels" ? <BsCameraReelsFill /> : <BsCameraReels />}</span>
        </Link>
        <Link
          onClick={() => setTab("/search")}
          to={"/search"}
          className={`${
            tab === "/search" ? "bg-gray-200" : ""
          } py-3 w-full flex flex-col items-center text-2xl`}
        >
          <span>{tab === "/search" ? <IoSearchCircle /> : <IoSearchCircleOutline />}</span>
        </Link>
        <Link
          onClick={() => setTab("/chat")}
          to={"/chat"}
          className={`${
            tab === "/chat" ? "bg-gray-200" : ""
          } py-3 w-full flex flex-col items-center text-2xl`}
        >
          <span>
            {tab === "/chat" ? <IoChatbubbleEllipses /> : <IoChatbubbleEllipsesOutline />}
          </span>
        </Link>
        <Link
          onClick={() => setTab("/account")}
          to={"/account"}
          className={`${
            tab === "/account" ? "bg-gray-200" : ""
          } py-3 w-full flex flex-col items-center text-2xl`}
        >
          <span>{tab === "/account" ? <RiAccountCircleFill /> : <RiAccountCircleLine />}</span>
        </Link>
        <Link
          onClick={() => setTab("/settings")}
          to={"/settings"}
          className={`${
            tab === "/settings" ? "bg-gray-200" : ""
          } py-3 w-full flex flex-col items-center text-2xl`}
        >
          <span>{tab === "/settings" ? <RiSettings2Fill /> : <RiSettings2Line />}</span>
        </Link>
      </div>
    </div>
  );
};

export default NavigationBar;
