import { useEffect, useRef } from "react";
import "./SpinnerTextLoader.css";

export default function SpinnerTextLoader() {
  const text = "THANK YOU! HAVE A NICE DAY.";
  const characters = text.split("");
  const radius = 80;
  const circleRef = useRef(null);

  useEffect(() => {
    let rotation = 0;

    const animateCircle = () => {
      if (circleRef.current) {
        rotation = (rotation + 0.3) % 360;
        circleRef.current.style.transform = `rotate(${rotation}deg)`;
      }
      requestAnimationFrame(animateCircle);
    };

    requestAnimationFrame(animateCircle);
  }, []);

  return (
    <div className="spinner-overlay">
      <div ref={circleRef} className="loader-wrapper">
        <div className="letters-circle">
          {characters.map((ch, i) => (
            <span
              key={i}
              className="letter"
              style={{
                transform: `rotate(${
                  i * (360 / characters.length)
                }deg) translateY(-${radius}px)`,
                animationDelay: `${i * 0.05}s`,
              }}
            >
              {ch}
            </span>
          ))}
        </div>

        <img src="/itcareerhub.png" className="logo" alt="Logo" />
      </div>
    </div>
  );
}
