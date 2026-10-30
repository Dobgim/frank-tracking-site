import { useEffect, useRef, useState } from "react";

const DURATION = 2000;
const STEPS = 60;

function format(current, target, plus) {
  const large = target >= 1000;
  const display = large
    ? current >= 1000
      ? (current / 1000).toFixed(1) + "K"
      : Math.round(current).toLocaleString()
    : Math.round(current);
  return `${display}${plus ? "+" : ""}`;
}

// About hero number: counts up once the hero is 40% in view.
export default function CountUp({ target, plus = false }) {
  const ref = useRef(null);
  const [text, setText] = useState(null);

  useEffect(() => {
    let timer;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        let current = 0;
        timer = setInterval(() => {
          current += target / STEPS;
          if (current >= target) {
            current = target;
            clearInterval(timer);
          }
          setText(format(current, target, plus));
        }, DURATION / STEPS);
      },
      { threshold: 0.4 },
    );
    observer.observe(ref.current.closest(".about-hero"));
    return () => {
      observer.disconnect();
      clearInterval(timer);
    };
  }, [target, plus]);

  return (
    <span className="num count-num" ref={ref}>
      {text ?? <>{plus && <span>+</span>}0</>}
    </span>
  );
}
