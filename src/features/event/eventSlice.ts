import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "../../app/store";

interface Zone {
  left: number;
  top: number;
  width: number;
  height: number;
}

export interface Event {
  timestamp: number;
  duration: number;
  zone: Zone;
}

interface EventState {
  events: Event[];
  eventsList: Event[];
  highlightedEvents: Event[];
  loading: boolean;
  currentPlaybackTime: number | null;
}

const initialState: EventState = {
  events: [],
  eventsList: [],
  highlightedEvents: [],
  loading: false,
  currentPlaybackTime: null,
};

export const eventSlice = createSlice({
  name: "event",
  initialState,
  reducers: {
    getAllEvents(state) {
      state.loading = true;
    },
    getAllEventsSuccess(state, action: PayloadAction<Event[]>) {
      state.loading = false;
      state.events = action.payload.sort((a, b) => a.timestamp - b.timestamp);
    },
    getCurrentEvent(state, action: PayloadAction<Event>) {
      const findEvent = state.eventsList.find(
        (event) => event.timestamp === action.payload.timestamp,
      );

      if (!findEvent) {
        state.eventsList = [...state.eventsList, action.payload];
        state.highlightedEvents = [...state.highlightedEvents, action.payload];
      }
    },
    updateHighlightedEvents(state, action: PayloadAction<Event[]>) {
      state.highlightedEvents = action.payload;
    },
    getNewPlaybackTime(state, action: PayloadAction<Event | null>) {
      state.currentPlaybackTime = action.payload
        ? action.payload.timestamp
        : null;
    },
  },
});

export const EventsList = (state: RootState) => state.event.events;
export const CurrentEvents = (state: RootState) => state.event.eventsList;
export const NewPlaybackTime = (state: RootState) =>
  state.event.currentPlaybackTime;
export const HighlightedEvents = (state: RootState) =>
  state.event.highlightedEvents;

export const {
  getAllEvents,
  getAllEventsSuccess,
  getCurrentEvent,
  updateHighlightedEvents,
  getNewPlaybackTime,
} = eventSlice.actions;
export default eventSlice.reducer;
