import { useEffect, useRef } from "react";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  NewPlaybackTime,
  EventsList as EventsListSelector,
  getCurrentEvent,
  updateHighlightedEvents,
  HighlightedEvents,
} from "./eventSlice";
import Rectangle from "./Rectangle";

function formatTimestamp(timestamp: number) {
  return new Date(0).setSeconds(timestamp);
}

function VideoPlayer() {
  const video = useRef<HTMLVideoElement | null>(null);

  const dispatch = useAppDispatch();
  const events = useAppSelector(EventsListSelector);
  const newPlaybackTime = useAppSelector(NewPlaybackTime);
  const highlightedEvents = useAppSelector(HighlightedEvents);

  useEffect(() => {
    if (!video.current) return;

    const videoRef = video.current;

    const handleTimeupdate = () => {
      const currentEvent = events.find(
        (event) =>
          formatTimestamp(event.timestamp) ===
          formatTimestamp(videoRef.currentTime),
      );

      if (currentEvent) {
        dispatch(getCurrentEvent(currentEvent));
      }
    };

    videoRef.addEventListener("timeupdate", handleTimeupdate);

    return () => videoRef.removeEventListener("timeupdate", handleTimeupdate);
  }, [events, dispatch]);

  useEffect(() => {
    if (!video.current) return;

    const videoRef = video.current;

    if (newPlaybackTime) {
      videoRef.currentTime = newPlaybackTime;
    }
  }, [newPlaybackTime]);

  useEffect(() => {
    const timeouts: ReturnType<typeof setTimeout>[] = [];

    highlightedEvents.forEach((currEvent) => {
      const event = events.find(
        (event) => event.timestamp === currEvent.timestamp,
      );

      if (event) {
        const payload = highlightedEvents.filter(
          (event) => event.timestamp !== currEvent.timestamp,
        );

        const timeout = setTimeout(
          () => dispatch(updateHighlightedEvents(payload)),
          (event.timestamp + event.duration - video.current!.currentTime) *
            1000,
        );
        timeouts.push(timeout);
      }
    });

    return () => {
      timeouts.forEach((timeout) => clearTimeout(timeout));
    };
  }, [highlightedEvents, dispatch, events]);

  return (
    <div className="w-[1480px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <div className="w-full relative">
        {highlightedEvents.length > 0 && (
          <Rectangle events={highlightedEvents} />
        )}
        <video
          ref={video}
          controls
          src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
          className="w-full h-full"
        />
      </div>
    </div>
  );
}

export default VideoPlayer;
