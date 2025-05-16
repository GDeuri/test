import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserData } from "../context/UserContext";
import { PostData } from "../context/PostContext";
import PostCard from "../components/PostCard";
import { FaArrowDownLong, FaArrowUp } from "react-icons/fa6";
import Modal from "../components/Modal";
import axios from "axios";
import { Loading } from "../components/Loading";
import { CiCamera, CiEdit } from "react-icons/ci";
import toast from "react-hot-toast";

const Account = ({ user }) => {
  const navigate = useNavigate();

  const { logoutUser, updateProfilePic, updateProfileName } = UserData();

  const { posts, fetchPosts, reels, loading } = PostData();

  let myPosts;

  if (posts) {
    myPosts = posts.filter((post) => post.owner._id === user._id);
  }
  let myReels;

  if (reels) {
    myReels = reels.filter((reel) => reel.owner._id === user._id);
  }

  const [type, setType] = useState("post");
  const fileInputRef = useRef(null);

  const handleFileOpenClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const logoutHandler = () => {
    logoutUser(navigate);
  };

  const [index, setIndex] = useState(0);

  const prevReel = () => {
    if (index === 0) {
      console.log("null");
      return null;
    }
    setIndex(index - 1);
  };
  const nextReel = () => {
    if (index === myReels.length - 1) {
      console.log("null");
      return null;
    }
    setIndex(index + 1);
  };

  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);

  const [followersData, setFollowersData] = useState([]);
  const [followingsData, setFollowingsData] = useState([]);

  async function followData() {
    try {
      const { data } = await axios.get("/api/user/followdata/" + user._id);

      setFollowersData(data.followers);
      setFollowingsData(data.followings);
    } catch (error) {
      console.log(error);
    }
  }

  const [file, setFile] = useState("");

  const changeFileHandler = (e) => {
    const file = e.target.files[0];
    setFile(file);
  };

  const changleImageHandler = () => {
    const formdata = new FormData();

    formdata.append("file", file);

    updateProfilePic(user._id, formdata, setFile);
  };

  useEffect(() => {
    followData();
  }, [user]);

  const [showInput, setShowInput] = useState(false);
  const [name, setName] = useState(user.name ? user.name : "");

  const UpdateName = () => {
    updateProfileName(user._id, name, setShowInput);
  };

  const [showUpdatePass, setShowUpdatePass] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  async function updatePassword(e) {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/user/" + user._id, {
        oldPassword,
        newPassword,
      });

      toast.success(data.message);
      setOldPassword("");
      setNewPassword("");
      setShowUpdatePass(false);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          {user && (
            <>
              {loading ? (
                <Loading />
              ) : (
                <div className="bg-gray-100 min-h-screen flex flex-col gap-4 items-center justify-center pt-1 pb-14">
                  {show && <Modal value={followersData} title={"Followers"} setShow={setShow} />}
                  {show1 && (
                    <Modal value={followingsData} title={"Followings"} setShow={setShow1} />
                  )}
                  <div className="bg-white flex justify-between gap-4 p-8 rounded-lg shadow-md w-full max-w-md">
                    <div className="image flex flex-col justify-between mb-4 gap-3">
                      <img
                        src={user.profilePic.url}
                        alt=""
                        className="w-[180px] h-[180px] rounded-full border-2"
                      />
                      <div className="update w-[150px] flex flex-col justify-center items-center">
                        <input
                          ref={fileInputRef}
                          className="hidden"
                          type="file"
                          onChange={changeFileHandler}
                          required
                        />
                        <div>
                          <button className="relative top-[-25px] left-[5px]">
                            <CiCamera onClick={handleFileOpenClick} size={30} />
                          </button>
                        </div>
                        <button
                          className="bg-blue-500 text-white px-3 py-2"
                          onClick={changleImageHandler}
                        >
                          Update Profile
                        </button>
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      {showInput ? (
                        <>
                          <div className="gap-2 w-[150px]">
                            <input
                              className="custom-input max-w-full"
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              placeholder="Enter Name"
                              required
                            />
                            <div className="my-2 flex gap-[5px]">
                              <button
                                className="text-sm bg-blue-500 text-white p-1 px-2 rounded-full"
                                onClick={UpdateName}
                              >
                                Update
                              </button>
                              <button
                                onClick={() => setShowInput(false)}
                                className="text-sm bg-red-400 text-white p-1 px-2 rounded-full"
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        </>
                      ) : (
                        <p className="text-gray-800 font-semibold w-[140px]">
                          {user.name}{" "}
                          <button onClick={() => setShowInput(true)}>
                            <CiEdit />
                          </button>
                        </p>
                      )}
                      <p className="text-gray-500 text-sm">{user.email}</p>
                      <p className="text-gray-500 text-sm">{user.gender}</p>
                      <p
                        className="text-gray-500 text-sm cursor-pointer"
                        onClick={() => setShow(true)}
                      >
                        {user.followers.length} follower
                      </p>
                      <p
                        className="text-gray-500 text-sm cursor-pointer"
                        onClick={() => setShow1(true)}
                      >
                        {user.followings.length} following
                      </p>
                      <button onClick={logoutHandler} className=" bg-red-500 text-white rounded-md">
                        Logout
                      </button>
                    </div>
                  </div>

                  {!showUpdatePass ? (
                    <div className="">
                      <button
                        type="button"
                        onClick={() => setShowUpdatePass(!showUpdatePass)}
                        className="bg-blue-500 px-2 py-1 rounded-sm text-white"
                      >
                        Update Password
                      </button>
                    </div>
                  ) : null}

                  {showUpdatePass && (
                    <form
                      onSubmit={updatePassword}
                      className="flex justify-center items-center w-full max-w-md flex-col bg-white p-2 rounded-sm gap-4"
                    >
                      <div className="flex w-full justify-end">
                        <button
                          type="button"
                          onClick={() => setShowUpdatePass(!showUpdatePass)}
                          className="bg-blue-500 px-3 py-1 rounded-sm text-white"
                        >
                          {showUpdatePass ? "X" : "Update Password"}
                        </button>
                      </div>

                      <input
                        type="password"
                        className="custom-input"
                        placeholder="Old Password"
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                        required
                      />
                      <input
                        type="password"
                        className="custom-input"
                        placeholder="New Password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                      />
                      <button type="submit" className="bg-blue-500 px-2 py-1 rounded-sm text-white">
                        Update Password
                      </button>
                    </form>
                  )}

                  <div className="max-w-md w-full flex">
                    <button
                      className={`${type === "post" ? "bg-gray-200" : "bg-white"} p-3 w-full`}
                      onClick={() => setType("post")}
                    >
                      Posts
                    </button>
                    <button
                      className={`${type === "reel" ? "bg-gray-200" : "bg-white"} p-3 w-full`}
                      onClick={() => setType("reel")}
                    >
                      Reels
                    </button>
                  </div>
                  {type === "post" && (
                    <>
                      {myPosts && myPosts.length > 0 ? (
                        myPosts.map((e) => <PostCard type={"post"} value={e} key={e._id} />)
                      ) : (
                        <p className="text-gray-500">No Posts Yet</p>
                      )}
                    </>
                  )}
                  {type === "reel" && (
                    <>
                      {myReels && myReels.length > 0 ? (
                        <div className="flex gap-3 justify-center items-center">
                          <PostCard type={"reel"} value={myReels[index]} key={myReels[index]._id} />
                          <div className="button flex flex-col justify-center items-center gap-6">
                            {index === 0 ? (
                              ""
                            ) : (
                              <button
                                className="bg-gray-500 text-white py-5 px-5 rounded-full"
                                onClick={prevReel}
                              >
                                <FaArrowUp />
                              </button>
                            )}
                            {index === myReels.length - 1 ? (
                              ""
                            ) : (
                              <button
                                className="bg-gray-500 text-white py-5 px-5 rounded-full"
                                onClick={nextReel}
                              >
                                <FaArrowDownLong />
                              </button>
                            )}
                          </div>
                        </div>
                      ) : (
                        <p className="text-gray-500">No Reels Yet</p>
                      )}
                    </>
                  )}
                </div>
              )}
            </>
          )}
        </>
      )}
    </>
  );
};

export default Account;
