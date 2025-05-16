import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Loading } from "../../components/Loading";
import toast from "react-hot-toast";
import PostCard from "../../components/PostCard";
import { BsMap, BsPin, BsPlusCircle } from "react-icons/bs";

const EventsListPage = ({ user }) => {
  const navigate = useNavigate();

  const params = useParams();

  const [loading, setLoading] = useState(false);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchEvents();
  }, []);

  async function fetchEvents(e) {
    try {
      const { data } = await axios.get("/api/events");
      setEvents(data.events);
    } catch (err) {
      console.log("error in handling submit", err);
    }
  }

  return (
    <>
      <div className="bg-gray-100 w-full flex justify-center">
        {loading ? (
          <Loading />
        ) : (
          <>
            <div className="max-w-md w-full min-h-[100vh] mb-[100px]">
              <h3 className="text-center my-4 text-lg">Total {events.length} Events</h3>
              <div className="flex justify-center my-3">
                <Link to="/events/new">
                  <button className="flex gap-[5px] items-center bg-blue-500 p-3 text-white px-5">
                    <BsPlusCircle /> Add Event
                  </button>
                </Link>
              </div>
              <div className="flex flex-col w-full">
                {user &&
                  events.map((item) => (
                    <EventCard user={user} onReload={fetchEvents} key={item._id} item={item} />
                  ))}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

function EventCard({ user, item, onReload }) {
  const [deleting, setDeleting] = useState(false);
  async function deleteEvent() {
    if (deleting) return;
    setDeleting(true);
    try {
      toast.success("Deleting...");
      await axios.delete("/api/events/" + item._id);
      toast.success("Event Deleted!");
    } catch (err) {}
    setDeleting(false);
    onReload();
  }
  return (
    <div className="shadow-md p-3 bg-white my-2 rounded-lg">
      <div className="text-lg">{item.title}</div>
      <div className="my-3 text-sm text-gray-500">{item.description}</div>
      <div>{!!item.coverImage && <img className="w-full" src={item.coverImage.url} />}</div>
      <div className="flex text-sm items-center bg-blue-400 text-white p-2">
        <BsPin /> VENUE: {item.location}
      </div>
      {String(item.createdBy._id) === String(user._id) ? (
        <div
          onClick={deleteEvent}
          className="cursor-pointer text-end text-sm my-2 text text-red-500"
        >
          {deleting ? "Deleting..." : "Delete"}
        </div>
      ) : null}
    </div>
  );
}

export default EventsListPage;
