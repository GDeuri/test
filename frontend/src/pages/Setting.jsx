import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserData } from "../context/UserContext";
import { PostData } from "../context/PostContext";
import PostCard from "../components/PostCard";
import { FaArrowDownLong, FaArrowUp } from "react-icons/fa6";
import Modal from "../components/Modal";
import axios from "axios";
import { Loading } from "../components/Loading";
import { CiCalendar, CiCamera, CiCirclePlus, CiEdit, CiShop, CiSquarePlus } from "react-icons/ci";
import toast from "react-hot-toast";

const SettingPage = ({ user }) => {
  return (
    <>
      <div className="bg-gray-100 min-h-screen flex flex-col gap-4 items-center justify-center pt-1 pb-14">
        <SettingPageItem to="/events" title="Market Place" IconComponent={CiShop} />
        <SettingPageItem to="/events" title="Events" IconComponent={CiCalendar} />
        <hr />
        <SettingPageItem
          to="/events/new"
          title="Create New Marketplace Ad"
          IconComponent={CiCirclePlus}
        />
        <SettingPageItem to="/events/new" title="Create New Event" IconComponent={CiSquarePlus} />
      </div>
    </>
  );
};

const SettingPageItem = ({ to, title, IconComponent }) => {
  return (
    <>
      <Link className="w-full flex justify-center" to={to}>
        <div className="bg-white text-lg hover:bg-gray-200 cursor-pointer flex items-center gap-4 p-5 rounded-lg shadow-md w-full max-w-md">
          <IconComponent /> {title}
        </div>
      </Link>
    </>
  );
};

export default SettingPage;
