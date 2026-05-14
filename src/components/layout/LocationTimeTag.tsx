"use client";

import { useEffect, useState } from "react";

const timeFormatter = new Intl.DateTimeFormat("en-GB", {
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
  timeZone: "Asia/Novosibirsk",
});

export function LocationTimeTag() {
  const [time, setTime] = useState("--:--");

  useEffect(() => {
    const tick = () => setTime(timeFormatter.format(new Date()));
    tick();
    const interval = window.setInterval(tick, 1000 * 30);
    return () => window.clearInterval(interval);
  }, []);

  return (
    <div className="location-time-tag" aria-label={`Novosibirsk, Russia local time ${time}`}>
      <span>Novosibirsk, Russia</span>
      <time>{time}</time>
    </div>
  );
}
