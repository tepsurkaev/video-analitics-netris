export function formatTimestamp(timestamp: number) {
  const mss = Math.floor((timestamp * 1000) % 1000);
  const minutes = Math.floor(timestamp / 60);
  const seconds = Math.floor(timestamp) % 60;

  const formattedMinutes = String(minutes).padStart(2, "0");
  const formattedSeconds = String(seconds).padStart(2, "0");
  const formattedMillis = String(mss).padStart(3, "0");

  return `${formattedMinutes}:${formattedSeconds}:${formattedMillis}`;
}
