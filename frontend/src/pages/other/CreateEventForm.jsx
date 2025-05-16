import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PostData } from "../../context/PostContext";
import axios from "axios";
import { Loading } from "../../components/Loading";
import toast from "react-hot-toast";

const CreateEventForm = ({ user: loggedInUser }) => {
  const navigate = useNavigate();

  const { posts, reels } = PostData();

  const [user, setUser] = useState([]);

  const params = useParams();

  const [creating, setCreating] = useState(false);
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [coverImage, setCoverImage] = useState();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      if (creating) {
        return;
      }
      const formData = new FormData();
      if (!name || !description || !location || !date || !coverImage) {
        return;
      }
      formData.append("title", name);
      formData.append("description", description);
      formData.append("location", location);
      formData.append("date", date);
      formData.append("file", coverImage);
      setCreating(true);
      const { data } = await axios.post("/api/events", formData);
      toast.success("Event Created!");
      navigate("/events");
    } catch (err) {
      console.log("error in handling submit", err);
    }
    setCreating(false);
  }

  function onSelectFile(e) {
    const files = e.target.files;
    if (files && files.length) {
      setCoverImage(e.target.files[0]);
    }
  }

  return (
    <>
      <div className="w-full flex justify-center">
        {loading ? (
          <Loading />
        ) : (
          <>
            {user && (
              <div className="w-full max-w-md">
                <h3 className="text-xl my-5 text-center">Create Event</h3>
                <form onSubmit={handleSubmit}>
                  <div className="my-4">
                    <label>
                      <div className="my-2">Event Name:</div>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="custom-input min-w-full"
                      />
                    </label>
                  </div>
                  <div className="my-4">
                    <label>
                      <div className="my-2">Description:</div>
                      <input
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="custom-input min-w-full"
                      />
                    </label>
                  </div>
                  <div className="my-4">
                    <label>
                      <div className="my-2">Location:</div>
                      <input
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="custom-input min-w-full"
                      />
                    </label>
                  </div>
                  <div className="my-4">
                    <label>
                      <div className="my-2">Date:</div>
                      <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="custom-input min-w-full"
                      />
                    </label>
                  </div>
                  <div className="my-4">
                    <label>
                      <div className="my-2">Cover Image:</div>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={onSelectFile}
                        className="custom-input min-w-full"
                      />
                    </label>
                  </div>
                  <button className="bg-blue-500 hover:bg-blue-400 text-white p-2 w-full rounded my-3">
                    {creating ? "Please wait..." : "Create Event"}
                  </button>
                </form>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default CreateEventForm;
