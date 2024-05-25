import { Event } from "./eventSlice";

interface RectangleProps {
  events: Event[];
}

function Rectangle({ events }: RectangleProps) {
  return events.map((event, i) => {
    const zone = event.zone;

    return (
      <div
        key={i}
        className="absolute z-50 bg-green-500 rounded-md"
        style={{
          width: zone.width,
          height: zone.height,
          top: zone.top,
          left: zone.left,
        }}
      />
    );
  });
}

export default Rectangle;
