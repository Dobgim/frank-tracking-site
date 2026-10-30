import { useEffect, useRef, useState } from "react";

const DURATION = 1800;

// Home stats ribbon number: counts up once the ribbon is 40% in view.
export default function CountStat({ target, suffix }) {
  const ref = useRef(null);
  const [value, setValue] = useState(target);

  useEffect(() => {
    let frame;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        let start = 0;
        const step = (timestamp) => {
          if (!start) start = timestamp;
          const progress = Math.min((timestamp - start) / DURATION, 1);
          setValue(Math.floor(progress * target));
          if (progress < 1) frame = requestAnimationFrame(step);
        };
        frame = requestAnimationFrame(step);
      },
      { threshold: 0.4 },
    );
    observer.observe(ref.current.closest("#stats-ribbon"));
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [target]);

  return (
    <div className="stat-num" ref={ref}>
      {value}
      <span>{suffix}</span>
    </div>
  );
}
