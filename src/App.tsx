import { useEffect } from "react";

import VideoPlayer from "./features/event/VideoPlayer";
import EventsList from "./features/event/EventsList";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import {
  getAllEvents,
  EventsList as Events,
} from "./features/event/eventSlice";

function App() {
  const dispatch = useAppDispatch();

  const events = useAppSelector(Events);

  useEffect(() => {
    dispatch(getAllEvents());
  }, [dispatch]);

  return (
    <>
      <EventsList events={events} />
      <VideoPlayer />
    </>
  );
}

export default App;
