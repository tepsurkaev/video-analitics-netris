import { useEffect } from "react";
import { useAppDispatch } from "../../app/hooks";
import { formatTimestamp } from "../../utils/formatTimestamp";
import { getNewPlaybackTime, Event, NewPlaybackTime } from "./eventSlice";
import { useSelector } from "react-redux";

function EventsList({ events }: { events: Event[] }) {
  const dispatch = useAppDispatch();
  const currentPlaybackTime = useSelector(NewPlaybackTime);

  const handleGetCurrentPlaybackTime = (event: Event) => {
    dispatch(getNewPlaybackTime(event));
  };

  useEffect(() => {
    dispatch(getNewPlaybackTime(null));
  }, [dispatch, currentPlaybackTime]);

  if (events.length === 0) {
    return (
      <aside className="absolute h-screen flex items-center w-auto p-4 flex-col gap-1 top-0 left-0 overflow-y-scroll">
        00:00:000
      </aside>
    );
  }

  return (
    <aside className="absolute h-screen flex items-center w-auto p-4 flex-col gap-1 top-0 left-0 overflow-y-scroll">
      {events.map((event, i) => (
        <p
          onClick={() => handleGetCurrentPlaybackTime(event)}
          className="underline cursor-pointer"
          key={i}
        >
          {formatTimestamp(event.timestamp)}
        </p>
      ))}
    </aside>
  );
}

export default EventsList;
