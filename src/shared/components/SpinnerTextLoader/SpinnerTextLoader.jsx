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
        rotation = (rotation + 1) % 360; // плавное вращение
        circleRef.current.style.transform = `rotate(${rotation}deg)`;
      }
      requestAnimationFrame(animateCircle);
    };

    requestAnimationFrame(animateCircle);
  }, []);

  return (
    <div
      ref={circleRef}
      className="circle"
      style={{ width: radius * 2, height: radius * 2 }}
    >
      <p aria-label={text}></p>
      <p aria-hidden="true" className="text">
        {characters.map((ch, i) => (
          <span
            key={i}
            className={`letter letter-${i}`}
            style={{
              transform: `rotate(${i * (360 / characters.length)}deg) translateY(-${radius}px)`,
              animationDelay: `${i * 0.1}s`, // задержка для каждой буквы
            }}
          >
            {ch}
          </span>
        ))}
      </p>
      <img src="/itcareerhub.png" className="logo" alt="Logo" />
    </div>
  );
}


